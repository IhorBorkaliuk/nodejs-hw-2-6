const { Contact, validateStatusSchema } = require("../../models/contact");

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = validateStatusSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "missing field favorite" });
    }
    const { contactId } = req.params;

    const updatedStatus = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!updatedStatus) {
      res.status(400).json({ message: "missing field favorite" });
    }
    res.json({
      status: "success",
      code: 200,
      message: `Status 'favorite' is ${req.body.favorite}`,
      data: {
        result: updatedStatus,
      },
    });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = updateStatusContact;
