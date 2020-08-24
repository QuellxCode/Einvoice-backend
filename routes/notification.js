const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Tender, validate } = require("../models/Tender");
const { Notification } = require("../models/Notification");
const { Team } = require("../models/Team");
const { User } = require("../models/User");
const {Itb} = require('../models/Itb')
const { Quotation } = require("../models/Quotation");
const { QuotationLog } = require("../models/QuotationLog");

router.post("/accept-notification/:id", auth, async (req, res) => {
  let tender = await Tender.findOne({ _id: req.params.id });
  if (!tender) res.send(400).json({ msg: "No tender exists" });
  let user = await User.findOne({ _id: tender.user_id });
  // let notification = new Notification();
  // notification.to = user._id;
  // notification.from = req.user._id;
  // notification.message = "Tender Has Been Accepted";
  // await notification.save();
  tender = await Tender.updateOne(
    { _id: tender._id },
    {
      $set: {
        status: req.body.status,
      },
    },

    { new: true }
  );
  console.log(tender);
  return res.json({
    message: "Your Request has been accepted",
  });
});

router.post("/prepare-quotation-notification/:id", auth, async (req, res) => {
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
  notification.status= req.body.status
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
  // notification.director = user.director_id;
  notification.to = user.director;
  notification.from = req.user._id;
  notification.message = req.body.message;
  notification.tender_id = req.body.tender_id;
  // notification.module_id = req.body.module_id;
  notification.next_module_id = req.body.next_module_id;
  notification.previous_module_id = req.body.previous_module_id;
  notification.status= req.body.status
  await notification.save();
  return res.json({
    message: "Notification has been sent",
  });
});


router.post("/send-notify-manager", auth, async (req, res) => {
  let user = await User.findOne({ _id: req.user._id });
  let team = await Team.findOne({ module_id: req.body.previous_module_id })
  console.log('team', team)
  let notification = new Notification();
  // notification.director = user.director_id;
  notification.to = team.team[0].manager;
  notification.from = req.user._id;
  notification.message = req.body.message;
  notification.tender_id = req.body.tender_id;
  notification.next_module_id = req.body.next_module_id;
  notification.previous_module_id = req.body.previous_module_id;
  notification.status= req.body.status
  await notification.save();
  return res.json({
    message: "Notification has been sent",
  });
});

// // send notification to manager for quotation module
// router.post("/send-quotation-notify-manager", auth, async (req, res) => {
//   let user = await User.findOne({ _id: req.user._id });
//   let team = await Team.findOne({ module_id: req.body.mdoule_id  })
//   let notification = new Notification();
//   // notification.director = user.director_id;
//   notification.to = team.team[0].manager;
//   notification.from = req.user._id;
//   notification.message = req.body.message;
//   notification.module_id = req.body.module_id;
//   notification.status= req.body.status
//   await notification.save();
//   return res.json({
//     message: "Notification has been sent",
//   });
// });




router.get("/get-notification", auth, async (req, res) => {
  let notification = await Notification.find({ to: req.user._id });
  return res.json({
    notification,
  });
});

router.get("/get-notification/:id", auth, async (req, res) => {
  let notification = await Notification.findOne({ _id: req.params.id });
  let tender = await Tender.findOne({ _id: notification.tender_id });
  let ibt = await Itb.findOne({ _id: notification.next_module_id });
  return res.json({
    notification,
    tender,
    ibt
  });
});

// get detail of single ITB notification 
router.get("/get-notification/ibt/:id", auth, async (req, res) => {
  let notification = await Notification.findOne({ _id: req.params.id });
  let itb = await Itb.findOne({ _id: notification.next_module_id });
  let tender =  await Tender.findOne({ _id: notification.previous_module_id });
  return res.json({
    notification,
    tender, 
    itb
  });
});

// get detail of single quotation notification 
router.get("/get-notification/quotation/:id", auth, async (req, res) => {
  let notification = await Notification.findOne({ _id: req.params.id });
  let quotation = await Quotation.findOne({ _id: notification.next_module_id });
  let tender =  await Tender.findOne({ _id: notification.tender_id });
  return res.json({
    notification,
    tender, 
    quotation
  });
});

// notification goes to engineer

router.post("/send-notify-eng", auth, async (req, res) => {
  let user = await User.findOne({ _id: req.user._id });
  let team = await Team.findOne({ module_id: req.body.previous_module_id })
  console.log('team', team)
  let notification = new Notification();
  // notification.director = user.director_id;
  notification.to = team.team[0].engineer;
  notification.from = req.user._id;
  notification.message = req.body.message;
  notification.tender_id = req.body.tender_id;
  notification.next_module_id = req.body.next_module_id;
  notification.previous_module_id = req.body.previous_module_id;
  notification.status= req.body.status
  await notification.save();
  return res.json({
    message: "Notification has been sent Manager",
  });
});

// send notification both eng and director og quotation log

router.post("/send-notify-both/:id", auth, async (req, res) => {
  let quotationlog = await QuotationLog.findOne({ _id: req.params.id })
  let team = await Team.findOne({ tender_id: quotationlog.tender_id })
   let director = team.director;
   let manager = team.team[0].manager
  // add manger and dorector to quotaion log
   quotationLogg =  await QuotationLog.updateOne(
    { _id: req.params.id },
    { $set: { manager_id: manager, director_id: director} },
    { new: true }
  )

  let notification = new Notification();
  // notification.director = user.director_id;
  notification.to = director;
  notification.from = req.user._id;
  notification.message = 'New Quotation log is added by Engineer';
  notification.tender_id = team.tender_id;
  notification.next_module_id = quotationlog._id;
  // notification.previous_module_id = req.body.previous_module_id;
  notification.status= 'Quotation_Sheet'
  await notification.save();

  let notification1 = new Notification();
  // notification.director = user.director_id;
  notification1.to = manager;
  notification1.from = req.user._id;
  notification1.message = 'New Quotation log is added by Engineer';
  notification1.tender_id = team.tender_id;
  notification1.next_module_id = quotationlog._id;
  // notification.previous_module_id = req.body.previous_module_id;
  notification1.status= 'Quotation_Sheet'
  await notification1.save();
  return res.json({
    message: "Notification has been sent",
  });
});


module.exports = router;
