import { createContext, useContext } from "react";
import useWebSocket from "./useWebsocket";

const WebSocketContext = createContext<{ socket: any; notifications: any; } | null>(null);

export const WebSocketProvider = ({ children, userId }: { children: any; userId: any; }) => {
    const { socket, notifications } = useWebSocket(userId);

    return (
        <WebSocketContext.Provider value={{ socket, notifications }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocketContext = () => useContext(WebSocketContext);