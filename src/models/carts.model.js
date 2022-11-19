import mongoose from "mongoose";
import {ProductsSchema} from "./products.model.js";

const CartsSchema = new mongoose.Schema({
    timestamp: {
        type: String,
        required: true
    },
    products: {
        type: [ProductsSchema],
        required: true
    },
    id: {
        type: Number,
        required: true,
        default: undefined
    }
});

export const CartsModel = mongoose.model("carts", CartsSchema);