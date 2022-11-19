import mongoose from "mongoose";

const MessagesSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
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