const mongoose = require("mongoose");
const Joi = require("joi");
const WorkDoneSchema = new mongoose.Schema({
  details: [
    {
      description: {
        type: String,
        required: true
      },
      unit: {
        type: Number,
        required: true
      },
      rate: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      amount: {
        type: Number
      }
    }
  ],
  mb_id: {
    type: String,
    required: true
  },
  nonboq: [
    {
      item_name: {
        type: String,
        required: true
      }
    }
  ]
});
const WorkDone = mongoose.model("WorkDone", WorkDoneSchema);
function validateWorkDone(wd) {
  const schema = {
    mb_id: Joi.string().required(),
    details: Joi.array().items({
      description: Joi.string().required(),
      unit: Joi.string().required(),
      rate: Joi.string().required(),
      quantity: Joi.string().required(),
      amount: Joi.string()
    }),
    nonboq: Joi.string().items({
      item_name: Joi.string().required()
    })
  };
  return Joi.validate(wd, schema);
}
exports.WorkDone = WorkDone;
exports.validate = validateWorkDone;
