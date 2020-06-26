const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { QuotationLog, validate } = require("../models/QuotationLog");
const { Quotation } = require("../models/Quotation");
const { Team } = require("../models/Team");
const { Tender } = require("../models/Tender");



router.post("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({msg:error.details[0].message});
  let tender = await Tender.findOne({ _id: req.params.id });
  if (!tender) res.json({ msg: "No tender with such id exists" });
  tender = await Tender.updateOne(
    { _id: req.params.id },
    { $set: { status: "Quotation_Sheet" } },
    { new: true }
  );
  let quotationLog = new QuotationLog(req.body);
  quotationLog.tender_id = req.params.id;
  quotationLog.engineer_id = req.user._id;
  quotationLog.save();
  return res.status(200).json({
    message: "Quotation Log Created Successfully",
    QuotationLogID: quotationLog._id,
    tender_id : quotationLog.tender_id
  });
});

// router.post("/:id", auth, async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   let quotationLog = new QuotationLog(req.body);
//   await quotationLog.save();
//   return res.json({
//     message: "Quotation Log Created successfully",
//     QuotationLogID: quotationLog._id,
//   });
// });

router.get("/:id", auth, async (req, res) => {
  let quotationLog = await QuotationLog.findOne({ _id: req.params.id });
  if (!quotationLog)
    return res.status(400).json({ msg: "Quotation Log does not exist" });
  res.status(200).json({
    quotationLog,
  });
});

router.post("/change-log-status/:id", auth, async (req, res) => {
   let quotationLog = await QuotationLog.findById({ _id: req.params.id });
 console.log('req body id', quotationLog )
 console.log('req.body.status', req.body.status )
  quotationLogg =  await QuotationLog.updateOne(
    { _id: quotationLog._id },
    { $set: { status: req.body.status} },
    { new: true }
  )

  
  if (!quotationLog)
    return res.status(400).json({ msg: "Quotation Log does not exist" });
  res.status(200).json({
    quotationLog,
    msg : 'Status will update sucessfully!'
  });
});


// get all quotation of that assign to engineer
// router.get("/", auth, async (req, res) => {
//   let user_id = req.user._id;
//   let team = await Team.find({ engineer: user_id });
//   console.log('userid', user_id)
//   console.log('team enginer', team.engineer)
// //  let quotation = await Quotation.find({ });

//   let quotation_log = [];
//     // team = await Team.find({});
//     for (let t of team) {
//       // for (let team_eng of t.team) {
//         if (user_id === t.engineer  ) {
//            quotation = await Quotation.findOne({ _id: t.module_id });  
//         }
        
//       // }
//     }
//     quotation_log.push(quotation);
//     console.log('array', quotation_log)
//   if (quotation == '')
//     return res.status(400).json({ msg: "Quotation Log does not exist" });
//   res.status(200).json({
//     quotation_log,
//   });
// });



// get all quotation tender of that assign to engineer
router.get("/", auth, async (req, res) => {
  let quotationlog = await QuotationLog.find({engineer_id: req.user._id });

  //   let user_id = req.user._id;
//   let team = await Team.find({ engineer: req.user._id });
//   console.log('userid', user_id)
//   console.log('team enginer', team)
// //  let quotation = await Quotation.find({ });

//   let tenders = [];
//     // team = await Team.find({});
//     for (let t of team) {
//        for (let team_eng of t.team) {
//         if (user_id === team_eng.engineer) {
//            tender = await Tender.findOne({ _id: t.tender_id });
//            tenders.push(tender)  
//         }
       
//        }
//     }
   
//     // for remove null value from array
//     var data = tenders.filter(function (el) {
//       return el != null;
//     });
   
    // console.log('data tender', data)
  if (quotationlog == '')
    return res.status(400).json({ msg: "Tender's Quotation Log does not exist" });
  res.status(200).json({
    quotationlog
  });
});


module.exports = router;
