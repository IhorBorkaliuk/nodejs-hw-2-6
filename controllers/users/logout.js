const { User } = require("../../models/user");

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json({ message: "Logout was successfull" });
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = logout;
