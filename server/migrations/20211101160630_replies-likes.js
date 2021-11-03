exports.up = knex => {
  return Promise.all([
    knex.schema.table("posts", table => {
      table.uuid("reply_post").defaultTo(null);
    }),
    knex.schema.createTable("likes", table => {
      table
        .bigIncrements("id")
        .primary()
        .notNullable();
      table.boolean("state").notNullable();
      table
        .uuid("post_id")
        .unsigned()
        .index()
        .references("id")
        .inTable("posts")
        .onDelete("CASCADE");
      table
        .uuid("user_id")
        .unsigned()
        .index()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
    })
  ]);
};

exports.down = knex => {
  return Promise.all([
    knex.schema.table("posts", table => table.dropColumn("reply_post")),
    knex.schema.dropTableIfExists("likes")
  ]);
};
