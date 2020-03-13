const mongoose = require("mongoose");
const Joi = require("joi");
const quotationLogSchema = new mongoose.Schema({
  tender_id: {
    type: String,
    required: true
  },
  bidBondAmount: {
    type: Number,
    required: true
  },
  submissionOn: {
    type: String,
    required: true
  },
  dispatchNo: {
    type: Number,
    required: true
  },
  bidderDetail: {
    type: String,
    required: true
  },
  TE: {
    type: String
  },
  te_diaryNo: {
    type: Number
  },
  FE:{
    type: String
  },
  fe_diaryNo: {
    type: Number
  }
});
const QuotationLog = mongoose.model("QuotationLog", quotationLogSchema);
function validateQuotationLog(quotationLog) {
  const schema = {
bidBondAmount: Joi.number().required(),
submissionOn:  Joi.string().required(),
dispatchNo: Joi.number().required(),
bidderDetail: Joi.string().required(),
    TE: Joi.string(),
    te_diaryNo: Joi.number(),
    FE: Joi.string().required(),
    te_diaryNo: Joi.number(),
  };
  return Joi.validate(quotationLog, schema);
}
exports.QuotationLog = QuotationLog;
exports.validate = validateQuotationLog;
