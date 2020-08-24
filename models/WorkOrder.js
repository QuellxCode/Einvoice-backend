const mongoose = require("mongoose");
const Joi = require("joi");
const WorkOrderSchema = new mongoose.Schema({
  tender_id: {
    type: String
  },
  Work_order_amount: {
    type: Number,
    required: true
  },
  Project_Manager: {
    type: String,
    required: true
  },
  Diary: {
    type: Number,
    required: true
  },
  Account_Number: {
    type: String,
    required: true
  },
  File_Number: {
    type: String,
    required: true
  },
  quotation_log: {
    type: String,
    required: true
  },
  Project_Title: {
    type: String,
    required: true
  },
  client_name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  start_date: {
    type: String,
    required: true
  },
  end_date: {
    type: String,
    required: true
  }
});
const WorkOrder = mongoose.model("WorkOrder", WorkOrderSchema);
function validateWorkOrder(WorkOrder) {
  const schema = {
    quotation_log: Joi.string(),
    tender_id: Joi.string(),
    Account_Number: Joi.string(),
    File_Number: Joi.string(),
    Work_order_amount:  Joi.string(),
    Diary:  Joi.string(),
    Project_Title: Joi.string(),
    type:Joi.string(),
    start_date:Joi.string(),
    end_date:Joi.string(),
    Project_Manager: Joi.string()
      .min(3)
      .max(50),
    client_name: Joi.string()
      .min(3)
      .max(50),
    location: Joi.string()
      .min(3)
      .max(50),
     };
  return Joi.validate(WorkOrder, schema);
}
exports.WorkOrder = WorkOrder;
exports.validate = validateWorkOrder;
