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

//Creating server
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const server = http.createServer(app);
const io = createIOServer(server);
const messagesSocket = new MessagesSocket(io);

//Linking .env file
dotenv.config();

/////////////////////////
messagesSocket.establishConnectionWithClientAndSendInformation();
/////////////////////////

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

//Server port setup
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server has initiated on port http://localhost:${PORT}`);
});
server.on("error", (err) => console.log(err));