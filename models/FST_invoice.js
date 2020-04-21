const mongoose = require("mongoose");
const Joi = require("joi");
const fST_invoiceSchema = new mongoose.Schema({
  tender_id: {
    type: String,
    required: true
  },
  sale_to: {
    type: String,
    required: true
  },
  FST_no: {
    type: String,
    required: true
  },
  FST_invoice_no: {
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
  taxableValueEx_FST: {
    type: Number,
    requried: true
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
const FST_invoice = mongoose.model("FST_invoice", fST_invoiceSchema);
function validateFST_invoice(fST_invoice) {
  const schema = {
    sale_to: Joi.string().required(),
    FST_no: Joi.number().required(),
    FST_invoice_no: Joi.number().required(),
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
      st_rate: Joi.number().required(),
      st_amount: Joi.number().required(),
      grossAmount: Joi.number().required()
    }),
    taxableValueEx_FST: Joi.number().required(),
    stAmount: Joi.number().required(),
    totalValue: Joi.number().required()
  };
  return Joi.validate(fST_invoice, schema);
}
exports.FST_invoice = FST_invoice;
exports.validate = validateFST_invoice;
