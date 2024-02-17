const {
  UserCreateServices,
  UserVerifyServices,
  UserLoginServices,
  SaveProfileService,
} = require("../services/UserServices");

exports.createUser = async (req, res) => {
  let result = await UserCreateServices(req);
  return res.status(200).json(result);
};

exports.verifyUser = async (req, res) => {
  let result = await UserVerifyServices(req);
  return res.status(200).json(result);
};

exports.LoginUser = async (req, res) => {
  let result = await UserLoginServices(req);
  return res.status(200).json(result);
};

exports.LogOutUser = async (res) => {
  let cookieOption = {
    expires: new Date(Date.now() - 24 * 6060 * 1000),
    httpOnly: false,
  };
  res.cookie("token", "", cookieOption);
  return res.status(200).json({ status: "success" });
};

exports.UpdateProfile = async (req, res) => {
  let result = await SaveProfileService(req);
  return res.status(200).json(result);
};
