const express = require("express");
const router = express.Router();
const ctrlUser = require("../../controllers/users")

router.post("/signup", ctrlUser.register);
router.get("/login", ctrlUser.login);

module.exports = router;