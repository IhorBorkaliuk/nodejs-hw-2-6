const { User } = require("../../models/user");

const resendEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({ message: "missing required field email" });
  }

  if (user.verify) {
    res.status(400).json({
      message: "Verification has already been passed",
    });
  }
};
