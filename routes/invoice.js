const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Invoice, validate } = require("../models/Invoice");

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let invoice = new Invoice(req.body);
  await invoice.save();

  return res.json({
    invoice
  });
});

router.get("/", auth, async (req, res) => {
  let invoice = await Invoice(req.body);
  await invoice.save();
  return res.json({
    invoice
  });
});

module.exports = router;
