const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {Volunteer, validate } = require("../models/Volunteer");




// add Volunteer
router.post("/", async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).json({msg:error.details[0].message});
//   let req_email = req.body.email;
//   let email = req_email.toLowerCase();
//   let user = await Volunteer.findOne({ email: email });
//   if (user) return res.status(400).json({msg:"Volunteer already registered."});
  volunteer = new Volunteer(req.body);
//   user.email = email;
//   user.roles = 'Volunteer';
  await volunteer.save();
  res.json({
    message: "You are successfull become Volunteer",
    volunteer,
  });
});

// get all volunteer

router.get("/", async (req, res) => {
  let volunteer = await Volunteer.find({});
  console.log('vouluntere', volunteer)
  if (!volunteer) return res.status(400).json({msg:"There is no volunteer!"});
  res.json({
    volunteer
  });
});

// get volunteer by id
router.get("/:id", async (req, res) => {
    let volunteer = await Volunteer.find({_id: req.params.id});
    if (!volunteer) return res.status(400).json({msg:"There is no volunteer against this id!"});
    res.json({
      volunteer
    });
  });
  

// for delete volunteer

router.delete("/:id", async (req, res) => {
    let volunteer = await Volunteer.deleteOne({ _id: req.params.id })
    if (!volunteer) return res.status(400).json({msg:"No volunteer exsit by this id!"});
   
    res.json({
      msg: "volunteer Deleted Succesfully"
    });
  });


  // update volunteer 
router.post("/volunteer/:id", async (req, res) => {
  let  volunteer_id = req.params.id;
  let volunteer = await Volunteer.findByIdAndUpdate(
    { _id: volunteer_id },
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
       
      },
    },
    { new: true }
  );

  return res.json({
    msg:'Volunteer data Updated Successfully',
    
  });
});





module.exports = router;
