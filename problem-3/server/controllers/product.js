const mongoose  = require("mongoose");
const Product   = require("../models/product.js");

/**
 * 
 * the functions below are available for the front-end: 
 *    - record a new product
 *    - get product's list
 *    - delete a specific product
*/

// function to get products
const getProducts = async(req, res) => {
  // return res.json({message: "get products is working"});
  // do not need checking, it only queries the db
  try {
    const products = await Product
      .find();

    return res.status(200).json({
      message : "success",
      length  : products.length,
      content : products
    });

  } catch(error) {
    console.log("GP01 error:", error.message || error);
    return res.status(400).json({ error: "something bad when getting data. :/"});
  }
};




// function to add a new product
const addProducts = async(req, res) => {
  const { name, weight, dimensions } = req.body;

  // it checks whether data is being received
  // *** FE does it, but here is a double checking
  if (!name) return res.status(400).json({ error: "name is mandatory, please" });

  // it checks whether the numeric fields are really numeric ones
  // FE is gonna do it, but it is a double check
  if (!Number(weight)
    || (!Number(dimensions.height))
    || (!Number(dimensions.width))
    || (!Number(dimensions.depth))
  )
    return res.status(200).json({
      message : "data should be number",
      name,
      weight,
      dimensions
    });


  //go to record into database
  try {

    const newProduct = new Product({
      _id: new mongoose.Types.ObjectId(),
      name,
      weight,
      dimensions
    });

    await newProduct.save();

    return res.status(200).json({
      message : "success",
      content : newProduct
    });

  } catch(error) {
    console.log("AP01 error:", error.message || error);
    return res.status(400).json({ error: "something bad when recording. :/"});
  }
};




// function to remove a particular product
const removeProduct = async(req, res) => {
  const { productId } = req.body;

  // check whether product exists
  try {
    const productToBeDeleted = await Product
      .findById(productId);
    if (!productToBeDeleted || productToBeDeleted.length < 1)
      throw (`RP01: Product NOT found.`);
  } catch(err) {
    return res.json({
      error: err
    });
  }

  // delete product
  try {
    const productDeleted = await Product.deleteOne({ _id: productId});

    if (productDeleted.deletedCount) {      
      return res.json({
        message: "Product has been deleted"
      });
    } else
      throw (`RP02: Something bad with Product id <${productId}>`);

  } catch (err) {
    return res.json({
      error: err
    });
  }
};


module.exports = {
  getProducts,
  addProducts,
  removeProduct
};

