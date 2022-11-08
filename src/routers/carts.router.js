import express from "express";
import * as cartsController from "../controllers/carts.controller.js";

const cartsRouter = express.Router();

cartsRouter.get("/", cartsController.getAllCarts);
cartsRouter.post("/", cartsController.createCart);
cartsRouter.get("/:id/products", cartsController.getCartById);
cartsRouter.delete("/:id", cartsController.deleteCartById);
cartsRouter.delete("/:id/products/:productId", cartsController.deleteProductInCartById);
cartsRouter.post("/:id/products", cartsController.addProductInCart);

export default cartsRouter;