const express           = require("express");
const router            = express.Router();

const productsController = require("../controllers/product.js");

// this route calls the controller for getting the list of products
router.get("/", productsController.getProducts);


// this route calls the controller for adding products
router.post("/", productsController.addProducts);


// this route calls the controller for removing product
router.delete("/", productsController.removeProduct);


// this route calls the controller for updating product
router.patch("/", productsController.updateProduct);

module.exports = router;