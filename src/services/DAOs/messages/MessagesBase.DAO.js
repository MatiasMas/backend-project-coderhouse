export class MessagesBaseDAO {
    maxId;
    messages;

    constructor() {
        this.maxId = 0;
        this.messages = [];
    }

    getAll() {
        throw new Error("Feature not implemented.");
    }

    save(message) {
        throw new Error("Feature not implemented.");
    }
}
