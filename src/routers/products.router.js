import express from "express";
import * as productsController from "../controllers/products.controller.js";
import {isLoggedIn} from "../middlewares/logged.middleware.js";

const productsRouter = express.Router();

productsRouter.get("/", isLoggedIn, productsController.getAllProducts);
productsRouter.get("/faker", isLoggedIn, productsController.randomProducts);
productsRouter.get("/:id", isLoggedIn, productsController.getProductById);
productsRouter.post("/", isLoggedIn, productsController.createProduct);
productsRouter.put("/:id", isLoggedIn, productsController.updateProductById);
productsRouter.delete("/:id", isLoggedIn, productsController.deleteProductById);

export default productsRouter;