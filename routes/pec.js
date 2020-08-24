const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const auth = require("../middleware/auth");
const { Pec, validate } = require("../models/Pec");

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({msg:"error.details[0].message"});
  console.log(auth);
  let pec = await Pec.findOne({ name: req.body.name });
  if (pec) return res.status(400).json({msg:"Pec Category already registered."});
  pec = new Pec(req.body);
  await pec.save();
  res.json({
    message: "Pec added successfully",
    pec: pec._id
  });
});

router.get("/", auth, async (req, res) => {
  let user_id = req.user._id;
  let pec = await Pec.find({ director: user_id });
  if (!pec) return res.status(400).json({msg:"No pec created."});
  res.json({
    pec
  });
});

router.get("/:id", auth, async (req, res) => {
  let user_id = req.user._id;
  let pec = await Pec.findOne({ director: user_id, _id: req.params.id });
  if (!pec) return res.status(400).json({msg:"No pec created."});
  res.json({
    pec
  });
});

router.patch("/:id", auth, async (req, res) => {
  let pec = await Pec.find({
    _id: req.params.id,
    director: req.user._id
  });
  if (!pec) return res.status(400).json({msg:"This Pec doesnot exists"});
  pec = await Pec.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        "details.pec_code": req.body.pec_code
      }
    },
    { new: true }
  );
  return res.status(200).json({
    msg: "Pec has been updated"
  });
});

router.delete("/:id", auth, async (req, res) => {
  let pec = await Pec.deleteOne({
    _id: req.params.id,
    director: req.user._id
  });
  if (!pec) return res.status(400).json({msg:"This Pec doesnot exists"});
  res.json({
    pec
  });
});

module.exports = router;
