import {isCartBodyValid, structureCart} from "../utils/utils.js";
import {cartsDAO, productsDAO} from "../services/DAOs/factory.js";

export const getAllCarts = async (req, res) => {
    try {
        const allCarts = await cartsDAO.getAll();

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
            const cartRetrieved = await cartsDAO.getById(Number(id));

            if (cartRetrieved) {
                res.status(200).json({cart: cartRetrieved});
            } else {
                res.status(404).json({error: "There is no carts with that ID."});
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
                const cartRetrieved = await cartsDAO.getById(Number(id));

                if (cartRetrieved) {

                    if (!await cartsDAO.isProductInCart(cartRetrieved, Number(body.productToAdd))) {
                        const product = await productsDAO.getById(Number(body.productToAdd));

                        const cartUpdated = await cartsDAO.saveNewProductInCart(cartRetrieved.id, product);

                        if (cartUpdated) {
                            res.status(200).json({cartUpdated: cartUpdated});
                        }
                    } else {
                        res.status(400).json({error: "There is a products with that id inside the carts already."});
                    }
                } else {
                    res.status(404).json({error: "There is no carts with that ID."});
                }
            } else {
                res.status(400).json({error: "The information is not correct, you must send the products ID number to be added."});
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
                const cartRetrieved = await cartsDAO.getById(Number(id));

                if (cartRetrieved) {

                    if (await cartsDAO.isProductInCart(cartRetrieved, Number(productId))) {
                        const cartUpdated = await cartsDAO.deleteProductInCart(cartRetrieved.id, Number(productId));

                        if (cartUpdated) {
                            res.status(200).json({cartUpdated: cartUpdated});
                        }
                    } else {
                        res.status(400).json({error: "There is no products with that id inside the carts."});
                    }
                } else {
                    res.status(404).json({error: "There is no carts with that ID."});
                }
            } else {
                res.status(400).json({error: "The information is not correct, you must send the products ID number to be deleted."});
            }
        } else {
            res.status(400).json({error: "The carts ID is not a number, bad request."});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export const deleteCartById = async (req, res) => {
    try {
        const {id} = req.params;

        if (!isNaN(id)) {
            const deletedCart = await cartsDAO.deleteById(Number(id));

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
            const cart = await structureCart(body, productsDAO);

            const newCart = await cartsDAO.save(cart);

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
