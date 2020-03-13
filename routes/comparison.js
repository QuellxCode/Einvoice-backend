const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Tender } = require("../models/Tender");
const { Itb } = require("../models/Itb");

router.get("/:id", auth, async (req, res) => {
  let result = [];
  let itb = await Itb.findOne({ tender_id: req.params.id });
  let tender = await tender.findOne({ _id: req.params.id });
  result.push(itb);
  result.push(tender);

  return res.json({
    result
  });
});

module.exports = router;
