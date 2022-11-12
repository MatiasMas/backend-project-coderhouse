import {knexSQLite} from './db.js';

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

await createMessagesTable();