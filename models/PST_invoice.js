const mongoose = require("mongoose");
const Joi = require("joi");
const pST_invoiceSchema = mongoose.Schema({
  tender_id: {
    type: String,
    required: true
  },
  sale_to: {
    type: String,
    required: true
  },
  PST_no: {
    type: String,
    required: true
  },
  PST_invoice_no: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  details: [
    {
      /* boq: {
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
  unit: {
    type: String,
    required: true
  }, */
      valueEx_pst: {
        type: Number
      },
      st_rate: {
        type: Number,
        required: true
      },
      st_amount: {
        type: Number,
        required: true
      },
      grossAmount: {
        type: Number,
        required: true
      }
    }
  ],
  taxableValueEx_PST: {
    type: Number,
    default: 0
  },
  stAmount: {
    type: Number,
    default: 0
  },
  totalValue: {
    type: Number,
    default: 0
  }
});
const PST_invoice = mongoose.model("PST_invoice", pST_invoiceSchema);
function validatePST_invoice(pST_invoice) {
  const schema = {
    sale_to: Joi.string().required(),
    PST_no: Joi.number().required(),
    PST_invoice_no: Joi.number().required(),
    date: Joi.date().required(),
    tender_id: Joi.string().required(),
    details: Joi.array().items({
      /* boq: Joi.string(),
    quantity: Joi.number().required(),
    description: Joi.string()
      .min(3)
      .max(50)
      .required(),
    unit: Joi.string().required(),*/
      valueEx_pst: Joi.number(),
      st_rate: Joi.number().required(),
      st_amount: Joi.number().required(),
      grossAmount: Joi.number().required()
    }),
    taxableValueEx_PST: Joi.number().required(),
    stAmount: Joi.number().required(),
    totalValue: Joi.number().required()
  };
  return Joi.validate(pST_invoice, schema);
}
exports.PST_invoice = PST_invoice;
exports.validate = validatePST_invoice;
