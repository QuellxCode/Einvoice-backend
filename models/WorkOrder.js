const mongoose = require("mongoose");
const Joi = require("joi");
const WorkOrderSchema = new mongoose.Schema({
  tender_id: {},
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
  Work_Order_no: {
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
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  }
});
const WorkOrder = mongoose.model("WorkOrder", WorkOrderSchema);
function validateWorkOrder(WorkOrder) {
  const schema = {
    tender_id: Joi.string(),
    Work_order_amount: Joi.number().required(),
    Diary: Joi.number().required(),
    Project_Manager: Joi.string()
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
  return Joi.validate(WorkOrder, schema);
}
exports.WorkOrder = WorkOrder;
exports.validate = validateWorkOrder;
