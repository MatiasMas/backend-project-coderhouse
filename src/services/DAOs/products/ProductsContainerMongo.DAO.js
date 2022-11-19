import {ProductsBaseDAO} from "./ProductsBase.DAO.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {ProductsModel} from "../../../models/products.model.js";

dotenv.config();

export class ProductsContainerMongoDAO extends ProductsBaseDAO {

    static init() {
        mongoose.connect(process.env.MONGODB_URI, (err) => {
            if (err) {
                console.log("Error: ", err);
            } else {
                console.log("Connected to mongo database.");
            }
        });
    }

    async save(product) {
        try {
            const query = await ProductsModel.findOne({}).sort({id: -1});

            if (query) {
                this.maxId = query.id;
            }

            this.maxId++;
            product.id = this.maxId;

            return await ProductsModel.create(product);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getById(id) {
        try {
            return await ProductsModel.findOne({id: id});
        } catch (err) {
            throw  new Error(err.message);
        }
    }

    async getAll() {
        try {
            return await ProductsModel.find({});
        } catch (err) {
            throw  new Error(err.message);
        }
    }

    async deleteById(id) {
        try {
            const product = await this.getById(id);

            if (product){
                await ProductsModel.deleteOne({id: id});
                return product;
            } else {
                throw new Error("There is no product with that id.");
            }
        } catch (err) {
            throw  new Error(err.message);
        }
    }

    async deleteAll() {
        try {
            return await ProductsModel.deleteMany({});
        } catch (err) {
            throw  new Error(err.message);
        }
    }

    async updateProductById(id, product) {
        try {
            await ProductsModel.updateOne({id: id}, product);

            return await this.getById(id);
        } catch (err) {
            throw  new Error(err.message);
        }
    }
}