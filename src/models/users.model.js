import * as mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export const UsersModel = mongoose.model("users", UsersSchema);