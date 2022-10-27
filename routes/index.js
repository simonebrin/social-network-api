const router = require("express").Router();
// const userRoutes = require("./user-route");
// const thoughtRoutes = require("./thought-route");
const apiRoutes = require('./api/index');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('404 not found');
});

module.exports = router;
