const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { QuotationLog, validate } = require("../models/QuotationLog");

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let quotationLog = new QuotationLog(req.body);
  await quotationLog.save();
  return res.json({
    message: "Quotation Log Created successfully",
    QuotationLogID: quotationLog._id
  });
});

router.get("/:id", auth, async (req, res) => {
    let quotationLog = await QuotationLog.findOne({ _id: req.params.id });
    if (!quotationLog) return res.status(400).json({ msg: "Quotation Log does not exist" });
    res.status(200).json({
        quotationLog
    });
});

module.exports = router;
