const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {DonationRequest, validate } = require("../models/DonationRequest");
const { DonationProduct } = require("../models/DonationProduct");




// add DonationRequest
router.post("/", async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).json({msg:error.details[0].message});
//   let req_email = req.body.email;
//   let email = req_email.toLowerCase();
//   let user = await Volunteer.findOne({ email: email });
//   if (user) return res.status(400).json({msg:"Volunteer already registered."});
  donationRequest = new DonationRequest(req.body);
  donationRequest.products = req.body.products;
  console.log('product', req.body.products)

//   user.email = email;
//   user.roles = 'Volunteer';
  await donationRequest.save();
  res.json({
    message: "DonationRequest added successfull",
    donationRequest,
  });
});

// get all DonationRequest of a user

router.get("/user/donation", auth, async (req, res) => {
  let donationRequest = await DonationRequest.find({user_id : req.user._id});
  if (!donationRequest) return res.status(400).json({msg:"There are no any DonationRequest!"});
  res.json({
    donationRequest
  });
});

// get all DonationRequest of a user

router.get("/", async (req, res) => {
  let donationRequest = await DonationRequest.find();
  if (!donationRequest) return res.status(400).json({msg:"There are no any DonationRequest!"});
  res.json({
    donationRequest
  });
});

// get DonationRequest by id
router.get("/:id", auth, async (req, res) => {
  let donationRequest = await DonationRequest.find({_id: req.params.id});
  if (!donationRequest) return res.status(400).json({msg:"There is no DonationRequest against this id!"});
  res.json({
    donationRequest
  });
});

// get request of user
router.get("/req/:id", auth, async (req, res) => {
 console.log('id', req.user._id )
  let donationRequest = await DonationRequest.find({ user_id:  req.params.id })
  if (!donationRequest) return res.status(400).json({msg:"No donationRequest exsit by this id!"});
 
  res.json({
    donationRequest
  });
});

// for delete DonationRequest

router.delete("/:id", async (req, res) => {
  let donationRequest = await DonationRequest.deleteOne({ _id: req.params.id })
  if (!donationRequest) return res.status(400).json({msg:"No DonationRequest exsit by this id!"});
 
  res.json({
    msg: "DonationRequest Deleted Succesfully"
  });
});


// update DonationRequest 
router.post("/donation/:id", async (req, res) => {
let  donationRequest_id = req.params.id;
let pro_status = 1;
if(req.body.status == 'Approved' || req.body.status == 'Donat e'){
 pro_status = 0 
}
let request =  await DonationRequest.findById({_id : donationRequest_id }) 

let donationProduct = await DonationProduct.findByIdAndUpdate(
  { _id:  request.products[0]._id },
  {
    $set: {
      status: pro_status,
    },
  },
  { new: true }
);


let donationRequest = await DonationRequest.findByIdAndUpdate(
  { _id: donationRequest_id },
  {
    $set: {
      status: req.body.status,
    },
  },
  { new: true }
);

return res.json({
  msg:'DonationRequest data Updated Successfully',
  
});
});




module.exports = router;
