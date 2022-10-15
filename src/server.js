import express from 'express';
import http from 'http';
import path from 'path';
import {fileURLToPath} from 'url';
import dotenv from 'dotenv';
import productsRouter from './routers/products.router.js';
import {engine} from 'express-handlebars';

//Creating server
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const server = http.createServer(app);

//App middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public"));

//Linking .env file
dotenv.config();

//App middlewares but setting up handlebars
app.set("views", "./src/views");
app.set("view engine", "pug");

//Routers setup
app.use('/api/products', productsRouter);

//Server port setup
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server has initiated on port http://localhost:${PORT}`);
});
server.on("error", (err) => console.log(err));