const ProductModel = require("../model/ProductModel");

const isValidBase64 = (str) => {
  if (str === "" || str.trim() === "") return false;
  try {
    // Split the base64 string by comma to extract the data portion
    const base64Data = str.split(",")[1];
    return btoa(atob(base64Data)) === base64Data;
  } catch (err) {
    return false;
  }
};

const CreateProductServices = async (req) => {
  try {
    let reqBody = req.body;
    reqBody.image = Buffer.from(reqBody.image, "base64");

    await ProductModel.create(reqBody);
    return { status: "success", message: "Product create successfully" };
  } catch (e) {
    return { status: "fail", message: e.toString() };
  }
};

const ReadProductList = async () => {
  try {
    let data = await ProductModel.find();
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", message: e.toString() };
  }
};

const UpdateProductServices = async (req) => {
  try {
    let id = req.params.id;
    let reqBody = req.body;
    reqBody.image = Buffer.from(reqBody.image, "base64");
    await ProductModel.updateOne({ _id: id }, reqBody);
    return { status: "success", message: "Product updated successfully" };
  } catch (e) {
    return { status: "fail", message: e.toString() };
  }
};

const productListByIdServices = async (req) => {
  try {
    let id = req.params.id;
    let query = { _id: id };
    let result = await ProductModel.find(query);
    return { status: "success", data: result };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

const DeleteProductServices = async (req) => {
  try {
    let id = req.params.id;
    await ProductModel.deleteOne({ _id: id });
    return { status: "success", message: "Product deleted successfully" };
  } catch (e) {
    return { status: "fail", message: e.toString() };
  }
};

const ListByBrandService = async (req) => {
  try {
    let Brand = req.params.brand;
    let MatchStage = { $match: { brand: Brand } };

    let data = await ProductModel.aggregate([MatchStage]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error }.toString();
  }
};

const ListByCategoryService = async (req) => {
  try {
    let Category = req.params.category;
    let MatchStage = { $match: { category: Category } };

    let data = await ProductModel.aggregate([MatchStage]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error }.toString();
  }
};

const ListByProductNameService = async (req) => {
  try {
    const searchRegex = new RegExp(req.params.pname, "i");
    let MatchStage = { $match: { pname: searchRegex } };

    let data = await ProductModel.aggregate([MatchStage]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error }.toString();
  }
};

module.exports = {
  CreateProductServices,
  UpdateProductServices,
  DeleteProductServices,
  ListByBrandService,
  ListByCategoryService,
  ListByProductNameService,
  ReadProductList,
  productListByIdServices,
};
