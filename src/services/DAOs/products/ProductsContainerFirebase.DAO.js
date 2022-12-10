import admin from "firebase-admin";
import serviceAccount from "../../../databases/backend-project-coderhouse-firebase-adminsdk-fmns0-f3015c9a4f.json" assert {type: "json"};
import {getFirestore} from "firebase-admin/firestore";
import {ProductsBaseDAO} from "./ProductsBase.DAO.js";


export class ProductsContainerFirebaseDAO extends ProductsBaseDAO {
    db;
    productsCollection;

    constructor() {
        super();
        this.db = getFirestore();
        this.productsCollection = this.db.collection("products");
    }

    static init() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }

    async save(product) {
        try {
            const queryDocumentSnapshot = await this.productsCollection.orderBy("id", "desc").limit(1).get();

            if (queryDocumentSnapshot.docs.length === 0) {
                this.maxId = 0;
            } else {
                this.maxId = queryDocumentSnapshot.docs[0].data().id;
            }

            this.maxId++;
            product.id = this.maxId;

            await this.productsCollection.doc(`${product.id}`).set(product);

            return await this.getById(product.id);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getById(id) {
        try {
            const doc = await this.productsCollection.doc(`${id}`).get();

            return doc.data();
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getAll() {
        try {
            const queryDocumentSnapshot = await this.productsCollection.get();

            this.products = queryDocumentSnapshot.docs.map(doc => doc.data());

            return this.products;
        } catch (err) {
            throw new Error(err.message);
        }
    }


    async deleteById(id) {
        try {
            const product = await this.getById(id);
            await this.productsCollection.doc(`${id}`).delete();

            return product;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async deleteAll() {
        try {
            const queryDocumentSnapshot = await this.productsCollection.get();

            queryDocumentSnapshot.docs.map(doc => doc.delete());

            return "All the documents in the collection has been deleted.";
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async updateProductById(id, product) {
        try {
            const doc = await this.productsCollection.doc(`${id}`);
            await doc.update(product);

            return await this.getById(id);
        } catch (err) {
            throw new Error(err.message);
        }
    }
}