const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { MeasureBook, validate } = require("../models/MeasureBook");

router.post("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({msg:"error.details[0].message"});
  let mb = new MeasureBook(req.body);
  mb.tender_id = req.params.id;
  await mb.save();
  return res.json({
    mb
  });
});

router.get("/", auth, async (req, res) => {
  let mb = await MeasureBook.find();
  if (!mb) return res.json({ message: "No measurebook found" });
  return res.json({
    mb
  });
});
router.get("/:id", auth, async (req, res) => {
  let mb = await MeasureBook.findOne({ _id: req.params.id });
  if (!mb)
    return res.json({ message: "No measurebook with such id found" });
  return res.json({
    mb
  });
});

router.delete("/:id", auth, async (req, res) => {
  let mb = await MeasureBook.findOne({ _id: req.params.id });
  if (!mb)
    return res.json({ message: "No measurebook with such id found" });
  mb = await MeasureBook.deleteOne({ _id: req.params.id });
  return res.json({
    message: "Measurebook has been deleted"
  });
});

module.exports = router;
