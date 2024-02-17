const sendEmailUtility = require("../utility/EmailHelper");
const ProfileModel = require("../model/ProfileModel");
const UserModel = require("../model/UserModel");
const { EncodeToken } = require("../utility/TokenHelper");

const UserCreateServices = async (req) => {
  try {
    // Extract necessary fields from the request body
    const { name, email, mobile, password, image } = req.body;

    // Generate OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000);

    // Update OTPModel with email and OTP
    await UserModel.findOneAndUpdate(
      { email: email },
      { $set: { otp: otpCode } },
      { upsert: true }
    );

    // Access OTPModel _id
    const otpModelInstance = await UserModel.findOne({ email: email });
    const userID = otpModelInstance._id;

    // Create UserModel with required fields including otpID
    await ProfileModel.create({
      name,
      email,
      mobile,
      password,
      image,
      userID,
    });

    // Send verification email
    const emailText = `Your Verification code is = ${otpCode}`;
    const emailSub = `Verification code`;
    await sendEmailUtility(email, emailText, emailSub);

    return { status: "success", message: "User create and otp send" };
  } catch (e) {
    return { status: "fail", message: e.toString() };
  }
};

const UserVerifyServices = async (req) => {
  try {
    if (!req || !req.params || !req.params.email || !req.params.otp) {
      throw new Error(
        "Invalid request. Email and OTP parameters are required."
      );
    }

    const email = req.params.email;
    const otp = req.params.otp;

    // Check if the email and OTP combination exists
    const otpRecord = await UserModel.findOne({
      email: email,
      otp: otp,
    }).select("_id");

    if (otpRecord) {
      // Generate token
      const token = EncodeToken(email, otpRecord["_id"].toString());

      // Update OTP to zero
      await UserModel.updateOne({ email: email }, { $set: { otp: 0 } });

      return { status: "success", message: "Valid OTP", token: token };
    } else {
      return { status: "fail", message: "Invalid OTP or Email" };
    }
  } catch (e) {
    return { status: "fail", message: e.toString() };
  }
};

const UserLoginServices = async (req) => {
  try {
    // Extract email and password from request parameters
    const email = req.body.email;
    const password = req.body.password;

    // Find user in the database with the provided email and password
    const data = await ProfileModel.findOne({
      email: email,
      password: password,
    });

    const uModel = await UserModel.findOne().select("_id");

    // Check if user data exists
    if (data) {
      // User found, generate token and return success response
      const token = EncodeToken(email, uModel["_id"].toString());

      return {
        status: "success",
        data: "User login successful",
        token: token,
      };
    } else {
      // User not found or incorrect credentials, return failure message
      return { status: "fail", message: "Invalid Email or Password" };
    }
  } catch (error) {
    // Catch any errors that occur during the process

    return { status: "fail", message: error.toString() };
  }
};

const SaveProfileService = async (req) => {
  try {
    const user_id = req.headers.user_id;

    const reqBody = req.body;
    reqBody.userID = user_id;

    // Check if both password and image are provided
    if (!reqBody.password || !reqBody.image) {
      return { status: "fail", message: "Password and Image are required" };
    }

    // Update user password and image
    await ProfileModel.updateOne(
      { userID: user_id },
      { $set: { password: reqBody.password, image: reqBody.image } }
    );

    return { status: "success", message: "User updated successfully" };
  } catch (error) {
    return { status: "fail", message: error.toString() };
  }
};

module.exports = {
  UserCreateServices,
  UserVerifyServices,
  UserLoginServices,
  SaveProfileService,
};
