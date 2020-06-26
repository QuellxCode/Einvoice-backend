const mongoose = require("mongoose");
const Joi = require("joi");
const NotificationSchema = new mongoose.Schema({
  tender_id:{
    type: String
  },
  next_module_id: {
    type: String
  },
  previous_module_id: {
    type: String
  },
  to: {
    type: String
  },
  from: {
    type: String
  },
  message: {
    type: String,
    required: true
  },
  status:{
    type: String,
  }

});

const Notification = mongoose.model("Notification", NotificationSchema);
function validateNotification(notification) {
  const schema = {
    tender_id: Joi.string(),
    next_module_id: Joi.string(),
    previous_module_id: Joi.string(),
    to: Joi.string().required(),
    from: Joi.string().required(),
    message_id: Joi.string().required(),
    status:Joi.string().required()
  };
  return Joi.validate(notification, schema);
}
exports.Notification = Notification;
exports.validate = validateNotification;
