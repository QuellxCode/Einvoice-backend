const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const VolunteerSchema = new mongoose.Schema({
  name: {
    type: String,
      },
  address: {
    type: String,
    },
  phone: {
    type: String,
     },
  // email: {
  //   type: String,
  //   // required: true,
  //   //     unique: true,
  // },
  created_at: {
    type: Date,
    default: Date.now,
  },
  country: {
    type: String,
  },
  success: {
    type: String,
  },
  cnic: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  user_id: {
    type: String,
  }
 
});
const Volunteer = mongoose.model("Volunteer", VolunteerSchema);
function validateUser(volunteer) {
  const schema = {
    name: Joi.string(),
    phone: Joi.string(),
    address: Joi.string(),
    // email: Joi.string(),
    country: Joi.string(),
    success: Joi.string(),
    cnic: Joi.string(),
    state: Joi.string(),
    city: Joi.string(),
    user_id:Joi.string(),
    success:Joi.string(),

    // roles: Joi.array().items({
    //   role: Joi.string()
    //     .min(5)
    //     .max(255)
    // })
  };
  return Joi.validate(volunteer, schema);
}
exports.Volunteer = Volunteer;
exports.validate = validateUser;
