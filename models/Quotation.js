const mongoose = require("mongoose");
const Joi = require("joi");
const QuotationSchema = new mongoose.Schema({
  quotationNo: {
    type: Number
    //required: true
  },
  client_ref: {
    type: Number,
    required: true
  },
  dept_client: {
    type: String,
    required: true
  },
  bid_validity: {
    type: String,
    required: true
  },
  completion_time: {
    type: String,
    required: true
  },
  provisionalSalesTax: {
    type: Boolean
  },
  P_Percentage: {
    type: String
  },
  fedralSalesTax: {
    type: Boolean
  },
  F_Percentage: {
    type: String
  },
  tender_id: { type: String },
  details: [
    {
      boq: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      // tender_recieve: { type: Date, default: Date.now },
      unit: {
        type: String,
        required: true
      },
      rate: {
        type: Number,
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      Provisional_Tax: {
        type: Number,
        default: 0
      },
      Fedral_Tax: {
        type: Number,
        default: 0
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
});
const Quotation = mongoose.model("Quotation", QuotationSchema);
function validateQuotation(Quotation) {
  const schema = {
    client_ref: Joi.number().required(),
    dept_client: Joi.string().required(),
    bid_validity: Joi.string().required(),
    completion_time: Joi.string().required(),
    provisionalSalesTax: Joi.boolean().required(),
    P_Percentage: Joi.string().required(),
    fedralSalesTax: Joi.boolean().required(),
    F_Percentage: Joi.string().required(),
    tender_id: Joi.string().required(),

    details: Joi.array().items({
      boq: Joi.string(),
      quantity: Joi.number().required(),
      description: Joi.string()
        .min(3)
        .max(50)
        .required(),
      unit: Joi.string().required(),
      rate: Joi.number().required(),
      amount: Joi.number().required(),
      Provisional_Tax: Joi.number().required(),
      Fedral_Tax: Joi.number().required()
    }),
    totalAmount: Joi.number().required(),
    status: Joi.string()
  };
  return Joi.validate(Quotation, schema);
}
exports.Quotation = Quotation;
exports.validate = validateQuotation;
