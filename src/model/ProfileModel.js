const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
      required: [true, "User email address required"],
    },
    mobile: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(?:\+88|88)?(01[3-9]\d{8})$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, "User phone number required"],
    },
    password: {
      type: String,
      select: false,
      validate: {
        validator: function (v) {
          if (v.length < 8) {
            return false;
          }
          const containsUppercase = /[A-Z]/.test(v);
          const containsLowercase = /[a-z]/.test(v);
          const containsNumber = /[0-9]/.test(v);
          const containsSpecial = /[$@#!%*?&]/.test(v);
          if (
            !containsUppercase ||
            !containsLowercase ||
            !containsNumber ||
            !containsSpecial
          ) {
            return false;
          }
          return true;
        },
        message: (props) => `${props.value} is not a strong password!`,
      },
      required: [true, "User password number required"],
    },
    image: { type: String },
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false }
);

const ProfileModel = mongoose.model("user", DataSchema);

module.exports = ProfileModel;
