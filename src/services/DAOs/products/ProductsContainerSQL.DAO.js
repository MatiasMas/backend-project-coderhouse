import {ProductsBaseDAO} from "./ProductsBase.DAO.js";
import _knex from "knex";

let knexSQLite = null;

//TODO: Implement SQLite crud methods for products.

export class ProductsContainerSQLDAO extends ProductsBaseDAO {

    static init() {
        const optionsSQLite3 = {
            client: "better-sqlite3",
            connection: {
                filename: "./src/databases/ecommerce.sqlite",
            },
            useNullAsDefault: true
        };

        knexSQLite = _knex(optionsSQLite3);
    }
}

const createProductsTable = async () => {
    try {
        const exist = await knexSQLite.schema.hasTable('products');

        if (!exist) {
            await knexSQLite.schema.createTable('products', (tableBuilder) => {
                tableBuilder.increments('id').primary().notNullable(),
                    tableBuilder.string('name').notNullable(),
                    tableBuilder.float('price').notNullable(),
                    tableBuilder.string('category').notNullable(),
                    tableBuilder.string('img').notNullable(),
                    tableBuilder.string('colors'),
                    tableBuilder.integer('minimumStock').notNullable(),
                    tableBuilder.float('rating').notNullable(),
                    tableBuilder.integer('reviews').notNullable(),
                    tableBuilder.integer('stars').notNullable(),
                    tableBuilder.integer('stock').notNullable(),
                    tableBuilder.string('description').notNullable();
            });

            console.log('Table created!');
        }
    } catch (err) {
        console.log(err.message);
    } finally {
        await knexSQLite.destroy();
    }
};

const createMessagesTable = async () => {
    try {
        const exist = await knexSQLite.schema.hasTable('messages');

        if (!exist) {
            await knexSQLite.schema.createTable('messages', (tableBuilder) => {
                tableBuilder.increments('id').primary().notNullable(),
                    tableBuilder.string('email').notNullable(),
                    tableBuilder.string('message'),
                    tableBuilder.timestamp('date').notNullable()
            });

            console.log('Table created!');
        }
    } catch (e) {
        console.log(e.message);
    } finally {
        await knexSQLite.destroy();
    }
};

const createCartsTable = () => {

};