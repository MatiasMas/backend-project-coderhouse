import {CartsBaseDAO} from "./CartsBase.DAO.js";
import {CartsModel} from "../../../models/carts.model.js";

export class CartsContainerMongoDAO extends CartsBaseDAO {

    async deleteAll() {
        try {
            return await CartsModel.deleteMany({});
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async deleteById(id) {
        try {
            const cart = await this.getById(id);

            if (cart) {
                await CartsModel.deleteOne({id: id});
                return cart;
            } else {
                throw new Error("There is no cart with that id.");
            }
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getAll() {
        try {
            return await CartsModel.find({});
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async save(cart) {
        try {
            const query = await CartsModel.findOne({}).sort({id: -1});

            if (query) {
                this.maxId = query.id;
            }

            this.maxId++;
            cart.id = this.maxId;

            return await CartsModel.create(cart);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async saveNewProductInCart(idCart, product) {
        try {
            const cart = await this.getById(idCart);
            cart.products.push(product);

            await CartsModel.updateOne({id: idCart}, cart);

            return await this.getById(idCart);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async deleteProductInCart(idCart, idProduct) {
        try {
            const cart = await this.getById(idCart);
            const product = cart.products.find(product => product.id === idProduct);
            const productIndex = cart.products.indexOf(product);
            cart.products.splice(productIndex, 1);

            await CartsModel.updateOne({id: idCart}, cart);

            return await this.getById(idCart);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getById(id) {
        try {
            return await CartsModel.findOne({id: id});
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