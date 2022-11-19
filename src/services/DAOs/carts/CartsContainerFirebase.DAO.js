import {CartsBaseDAO} from "./CartsBase.DAO.js";
import {getFirestore} from "firebase-admin/firestore";

export class CartsContainerFirebaseDAO extends CartsBaseDAO {
    db;
    cartsCollection;

    constructor() {
        super();
        this.db = getFirestore();
        this.cartsCollection = this.db.collection("carts");
    }

    async deleteAll() {
        try {
            const queryDocumentSnapshot = await this.cartsCollection.get();

            queryDocumentSnapshot.docs.map(doc => doc.delete());

            return "All the documents in the collection has been deleted";
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async deleteById(id) {
        try {
            const cart = await this.getById(id);
            await this.cartsCollection.doc(`${id}`).delete();

            return cart;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getAll() {
        try {
            const queryDocumentSnapshot = await this.cartsCollection.get();

            this.carts = queryDocumentSnapshot.docs.map(doc => doc.data());

            return this.carts;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async save(cart) {
        try {
            const queryDocumentSnapshot = await this.cartsCollection.orderBy("id", "desc").limit(1).get();

            if (queryDocumentSnapshot.docs.length === 0) {
                this.maxId = 0;
            } else {
                this.maxId = queryDocumentSnapshot.docs[0].data().id;
            }

            this.maxId++;
            cart.id = this.maxId;

            await this.cartsCollection.doc(`${cart.id}`).set(cart);

            return await this.getById(cart.id);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async saveNewProductInCart(idCart, product) {
        try {
            const docRef = await this.cartsCollection.doc(`${idCart}`);
            const cart = await this.getById(idCart);
            cart.products.push(product);

            await docRef.update(cart);

            return await this.getById(idCart);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async deleteProductInCart(idCart, idProduct) {
        try {
            const docRef = await this.cartsCollection.doc(`${idCart}`);
            const cart = await this.getById(idCart);
            const product = cart.products.find(product => product.id === idProduct);
            const productIndex = cart.products.indexOf(product);
            cart.products.splice(productIndex, 1);

            await docRef.update(cart);

            return await this.getById(idCart);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getById(id) {
        try {
            const doc = await this.cartsCollection.doc(`${id}`).get();

            return doc.data();
        } catch (err) {
            throw new Error(err.message);
        }
    }

    isProductInCart(cart, idProduct) {
        for (const product of cart.products) {
            if (product.id === idProduct) {
                return true;
            }
        }

        return false;
    }
}