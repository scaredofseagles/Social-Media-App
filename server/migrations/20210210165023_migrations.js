exports.up = function(knex) {
  return knex.schema.table("posts", table => {
    table.specificType("tags", "character varying(20)[]");
  });
};

exports.down = function(knex) {
  return knex.schema.table("posts", table => table.dropColumn("tags"));
};
