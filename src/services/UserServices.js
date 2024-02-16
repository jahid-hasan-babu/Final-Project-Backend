const sendEmailUtility = require("../utility/EmailHelper");
const UserModel = require("../model/UserModel");
const OTPModel = require("../model/OTPModel");
const { EncodeToken } = require("../utility/TokenHelper");

const UserCreateServices = async (req) => {
  try {
    // Extract necessary fields from the request body
    const { name, email, mobile, password, image } = req.body;

    // Generate OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000);

    // Update OTPModel with email and OTP
    await OTPModel.findOneAndUpdate(
      { email: email },
      { $set: { otp: otpCode } },
      { upsert: true }
    );

    // Access OTPModel _id
    const otpModelInstance = await OTPModel.findOne({ email: email });
    const otpID = otpModelInstance._id;

    // Create UserModel with required fields including otpID
    const data = await UserModel.create({
      name,
      email,
      mobile,
      password,
      image,
      otpID,
    });

    // Send verification email
    const emailText = `Your Verification code is = ${otpCode}`;
    const emailSub = `Verification code`;
    await sendEmailUtility(email, emailText, emailSub);

    return { status: "success", message: data };
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
    const otpRecord = await OTPModel.findOne({ email: email, otp: otp }).select(
      "_id"
    );

    if (otpRecord) {
      // Generate token
      const token = EncodeToken(email, otpRecord._id.toString());

      // Update OTP to zero
      await OTPModel.updateOne({ email: email }, { $set: { otp: 0 } });

      return { status: "success", message: "Valid OTP", token: token };
    } else {
      return { status: "fail", message: "Invalid OTP or Email" };
    }
  } catch (e) {
    return { status: "fail", message: e.toString() };
  }
};

module.exports = { UserCreateServices, UserVerifyServices };
