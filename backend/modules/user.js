const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      min: [10, "Pleace Enter the 10 digit"],
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Emai Already Exits"],
      validate: {
        validator: function (value) {
          validator.isEmail(value);
        },
        message: "Invalid Email",
      },
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
    },
    avatar: {
      type: String,
    },
    userType: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);
const User = new mongoose.model("User", userSchema);
module.exports = User;
