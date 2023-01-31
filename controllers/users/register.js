const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { User, validateRegisterSchema } = require("../../models/user");
const sendEmail = require("../../services/sendEmail");

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
      return;
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const avatar = gravatar.url(email);
    const verificationToken = uuidv4();

    const newUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL: avatar,
      verificationToken,
    });

    const verifyEmail = {
      to: email,
      subject: "Verify you email",
      html: `<a target="_blank" 
      href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm your email></a>`,
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
      status: "success",
      code: 201,
      user: {
        email: newUser.email,
        avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
