const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    resetPasswordToken: {
      type: String,
      required: false
    },
    resetPasswordExpires: {
      type: Number,
      required: false
    },
    email: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      required: false
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    wishlist: [{
      type: Schema.Types.ObjectId,
      ref: 'Wishlist'
    }],
    cart: [{
      type: Object,
      required: false
    }]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
