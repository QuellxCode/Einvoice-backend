const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const PecSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  details: [
    {
      pec_code: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
      }
    }
  ]
});
const Pec = mongoose.model("Pec", PecSchema);

function validatePec(pec) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    details: Joi.array().items({
      pec_code: Joi.string()
        .min(3)
        .max(50)
        .required()
    })
  };
  return Joi.validate(pec, schema);
}

exports.Pec = Pec;
exports.validate = validatePec;
