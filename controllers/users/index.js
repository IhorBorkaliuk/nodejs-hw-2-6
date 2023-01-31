const register = require("./register");
const login = require("./login");
const current = require("./current");
const logout = require("./logout");
const uploadAvatar = require("./uploadAvatar")
const verifyEmail = require("./verifyEmail")

module.exports = {
  register,
  current,
  login,
  logout,
  uploadAvatar,
  verifyEmail,
};
