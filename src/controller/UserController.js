const {
  UserCreateServices,
  UserVerifyServices,
} = require("../services/UserServices");

exports.createUser = async (req, res) => {
  let result = await UserCreateServices(req);
  return res.status(200).json(result);
};

exports.verifyUser = async (req, res) => {
  let result = await UserVerifyServices(req);
  return res.status(200).json(result);
};
