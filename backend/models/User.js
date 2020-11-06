const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    roleName: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('users', UserSchema);

module.exports = User;
