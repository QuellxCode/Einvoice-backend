const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const UserSchema = new mongoose.Schema({
  director: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  cnic: {
    type: Number,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  roles: {
    type: String,
  },
});
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};
const User = mongoose.model("User", UserSchema);
function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    address: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    phone: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
    cnic: Joi.number().required(),
    roles: Joi.string().min(5).max(255),
  };
  return Joi.validate(user, schema);
}
exports.User = User;
exports.validate = validateUser;
