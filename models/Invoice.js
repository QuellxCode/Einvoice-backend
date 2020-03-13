const mongoose = require("mongoose");
const Joi = require("joi");
const InvoiceSchema = new mongoose.Schema({
  tender_id: {
    type: String,
    required: true
  },
  details: [
    {
      description: {
        type: String,
        required: true
      },
      unit: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      rates: {
        type: Number,
        required: true
      },
      amount: {
        type: Number,
        required: true
      }
    }
  ]
});
const Invoice = mongoose.model("Invoice", InvoiceSchema);
function validateInvoice(invoice) {
  const schema = {
    tender_id: Joi.string().required(),
    details: Joi.array().items({
      description: Joi.string().required(),
      unit: Joi.string().required(),
      rate: Joi.string().required(),
      quantity: Joi.string().required(),
      amount: Joi.string()
    })
  };
  return Joi.validate(invoice, schema);
}
exports.Invoice = Invoice;
exports.validate = validateInvoice;
