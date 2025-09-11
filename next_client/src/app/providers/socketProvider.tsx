import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
    useRef,
} from "react";

interface WebSocketContextType {
    ws: WebSocket | null;
    messages: any[];
    sendMessage: (msg: string) => void;
    receiveMessage: (callback: (msg: any) => void) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface WebSocketProviderProps {
    children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("auction_token_buyer");
        const socket = new WebSocket(`ws://localhost:8181?token=${token}`);
        console.log("socket", socket);

        wsRef.current = socket;

        socket.onopen = () => {
            console.log("WebSocket connected");
        };

        socket.onmessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            setMessages((prev) => [...prev, data]);
        };

        socket.onclose = () => {
            console.log("WebSocket disconnected");
        };

        setWs(socket);

        return () => {
            socket.close();
        };
    }, []);

    const sendMessage = (msg: string) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(msg);
        }
    };

    const receiveMessage = (callback: (msg: any) => void) => {
        if (wsRef.current) {
            wsRef.current.onmessage = (event: MessageEvent) => {
                const data = JSON.parse(event.data);
                callback(data);
            };
        }
    };

    return (
        <WebSocketContext.Provider value={{ ws, messages, sendMessage, receiveMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = (): WebSocketContextType => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error("useWebSocket must be used within a WebSocketProvider");
    }
    return context;
};
