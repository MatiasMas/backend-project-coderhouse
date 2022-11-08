import {isProductBodyValid, structureProduct} from "../utils/utils.js";
import dotenv from "dotenv";
import {CartsContainer} from "../services/CartsContainer.js";


dotenv.config();

const cartsContainer = new CartsContainer(process.env.FILENAME_CARTS);

export const getAllCarts = async (req, res) => {
    try {
        const allCarts = await cartsContainer.getAll();

        if (allCarts) {
            res.status(200).json({carts: allCarts});
        }
    } catch (err) {

    }
};

export const getCartById = (req, res) => {

};

export const addProductInCart = (req, res) => {

};

export const deleteProductInCartById = (req, res) => {

};

export const deleteCartById = (req, res) => {

};

export const createCart = (req, res) => {

};
