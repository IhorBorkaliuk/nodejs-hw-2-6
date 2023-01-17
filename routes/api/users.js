const express = require("express");
const router = express.Router();
const ctrlUser = require("../../controllers/users")

router.post("/signup", ctrlUser.register);

module.exports = router;