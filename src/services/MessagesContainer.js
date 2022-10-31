import fs from "fs";

export class MessagesContainer {
    fileName;
    maxId;
    messages;

    constructor(fileName) {
        this.fileName = fileName;
        this.maxId = 0;
        this.messages = [];
    }

    async getAll() {
        try {
            let messagesPromise = await fs.promises.readFile(this.fileName, "utf-8");
            this.messages = JSON.parse(messagesPromise);

            this.messages.map((message) => {
                if (message.id && this.maxId < message.id) {
                    this.maxId = message.id;
                }
            });

            return this.messages;
        } catch (err) {
            throw new Error(err);
        }
    }

    async save(message) {
        await this.getAll();

        this.maxId++;
        message.id = this.maxId;
        this.messages.push(message);

        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(this.messages));
            return message;
        } catch (err) {
            throw new Error(err);
        }
    }
}