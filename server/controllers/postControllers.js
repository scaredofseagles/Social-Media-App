const db = require("../db/db");

exports.getPosts = async (req, res) => {
  try {
    const result = await pool.query(`
            SELECT user_id, screen_name, profile_image, posts.created_at, post, tags
            FROM posts
                LEFT JOIN users ON user_id = users.id
            WHERE active = true
            ORDER BY posts.created_at DESC
        `);
    res.json({
      success: true,
      msg: "Retrieved Posts Successfully",
      response: result.rows
    });
  } catch (error) {
    res.json({
      success: false,
      msg: "Failed to Retrieve Posts",
      response: error
    });
    throw error;
  }
};

exports.getUserPosts = async (req, res) => {
  const user_id = req.params.userid;

  let result = await pool.query(
    `SELECT * FROM posts WHERE user_id = ${user_id} ORDER BY created_at DESC`
  );
  res.json(result);
};

exports.addPost = async (req, res) => {
  const { user_id, post, tags } = req.body;

  (async () => {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const newPost = `
                INSERT INTO posts (user_id, post, tags) VALUES ('${user_id}', '${post}',
                ARRAY[${tags.map(item => `'${item.trim()}'`)}])
            `;
      await client.query(newPost);

      res.json({ success: true, msg: "Post Added Successfully" });
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      res.json({
        success: false,
        msg: "Failed to Add Post",
        response: error
      });
      throw error;
    } finally {
      client.release();
    }
  })().catch(error => console.error(error.stack));
};

exports.getTags = async (req, res) => {
  const tag = req.params.tag;

  let result = await pool.query(`SELECT * FROM posts WHERE tags = ${tag}`);
  res.json(result);
};
