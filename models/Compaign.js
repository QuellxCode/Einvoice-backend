const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const CompaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },

  category: {
    type: String,
  },

  goal_amount: {
    type: String,
  },

  raised_amount: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
});
const Compaign = mongoose.model("Compaign", CompaignSchema);
function validateUser(compaign) {
  const schema = {
    title: Joi.string(),
    image: Joi.string(),
    category: Joi.string(),
    goal_amount: Joi.string(),
    raised_amount: Joi.string()
   
  };
  return Joi.validate(compaign, schema);
}
exports.Compaign = Compaign;
exports.validate = validateUser;
