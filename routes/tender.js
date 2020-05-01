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
  tender = new Tender(req.body);
  console.log(typeof req.user._id);
  eng.engineer_id = user_id;
  eng.assigned_status = "tender info";
  let user = await User.findOne({ _id: req.user._id });
  tender.user_id = req.user._id;
  tender.director_id = user.director;
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
    tenders,
  });
});

router.get("/", auth, async (req, res) => {
  let user_roles = req.user.roles;
  let user_id = req.user._id;
  let tender_array = [];
  let tender = await Tender.find();
  // if (user_roles == "Director") {
  //   tender = await Tender.find({ director: user_id });
  // } else {
  //   team = await Team.find({});
  //   for (let t of team) {
  //     for (let team_member of t.team) {
  //       if (user_id == team_member.engineer || user_id == team_member.manager) {
  //         tender = await Tender.findOne({ _id: t.tender_id });
  //         tender_array.push(tender);
  //       }
  //     }
  //   }
  // }
  if (!tender) return res.status(400).send("No tender created.");
  res.json({
    tender,
  });
});

router.get("/:id", auth, async (req, res) => {
  let user_id = req.user._id;
  let tender = await Tender.findOne({ _id: req.params.id });
  if (!tender) return res.status(400).send("No tender created.");
  res.json({
    tender,
  });
});

//PATCH OF TENDER NEEDS TO BE CHANGED

router.patch("/:id", auth, async (req, res) => {
  let tender = await Tender.find({
    _id: req.params.id,
  });
  if (!tender) return res.status(400).send("This Tender doesnot exists");
  tender = await Tender.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        details: req.body.details,
        bid_bond: req.body.bid_bond,
        tender: req.body.tender,
        doc_fee: req.body.doc_fee,
        doc_submission: req.body.doc_submission,
        doc_purchase: req.body.doc_purchase,
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

router.patch("/approval-update/:id", async (req, res) => {
  try {
    let tender = await Tender.updateOne(
      { _id: req.params.id },
      { isApproved: req.body.isApproved }
    );

    tender = await Tender.findOne({ _id: req.params.id });

    if (!tender) return res.status(400).send("Tender doesn't exists.");

    res.status(200).json({
      msg: "Tender updated Sucessfully",
      tender,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
