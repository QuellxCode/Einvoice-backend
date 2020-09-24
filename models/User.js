const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
      },
  address: {
    type: String,
     },
  phone: {
    type: String,
      },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  roles: {
    type: String,
  },
  success: {
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
    name: Joi.string(),
    phone: Joi.string(),
    address: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    roles: Joi.string(),
    success: Joi.string()
   
    // roles: Joi.array().items({
    //   role: Joi.string()
    //     .min(5)
    //     .max(255)
    // })
  };
  return Joi.validate(user, schema);
}
exports.User = User;
exports.validate = validateUser;
