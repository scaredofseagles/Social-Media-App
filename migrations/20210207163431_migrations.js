
exports.up = function(knex) {
    return Promise.all([
        knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'),
        knex.schema.createTable('users', table =>{
            table.uuid('id').primary().notNullable().defaultTo(knex.raw('uuid_generate_v4()'))
            table.string('screen_name', 30).notNullable()
            table.string('email', 30).unique().notNullable()
            table.string('profile_image', 255).notNullable()
            table.boolean('active').notNullable()
            table.timestamp('created_at').defaultTo(knex.fn.now());
            //TODO: will need to update the timestamp manually
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        }),
        knex.schema.createTable('tweets', table => {
            table.uuid('id').primary().notNullable().defaultTo(knex.raw('uuid_generate_v4()'))
            table.uuid('user_id').unsigned().index().references('id').inTable('users').onDelete('CASCADE')
            table.text('tweet', 250).notNullable()
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
    ])
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTableIfExists('users'),
        knex.schema.dropTableIfExists('tweets')
    ])
};
