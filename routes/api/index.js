const router = require("express").Router();
const userRoutes = require("./user-route");
const thoughtRoutes = require("./thought-route");

router.use("/api/users", userRoutes);


module.exports = router;
