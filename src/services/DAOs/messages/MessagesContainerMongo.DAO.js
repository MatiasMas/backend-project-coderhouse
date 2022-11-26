import {MessagesBaseDAO} from "./MessagesBase.DAO.js";
import {MessagesModel} from "../../../models/messages.model.js";
import {normalize} from "normalizr";
import {chatSchema} from "../../../normalizr.schemas/chat.schema.js";

export class MessagesContainerMongoDAO extends MessagesBaseDAO {

    async getAll() {
        try {
            this.messages = await MessagesModel.find({}).lean();

            return this.messages;
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

    async getNormalized(){
        const messages = await this.getAll();

        return normalize({id: "chatHistory", messages: messages}, chatSchema)
    }
}