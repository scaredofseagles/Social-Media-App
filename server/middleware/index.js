const db = require("../db/db");

const check4Duplicates = async (req, res, next) => {
  const { screen_name, email } = req.body;

  const newQuery = await db.query(
    `SELECT * FROM users WHERE screen_name = '${screen_name}' OR email = '${email}'`
  );

  if (newQuery.rows.length === 0) next();
  else return res.send({ success: false, msg: "User already exists" });
};

module.exports = { check4Duplicates };
