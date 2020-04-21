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
  if (error) return res.status(400).send(error.details[0].message);
  let tender = await Tendor.findOne(req.params.id);
  if (!tender) res.json({ msg: "No tender with such id exists" });
  itb = new Itb(req.body);
  itb.tender_id = req.params.id;
  itb.save();
  return res.send(200).json({
    itb
  });
});

router.get("/", auth, async (req, res) => {
  let user_id = req.user._id;
  let user = await User.findOne({ _id: user_id });
  let itb = await Itb.find({ direct_id: user.director });
  if (!itb) return res.json({ msg: "No itb exists" });
  return res.status(200).json({
    itb
  });
});
router.patch("/", auth, async (req, res) => {});

router.get("/:id", auth, async (req, res) => {
  let user_id = req.user._id;
  let user = await User.findOne({ _id: user_id });
  let itb = await Itb.findOne({ direct_id: user.director, _id: req.params.id });
  if (!itb) return res.json({ msg: "No itb exists" });
  return res.status(200).json({
    itb
  });
});

router.delete("/:id", auth, async (req, res) => {
  let user_id = req.user._id;
  let user = await User.findOne({ _id: user_id });
  let itb = await Itb.findOne({ direct_id: user.director, _id: req.params.id });
  itb = await Itb.deleteOne({ id: req.params.id });
});

module.exports = router;
