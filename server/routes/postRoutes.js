const router = require("express").Router();
const postControllers = require("../controllers/postControllers");

router.route("/byTag/:tag").get(postControllers.getTags);

router.route("/:userid").get(postControllers.getUserPosts);

router
  .route("/")
  .get(postControllers.getPosts)
  .post(postControllers.addPost);

module.exports = router;
