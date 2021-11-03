const router = require("express").Router();
const userControllers = require("../controllers/userControllers");
const { check4Duplicates } = require("../middleware");

router.route("/authorize/:email").get(userControllers.authorize);

router
  .router("/")
  .get(userControllers.getUsers)
  .post(check4Duplicates, userControllers.addUser);

module.exports = router;
