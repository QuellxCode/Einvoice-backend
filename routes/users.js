const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const auth = require("../middleware/auth");
const { User, validate } = require("../models/User");
const { Volunteer } = require("../models/Volunteer");




// signup user
router.post("/signup", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({msg:error.details[0].message});
  let req_email = req.body.email;
  let email = req_email.toLowerCase();
  let user = await User.findOne({ email: email });
  if (user) return res.status(400).json({msg:"User already registered."});
  const hash = await bcrypt.hash(req.body.password, 10);
  user = new User(req.body);
  user.email = email;
  user.password = hash;
  //user.roles = "Director";
  user.roles = 'user';
  await user.save();
  const token = jwt.sign(
    { _id: user._id, roles: user.roles },
    config.get("jwtPrivateKey")
  );
  //res.send(token);
  res.json({
    message: "signup successfull",
    user: user._id,
    token: token,
  });
});


// add volunteer

// signup user
router.post("/volunteer", async (req, res) => {
  let req_email = req.body.email;
  let email = req_email.toLowerCase();
  console.log('req body', req.body)
  console.log('req body2')
  let user = await Volunteer.findOne({ email: email });
  if (user) return res.status(400).json({msg:"Volunteer already registered."});
  user = new Volunteer(req.body);
  user.email = email;
  user.roles = 'Volunteer';
  await user.save();
  res.json({
    message: "Volunteer added successfull",
    user,
  });
});


// update user profile
router.post("/profile", auth, async (req, res) => {
  let user_id = req.user._id;
  let users = await User.findByIdAndUpdate(
    { _id: user_id },
    {
      $set: {
        address: req.body.address,
        phone: req.body.phone,
        name: req.body.name,
        email: req.body.email,
      },
    },
    { new: true }
  );

  return res.json({
    msg:'User Updated Successfully',
    
  });
});


// update user profile
router.post("/profile/:id", async (req, res) => {
  let user_id = req.params.id;
  let users = await User.findByIdAndUpdate(
    { _id: user_id },
    {
      $set: {
        address: req.body.address,
        phone: req.body.phone,
        name: req.body.name,
        email: req.body.email,
      },
    },
    { new: true }
  );

  return res.json({
    msg:'User Updated Successfully',
    email: users.email,
    cnic: users.cnic,
    phone: users.phone,
    name: users.name
    
  });
});


// for login user
router.post("/login", async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  console.log(req.body);
  if (!user) return res.status(404).json({ message: "User does not exist" });
  //const hash = await bcrypt.hash(req.body.password, 10);
  const compare = await bcrypt.compare(req.body.password, user.password);
  console.log(compare);
  if (compare) {
    const token = jwt.sign(
      { _id: user._id, roles: user.roles },
      config.get("jwtPrivateKey")
    );
    res.json({
      message: "login successfull",
      user_id: user._id,
      name: user.name,
      token: token,
      email: user.email,
      roles: user.roles,
      cnic: user.cnic,
      phone: user.phone,
      success: 1


      
    });
  } else {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
});


// for change user password
router.post("/changepassword",auth, async (req, res) => {
  let user = await User.findOne({ _id: req.user._id });
  console.log('user id', req.user._id );
  console.log('data', req.body );
  if (!user) return res.status(404).json({ message: "Invalid Activity!" });
  //const hash = await bcrypt.hash(req.body.password, 10);
  const compare = await bcrypt.compare(req.body.password, user.password);
  console.log(compare);
  if (compare) {
    const hash = await bcrypt.hash(req.body.new_password, 10);
    let users = await User.findByIdAndUpdate(
      { _id: req.user._id},
      {
        $set: {
          password: hash
        },
      },
      { new: true }
    );
    return res.status(200).json({ success: 1, message: "Password Change Successfully!" });

  } else {
    return res.status(400).json({ success: 0, message: "Your Password does not match with current password!" });
  }
});



// for admin user
router.post("/admin/login", async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  console.log(req.body);
  if (!user) return res.status(404).json({ message: "User does not exist" });
  if(user.roles !== 'admin') return res.status(404).json({ message: "User did not allow" , success: 0});
  //const hash = await bcrypt.hash(req.body.password, 10);
  const compare = await bcrypt.compare(req.body.password, user.password);
  console.log(compare);
  if (compare) {
    const token = jwt.sign(
      { _id: user._id, roles: user.roles },
      config.get("jwtPrivateKey")
    );
    res.json({
      message: "login successfull",
      user_id: user._id,
      name: user.name,
      token: token,
      email: user.email,
      roles: user.roles,
      cnic: user.cnic,
      phone: user.phone,
      success: 1
      
    });
  } else {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
});





  // for get user
  router.get("/", async (req, res) => {
    let user = await User.find();
    if (!user) return res.status(400).json({msg:"No user created yet!"});
    res.json({
       user
    });
  });
  

  // get user by id
  router.get("/user/:id", async (req, res) => {
    console.log('id', req.params.id)
    let user = await User.findOne({_id: req.params.id});
    if (!user) return res.status(400).json({msg:"No user exsit by this id!"});
    res.json({
        user
    });
  });
  

  // for delete user

  router.delete("/user/:id", async (req, res) => {
    let user = await User.deleteOne({ _id: req.params.id })
    if (!user) return res.status(400).json({msg:"No user exsit by this id!"});
   
    res.json({
      msg: "User Deleted Succesfully"
    });
  });



module.exports = router;
