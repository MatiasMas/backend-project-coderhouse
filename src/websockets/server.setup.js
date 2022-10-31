import {Server} from "socket.io";

export const createIOServer = (server) => {
    return new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
}