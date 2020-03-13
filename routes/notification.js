const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Tender, validate } = require("../models/Tender");
const { Notfication } = require("../models/Notification");
const { Team } = require("../models/Team");

router.post("/accept-notification/:id",auth, async(req,res)=>{
let tender =  await Tender.findOne({_id:req.params.id})
if(!tender)
res.send(400).json({msg:"No tender exists"});
tender = await Tender.updateOne( { _id: account._id },
    {
      $set: {
        status: "1"
      }
    },

    { new: true }
  );

})
router.post("/reject-notification/:id",auth, async(req,res)=>{
    let tender =  await Tender.findOne({_id:req.params.id})
    if(!tender)
    res.send(400).json({msg:"No tender exists"});
    tender = await Tender.updateOne( { _id: account._id },
        {
          $set: {
            status: "2"
          }
        },
    
        { new: true }
      );
    
    })
module.exports= router;