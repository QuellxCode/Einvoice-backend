const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

const DonationProductSchema = new mongoose.Schema({
  name:{
    type: String,
  },
  phone:{
    type: String,
  },
  address:{
    type: String,
  },
  city:{
    type: String,
  },
  state:{
    type: String,
  },
  country:{
    type: String,
  },
  email:{
    type: String,
  },
  product_name: {
    type: String,
  },
  product_price: {
    type: String,
  },
  product_description: {
    type: String,
  },
  product_type: {
    type: String,
  },
  product_image: {
    type: String,
  },
  product_category: {
    type: String,
  },
  product_quantity: {
    type: String,
  },
  products_liked: {
    type: String,
  },
  low_limit: {
    type: String,
  },
  is_feature: {
    type: String,
  },
  products_slug: {
    type: String,
  },
  rating: {
    type: String,
  },
  defaultStock: {
    type: String,
  },
  isLiked: {
    type: String,
  },
  status: {
    type: String,
    default: 0
  },
  user_id: {
    type: String,
  },
 
// ,

//   file: {
//     type: Array
// }
  // images: [
  //   {
  //     image: {
  //       type: String,
  //       requried: true,
  //     },
  //   },
  // ],
});
const DonationProduct = mongoose.model("DonationProduct", DonationProductSchema);
function validateUser(donationProduct) {
  const schema = {
    user_id:Joi.string(),
    name:Joi.string(),
    phone:Joi.string(),
    address:Joi.string(),
    state:Joi.string(),
    city:Joi.string(),
    country:Joi.string(),
    email:Joi.string(),
    product_name: Joi.string(),
    product_price: Joi.string(),
    product_image: Joi.string(),
    product_description: Joi.string(),
    product_type: Joi.string(),
    product_category: Joi.string(),
    product_quantity: Joi.string(),
    products_liked: Joi.string(),
    low_limit: Joi.string(),
    is_feature: Joi.string(),
    products_slug: Joi.string(),
    rating: Joi.string(),
    defaultStock: Joi.string(),
    isLiked: Joi.string(),
    // file: Joi.array(),
    status: Joi.string(),
    // images: Joi.array().items({
    //   image: Joi.string()
    // }),
  };
  return Joi.validate(donationProduct, schema);
}
exports.DonationProduct = DonationProduct;
exports.validate = validateUser;
