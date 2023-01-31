const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, validateLoginSchema } = require("../../models/user");
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = validateLoginSchema.validate(req.body);
    console.log(password);
    if (error) {
      res.status(400).json({ message: "Wrong email or password" });
    }

    const user = await User.findOne({ email });
    const userPassword = await bcrypt.compare(password, user.password);
    console.log(user.password);
    if (!user || !userPassword) {
      res.status(401).json({ message: "Email or password is wrong" });
    }

    if (!user.verify) {
      res.json({ message: "Your Email is not verifyied!" });
    }

    // const msg = {
    //   to: email,
    //   subject: "Please, verify your email",
    //   html: `<a target="_blank" 
    //   href="http://localhost:3000/api/users/verify/${verificationToken}">Email verification</a>`,
    // };

    // const transport = nodemailer.createTransport({
    //   host: "sandbox.smtp.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //     user: EMAIL_USER,
    //     pass: EMAIL_PASS,
    //   },
    // });

    // await transport.sendMail(msg);


    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      status: "success",
      code: 200,
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = login;
