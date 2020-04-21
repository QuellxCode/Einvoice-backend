const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const { Quotation, validate } = require("../models/Quotation");
const { Tender } = require("../models/Tender");
const verifyToken = require("../middleware/auth");
const config = require("config");
const router = express.Router();

//Add Quotation API

router.post("/post", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //let quotation = await Quotation.findOne({ quotationNo: req.body.quotationNo });
    //if (quotation) return res.status(400).send("Quotation already exists.");

    quotation = new Quotation(req.body);
    await quotation.save();
    res.json({
      message: "Quotation Created successfully",
      QuotationID: quotation._id
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.details[0].message);
  }
});

router.get("/getquotation/:id", async (req, res) => {
  let quotation = await Quotation.findOne({ _id: req.params.id });
  if (!quotation)
    return res.status(400).json({ msg: "Quotation does not exist" });
  res.status(200).json({
    quotation
  });
});

// Api to get all records
router.get("/get", async (req, res) => {
  let quotation = await Quotation.find({});
  console.log(quotation);
  res.status(200).json({
    quotation
  });
});

router.patch("/update-status/:id", async (req, res) => {
  try {
    let quotation = await Quotation.findByIdAndUpdate(
      { _id: req.params.id },
      { status: req.body.status }
    );
    if (!quotation) return res.status(400).send("Quotation doesn't exists.");

    res.status(200).json({
      msg: "Quotation status updated Sucessfully",
      quotation
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/assign-engineer/:id", async (req, res) => {
  let assigned_task;
  try {
    let tender = await Tender.findOne({ _id: req.params.id });
    if (tender.status == "Tender") {
      assigned_task = "ITB";
    } else if (tender.status == "ITB") {
      assigned_task = "Prepare Quotation";
    } else if (tender.status == "Prepare Quotation") {
      assigned_task = "Prepare bid bond";
    }
    let task = await Tender.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $addToSet: {
          engineers: [
            {
              engineer_id: req.body.engineer_id,
              assigned_task: req.body.assigned_task
            }
          ]
        }
      }
    );
    if (!task) return res.status(400).send("Tender doesn't exists.");

    res.status(200).json({
      msg: "Task Assigned to Engineer Sucessfully"
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/update/:id", async (req, res) => {
  // jwt.verify(req.token, config.get("jwtPrivateKey"), (err, authData) => {
  //  if (err) {
  //   return res
  //     .status(403)
  //     .json({ msg: "Access Denied, No or Wrong Token Provided" });
  //  }
  // });
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let quotation = await Quotation.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!quotation) return res.status(400).send("Quotation doesn't exists.");

    res.status(200).json({
      msg: "Quotation has been updated Sucessfully"
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/delete/:id", verifyToken, async (req, res) => {
  jwt.verify(req.token, config.get("jwtPrivateKey"), (err, authData) => {
    if (err) {
      return res
        .status(403)
        .json({ msg: "Access Denied, No or Wrong Token Provided" });
    }
  });
  let quotation = await Quotation.findByIdAndUpdate(
    { _id: req.params.id },
    { isActive: false }
  );
  if (!quotation || quotation.isActive === false)
    return res.status(400).send("Quotation doesn't exists.");

  res.status(200).json({
    msg: "Quotation has been deleted Sucessfully"
  });
});

module.exports = router;
