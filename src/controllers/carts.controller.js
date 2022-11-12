import {isCartBodyValid, isProductBodyValid, structureCart, structureProduct} from "../utils/utils.js";
import dotenv from "dotenv";
import {CartsContainer} from "../services/CartsContainer.js";
import {ProductsContainer} from "../services/ProductsContainer.js";


dotenv.config();

const cartsContainer = new CartsContainer(process.env.FILENAME_CARTS);
const productsContainer = new ProductsContainer(process.env.FILENAME_PRODUCTS);

export const getAllCarts = async (req, res) => {
    try {
        const allCarts = await cartsContainer.getAll();

        if (allCarts) {
            res.status(200).json({carts: allCarts});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export const getCartById = async (req, res) => {
    try {
        const {id} = req.params;

        if (!isNaN(id)) {
            const cartRetrieved = await cartsContainer.getById(Number(id));

            if (cartRetrieved) {
                res.status(200).json({cart: cartRetrieved});
            } else {
                res.status(404).json({error: "There is no cart with that ID."});
            }
        } else {
            res.status(400).json({error: "The ID is not a number, bad request."});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export const addProductInCart = async (req, res) => {
    try {
        const {id} = req.params;
        const {body} = req;

        if (!isNaN(id)) {

            if (!isNaN(body.productToAdd)) {
                const cartRetrieved = await cartsContainer.getById(Number(id));

                if (cartRetrieved) {

                    if (!await cartsContainer.isProductInCart(cartRetrieved, Number(body.productToAdd))) {
                        const product = await productsContainer.getById(Number(body.productToAdd));

                        const cartUpdated = await cartsContainer.saveNewProductInCart(cartRetrieved.id, product);

                        if (cartUpdated) {
                            res.status(200).json({cartUpdated: cartUpdated});
                        }
                    } else {
                        res.status(400).json({error: "There is a product with that id inside the cart already."});
                    }
                } else {
                    res.status(404).json({error: "There is no cart with that ID."});
                }
            } else {
                res.status(400).json({error: "The information is not correct, you must send the product ID number to be added."});
            }
        } else {
            res.status(400).json({error: "The ID is not a number, bad request."});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export const deleteProductInCartById = async (req, res) => {
    try {
        const {id, productId} = req.params;

        if (!isNaN(id)) {

            if (!isNaN(productId)) {
                const cartRetrieved = await cartsContainer.getById(Number(id));

                if (cartRetrieved) {

                    if (await cartsContainer.isProductInCart(cartRetrieved, Number(productId))) {
                        const cartUpdated = await cartsContainer.deleteProductInCart(cartRetrieved.id, Number(productId));

                        if (cartUpdated) {
                            res.status(200).json({cartUpdated: cartUpdated});
                        }
                    } else {
                        res.status(400).json({error: "There is no product with that id inside the cart."});
                    }
                } else {
                    res.status(404).json({error: "There is no cart with that ID."});
                }
            } else {
                res.status(400).json({error: "The information is not correct, you must send the product ID number to be deleted."});
            }
        } else {
            res.status(400).json({error: "The cart ID is not a number, bad request."});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export const deleteCartById = async (req, res) => {
    try {
        const {id} = req.params;

        if (!isNaN(id)) {
            const deletedCart = await cartsContainer.deleteById(Number(id));

            if (deletedCart) {
                res.status(200).json({cartDeleted: deletedCart});
            }
        } else {
            res.status(400).json({error: "The ID is not a number, bad request."});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export const createCart = async (req, res) => {
    try {
        const {body} = req;

        if (isCartBodyValid(body)) {
            const cart = await structureCart(body, productsContainer);

            const newCart = await cartsContainer.save(cart);

            if (newCart) {
                res.status(201).json({cart: newCart});
            }
        } else {
            res.status(400).json({error: "The information sent is not correct, please check you are sending the right information."});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};
