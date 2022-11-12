import dotenv from "dotenv";
import {isMessageBodyValid, isProductBodyValid, structureMessage, structureProduct} from "../utils/utils.js";
import {MessagesContainerSQLite3} from "../services/MessagesContainerSQLite3.js";
import {ProductsContainerMySQL} from "../services/ProductsContainerMySQL.js";

dotenv.config();
const messagesContainer = new MessagesContainerSQLite3();
const productsContainer = new ProductsContainerMySQL();

export class MessagesSocket {
    io;

    constructor(ioServer) {
        this.io = ioServer;
    }

    establishConnectionWithClientAndSendInformation() {
        this.io.on("connection", async (socket) => {
            console.log("User connected...");

            const productsContainer = new ProductsContainerMySQL();
            const messagesContainer = new MessagesContainerSQLite3();
            const productsOnSystem = await productsContainer.getAll();
            const messagesOnSystem = await messagesContainer.getAll();

            socket.on("getProducts", () => this.io.sockets.emit("savedProducts", productsOnSystem));
            socket.on("getMessages", () => this.io.sockets.emit("savedMessages", messagesOnSystem));

            socket.on("addMessage", async (data) => {
                await this.createMessage(data);
                this.io.sockets.emit("savedMessages", await messagesContainer.getAll());
            });

            socket.on("addProduct", async (data) => {
                await this.createProduct(data);
            });
        });
    };

    async createMessage(data) {
        try {
            if (isMessageBodyValid(data)) {
                const message = structureMessage(data);
                await messagesContainer.save(message);
            }
        } catch (err) {
            throw Error("It was not possible to create the new message.");
        }
    };

    async createProduct(data) {
        try {
            if (isProductBodyValid(data)) {
                const product = structureProduct(data);
                await productsContainer.save(product);
            }
        } catch (err) {
            throw Error("It was not possible to create the new product.");
        }
    }
}