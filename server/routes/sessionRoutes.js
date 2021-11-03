const router = require("express").Router();
const sessionControllers = require("../controllers/sessionControllers");

router
  .route("/")
  .get(sessionControllers.getCurrentSession)
  .post(sessionControllers.addSession);

router
  .route("/:id")
  .get(sessionControllers.checkSession)
  .delete(sessionControllers.removeSession);

module.exports = router;
