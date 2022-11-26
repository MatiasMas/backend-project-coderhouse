import mongoose from "mongoose";
import {AuthorSchema} from "./authors.model.js";

const MessagesSchema = new mongoose.Schema({
    author: AuthorSchema,
    message: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        default: undefined
    }
});

export const MessagesModel = mongoose.model("messages", MessagesSchema);