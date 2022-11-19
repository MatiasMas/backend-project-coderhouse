import {isMessageBodyValid, isProductBodyValid, structureMessage, structureProduct} from "../utils/utils.js";
import {messagesDAO, productsDAO} from "../services/DAOs/factory.js";

export class MessagesSocket {
    io;

    constructor(ioServer) {
        this.io = ioServer;
    }

    establishConnectionWithClientAndSendInformation() {
        this.io.on("connection", async (socket) => {
            console.log("User connected...");

            const productsOnSystem = await productsDAO.getAll();
            const messagesOnSystem = await messagesDAO.getAll();

            socket.on("getProducts", () => this.io.sockets.emit("savedProducts", productsOnSystem));
            socket.on("getMessages", () => this.io.sockets.emit("savedMessages", messagesOnSystem));

            socket.on("addMessage", async (data) => {
                await this.createMessage(data);
                this.io.sockets.emit("savedMessages", await messagesDAO.getAll());
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
                await messagesDAO.save(message);
            }
        } catch (err) {
            throw Error("It was not possible to create the new messages.");
        }
    };

    async createProduct(data) {
        try {
            if (isProductBodyValid(data)) {
                const product = structureProduct(data);
                await productsDAO.save(product);
            }
        } catch (err) {
            throw Error("It was not possible to create the new products.");
        }
    }
}