// this is the definition/shape of contacts should like in the application
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  
  name: {
    type    : String,
    required: true
  },

  weight: {
    type    : Number,
    // required: true
  },

  dimensions: {
    height: {
      type    : Number,
      // required: true
    }, 
    width: {
      type    : Number,
      // required: true
    },
    depth: {
      type    : Number,
      // required: true
    }
  }
  
});

module.exports = mongoose.model("Product", productSchema);
