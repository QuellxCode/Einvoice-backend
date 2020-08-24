const mongoose = require("mongoose");
const Joi = require("joi");
const WorkDoneSchema = new mongoose.Schema({
  tender_id:{
    type: String,
  },
  workorder_id:{
    type: String,
  },
  details: [
    {
      item:{
        type: String, 
      },
      mb_sheet:{
        type: String,
      },
      description: {
        type: String,
       
      },
      unit: {
        type: String,
        
      },
      rate: {
        type: String,
        
      },
      quantity: {
        type: String,
        
      },
      amount: {
        type: String
      }
    }
  ],
  mb: [
    {
      boq_item: {
        type: String,
        },
      description: {
        type: String,
       
      },
      nos: {
        type: String,
        },
      total: {
        type: String,
      }
      
    }
  ],
  
  // nonboq: [
  //   {
  //     item_name: {
  //       type: String,
  //       required: true
  //     }
  //   }
  // mb_id: {
  //   type: String,
  //   required: true
  // },
  
});
const WorkDone = mongoose.model("WorkDone", WorkDoneSchema);
function validateWorkDone(wd) {
  const schema = {
    // mb_id: Joi.string().required(),
    tender_id : Joi.string(),
    workorder_id : Joi.string(),
    details: Joi.array().items({
      item:Joi.string(),
      description: Joi.string(),
      mb_sheet:Joi.string(),
      unit: Joi.string(),
      rate: Joi.string(),
      quantity: Joi.string(),
      amount: Joi.string()
    }),
    mb: Joi.array().items({
      boq_item:Joi.string(),
      description: Joi.string(),
      nos: Joi.string(),
      total: Joi.string(),
    }),
    // nonboq: Joi.string().items({
    //   item_name: Joi.string().required()
    // })
  };
  return Joi.validate(wd, schema);
}
exports.WorkDone = WorkDone;
exports.validate = validateWorkDone;
