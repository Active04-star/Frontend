
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useWebSocket = (userId: any) => {
    const [socket, setSocket] = useState<Socket<any> | null>(null);
    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        // if (!userId) return; // No conecta si no hay un userId

        // const socketInstance = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL);

        // // Conectarse y notificar al backend
        // socketInstance.on("connect", () => {
        //     console.log("Conectado al WebSocket:", socketInstance.id);
        //     socketInstance.emit("identify", { userId });
        // });

        // // Manejar desconexión
        // socketInstance.on("disconnect", () => {
        //     console.log("Desconectado del WebSocket");
        // });

        // // Manejar notificaciones
        // socketInstance.on("notification", (message) => {
        //     console.log("Notificación recibida:", message);
        //     setNotifications((prev) => [...prev, message]); // Guardar notificación en el estado
        // });

        // // Guardar instancia en el estado
        // setSocket(socketInstance);

        // if(userId === "none") {
        //     socketInstance.disconnect();
        // }
        // // Limpieza: cerrar conexión al desmontar el componente
        // return () => {
        //     socketInstance.disconnect();
        // };
    }, [userId]);

    return { socket, notifications };
};

export default useWebSocket;