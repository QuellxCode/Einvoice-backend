const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { News, validate } = require("../models/news");

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
  
    let news = new News(req.body);
   
    news.image = req.file.filename ;
       await news.save();
    
      await news.save().then(result => {
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

  



// for get news
router.get("/", async (req, res) => {
    let news = await News.find();
    if (!news) return res.status(400).json({msg:"No news created yet!"});
    res.json({
        news
    });
  });
  

  // get news by id
router.get("/news/:id", async (req, res) => {
    let news = await News.find({_id: req.params.id});
    if (!news) return res.status(400).json({msg:"No news exsit by this id!"});
    res.json({
      news
    });
  });
  

// for delete news
router.delete("/news/:id", async (req, res) => {
    let news = await News.deleteOne({ _id: req.params.id })
    if (!news) return res.status(400).json({msg:"No news exsit by this id!"});
   
    res.json({
      msg: "News Deleted Succesfully"
    });
  });


// update news 
router.post("/news/:id", upload.single('image') , async (req, res) => {
  let  news_id = req.params.id;
  let news = await News.findByIdAndUpdate(
    { _id: news_id },
    {
      $set: {
        title: req.body.title,
        location: req.body.location,
        description: req.body.description,
        image: req.file.filename,
      },
    },
    { new: true }
  );

  return res.json({
    msg:'News data Updated Successfully',
    
  });
});


module.exports = router;
