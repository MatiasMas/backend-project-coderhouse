import {structureUser} from "../utils/utils.js";
import {UsersModel} from "../models/users.model.js";

export const registerUser = (req, res) => {
    UsersModel.findOne({username: req.body.username}, async (err, doc) => {
        if (err) throw err;

        if (doc) res.status(404).send("The user already exist.");

        if (!doc) {
            await UsersModel.create(structureUser(req.body.username, req.body.password));
            res.status(201).send("The user has been created.");
        }
    });
};