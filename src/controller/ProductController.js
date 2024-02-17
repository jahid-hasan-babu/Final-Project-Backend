const {
  CreateProductServices,
  UpdateProductServices,
  DeleteProductServices,
  ListByBrandService,
  ListByCategoryService,
  ListByProductNameService,
} = require("../services/ProductServices");
const ProductModel = require("../model/ProductModel");

exports.CreateProduct = async (req, res) => {
  let result = await CreateProductServices(req);
  res.status(201).json(result);
};

exports.ReadProduct = async (res) => {
  try {
    let result = await ProductModel.find();
    res.status(200).json({ status: "success", data: result });
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
exports.ListByBrand = async (req, res) => {
  let result = await ListByBrandService(req);
  res.status(200).json(result);
};

exports.ListByCategory = async (req, res) => {
  let result = await ListByCategoryService(req);
  res.status(200).json(result);
};

exports.ListByProductName = async (req, res) => {
  let result = await ListByProductNameService(req);
  res.status(200).json(result);
};
