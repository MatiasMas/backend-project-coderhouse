import fs from "fs";

export class CartsContainer {
    fileName;
    maxId;
    carts;

    constructor(fileName) {
        this.fileName = fileName;
        this.maxId = 0;
        this.carts = [];
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
            throw new Error("The cart provided was not found in the container.");
        }


    }

    async deleteProductInCart(idCart, idProduct) {
        const cart = this.getById(idCart);

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
        const cart = this.getById(idCart);

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

    async getById(id) {
        await this.getAll();
        const cart = this.carts.find(cart => cart.id === id);

        if (!cart) {
            throw new Error(`The cart with ID: ${id} does not exist in the container.`);
        }

        return cart;
    }
}