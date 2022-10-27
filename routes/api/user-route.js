const router = require('express').Router();
const {
  getAllUsers,
    getUserById,
    createUser,
  updateUser,
} = require("../../controllers/user-controllers");


router.route("/").get(getAllUsers)
    .post(createUser);

module.exports = router;