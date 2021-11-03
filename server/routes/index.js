const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const sessionRoutes = require("./sessionRoutes");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/sessions", sessionRoutes);

module.exports = router;
