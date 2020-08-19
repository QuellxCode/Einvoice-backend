const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Compaign, validate } = require("../models/Compaign");


const multer = require("multer");


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage })

// app.use(cors());



router.post('/', upload.single('image'), async (req, res) => {
  if (req.file){
  
    let compaign = new Compaign(req.body);
   
    compaign.image = req.file.filename ;
       await compaign.save();
    
      await compaign.save().then(result => {
          res.status(201).json({
              message: "Done upload!",
              data: result
          })      
    });
  // res.json({
  //   imageUrl: `images/uploads/${req.file.filename}`
  // });
}
else 
  res.status("409").json("No Files to Upload.")
});




// // fpr add compaign
// router.post("/", async (req, res) => {
//     const { error } = validate(req.body);
//      if (error) return res.status(400).json({msg:error.details[0].message});
   
//      let compaign = new Compaign(req.body);
//      //     event.image = req.image.filename
//          await compaign.save();
//          return res.json({
//            message: "Compaign added successfully",
//            compaign,
//    });
  
   

  
//   // try {
//     //   // const { error } = validate(req.body);
//     //   // if (error) return res.status(400).send(error.details[0].message);
  
//     //   upload(req, res, async function (err) {
//     //     if (err) {
//     //       // An error occurred when uploading
//     //       return res.status(422).send(err);
//     //     }
//     //     let event = new Event(req.body);
//     //     event.image = req.image.filename
//     //     await event.save();
//     //     return res.json({
//     //       message: "Event added successfully",
//     //       event,
//     //     });
//     //   });
//     // } catch (error) {
//     //   res.status(500).send(error);
//     // }
//   });
  



  // for get compaign
  router.get("/", async (req, res) => {
    let compaign = await Compaign.find();
    if (!compaign) return res.status(400).json({msg:"No Compaign created yet!"});
    res.json({
     compaign
    });
  });
  

  // get compaign by id
  router.get("/compaigns/:id", async (req, res) => {
    let compaign = await Compaign.find({_id: req.params.id});
    if (!compaign) return res.status(400).json({msg:"No compaign exsit by this id!"});
    res.json({
     compaign
    });
  });
  

  // for delete project

  router.delete("/compaign/:id", async (req, res) => {
    let compaign = await Compaign.deleteOne({ _id: req.params.id })
    if (!compaign) return res.status(400).json({msg:"No compaign exsit by this id!"});
   
    res.json({
      msg: "compaign Deleted Succesfully"
    });
  });






  
  
  // update compaign 
router.post("/compaign/:id",upload.single('image'), async (req, res) => {
  let  compaign_id = req.params.id;
  let compaign = await Compaign.findByIdAndUpdate(
    { _id: compaign_id },
    {
      $set: {
        title: req.body.title,
        category: req.body.category,
        goal_amount: req.body.goal_amount,
        raised_amount: req.body.raised_amount,
        image: req.file.filename
        // image: req.body.image,
      },
    },
    { new: true }
  );

  return res.json({
    msg:'Compaign data Updated Successfully',
    
  });
});


module.exports = router;
