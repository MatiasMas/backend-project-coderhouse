import express from 'express';
import http from 'http';
import path from 'path';
import {fileURLToPath} from 'url';
import dotenv from 'dotenv';
import productsRouter from './routers/products.router.js';
import cartsRouter from "./routers/carts.router.js";
import loginRouter from "./routers/login.router.js";
import cors from "cors";
import {createIOServer} from "./websockets/server.setup.js";
import {MessagesSocket} from "./websockets/messages.socket.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import {FirestoreStore} from "@google-cloud/connect-firestore";
import {getFirestore} from "firebase-admin/firestore";
import MongoStore from "connect-mongo";
import passport from "passport";
import {setPassport} from "./passport/passport.settings.js";
import registerRouter from "./routers/register.router.js";
import utilsRouter from "./routers/utils.router.js";
import cluster from "cluster";
import os from "os";

//Creating server
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const app = express();
const server = http.createServer(app);

//Linking .env file
dotenv.config();

//App middlewares
app.use(
    cors({
        origin: "http://localhost:3000", // <-- location of the react app were connecting to
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// //Session Firestore
// app.use(session({
//     store: new FirestoreStore({
//         dataset: getFirestore(),
//         kind: "express-sessions"
//     }),
//     secret: "secretKey",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 60 * 10 * 1000
//     }
// }));

//Session Mongo local
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 10 * 1000
    }
}));

//Passport settings
app.use(passport.initialize());
app.use(passport.session());
setPassport(passport);
export const currentPassport = passport;

//Routers setup
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", loginRouter);
app.use("/", registerRouter);
app.use("/", utilsRouter);

//Server port setup
const PORT = process.argv[2] || process.env.PORT;
const serverMode = process.argv[4] || process.env.SERVER_MODE;
const subprocessesNumber = os.cpus().length;

if (serverMode.toLowerCase() === "cluster" && cluster.isPrimary) {
    for (let i = 0; i < subprocessesNumber; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, error) => {
        console.log(`The subprocess with PID: ${worker.process.pid} has stopped working.`);
        cluster.fork();
    });
} else {
    const io = createIOServer(server);
    const messagesSocket = new MessagesSocket(io);

    /////////////////////////
    messagesSocket.establishConnectionWithClientAndSendInformation();
    /////////////////////////

    server.listen(PORT, () => {
        console.log(`Server has initiated on port http://localhost:${PORT}, PID: ${process.pid}.`);
    });
    server.on("error", (err) => console.log(err));
}