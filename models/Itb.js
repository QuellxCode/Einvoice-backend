const mongoose = require("mongoose");
const Joi = require("joi");
const ItbSchema = new mongoose.Schema({
  tender_id: { type: String },
  serial_number: {
    type: Number,
    required: true
  },
  Diary: {
    type: Number,
    required: true
  },
  tender_recieve: { type: Date, default: Date.now },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  client_name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  bid_bond_percent: {
    type: Number,
    required: true
  },
  remarks: {
    type: String,
    required: true
  },
  tendor_recieved_by: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  files: {
    type: String,
    required: true
  }
});
const Itb = mongoose.model("Itb", ItbSchema);
function validateItb(itb) {
  const schema = {
    tender_id: Joi.string(),
    serial_number: Joi.string()
      .min(3)
      .max(50)
      .required(),
    Diary: Joi.string()
      .min(3)
      .max(50)
      .required(),
    title: Joi.string()
      .min(3)
      .max(50)
      .required(),
    client_name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    location: Joi.string()
      .min(3)
      .max(50)
      .required(),
    bid_bond_percent: Joi.number().required(),
    remarks: Joi.string()
      .min(3)
      .max(50)
      .required(),
    tendor_recieved_by: Joi.string()
      .min(3)
      .max(50)
      .required(),
    deadline: Joi.date().required()
  };
  return Joi.validate(itb, schema);
}
exports.Itb = Itb;
exports.validate = validateItb;
