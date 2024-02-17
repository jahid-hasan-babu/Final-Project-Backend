const ProductModel = require("../model/ProductModel");

const CreateProductServices = async (req) => {
  try {
    let reqBody = req.body;
    await ProductModel.create(reqBody);
    return { status: "success", message: "Product create successfully" };
  } catch (e) {
    return { status: "fail", message: e.toString() };
  }
};

const UpdateProductServices = async (req) => {
  try {
    let id = req.params.id;
    let reqBody = req.body;
    await ProductModel.updateOne({ _id: id }, reqBody);
    return { status: "success", message: "Product updated successfully" };
  } catch (error) {
    return { status: "fail", message: e.toString() };
  }
};

const DeleteProductServices = async (req) => {
  try {
    let id = req.params.id;
    await ProductModel.deleteOne({ _id: id });
    return { status: "success", message: "Product deleted successfully" };
  } catch (error) {
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
    let SearchRegex = { $regex: req.params.pname, $options: "i" };
    let MatchStage = { $match: { pname: SearchRegex } };

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
};
