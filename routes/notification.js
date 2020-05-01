const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Tender, validate } = require("../models/Tender");
const { Notification } = require("../models/Notification");
const { Team } = require("../models/Team");
const { User } = require("../models/User");

router.post("/tender-accept-notification/:id", auth, async (req, res) => {
  let tender = await Tender.findOne({ _id: req.params.id });
  console.log(tender);
  let user = await User.findOne({ _id: tender.user_id });
  console.log(user);
  let notification = new Notification();
  notification.to = user._id;
  notification.from = req.user._id;
  notification.message = "Tender Has Been Accepted";
  await notification.save();
  if (!tender) res.send(400).json({ msg: "No tender exists" });
  tender = await Tender.updateOne(
    { _id: tender._id },
    {
      $set: {
        status: "ITB",
      },
    },

    { new: true }
  );
  console.log(tender);
  return res.json({
    message: "Tender has been accepted",
  });
});

router.post("/itb-accept-notification/:id", auth, async (req, res) => {
  let itb = await Itb.findOne({ _id: req.params.id });
  let tender = await Tender.findOne({ _id: itb.tender });
  let user = await User.findOne({ _id: tender.user_id });
  if (req.user.roles === "Manager") {
    let notification = new Notification();
    notification.from = req.user._id;
    notification.to = user.director;
    notification.message =
      "ITB Has Been Accepted By Manager. Sending to director";
    await notification.save();
  } else {
    let notification = new Notification();
    notification.from = req.user._id;
    notification.to = user._id;
    notification.message =
      "ITB Has Been Accepted By Director. Please Prepare Quotation";
    await notification.save();

    if (!tender) res.send(400).json({ msg: "No tender exists" });
    tender = await Tender.updateOne(
      { _id: tender._id },
      {
        $set: {
          status: "Prepare Quotation",
        },
      },

      { new: true }
    );
  }
  return res.json({
    message: "ITB has been accepted",
  });
});

router.post("/tender-reject-notification/:id", auth, async (req, res) => {
  let tender = await Tender.findOne({ _id: req.params.id });
  console.log(tender);
  let user = await User.findOne({ _id: tender.user_id });
  console.log(user);
  let notification = new Notification();
  notification.to = user.director_id;
  notification.from = req.user._id;
  notification.message = req.body.message;
  await notification.save();
  if (!tender) res.send(400).json({ msg: "No tender exists" });
  tender = await Tender.updateOne(
    { _id: tender._id },
    {
      $set: {
        status: "2",
      },
    },

    { new: true }
  );
  console.log(tender);
  return res.json({
    message: "Tender has been rejected",
  });
});

router.post("/send-notification", auth, async (req, res) => {
  let user = await User.findOne({ _id: req.user._id });
  let notification = new Notification();
  notification.to = user.director_id;
  notification.from = req.user._id;
  notification.message = req.body.message;
  await notification.save();
  return res.json({
    message: "Notification has been sent",
  });
});

router.get("/get-notification", auth, async (req, res) => {
  let notification = await Notification.find({ to: req.user._id });
  return res.json({
    notification,
  });
});

router.get("/get-notification/:id", auth, async (req, res) => {
  let notification = await Notification.findOne({ _id: req.params.id });
  let tender = await Tender.findOne({ _id: notification.message });
  return res.json({
    notification,
    tender,
  });
});

module.exports = router;
