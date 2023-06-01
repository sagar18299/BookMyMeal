const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 30,
    },
    employeeId: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      require: true,
      enum: ["admin", "employee"],
      default: "employee",
    },
    password: {
      type: String,
      required: true,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
   
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    users: {
      type: [String],
    },
    department: {
      type: String,
      required: false,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    verifytoken: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports.User = User;
