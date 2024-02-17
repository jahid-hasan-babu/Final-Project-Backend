const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: Number },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("otps", DataSchema);
module.exports = UserModel;
