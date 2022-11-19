import dotenv from "dotenv";
import {CartsContainerFirebaseDAO} from "./carts/CartsContainerFirebase.DAO.js";

dotenv.config();

const databaseSelected = process.argv[2];

let productsDAO = null;
let cartsDAO = null;
let messagesDAO = null;

switch (databaseSelected) {
    case "mongo":
        const {ProductsContainerMongoDAO} = await import("./products/ProductsContainerMongo.DAO.js");
        const {MessagesContainerMongoDAO} = await import("./messages/MessagesContainerMongo.DAO.js");
        const {CartsContainerMongoDAO} = await import("./carts/CartsContainerMongo.DAO.js");

        ProductsContainerMongoDAO.init();
        productsDAO = new ProductsContainerMongoDAO();
        messagesDAO = new MessagesContainerMongoDAO();
        cartsDAO = new CartsContainerMongoDAO();
        break;
    case "firebase":
        const {ProductsContainerFirebaseDAO} = await import("./products/ProductsContainerFirebase.DAO.js");
        const {MessagesContainerFirebaseDAO} = await import("./messages/MessagesContainerFirebase.DAO.js");
        const {CartsContainerFirebaseDAO} = await import("./carts/CartsContainerFirebase.DAO.js");

        ProductsContainerFirebaseDAO.init();
        productsDAO = new ProductsContainerFirebaseDAO();
        messagesDAO = new MessagesContainerFirebaseDAO();
        cartsDAO = new CartsContainerFirebaseDAO();
        break;
    case "sqlite":
        break;
    case "filesystem":
        const {ProductsContainerFileSystemDAO} = await import("./products/ProductsContainerFileSystem.DAO.js");
        const {MessagesContainerFileSystemDAO} = await import("./messages/MessagesContainerFileSystem.DAO.js");
        const {CartsContainerFileSystemDAO} = await import("./carts/CartsContainerFileSystem.DAO.js");

        productsDAO = new ProductsContainerFileSystemDAO(process.env.FILENAME_PRODUCTS);
        messagesDAO = new MessagesContainerFileSystemDAO(process.env.FILENAME_MESSAGES);
        cartsDAO = new CartsContainerFileSystemDAO(process.env.FILENAME_CARTS);
        break;
    default:
        throw new Error("No database specified, please send the 2nd argument with the database system to use.");
}

export {productsDAO, cartsDAO, messagesDAO};