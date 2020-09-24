const express = require("express");
const { DonationProduct ,validate } = require("../models/DonationProduct");
const auth = require("../middleware/auth");
const router = express.Router();

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



router.post('/upload', upload.single('image'), async (req, res) => {
  if (req.file){
  
        let product = new DonationProduct(req.body);

      product.product_image = req.file.filename ;
      product.product_description = req.body.description ;
       await product.save();
    
      await product.save().then(result => {
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





// get donationProduct
router.get("/", async (req, res) => {
    let product = await DonationProduct.find({});
    if (!product) return res.status(400).json({msg:"NO product existed"});
    res.json({
      product,
    });
  });
  

// get active  donationProduct
router.get("/active", async (req, res) => {
  let product = await DonationProduct.find({status: '1'});
  if (!product) return res.status(400).json({msg:"NO product existed"});
  res.json({
    product,
  });
});

// get   donationProduct of a user
router.get("/user-product", auth, async (req, res) => {
  let product = await DonationProduct.find({user_id: req.user._id});
  if (!product) return res.status(400).json({msg:"NO product existed"});
  res.json({
    product,
  });
});




// for delete product

router.delete("/product/:id", async (req, res) => {
    let product = await DonationProduct.deleteOne({ _id: req.params.id })
    if (!product) return res.status(400).json({msg:"No product exsit by this id!"});
   
    res.json({
      msg: "product Deleted Succesfully"
    });
  });



// for get all user product

router.get("/userProduct",auth, async (req, res) => {
  console.log('id', req.user._id)
  let product = await DonationProduct.find({ user_id: req.user._id })
  if (!product) return res.status(400).json({msg:"No product exsit by this id!"});
 
  res.json({
    product
  });
});





// update product 
router.post("/product/:id", async (req, res) => {
  let  product_id = req.params.id;
  let product = await DonationProduct.findByIdAndUpdate(
    { _id: product_id },
    {
      $set: {
        product_name: req.body.product_name,
        status: req.body.status,
       
        // image: req.body.image,
      },
    },
    { new: true }
  );

  return res.json({
    msg:'product data Updated Successfully',
    
  });
});



module.exports = router;
