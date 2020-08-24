const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const auth = require("../middleware/auth");
const { User } = require("../models/User");
const { Tender } = require("../models/Tender");
const { Itb } = require("../models/Itb");
const { WorkOrder, validate } = require("../models/WorkOrder");
const { QuotationLog } = require("../models/QuotationLog");

router.post("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({msg:"error.details[0].message"});
  let tender = await Tender.findOne({_id:req.params.id});
  if (!tender) res.json({ msg: "No tender with such id exists" });
  let workorder = new WorkOrder(req.body);
  workorder.tender_id = req.params.id;
  workorder.save();
  return res.json({
    workorder,
    tender,
    // itb
  });
});

router.get("/workorder-list", auth, async (req, res) => {
  const role = req.user.roles;
  let workorder  ;
   
  if(role === 'Director'){
       workorder = await QuotationLog.find({director_id : req.user._id});
  }else{
      workorder = await QuotationLog.find({manager_id : req.user._id});
  }
   
  if (!workorder) res.json({ msg: "No WordOrder exists" });
  res.json({
    workorder,
  });
});

router.get("/:id", auth, async (req, res) => {
  let workorder = await WorkOrder.findOne({ _id: req.params.id });
  if (!workorder) res.json({ msg: "No WordOrder with such id exists" });
  return res.json({
    workorder
  });
});

router.delete("/:id", auth, async (req, res) => {
  let workorder = await WorkOrder.findOne({ _id: req.params.id });
  if (!workorder) res.json({ msg: "No WordOrder with such id exists" });
  workorder = await WorkOrder.deleteOne({ _id: req.params.id });
  return res.json({
    message: "Work Order has been deleted"
  });
});

module.exports = router;
