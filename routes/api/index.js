const router = require("express").Router();
const userRoutes = require("./user-route");
const thoughtRoutes = require("./thought-route");

router.use("/comments", commentRoutes);
router.use("/pizzas", pizzaRoutes);

module.exports = router;
