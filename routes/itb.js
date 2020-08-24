const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const auth = require("../middleware/auth");
const { User } = require("../models/User");
const { Tender } = require("../models/Tender");
const { Itb, validate } = require("../models/Itb");

router.post("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({msg:error.details[0].message});
  let tender = await Tender.findOne({ _id: req.params.id });
  if (!tender) res.json({ msg: "No tender with such id exists" });
  tender = await Tender.updateOne(
    { _id: req.params.id },
    { $set: { status: "ITB" } },
    { new: true }
  );
  itb = new Itb(req.body);
  itb.tender_id = req.params.id;
  itb.save();
  return res.status(200).json({
    message: "ITB Saved Successfully",
    itb_id: itb._id,
    tender_id : itb.tender_id
  });
});

router.get("/", auth, async (req, res) => {
  let user_id = req.user._id;
  let user = await User.findOne({ _id: user_id });
  let itb = await Itb.find({});
  if (!itb) return res.json({ msg: "No itb exists" });
  return res.status(200).json({
    itb,
  });
});

/* serial_number: {
  type: Number,
  required: true
},
Diary: {
  type: Number,
  required: true
},
tender_recieve: { type: Date, default: Date.now },
title: {
  type: String,
  required: true
},
type: {
  type: String,
  required: true
},
client_name: {
  type: String,
  required: true
},
location: {
  type: String,
  required: true
},
source: {
  type: String,
  required: true
},
bid_bond_percent: {
  type: Number,
  required: true
},
remarks: {
  type: String,
  required: true
},
tendor_recieved_by: {
  type: String,
  required: true
},
deadline: {
  type: Date,
  required: true
},
*/

router.patch("/:id", auth, async (req, res) => {
  let itb = await Itb.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        serial_number: req.body.serial_number,
        Diary: req.body.Diary,
        title: req.body.title,
        type: req.body.type,
        client_name: req.body.client_name,
        location: req.body.location,
        source: req.body.source,
        bid_bond_percent: req.body.bid_bond_percent,
        remarks: req.body.remarks,
        tendor_recieved_by: req.body.tendor_recieved_by,
        deadline: req.body.deadline,
      },
    },
    { new: true }
  );
  return res.status(200).json({
    msg: "Itb has been updated",
  });
});

router.get("/:id", auth, async (req, res) => {
  let user_id = req.user._id;
  let user = await User.findOne({ _id: user_id });
  let itb = await Itb.findOne({ direct_id: user.director, _id: req.params.id });
  if (!itb) return res.json({ msg: "No itb exists" });
  return res.status(200).json({
    itb,
  });
});

router.delete("/:id", auth, async (req, res) => {
  let user_id = req.user._id;
  let user = await User.findOne({ _id: user_id });
  let itb = await Itb.findOne({ direct_id: user.director, _id: req.params.id });
  itb = await Itb.deleteOne({ id: req.params.id });
});

module.exports = router;
