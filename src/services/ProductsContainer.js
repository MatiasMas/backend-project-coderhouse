import fs from "fs";

export class ProductsContainer {
    fileName;
    maxId;
    products;

    constructor(fileName) {
        this.fileName = fileName;
        this.maxId = 0;
        this.products = [];
    }

    async save(product) {
        await this.getAll();

        this.maxId++;
        product.id = this.maxId;
        this.products.push(product);

        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(this.products));
            return product;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getById(id) {
        await this.getAll();
        const product = this.products.find(product => product.id === id);

        if (!product) {
            throw new Error(`The product with Id: ${id} does not exist in the container.`);
        }

        return product;
    }

    async getAll() {
        try {
            let productsPromise = await fs.promises.readFile(this.fileName, "utf-8");
            this.products = JSON.parse(productsPromise);

            this.products.map((product) => {
                if (product.id && this.maxId < product.id) {
                    this.maxId = product.id;
                }
            });

            return this.products;
        } catch (err) {
            throw new Error(err);
        }
    }

    async deleteById(id) {
        await this.getAll();
        const product = await this.getById(id);

        const productIndex = this.products.indexOf(product);

        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);

            await fs.promises.writeFile(this.fileName, JSON.stringify(this.products));

            return product;
        } else {
            throw new Error("The product provided was not found in the container.");
        }
    }

    async deleteAll() {
        this.products = [];
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify([]));
            this.maxId = 0;
        } catch (err) {
            throw new Error(err);
        }
    }

    async updateProductById(id, product) {
        const productToUpdate = await this.getById(id);

        if (productToUpdate) {
            const index = this.products.indexOf(productToUpdate);

            this.products[index].name = product.name;
            this.products[index].price = product.price;
            this.products[index].category = product.category;
            this.products[index].img = product.img;
            this.products[index].colors = product.colors;
            this.products[index].minimumStock = product.minimumStock;
            this.products[index].rating = product.rating;
            this.products[index].reviews = product.reviews;
            this.products[index].stars = product.stars;
            this.products[index].stock = product.stock;
            this.products[index].description = product.description;

            await fs.promises.writeFile(this.fileName, JSON.stringify(this.products));

            return await this.getById(id);
        }
    }
}