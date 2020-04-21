const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Tender, validate } = require("../models/Tender");
const { Notfication } = require("../models/Notification");
const { Team } = require("../models/Team");

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log(auth);
  let tender = await Tender.findOne({ email: req.body.email });
  if (tender) return res.status(400).send("Tender already registered.");
  tender = new Tender(req.body);
  await tender.save();
  //Notification starts

  let user = await User.findOne({ _id: req.user._id });
  let to = user.director;
  let message = req.body.name + " Tender has been created ";
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
  });
});

router.get("/", auth, async (req, res) => {
  let user_id = req.user._id;
  let tender = await Tender.find({ director: user_id });
  if (!tender) return res.status(400).send("No tender created.");
  res.json({
    tender,
  });
});

router.get("/engineer", auth, async (req, res) => {
  let user_id = req.user._id;
  let tender = await Tender.find({ _id: user_id });
  if (!tender) return res.status(400).send("No tender created.");
  res.json({
    tender,
  });
});

router.get("/:id", auth, async (req, res) => {
  let user_id = req.user._id;
  let tender = await Tender.findOne({ director: user_id, _id: req.params.id });
  if (!tender) return res.status(400).send("No tender created.");
  res.json({
    tender,
  });
});

//PATCH OF TENDER NEEDS TO BE CHANGED

router.patch("/:id", auth, async (req, res) => {
  let tender = await Tender.find({
    _id: req.params.id,
    director: req.user._id,
  });
  if (!tender) return res.status(400).send("This Tender doesnot exists");
  tender = await Tender.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        phone: req.body.phone,
        cnic: req.body.cnic,
      },
    },
    { new: true }
  );
  return res.status(200).json({
    msg: "Tender has been updated",
  });
});

router.delete("/:id", auth, async (req, res) => {
  let tender = await Tender.deleteOne({
    _id: req.params.id,
    director: req.user._id,
  });
  if (!tender) return res.status(400).send("This Tender doesnot exists");
  res.json({
    tender,
  });
});

module.exports = router;
