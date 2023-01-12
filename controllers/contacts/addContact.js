const { Contact, validateSchema } = require("../../models/contact");

const addContact = async (req, res, next) => {
  try {
    const { error } = validateSchema.validate(req.body);
    if (error) {
      res.status(404).json({ message: "missing required name field" });
      return;
    }
    const newContact = await Contact.create(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { newContact },
    });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = addContact;
