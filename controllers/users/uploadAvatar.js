const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");


const { User } = require("../../models/user");

const pathToAvatars = path.join(__dirname, "../../", "public", "avatars");

const uploadAvatar = async (req, res, next) => {
    console.log(req.user)
  const { path: temporaryAvatar, originalname } = req.file;
  const { _id } = req.user;
  const newAvatarName = `${_id}_${originalname}`;

  try {
    const pathToUpload = path.join(pathToAvatars, newAvatarName);
    await fs.rename(temporaryAvatar, pathToUpload);
    (await Jimp.read(pathToUpload)).resize(250, 250).write(pathToUpload);
    const avatarURL = path.join("public", "avatar", newAvatarName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(temporaryAvatar);
    next(error);
  }
};

module.exports = uploadAvatar;
