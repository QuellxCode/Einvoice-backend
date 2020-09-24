const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
   
  },
  image: {
    type: String,
   
  },
  raised: {
    type: String,
    required: true,
   
  },
  target: {
    type: String,
    required: true,
   
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
 
});
const Project = mongoose.model("Project", ProjectSchema);
function validateUser(project) {
  const schema = {
    title: Joi.string().required(),
    raised: Joi.string().required(),
    image: Joi.string(),
    target: Joi.string().required(),
  };
  return Joi.validate(project, schema);
}
exports.Project = Project;
exports.validate = validateUser;
