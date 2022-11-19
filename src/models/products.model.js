import mongoose from "mongoose";

export const ProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true,
    },
    colors: {
        type: [String],
        required: false,
        default: ["blue", "red", "green"]
    },
    minimumStock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    reviews: {
        type: Number,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        default: undefined
    }
});

export const ProductsModel = mongoose.model("products", ProductsSchema);