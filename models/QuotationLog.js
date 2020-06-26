const mongoose = require("mongoose");
const Joi = require("joi");
const quotationLogSchema = new mongoose.Schema({
  engineer_id:{
    type: String,
  },
  manager_id:{
    type: String,
  },
  director_id:{
    type: String,
  },
  status:{
    type: String,
    default: 0
  },
  tender_id: {
    type: String,
    required: true
  },
  our_reference:{
    type: String,
   
  },
  title:{
    type: String,
   
  },
  client_name:{
    type: String,
   
  },
  location:{
    type: String,
    
  },
  date:{
    type: String,
    
  },
  type:{
    type: String,
    
  },
  client_reference:{
    type: Number,
    
  },
  file_no:{
    type: String,
    
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
  FE: {
    type: String
  },
  fe_diaryNo: {
    type: Number
  },
  announced:{
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },

});
const QuotationLog = mongoose.model("QuotationLog", quotationLogSchema);
function validateQuotationLog(quotationLog) {
  const schema = {
    status:Joi.string(),
    manager_id:Joi.string(),
    director_id:Joi.string(),
    announced: Joi.string(),
    engineer_id:Joi.string(),
    our_reference:Joi.string(),
    title:Joi.string(),
    client_name:Joi.string(),
    location:Joi.string(),
    date:Joi.string(),
    type:Joi.string(),
    client_reference:Joi.number(),
    file_no:Joi.string(),
    bidBondAmount: Joi.number().required(),
    tender_id: Joi.string().required(),
    submissionOn: Joi.string().required(),
    dispatchNo: Joi.number().required(),
    bidderDetail: Joi.string().required(),
    TE: Joi.string(),
    te_diaryNo: Joi.number(),
    fe_diaryNo: Joi.number(),
    FE: Joi.string().required(),
    te_diaryNo: Joi.number()
  };
  return Joi.validate(quotationLog, schema);
}
exports.QuotationLog = QuotationLog;
exports.validate = validateQuotationLog;
