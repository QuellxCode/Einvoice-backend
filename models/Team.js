const mongoose = require("mongoose");
const Joi = require("joi");
const TeamSchema = new mongoose.Schema({
  director: {
    type: String,
    required: true
  },
  tender_id: {
    type: String,
    required: true
  },
  module_id :{
    type: String,
  },
  status: {
    type: String
  },
  engineer:{
    type: String
  },
  team: [
    {
      engineer: {
        type: String,
        required: true
      },
      manager: {
        type: String,
        required: true
      },
      accountant: {
        type: String,
        required: true
      }
    }
  ]
});

const Team = mongoose.model("Team", TeamSchema);
function validateTeam(team) {
  const schema = {
    team: Joi.array().items({
      engineer: Joi.string().required(),
      manager: Joi.string().required(),
      accountant: Joi.string().required()
    }),
    tender_id: Joi.string().required(),
    director: Joi.string().required(),
    status:Joi.string(),
    engineer:Joi.string(),
    module_id:Joi.string()
  };
  return Joi.validate(team, schema);
}
exports.Team = Team;
exports.validate = validateTeam;
