const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { User } = require("../models/User");
const { Team, validate } = require("../models/Team");
const {Tender} = require('../models/Tender')
const {Itb} = require('../models/Itb')



router.post("/addTeam", auth, async (req, res) => {
 const { error } = validate(req.body);
 if (error) return res.status(400).json({msg: error.details[0].message});
    
  let team = new Team(req.body);
  team.save();
  let tender =  await Tender.updateOne(
    { _id: req.body.tender_id },
    { $set: { isAssigned: 1,  isApproved : 'approved'} },
    { new: true }
  )
  // tender.save();
  return res.json({
    message: "Team Created Successfully",
    team_id: team._id,
  });
});

router.post("/addTeam-newModule", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({msg: error.details[0].message});
     
   let team = new Team(req.body);
   team.save();
  
   // for change the status of tender
   let tender =  await Tender.updateOne(
     { _id: req.body.tender_id },
     { $set: { status : req.body.status} },
     { new: true }
   )
   // for assign to user with id
   let itb =  await Itb.updateOne(
    { tender_id: req.body.tender_id },
    { $set: {  assigned_eng_id: req.body.engineer} },
    { new: true }
  )
  
   // tender.save();
   return res.json({
     message: "Team Created Successfully",
     team_id: team._id,
   });
 });
 

 // add team for all module
 router.post("/addTeam-module", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({msg: error.details[0].message});
     
   let team = new Team(req.body);
   team.save();
  
   // for change the status of tender
   let tender =  await Tender.updateOne(
     { _id: req.body.tender_id },
     { $set: { status : req.body.status} },
     { new: true }
   )
  //  // for assign to user with id
  //  let itb =  await Itb.updateOne(
  //   { tender_id: req.body.tender_id },
  //   { $set: {  assigned_eng_id: req.body.engineer} },
  //   { new: true }
  // )
  
   // tender.save();
   return res.json({
     message: "Team Created Successfully",
     team_id: team._id,
   });
 });

module.exports = router;
