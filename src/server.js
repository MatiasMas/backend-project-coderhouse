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
import cookieParser from "cookie-parser";
import session from "express-session";
import {FirestoreStore} from "@google-cloud/connect-firestore";
import {getFirestore} from "firebase-admin/firestore";
import loginRouter from "./routers/login.router.js";

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
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    store: new FirestoreStore({
        dataset: getFirestore(),
        kind: "express-sessions"
    }),
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 10 * 1000
    }
}));

//Linking .env file
dotenv.config();

//Routers setup
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", loginRouter);

//Server port setup
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server has initiated on port http://localhost:${PORT}`);
});
server.on("error", (err) => console.log(err));