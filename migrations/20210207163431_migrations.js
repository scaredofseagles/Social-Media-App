
exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('users', table =>{
            table.uuid('id').primary().notNullable().defaultTo(knex.raw('uuid_generate_v4()'))
            table.string('screen_name', 30).notNullable()
            table.unique('email', 30).notNullable()
            table.string('profile_image', 255).notNullable()
            table.boolean('active').notNullable()
            table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now())
            table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now()).onUpdate(knex.fn.now())
        }),
        knex.schema.createTable('tweets', table => {
            table.uuid('id').primary().notNullable().defaultTo(knex.raw('uuid_generate_v4()'))
            table.uuid('user_id').unsigned().index().references('id').inTable('users').onDelete('CASCADE')
            table.text('tweet', 250).notNullable()
            table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now())
        })
    ])
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTableIfExists('users'),
        knex.schema.dropTableIfExists('tweets')
    ])
};
