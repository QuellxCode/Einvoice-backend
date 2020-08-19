const express = require("express");
const { Product ,validate } = require("../models/Product");
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
  
        let product = new Product(req.body);

      product.product_image = req.file.filename ;
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

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({msg:error.details[0].message});
  let product ;
  console.log('data request ',req.body )
  product = new Product(req.body);
  await product.save()
 console.log('data',product )
  res.json({
    message: "Product added successfully",
    product
  });
});



// get product
router.get("/", async (req, res) => {
    let product = await Product.find({});
    if (!product) return res.status(400).json({msg:"NO Attendance existed"});
    res.json({
      product,
    });
  });
  

  
  // get Product by id
  router.get("/product/:id", async (req, res) => {
    let product = await Product.find({_id: req.params.id});
    if (!product) return res.status(400).json({msg:"No product exsit by this id!"});
    res.json({
      product
    });
  });
  

  // for delete product
  router.delete("/product/:id", async (req, res) => {
    let product = await Product.deleteOne({ _id: req.params.id })
    if (!product) return res.status(400).json({msg:"No product exsit by this id!"});
   
    res.json({
      msg: "product Deleted Succesfully"
    });
  });


 
// update product 
router.post("/product/:id",  upload.single('image'), async (req, res) => {
  let  product_id = req.params.id;
  let product = await Product.findByIdAndUpdate(
    { _id: product_id },
    {
      $set: {
        product_name: req.body.product_name,
        product_category: req.body.product_category,
        product_price: req.body.product_price,
        product_type: req.body.product_type,
        product_image: req.file.filename,
        product_description: req.body.product_description,
       
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
