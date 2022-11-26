import mongoose from "mongoose";

export const AuthorSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    alias: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
});