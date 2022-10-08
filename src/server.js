import express from 'express';
import http from 'http';
import path from 'path';
import {fileURLToPath} from 'url';
import dotenv from 'dotenv';
import productsRouter from "./routers/products.router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const server = http.createServer(app);
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./src/public'));

dotenv.config();

app.use('/api/products', productsRouter);

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server has initiated on port http://localhost:${PORT}`);
});
server.on('error', (err) => console.log(err));