import express from "express";
import * as cartsController from "../controllers/carts.controller.js";
import {isLoggedIn} from "../middlewares/logged.middleware";

const cartsRouter = express.Router();

cartsRouter.get("/", isLoggedIn, cartsController.getAllCarts);
cartsRouter.post("/", isLoggedIn, cartsController.createCart);
cartsRouter.get("/:id/products", isLoggedIn, cartsController.getCartById);
cartsRouter.delete("/:id", isLoggedIn, cartsController.deleteCartById);
cartsRouter.delete("/:id/products/:productId", isLoggedIn, cartsController.deleteProductInCartById);
cartsRouter.post("/:id/products", isLoggedIn, cartsController.addProductInCart);

export default cartsRouter;