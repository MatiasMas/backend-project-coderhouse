import {knexSQLite} from "../DB/db.js";

export class MessagesContainerSQLite3 {
    messages;

    constructor() {
        this.messages = [];
    }

    async getAll() {
        try {
            this.messages = await knexSQLite.select("*").from("messages");

            return this.messages;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async save(message) {
        try {
            await knexSQLite.from("messages").insert(message);
        } catch (err) {
            throw new Error(err.message);
        }
    }
}