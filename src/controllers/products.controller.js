import {ProductsContainer} from "../containers/ProductsContainer.js";

const productsContainer = new ProductsContainer("src/products.txt");

export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await productsContainer.getAll();

        if (allProducts) {
            res.status(200).render("index.pug", {products: allProducts});
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
};

export const getProductById = async (req, res) => {
    try {
        const {id} = req.params;

        if (!isNaN(id)) {
            const productRetrieved = await productsContainer.getById(Number(id));

            if (productRetrieved) {
                res.status(200).json({product: productRetrieved});
            } else {
                res.status(404).json({error: "There is no product with that ID."});
            }
        } else {
            res.status(400).json({error: "The ID is not a number, bad request."});
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
};

export const createProduct = async (req, res) => {
    try {
        const {body} = req;

        if (body.title && body.price && body.thumbnail) {
            const product = {
                title: body.title,
                price: Number(body.price),
                thumbnail: body.thumbnail
            };

            const newProduct = await productsContainer.save(product);

            if (newProduct) {
                res.status(201);
            }
        } else {
            res.status(400).json({error: "The information sent is not correct, please check you are sending just title, price and thumbnail."});
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
};

export const updateProductById = async (req, res) => {
    try {
        const {id} = req.params;
        const {body} = req;

        if (body.title && body.price && body.thumbnail) {
            const product = {
                title: body.title,
                price: Number(body.price),
                thumbnail: body.thumbnail
            };

            if (!isNaN(id)) {
                const updatedProduct = await productsContainer.updateProductById(Number(id), product);

                if (updatedProduct) {
                    res.status(200).json({product: updatedProduct});
                }
            } else {
                res.status(400).json({error: "The ID is not a number, bad request."});
            }
        } else {
            res.status(400).json({error: "The information sent is not correct, please check you are sending just title, price and thumbnail."});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export const deleteProductById = async (req, res) => {
    try {
        const {id} = req.params;

        if (!isNaN(id)) {
            const deletedProduct = await productsContainer.deleteById(Number(id));

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
