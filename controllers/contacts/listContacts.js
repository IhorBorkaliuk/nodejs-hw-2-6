const { Contact } = require("../../models/contact");

const listContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      code: 500,
      message: err.message,
      data: "Internal Server Error",
    });
  }
};

module.exports = listContacts;
