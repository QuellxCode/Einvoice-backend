const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const { Quotation, validate } = require("../models/Quotation");
const { Tender } = require("../models/Tender");
const verifyToken = require("../middleware/auth");
const config = require("config");
const router = express.Router();
const { User } = require("../models/User");
const auth = require("../middleware/auth");
const { Team } = require("../models/Team");
const { Itb } = require("../models/Itb");


//Add Quotation API

router.post("/post",auth, async (req, res) => {
 let user_id = req.user._id;
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({msg:"error.details[0].message"});

    //let quotation = await Quotation.findOne({ quotationNo: req.body.quotationNo });
    //if (quotation) return res.status(400).json({msg:""Quotation already exists.");

    quotation = new Quotation(req.body);
    quotation.engineer_id= user_id;
    await quotation.save();
    res.json({
      message: "Quotation Created successfully",
      QuotationID: quotation._id
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:error.details[0].message});
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
    if (!quotation) return res.status(400).json({msg:"Quotation doesn't exists."});

    res.status(200).json({
      msg: "Quotation status updated Sucessfully",
      quotation
    });
  } catch (error) {
    res.status(500).json({msg:error});
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
    if (!task) return res.status(400).json({msg:"Tender doesn't exists."});

    res.status(200).json({
      msg: "Task Assigned to Engineer Sucessfully"
    });
  } catch (error) {
    res.status(500).json({msg:error});
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
    if (error) return res.status(400).json({msg:error.details[0].message});

    let quotation = await Quotation.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!quotation) return res.status(400).json({msg:"Quotation doesn't exists."});

    res.status(200).json({
      msg: "Quotation has been updated Sucessfully"
    });
  } catch (error) {
    res.status(500).json({msg:error});
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
    return res.status(400).json({msg:"Quotation doesn't exists."});

  res.status(200).json({
    msg: "Quotation has been deleted Sucessfully"
  });
});



// refer to  employee for bid bond cermony
router.post("/add-eng-to-bid-bond-cermony", auth, async (req, res) => {
  try {
    user = await User.updateOne(
      { _id: req.body.id },
      { $set: { refer_for_bid_bond_cermony: 1 } },
      { new: true }
    );

    if (!user) return res.status(400).json({msg :"User doesn't exists."});

    res.status(200).json({
      msg: "Refer engineer for bid bond cermony successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:error.details[0].message});
  }
});


// update quotation status on director acceptance/rejection
router.post("/change-status/quotation", auth, async (req, res) => {
  try {
    quotation = await Quotation.updateOne(
      { _id: req.body.id },
      { $set: { status: req.body.status } },
      { new: true }
    );

    if (!quotation) return res.status(400).json({msg :"Quotation doesn't exists."});

    res.status(200).json({
      msg: "Status Change Successfully!"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:error.details[0].message});
  }
});


// get all quotation of that assign to engineer
router.get("/", auth, async (req, res) => {

  let user_id = req.user._id;
  let quotation = await Quotation.find({ engineer_id: user_id });    

  let tenders = [];
    let tenderr = await Tender.find({});
      for (let q of quotation) {
        for (let  t of tenderr) {
          console.log('quotation tender id',q.tender_id )
          console.log('quotation tender id',t._id )
       
          if (q.tender_id == t._id ) {
               tender = await Tender.findOne({ _id: q.tender_id });
               tenders.push(tender) 
          console.log('tender',tender )

             
           }
               
          }
      }
  console.log('tenser of quotaion',tenders )
  if (tenders == '')
    return res.status(400).json({ msg: "Tender's Quotation does not exist" });
  res.status(200).json({
    tenders
  });

  //   let user_id = req.user._id;
//   let team = await Team.find({ engineer: req.user._id });
//   console.log('userid', user_id)
//   console.log('team enginer', team)
// //  let quotation = await Quotation.find({ });

//   let tenders = [];
//     // team = await Team.find({});
//     for (let t of team) {
//        for (let team_eng of t.team) {
//         if (user_id === team_eng.engineer && t.status == 'Quotation_Sheet') {
//            tender = await Tender.findOne({ _id: t.tender_id });
//            tenders.push(tender)  
//           console.log('eng mein tender id', t.status)
//         }
       
//        }
//     }
   
//     // for remove null value from array
//     var data = tenders.filter(function (el) {
//       return el != null;
//     });
//     console.log('data quotation', data)
   
//   if (tenders == '')
//     return res.status(400).json({ msg: "Tender's Quotation does not exist" });
//   res.status(200).json({
//     data
//   });
});

// get quotation and tender of enginerr


router.get("/quotation-data/:id", auth, async (req, res) => {

  let id = req.params.id;
  let quotation = await Quotation.findOne({ tender_id: id });    
  let tender = await Tender.findOne({ _id:  id });    

  if (quotation == '' && tender == '')
    return res.status(400).json({ msg: "Tender's Quotation does not exist" });
  res.status(200).json({
    tender,
    quotation
  });

  
});


module.exports = router;
