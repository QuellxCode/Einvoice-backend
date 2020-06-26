const mongoose = require("mongoose");
const Joi = require("joi");
const TenderSchema = new mongoose.Schema({
  serial_no:{
    type: String,
  },
  director_id: {
    type: String,
  },
  user_id: {
    type: String,
  },
  engineers: [
    {
      assigned_task: { type: String },
    },
  ],
  isApproved: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  tender_status: {
    type: String,
    enum: ["purchased", "notPurchased", "expired", "cancelled"],
    default: "notPurchased",
  },
  isAssigned:{ type: String, default: 0 }, 
  status: { type: String, default: "Tender" },
  ongoing: { type: String, default: "draft" },
  details: {
    work_title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    type: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    client_name: { type: String, required: true, minlength: 3, maxlength: 50 },
    project_location: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    pec_category: {
      type: String,
      required: true,
    },
  },
  bid_bond: {
    bid_bond_fee: {
      type: Number,
      required: true,
    },
    bid_bond_shape: {
      type: String,
      required: true,
    },
    bid_bond_favor: {
      type: String,
      required: true,
    },
  },
  doc_fee: {
    bid_bond_doc_fee: {
      type: Number,
      required: true,
    },
    bid_bond_doc_shape: {
      type: String,
      required: true,
    },
    bid_bond_doc_favor: {
      type: String,
      required: true,
    },
  },

  tender: {
    tender_fee: {
      type: Number,
      required: true,
    },
    tender_shape: {
      type: String,
      required: true,
    },
    tender_favor: {
      type: String,
      required: true,
    },
  },
  doc_submission: {
    doc_date: {
      type: Date,
      required: true,
    },
    doc_time: {
      type: String,
      required: true,
    },
    doc_venue: {
      type: String,
      required: true,
    },
  },
  doc_purchase: {
    purchase_date: {
      type: Date,
      required: true,
    },
    purchase_time: {
      type: String,
      required: true,
    },
    purchase_venue: {
      type: String,
      required: true,
    },
  },
  Quotation_module:{
    type: String,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});
const Tender = mongoose.model("Tender", TenderSchema);
function validateTender(tender) {
  const schema = {
    engineers: Joi.array().items({
      engineer_id: Joi.string(),
      assigned_task: Joi.string(),
    }),
    details: Joi.object().keys({
      work_title: Joi.string().min(3).max(50).required(),
      type: Joi.string().min(3).max(50).required(),
      client_name: Joi.string().min(3).max(50).required(),
      project_location: Joi.string().min(3).max(50).required(),
      pec_category: Joi.string().min(3).max(50).required(),
    }),
    bid_bond: Joi.object().keys({
      bid_bond_fee: Joi.number().required(),
      bid_bond_shape: Joi.string().min(3).max(50).required(),
      bid_bond_favor: Joi.string().min(3).max(50).required(),
    }),
    doc_fee: Joi.object().keys({
      bid_bond_doc_fee: Joi.number().required(),
      bid_bond_doc_shape: Joi.string().min(3).max(50).required(),
      bid_bond_doc_favor: Joi.string().min(3).max(50).required(),
    }),
    tender: Joi.object().keys({
      tender_fee: Joi.number().required(),
      tender_shape: Joi.string().min(3).max(50).required(),
      tender_favor: Joi.string().min(3).max(50).required(),
    }),
    doc_submission: Joi.object().keys({
      doc_date: Joi.date().required(),
      doc_time: Joi.string().min(3).max(50).required(),
      doc_venue: Joi.string().min(3).max(50).required(),
    }),
    doc_purchase: Joi.object().keys({
      purchase_date: Joi.date().required(),
      purchase_time: Joi.string().min(3).max(50).required(),
      purchase_venue: Joi.string().min(3).max(50).required(),
    }),
    isApproved: Joi.string(),
    tender_status:Joi.string(),
    isAssigned:Joi.string(), 
    status:Joi.string(),
    created_at:Joi.string(),
    Quotation_module:Joi.string(),
    serial_no:Joi.string(),
  
  };
  return Joi.validate(tender, schema);
}
exports.Tender = Tender;
exports.validate = validateTender;
