const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  owner  : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description : {
    type: String,
  },
  price : {
    type: Number,
    required: true,
  },
  stock : {
    type: Number,
    default: 0,
  },
  category : {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Exporter le modèle
module.exports = mongoose.model("Product", productSchema);
