import {MessagesBaseDAO} from "./MessagesBase.DAO.js";
import {MessagesModel} from "../../../models/messages.model.js";

export class MessagesContainerMongoDAO extends MessagesBaseDAO {

    async getAll() {
        try {
            return await MessagesModel.find({});
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async save(message) {
        try {
            const query = await MessagesModel.findOne({}).sort({id: -1});

            if (query) {
                this.maxId = query.id;
            }

            this.maxId++;
            message.id = this.maxId;

            return await MessagesModel.create(message);
        } catch (err) {
            throw new Error(err.message);
        }
    }
}