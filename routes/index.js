const router = require("express").Router();
const authRoutes = require("./auth");
const projectRoutes = require("./project");
const storyCardRoutes = require("./storycard")
const prioSessionsRoutes = require("./prioritization")


/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/", authRoutes);
router.use("/", projectRoutes);
router.use("/", storyCardRoutes);
router.use("/", prioSessionsRoutes);

module.exports = router;
