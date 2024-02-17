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

module.exports = {
  CreateProductServices,
  UpdateProductServices,
  DeleteProductServices,
};
