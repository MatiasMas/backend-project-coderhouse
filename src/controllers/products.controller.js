import {isProductBodyValid, structureProduct} from "../utils/utils.js";
import {productsDAO} from "../services/DAOs/factory.js";

export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await productsDAO.getAll();

        if (allProducts) {
            res.status(200).json({products: allProducts});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export const getProductById = async (req, res) => {
    try {
        const {id} = req.params;

        if (!isNaN(id)) {
            const productRetrieved = await productsDAO.getById(Number(id));

            if (productRetrieved) {
                res.status(200).json({product: productRetrieved});
            } else {
                res.status(404).json({error: "There is no products with that ID."});
            }
        } else {
            res.status(400).json({error: "The ID is not a number, bad request."});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export const createProduct = async (req, res) => {
    try {
        const {body} = req;

        if (isProductBodyValid(body)) {
            const product = structureProduct(body);

            const newProduct = await productsDAO.save(product);

            if (newProduct) {
                res.status(201).json({product: newProduct});
            }
        } else {
            res.status(400).json({error: "The information sent is not correct, please check you are sending the right information."});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export const updateProductById = async (req, res) => {
    try {
        const {id} = req.params;
        const {body} = req;

        if (isProductBodyValid(body)) {
            const product = structureProduct(body);

            if (!isNaN(id)) {
                const updatedProduct = await productsDAO.updateProductById(Number(id), product);

                if (updatedProduct) {
                    res.status(200).json({product: updatedProduct});
                }
            } else {
                res.status(400).json({error: "The ID is not a number, bad request."});
            }
        } else {
            res.status(400).json({error: "The information sent is not correct, please check you are sending the right information."});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export const deleteProductById = async (req, res) => {
    try {
        const {id} = req.params;

        if (!isNaN(id)) {
            const deletedProduct = await productsDAO.deleteById(Number(id));

            if (deletedProduct) {
                res.status(200).json({productDeleted: deletedProduct});
            }
        } else {
            res.status(400).json({error: "The ID is not a number, bad request."});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};
