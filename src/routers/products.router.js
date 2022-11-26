import express from "express";
import * as productsController from "../controllers/products.controller.js";

const productsRouter = express.Router();

productsRouter.get("/", productsController.getAllProducts);
productsRouter.get("/faker", productsController.randomProducts);
productsRouter.get("/:id", productsController.getProductById);
productsRouter.post("/", productsController.createProduct);
productsRouter.put("/:id", productsController.updateProductById);
productsRouter.delete("/:id", productsController.deleteProductById);

export default productsRouter;