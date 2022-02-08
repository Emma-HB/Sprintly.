const router = require("express").Router();
const authRoutes = require("./auth");
const projectRoutes = require("./project");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/", authRoutes);
router.use("/", projectRoutes)

module.exports = router;
