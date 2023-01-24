const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { User, validateRegisterSchema } = require("../../models/user");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = validateRegisterSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "Invalid value of email or password" });
      return;
    }
    const userCheck = await User.findOne({ email });
    if (userCheck) {
      res.status(409).json({ message: "Email in use" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const avatar = gravatar.url(email);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL: avatar,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      user: {
        email: newUser.email,
        id: newUser._id,
        avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
