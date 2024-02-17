const {
  CreateProductServices,
  UpdateProductServices,
  DeleteProductServices,
} = require("../services/ProductServices");
const ProductModel = require("../model/ProductModel");

exports.CreateProduct = async (req, res) => {
  let result = await CreateProductServices(req);
  res.status(201).json(result);
};

exports.ReadProduct = async (res) => {
  try {
    let result = await ProductModel.find();
    res.status(200).json({ status: "success", message: result });
  } catch (e) {
    res.status(200).json({ status: "fail", data: e.toString() });
  }
};

exports.UpdateProduct = async (req, res) => {
  let result = await UpdateProductServices(req);
  res.status(200).json(result);
};

exports.DeleteProduct = async (req, res) => {
  let result = await DeleteProductServices(req);
  res.status(200).json(result);
};
