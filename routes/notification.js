const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Tender, validate } = require("../models/Tender");
const { Notification } = require("../models/Notification");
const { Team } = require("../models/Team");
const { User } = require("../models/User");

router.post("/tender-accept-notification/:id", auth, async (req, res) => {
  let tender = await Tender.findOne({ _id: req.params.id });
  let user = await User.findOne({ _id: tender.user_id });
  let notification = new Notification();
  notification.to = user.director_id;
  notification.from = req.user._id;
  notification.message = "Tender Has Been Accepted";
  await notification.save();
  if (!tender) res.send(400).json({ msg: "No tender exists" });
  tender = await Tender.updateOne(
    { _id: account._id },
    {
      $set: {
        status: "1",
      },
    },

    { new: true }
  );
});

router.post("/tender-reject-notification/:id", auth, async (req, res) => {
  let tender = await Tender.findOne({ _id: req.params.id });
  let user = await User.findOne({ _id: tender.user_id });
  let notification = new Notification();
  notification.to = user.director_id;
  notification.from = req.user._id;
  notification.message = req.body.message;
  await notification.save();
  if (!tender) res.send(400).json({ msg: "No tender exists" });
  tender = await Tender.updateOne(
    { _id: account._id },
    {
      $set: {
        status: "2",
      },
    },

    { new: true }
  );
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
