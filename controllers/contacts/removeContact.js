const { Contact } = require("../../models/contact");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      res.status(404).json({ message: "Not found" });
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = removeContact;
