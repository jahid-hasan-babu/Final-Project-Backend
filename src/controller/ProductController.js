const {
  CreateProductServices,
  UpdateProductServices,
  DeleteProductServices,
  ListByBrandService,
  ListByCategoryService,
  ListByProductNameService,
  ReadProductList,
  productListByIdServices,
} = require("../services/ProductServices");

exports.CreateProduct = async (req, res) => {
  let result = await CreateProductServices(req);
  res.status(201).json(result);
};

exports.ReadProduct = async (req, res) => {
  let result = await ReadProductList();
  res.status(200).json(result);
};

exports.UpdateProduct = async (req, res) => {
  let result = await UpdateProductServices(req);
  res.status(200).json(result);
};

exports.productListById = async (req, res) => {
  let result = await productListByIdServices(req);
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
