const mongoose = require("mongoose");
const Joi = require("joi");
const TenderSchema = new mongoose.Schema({
  engineers: [
    {
      assigned_task: { type: String }
    }
  ],
  status: { type: String, default: "0" },
  ongoing: { type: String, default: "0" },
  details: {
    work_title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    type: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    client_name: { type: String, required: true, minlength: 3, maxlength: 50 },
    project_location: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    pec_category: {
      type: String,
      required: true
    }
  },
  bid_bond: {
    bid_bond_fee: {
      type: Number,
      required: true
    },
    bid_bond_shape: {
      type: String,
      required: true
    },
    bid_bond_favor: {
      type: String,
      required: true
    }
  },
  tender: {
    tender_fee: {
      type: Number,
      required: true
    },
    tender_shape: {
      type: String,
      required: true
    },
    tender_favor: {
      type: String,
      required: true
    }
  }
});
const Tender = mongoose.model("Tender", TenderSchema);
function validateTender(tender) {
  const schema = {
    engineers: Joi.array().items({
      engineer_id: Joi.string(),
      assigned_task: Joi.string()
    }),
    details: Joi.object().keys({
      work_title: Joi.string()
        .min(3)
        .max(50)
        .required(),
      type: Joi.string()
        .min(3)
        .max(50)
        .required(),
      client_name: Joi.string()
        .min(3)
        .max(50)
        .required(),
      project_location: Joi.string()
        .min(3)
        .max(50)
        .required(),
      pec_category: Joi.string()
        .min(3)
        .max(50)
        .required()
    }),
    bid_bond: Joi.object().keys({
      bid_bond_fee: Joi.number().required(),
      bid_bond_shape: Joi.string()
        .min(3)
        .max(50)
        .required(),
      bid_bond_favor: Joi.string()
        .min(3)
        .max(50)
        .required()
    }),
    tender: Joi.object().keys({
      tender_fee: Joi.number().required(),
      tender_shape: Joi.string()
        .min(3)
        .max(50)
        .required(),
      tender_favor: Joi.string()
        .min(3)
        .max(50)
        .required()
    })
  };
  return Joi.validate(tender, schema);
}
exports.Tender = Tender;
exports.validate = validateTender;
