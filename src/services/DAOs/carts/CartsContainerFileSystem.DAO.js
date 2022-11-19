import fs from "fs";
import {CartsBaseDAO} from "./CartsBase.DAO.js";

export class CartsContainerFileSystemDAO extends CartsBaseDAO {
    fileName;

    constructor(fileName) {
        super();
        this.fileName = fileName;
    }

    async deleteAll() {
        this.carts = [];

        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify([]));
            this.maxId = 0;
        } catch (err) {
            throw new Error(err);
        }
    }

    async deleteById(id) {
        await this.getAll();
        const cart = await this.getById(id);

        const cartIndex = this.carts.indexOf(cart);

        if (cartIndex !== -1) {
            this.carts.splice(cartIndex, 1);
            await fs.promises.writeFile(this.fileName, JSON.stringify(this.carts));

            return cart;
        } else {
            throw new Error("The carts provided was not found in the container.");
        }


    }

    async getAll() {
        try {
            let cartsPromise = await fs.promises.readFile(this.fileName, "utf-8");
            this.carts = JSON.parse(cartsPromise);

            this.carts.map(cart => {
                if (cart.id && this.maxId < cart.id) {
                    this.maxId = cart.id;
                }
            });

            return this.carts;
        } catch (err) {
            throw new Error(err);
        }
    }

    async save(cart) {
        await this.getAll();

        this.maxId++;
        cart.id = this.maxId;
        this.carts.push(cart);

        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(this.carts));
            return cart;
        } catch (err) {
            throw new Error(err);
        }
    }

    async saveNewProductInCart(idCart, product) {
        await this.getAll();
        const cart = await this.getById(idCart);

        if (cart) {
            const cartIndex = this.carts.indexOf(cart);
            this.carts[cartIndex].products.push(product);

            try {
                await fs.promises.writeFile(this.fileName, JSON.stringify(this.carts));

                return await this.getById(idCart);
            } catch (err) {
                throw new Error(err);
            }
        }
    }

    async deleteProductInCart(idCart, idProduct) {
        await this.getAll();
        const cart = await this.getById(idCart);

        if (cart) {
            const cartIndex = this.carts.indexOf(cart);
            const product = this.carts[cartIndex].products.find(product => product.id === idProduct);
            const productIndex = this.carts[cartIndex].products.indexOf(product);
            this.carts[cartIndex].products.splice(productIndex, 1);

            try {
                await fs.promises.writeFile(this.fileName, JSON.stringify(this.carts));

                return await this.getById(idCart);
            } catch (err) {
                throw new Error(err);
            }
        }
    }

    async getById(id) {
        await this.getAll();
        const cart = this.carts.find(cart => cart.id === id);

        if (!cart) {
            throw new Error(`The cart with ID: ${id} does not exist in the container.`);
        }

        return cart;
    }

    async isProductInCart(cart, idProduct) {
        await this.getAll();

        for (const product of cart.products) {
            if (product.id === idProduct) {
                return true;
            }
        }

        return false;
    }
}