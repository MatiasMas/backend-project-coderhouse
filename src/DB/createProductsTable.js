import {knexMySQL} from './db.js';

const createProductsTable = async () => {
    try {
        const exist = await knexMySQL.schema.hasTable('products');

        if (!exist) {
            await knexMySQL.schema.createTable('products', (tableBuilder) => {
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
                tableBuilder.string('description').notNullable()
            });

            console.log('Table created!');
        }
    } catch (e) {
        console.log(e.message);
    } finally {
        await knexMySQL.destroy();
    }
};

await createProductsTable();