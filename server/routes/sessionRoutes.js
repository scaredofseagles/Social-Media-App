const router = require("express").Router();
const sessionControllers = require("../controllers/sessionControllers");

router.route("/").post(sessionControllers.addSession);

router
  .route("/:id")
  .get(sessionControllers.checkSession)
  .put(sessionControllers.updateSession)
  .delete(sessionControllers.removeSession);

module.exports = router;
