const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const auth = require("../middleware/auth");
const { User, validate } = require("../models/User");
const { Team } = require("../models/Team");

router.post("/signup", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");
  const hash = await bcrypt.hash(req.body.password, 10);
  user = new User(req.body);
  user.password = hash;
  //user.roles = "Director";
  user.roles = "CEO";
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

router.post("/login", (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error(err);
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        if (user) {
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
          });
        } else {
          res.send("not login");
        }
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log(auth);
  let employee = await User.findOne({ email: req.body.email });
  let cnic = await User.findOne({ cnic: req.body.cnic });
  if (employee || cnic) return res.status(400).send("User already registered.");
  const hash = await bcrypt.hash(req.body.password, 10);
  employee = new User(req.body);
  employee.director = req.user._id;
  employee.phone = req.body.address;
  employee.password = hash;
  await employee.save();
  res.json({
    message: "User added successfully",
    employee: employee._id,
  });
});

router.get("/", auth, async (req, res) => {
  let user_id = req.user._id;
  let employee = await User.find({ director: user_id });
  if (!employee) return res.status(400).send("No employee created.");
  res.json({
    employee,
  });
});

router.get("/:id", auth, async (req, res) => {
  let user_id = req.user._id;
  let employee = await User.findOne({ director: user_id, _id: req.params.id });
  if (!employee) return res.status(400).send("No employee created.");
  res.json({
    employee,
  });
});

router.patch("/:id", auth, async (req, res) => {
  let employee = await User.find({
    _id: req.params.id,
    director: req.user._id,
  });
  if (!employee) return res.status(400).send("This User doesnot exists");
  employee = await User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        phone: req.body.phone,
        cnic: req.body.cnic,
        email: req.body.email,
        address: req.body.address,
      },
    },
    { new: true }
  );
  return res.status(200).json({
    msg: "User has been updated",
  });
});

router.post("/profile", auth, async (req, res) => {
  let employee = await User.find({
    _id: req.user._id,
  });
  if (!employee)
    return res.status(400).json({ msg: "This User doesnot exists" });
  let emp_data = await User.findOne({ email: req.body.email });
  if (emp_data) {
    return res
      .status(400)
      .json({ msg: "Employee with this email already exists" });
  }
  emp_data = await User.findOne({ cnic: req.body.cnic });
  if (emp_data) {
    return res
      .status(400)
      .json({ msg: "Employee with this cnic already exists" });
  }
  employee = await User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        name: req.body.name,
        phone: req.body.phone,
        cnic: req.body.cnic,
        email: req.body.email,
        address: req.body.address,
      },
    },
    { new: true }
  );
  return res.status(200).json({
    msg: "User has been updated",
  });
});

router.delete("/:id", auth, async (req, res) => {
  let employee = await User.deleteOne({
    _id: req.params.id,
    director: req.user._id,
  });
  if (!employee) return res.status(400).send("This User doesnot exists");
  res.json({
    employee,
  });
});

router.post("/create", auth, async (req, res) => {
  let user_id = req.user._id;
  let team = new Team(req.body);
  team.director = user_id;
  team.save();
  return res.json({
    message: "Team Created Successfully",
    team_id: team._id,
  });
});

module.exports = router;
