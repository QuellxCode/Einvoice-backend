const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { PST_invoice, validate } = require("../models/PST_invoice");

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({msg:"error.details[0].message"});

  let pst = new PST_invoice(req.body);
  await pst.save();
  return res.json({
    pst
  });
});

router.get("/", auth, async (req, res) => {
  let pst = await PST_invoice(req.body);
  await pst.save();
  return res.json({
    pst
  });
});

module.exports = router;
