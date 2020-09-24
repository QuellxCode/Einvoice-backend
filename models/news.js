const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");


const NewsSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
     },
  title: {
    type: String,
    required: true,
   
  },
  description: {
    type: String,
    required: true,
   
  },
  image: {
    type: String,
   
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
 
});
const News = mongoose.model("News", NewsSchema);
function validateUser(news) {
  const schema = {
    location: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string(),
   };
  return Joi.validate(news, schema);
}
exports.News = News;
exports.validate = validateUser;
