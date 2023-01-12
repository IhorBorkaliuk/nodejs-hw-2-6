const { Contact, validateSchema } = require("../../models/contact");

const updateContact = async (req, res, next) => {
  try {
    const { error } = validateSchema.validate(req.body);
    if (error) {
      res.status(404).json({ message: "missing required name field" });
      return;
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      res.status(400).json({ message: "missing fields" });
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact updated",
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = updateContact;
