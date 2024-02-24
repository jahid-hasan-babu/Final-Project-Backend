const ProfileModel = require("../model/ProfileModel");
const {
  UserCreateServices,
  UserVerifyServices,
  UserLoginServices,
  SaveProfileService,
  ReadProfileService,
} = require("../services/UserServices");

exports.createUser = async (req, res) => {
  let result = await UserCreateServices(req);
  return res.status(200).json(result);
};

exports.checkEmailExists = async (req, res) => {
  try {
    let { email } = req.query; // Use req.query to retrieve email from query parameters
    const result = await ProfileModel.findOne({ email });
    if (!result) {
      res.status(200).json({ status: "fail", message: "User not found" });
    } else {
      res.status(200).json({ status: "success", message: "User found" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.toString() });
  }
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
  let localStorageOption = {
    expires: new Date(Date.now() - 24 * 6060 * 1000),
    httpOnly: false,
  };
  res.cookie("token", "", localStorageOption);
  return res.status(200).json({ status: "success" });
};

exports.ReadProfile = async (req, res) => {
  let result = await ReadProfileService(req);
  return res.status(200).json(result);
};

exports.UpdateProfile = async (req, res) => {
  let result = await SaveProfileService(req);
  return res.status(200).json(result);
};
