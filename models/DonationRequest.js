const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const DonationRequestSchema = new mongoose.Schema({
  name: {
    type: String,
   
  },
  landline_no: {
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
  
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  success: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  user_id:{
    type: String,
  },
  products:{
    type: Array
  }
});
const DonationRequest = mongoose.model("DonationRequest", DonationRequestSchema);
function validateUser(donationrequest) {
  const schema = {
    name: Joi.string(),
    phone: Joi.string(),
    address: Joi.string(),
    email: Joi.string().email(),
    landline_no:  Joi.string(),
    roles: Joi.string(),
    success: Joi.string(),
    country: Joi.string(),
    state: Joi.string(),
    city: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    user_id:  Joi.string(),
    products:Joi.array()
    // roles: Joi.array().items({
    //   role: Joi.string()
    //     .min(5)
    //     .max(255)
    // })
  };
  return Joi.validate(donationrequest, schema);
}
exports.DonationRequest = DonationRequest;
exports.validate = validateUser;
