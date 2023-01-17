const express = require("express");
const router = express.Router();
const ctrlUser = require("../../controllers/users")
const authorization = require("../../middlewares/auth")

router.post("/signup", ctrlUser.register);
router.post("/login", ctrlUser.login);
router.get("/logout", authorization, ctrlUser.logout);
router.get("/current", authorization, ctrlUser.current);

module.exports = router;
