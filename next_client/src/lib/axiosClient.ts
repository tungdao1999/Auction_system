import axios from "axios";

export function createClientAxios() {
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
        throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
    }

    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
    });

    axiosInstance.interceptors.request.use(config => {
        if (typeof window !== "undefined") {
            const buyerToken = localStorage.getItem('auction_token_buyer');
            if (config.headers) {
                config.headers['Authorization'] = `Bearer ${buyerToken}`;
                config.headers['Content-Type'] = 'application/json';
            }
        }
        return config;
    });

    return axiosInstance;
}