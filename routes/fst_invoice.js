const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { FST_invoice, validate } = require("../models/FST_invoice");

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({msg:"error.details[0].message"});

  let fst = new FST_invoice(req.body);
  await fst.save();
  return res.json({
    fst
  });
});



router.get("/", auth, async (req, res) => {
  let fst = await FST_invoice(req.body);
  await fst.save();
  return res.json({
    fst
  });
});

module.exports = router;
