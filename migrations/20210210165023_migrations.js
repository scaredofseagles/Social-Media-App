
exports.up = function(knex) {
    return knex.schema.table('tweets', table => {
        table.specificType('tags', 'character varying(20)[]')
    })
};

exports.down = function(knex) {
    return knex.schema.table('tweets', table => table.dropColumn('tags'))
};
