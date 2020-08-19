const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Project, validate } = require("../models/Project");

// const multer = require("multer");

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/uploads");
//   },
//   filename: (req, file, cb) => {
//     var filetype = "";
//     if (file.mimetype === "image/gif") {
//       filetype = "gif";
//     }
//     if (file.mimetype === "image/png") {
//       filetype = "png";
//     }
//     if (file.mimetype === "image/jpeg") {
//       filetype = "jpg";
//     }
//     cb(null, "image-" + Date.now() + "." + filetype);
//   },
// });
// var upload = multer({ storage: storage }).single("file");

// fpr add project
router.post("/", async (req, res) => {
    const { error } = validate(req.body);
     if (error) return res.status(400).json({msg:error.details[0].message});
   
     let project = new Project(req.body);
     //     event.image = req.image.filename
         await project.save();
         return res.json({
           message: "Project added successfully",
           project,
   });
  
   

  
  // try {
    //   // const { error } = validate(req.body);
    //   // if (error) return res.status(400).send(error.details[0].message);
  
    //   upload(req, res, async function (err) {
    //     if (err) {
    //       // An error occurred when uploading
    //       return res.status(422).send(err);
    //     }
    //     let event = new Event(req.body);
    //     event.image = req.image.filename
    //     await event.save();
    //     return res.json({
    //       message: "Event added successfully",
    //       event,
    //     });
    //   });
    // } catch (error) {
    //   res.status(500).send(error);
    // }
  });
  



  // for get project
  router.get("/", async (req, res) => {
    let project = await Project.find();
    if (!project) return res.status(400).json({msg:"No project created yet!"});
    res.json({
    project
    });
  });
  

  // get project by id
  router.get("/projects/:id", async (req, res) => {
    let project = await Project.find({_id: req.params.id});
    if (!project) return res.status(400).json({msg:"No project exsit by this id!"});
    res.json({
        project
    });
  });
  

  // for delete project

  router.delete("/project/:id", async (req, res) => {
    let project = await Project.deleteOne({ _id: req.params.id })
    if (!project) return res.status(400).json({msg:"No project exsit by this id!"});
   
    res.json({
      msg: "project Deleted Succesfully"
    });
  });




module.exports = router;
