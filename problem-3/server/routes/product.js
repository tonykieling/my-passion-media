const express           = require("express");
const router            = express.Router();

const productsController = require("../controllers/product.js");

// this route calls the controller for getting the list of contacts
router.get("/", productsController.getProducts);


// this route calls the controller for adding the list of contacts
router.post("/", productsController.addProducts);


module.exports = router;