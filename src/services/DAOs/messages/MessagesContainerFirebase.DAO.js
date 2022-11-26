import {MessagesBaseDAO} from "./MessagesBase.DAO.js";
import {getFirestore} from "firebase-admin/firestore";
import {normalize} from "normalizr";
import {chatSchema} from "../../../normalizr.schemas/chat.schema.js";

export class MessagesContainerFirebaseDAO extends MessagesBaseDAO {
    db;
    messagesCollection;

    constructor() {
        super();
        this.db = getFirestore();
        this.messagesCollection = this.db.collection("messages");
    }


    async getAll() {
        try {
            const queryDocumentSnapshot = await this.messagesCollection.get();

            this.messages = queryDocumentSnapshot.docs.map(doc => doc.data());

            return this.messages;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async save(message) {
        try {
            const queryDocumentSnapshot = await this.messagesCollection.orderBy("id", "desc").limit(1).get();

            if (queryDocumentSnapshot.docs.length === 0) {
                this.maxId = 0;
            } else {
                this.maxId = queryDocumentSnapshot.docs[0].data().id;
            }

            this.maxId++;
            message.id = this.maxId;

            await this.messagesCollection.doc(`${message.id}`).set(message);

            return message;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getNormalized(){
        const messages = await this.getAll();

        return normalize({id: "chatHistory", messages: messages}, chatSchema)
    }
}