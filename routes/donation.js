const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {Donation, validate } = require("../models/Donation");




// add Donation
router.post("/", async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).json({msg:error.details[0].message});
//   let req_email = req.body.email;
//   let email = req_email.toLowerCase();
//   let user = await Volunteer.findOne({ email: email });
//   if (user) return res.status(400).json({msg:"Volunteer already registered."});
  donation = new Donation(req.body);
//   user.email = email;
//   user.roles = 'Volunteer';
  await donation.save();
  res.json({
    message: "Donation added successfull",
    donation,
  });
});

// get all donation of a user

router.get("/user/donation", auth, async (req, res) => {
  let donation = await Donation.find({user_id : req.user._id});
  if (!donation) return res.status(400).json({msg:"There are no any donation!"});
  res.json({
    donation
  });
});

// get all donation of a user

router.get("/", auth, async (req, res) => {
  let donation = await Donation.find();
  if (!donation) return res.status(400).json({msg:"There are no any donation!"});
  res.json({
    donation
  });
});

// get donation by id
router.get("/:id", auth, async (req, res) => {
  let donation = await Donation.find({_id: req.params.id});
  if (!donation) return res.status(400).json({msg:"There is no Donation against this id!"});
  res.json({
    donation
  });
});


// for delete donation

router.delete("/:id", async (req, res) => {
  let donation = await Donation.deleteOne({ _id: req.params.id })
  if (!donation) return res.status(400).json({msg:"No Donation exsit by this id!"});
 
  res.json({
    msg: "Donation Deleted Succesfully"
  });
});


// update Donation 
router.post("/donation/:id", async (req, res) => {
let  donation_id = req.params.id;
let donation = await Donation.findByIdAndUpdate(
  { _id: donation_id },
  {
    $set: {
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      email: req.body.email,
      country: req.body.country,
      cnic: req.body.cnic,
      state: req.body.state,
      city: req.body.city,
      landline_no:  req.body.landline_no,
      description:  req.body.description,
      image:  req.body.image
     
    },
  },
  { new: true }
);

return res.json({
  msg:'Donation data Updated Successfully',
  
});
});




module.exports = router;
