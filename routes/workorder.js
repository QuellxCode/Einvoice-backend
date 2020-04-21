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

router.post("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let tender = await Tendor.findOne(req.params.id);
  if (!tender) res.json({ msg: "No tender with such id exists" });
  let workorder = new WorkOrder(req.body);
  workorder.tender_id = req.params.id;
  workorder.save();
  return res.send(200).json({
    workorder,
    tender,
    itb
  });
});

router.get("/", auth, async (req, res) => {
  let workorder = await WorkOrder.find({});
  if (!workorder) res.json({ msg: "No WordOrder exists" });
  return res.send(200).json({
    workorder
  });
});

router.get("/:id", auth, async (req, res) => {
  let workorder = await WorkOrder.findOne({ _id: req.params.id });
  if (!workorder) res.json({ msg: "No WordOrder with such id exists" });
  return res.send(200).json({
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
