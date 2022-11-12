import {knexMySQL} from "../DB/db.js";

export class ProductsContainerMySQL {
    products;

    constructor() {
        this.products = [];
    }

    async save(product) {
        try {
            return await knexMySQL.from("products").insert(product);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getById(id) {
        try {
            return await knexMySQL.select("*").from("products").where({id: id});
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getAll() {
        try {
            this.products = await knexMySQL.select("*").from("products");

            return this.products;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async deleteById(id) {
        const product = this.getById(id);

        try {
            await knexMySQL.del().from("products").where({id: id});

            return product;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async deleteAll() {
        try {
            await knexMySQL.del().from("products");
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async updateProductById(id, product) {
        try {
            return await knexMySQL.update(product).from("products").where({id: id});
        } catch (err) {
            throw new Error(err.message);
        }
    }
}