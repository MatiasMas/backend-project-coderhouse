import express from 'express';
import http from 'http';
import path from 'path';
import {fileURLToPath} from 'url';
import dotenv from 'dotenv';
import productsRouter from './routers/products.router.js';
import cartsRouter from "./routers/carts.router.js";
import cors from "cors";
import {createIOServer} from "./websockets/server.setup.js";
import {MessagesSocket} from "./websockets/messages.socket.js";

//Creating server
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const server = http.createServer(app);
const io = createIOServer(server);
const messagesSocket = new MessagesSocket(io);

/////////////////////////
messagesSocket.establishConnectionWithClientAndSendInformation();
/////////////////////////

//App middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Linking .env file
dotenv.config();

//Routers setup
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//Server port setup
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server has initiated on port http://localhost:${PORT}`);
});
server.on("error", (err) => console.log(err));