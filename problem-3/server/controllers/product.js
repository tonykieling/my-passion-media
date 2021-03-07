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
  console.log("### getProducts");
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
  console.log("\n### add product")

  const { name, weight, height, width, depth } = req.body;


  // it checks whether data is being received
  // *** FE does it, but here is a double checking
  if (!name) return res.status(400).json({ error: "name is mandatory, please" });


  //go to record into database
  try {
    const newProduct = new Product({
      _id: new mongoose.Types.ObjectId(),
      name,
      weight  : weight || "",
      height  : height || "",
      width   : width || "",
      depth   : depth || "",
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
  console.log("### insed delete product");
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
        success: "Product has been deleted"
      });
    } else
      throw (`RP02: Something bad with Product id <${productId}>`);

  } catch (err) {
    return res.json({
      error: err
    });
  }
};


// function to update a particular product
const updateProduct = async(req, res) => {
  console.log("### insed update product");
console.log("req.body", req.body)
  try {
    let { _id, name, weight, height, width, depth } = req.body;
  // console.log("req.body", typeof req.body.depth)
    weight = Number(weight) || undefined;
    height = Number(height) || undefined;
    width = Number(width) || undefined;
    depth = Number(depth) || undefined;

    console.log("===>", _id, name, weight, height, width, depth);

    const productToBeChanged = await Product
    .updateOne(
      {
      _id
      }, 
      {
        name,
        weight  : weight || "",
        height  : height || "",
        width   : width || "",
        depth   : depth || "",
      },
      {
        // runValidators: true,
        // ignoreUndefined: true
      }
    );

      console.log("productToBeChanged", productToBeChanged.nModified)
    return res.json(productToBeChanged.nModified ? {message: "Product updated!"} : {message: "No changes to be performed."});
  }catch(error){
    console.log("ERRROR", error.message || error);
    return res.json({error: "Error, please try again later."});
  }


}


module.exports = {
  getProducts,
  addProducts,
  removeProduct,
  updateProduct
};

