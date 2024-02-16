const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    pname: { type: String, trim: true, required: true },
    brand: { type: String, trim: true, required: true },
    category: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    image: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const ProductModel = mongoose.model("products", DataSchema);

module.exports = ProductModel;
