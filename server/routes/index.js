const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const sessionRoutes = require("./sessionRoutes");

router.use("/api/users", userRoutes);
router.use("/api/posts", postRoutes);
router.use("/api/sessions", sessionRoutes);

module.exports = router;
