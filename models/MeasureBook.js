const mongoose = require("mongoose");
const Joi = require("joi");
const MeasureBookSchema = new mongoose.Schema({
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
  }
});
const MeasureBook = mongoose.model("MeasureBook", MeasureBookSchema);
function validateMeasureBook(mb) {
  const schema = {
    mb_id: Joi.string().required(),
    details: Joi.array().items({
      description: Joi.string().required(),
      unit: Joi.string().required(),
      rate: Joi.string().required(),
      quantity: Joi.string().required(),
      amount: Joi.string()
    })
  };
  return Joi.validate(mb, schema);
}
exports.MeasureBook = MeasureBook;
exports.validate = validateMeasureBook;