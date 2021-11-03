const router = require("express").Router();
const userControllers = require("../controllers/userControllers");
const { check4Duplicates } = require("../middleware");

router.route("/authorize/:email").get(userControllers.authorize);

router
  .route("/", check4Duplicates)
  .get(userControllers.getUsers)
  .post(userControllers.addUser);

module.exports = router;
