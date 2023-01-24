const express = require("express");
const router = express.Router();
const ctrlUser = require("../../controllers/users");
const authorization = require("../../middlewares/auth");
const upload = require("../../middlewares/uploadImg")
router.post("/signup", ctrlUser.register);
router.post("/login", ctrlUser.login);
router.get("/logout", authorization, ctrlUser.logout);
router.get("/current", authorization, ctrlUser.current);
router.patch("/avatars", upload.single("avatar"), ctrlUser.uploadAvatar);

module.exports = router;
