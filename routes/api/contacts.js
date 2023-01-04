const express = require("express");
const router = express.Router();
const {
  listContactsCtrl,
  getContactByIdCtrl,
  addContactCtrl,
  removeContactCtrl,
  updateContactCtrl,
} = require("../../controllers/controllers");

router.get("/", listContactsCtrl);

router.get("/:contactId", getContactByIdCtrl);

router.post("/", addContactCtrl);

router.delete("/:contactId", removeContactCtrl);

router.put("/:contactId", updateContactCtrl);

module.exports = router;
