const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { WorkDone, validate } = require("../models/WorkDone");

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let wd = new WorkDone(req.body);
  await wd.save();
  return res.json({
    wd
  });
});

router.get("/", auth, async (req, res) => {
  let wd = await WorkDone.find({});
  return res.json({
    wd
  });
});

router.get("/:id", auth, async (req, res) => {
  let wd = await WorkDone.findOne({ _id: req.params.id });
  return res.json({
    wd
  });
});

module.exports = router;
