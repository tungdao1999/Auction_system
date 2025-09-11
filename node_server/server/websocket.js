const WebSocket = require("ws");
const config = require('./config');
const authToken = require("./common/auth-token");

const messageAction = {
    SUBSCRIBE : "subscribe",
    UNSUBSCRIBE : "unsubscribe",
    CONFIRM : "confirm"
}

const topics = new Map();

const setUpWs = () => {
    const wss = new WebSocket.Server({ port: config.app.ws_port });
    wss.on("connection", (ws, req) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const token = url.searchParams.get("token");
        if (!token) {
            ws.close(1008, "Token required");
            return;
        }
        try {
            const decoded = authToken.verifyAuthToken(token);
            ws.user = decoded;
            ws.send(JSON.stringify({ message: "Authentication successful" }));
        }
        catch (error) {
            console.log("WebSocket auth error:", error.message);
            ws.close(1008, "Invalid token");
            return;
        }

        ws.topics = new Set();
        ws.on("message", (message) => { 
            let data = null;
            try {
                data = JSON.parse(message);
                console.log("Received message:", data);
            }
            catch (error) {
                ws.send(JSON.stringify({ error: "Invalid JSON format" }));
                return;
            }

            // Handle subscription
            if (data.action == messageAction.SUBSCRIBE) { 
                subscribe(ws, data.topic);
            }

            // Handle unsubscription
            else if (data.action == messageAction.UNSUBSCRIBE) { 
                unsubscribe(ws, data.topic);
            }

            else {
                ws.send(JSON.stringify({ error: "Unknown action" }));
            }
        });
    });
}

const subscribe = (ws, topic) => {
    if (!topics.has(topic)) {
        topics.set(topic, new Set());
    }
    topics.get(topic).add(ws);
    ws.topics.add(topic);
    ws.send(JSON.stringify({ message: `Subscribed to ${topic}` }));
}

const unsubscribe = (ws, topic) => {
    if (topics.has(topic)) {
        topics.get(topic).delete(ws);
        if (topics.get(topic).size === 0) {
            topics.delete(topic);
        }
    }
    ws.topics.delete(topic);
    ws.send(JSON.stringify({ message: `Unsubscribed from ${topic}` }));
}

const sendMessageToTopic = (topic, message) => {
    if (topics.has(topic)) {
        topics.get(topic).forEach((client) => {
            client.send(JSON.stringify({ topic, message }));
        });
    }
}

module.exports = { setUpWs, sendMessageToTopic };