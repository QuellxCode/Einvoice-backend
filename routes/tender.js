const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Tender, validate } = require("../models/Tender");
const { Notification } = require("../models/Notification");
const { Team } = require("../models/Team");
const { User } = require("../models/User");

router.post("/", auth, async (req, res) => {
  let eng = [];
  let user_id = req.user._id;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let tender = await Tender.findOne({ email: req.body.email });
  //if (tender) return res.status(400).send("Tender already registered.");
  tender = new Tender(req.body);
  console.log(typeof req.user._id);
  eng.engineer_id = user_id;
  eng.assigned_status = "tender info";
  await tender.save();
  console.log(tender._id);
  let tender_id = tender._id;
  tenders = await Tender.updateOne(
    { _id: tender_id },
    { $set: { engineers: eng } },
    { new: true }
  );
  console.log(tenders);
  //Notification starts

  let user = await User.findOne({ _id: req.user._id });
  let to = user.director;
  let message = req.body.details.work_title + " Tender has been created ";
  let from = req.user._id;
  let notification = new Notification();

  notification.to = to;
  notification.director = to;
  notification.from = from;
  notification.message = message;
  notification.save();

  //Notification ends
  res.json({
    message: "Tender added successfully",
    tender: tender._id,
    tenders
  });
});

router.get("/", auth, async (req, res) => {
  let user_id = req.user._id;
  let tender = await Tender.find({ director: user_id });
  if (!tender) return res.status(400).send("No tender created.");
  res.json({
    tender
  });
});

router.get("/:id", auth, async (req, res) => {
  let user_id = req.user._id;
  let tender = await Tender.findOne({ director: user_id, _id: req.params.id });
  if (!tender) return res.status(400).send("No tender created.");
  res.json({
    tender
  });
});

//PATCH OF TENDER NEEDS TO BE CHANGED

router.patch("/:id", auth, async (req, res) => {
  let tender = await Tender.find({
    _id: req.params.id,
    director: req.user._id
  });
  if (!tender) return res.status(400).send("This Tender doesnot exists");
  tender = await Tender.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        phone: req.body.phone,
        cnic: req.body.cnic
      }
    },
    { new: true }
  );
  return res.status(200).json({
    msg: "Tender has been updated"
  });
});

router.delete("/:id", auth, async (req, res) => {
  let tender = await Tender.deleteOne({
    _id: req.params.id,
    director: req.user._id
  });
  if (!tender) return res.status(400).send("This Tender doesnot exists");
  res.json({
    tender
  });
});

module.exports = router;
