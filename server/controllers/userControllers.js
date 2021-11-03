const db = require("../db/db");

exports.authorize = async (req, res) => {
  const { email } = req.params;
  try {
    const userQuery = await db.query(
      `SELECT * FROM users WHERE email = '${email}'`
    );

    if (userQuery.rows.length)
      res.json({
        success: true,
        response: userQuery.rows[0]
      });
    else throw new Error("User does not Exist.");
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json({
      success: true,
      msg: "Retrieved Users Successfully",
      response: result.rows
    });
  } catch (error) {
    res.json({
      success: false,
      msg: "Failed to Retrieve users",
      response: error
    });
    throw error;
  }
};

exports.addUser = async (req, res) => {
  const { screen_name, email, profile_image } = req.body;

  // const client = await db.connect();

  try {
    // await client.query("BEGIN");

    const newUser = `
            INSERT INTO users (email, screen_name, profile_image, active)
            VALUES ('${email}', '${screen_name}', '${profile_image}', true )
            RETURNING *
            `;

    let result = await db.query(newUser);

    res.send({
      success: true,
      msg: "User Added Successfully",
      response: result.rows[0]
    });
    // await client.query("COMMIT");
  } catch (err) {
    // await client.query("ROLLBACK");
    throw err;
  }
};
