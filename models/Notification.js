const mongoose = require("mongoose");
const Joi = require("joi");
const NotificationSchema = new mongoose.Schema({
  tender_id: {
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
  }
});

const Notification = mongoose.model("Notification", NotificationSchema);
function validateNotification(notification) {
  const schema = {
    tender_id: Joi.string().required(),
    to: Joi.string().required(),
    from: Joi.string().required(),
    message_id: Joi.string().required()
  };
  return Joi.validate(notification, schema);
}
exports.Notification = Notification;
exports.validate = validateNotification;
