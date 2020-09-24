const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

const ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
  },
  product_price: {
    type: String,
  },
  product_image: {
    type: String,
  },
  product_description: {
    type: String,
  },
  product_type: {
    type: String,
  },
  product_category: {
    type: String,
  },
  product_quantity: {
    type: String,
    default:1
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
});
const Product = mongoose.model("Product", ProductSchema);
function validateUser(product) {
  const schema = {
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
  };
  return Joi.validate(product, schema);
}
exports.Product = Product;
exports.validate = validateUser;
