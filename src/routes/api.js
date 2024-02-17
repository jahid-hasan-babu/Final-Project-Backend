const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const ProductController = require("../controller/ProductController");
const AuthVerification = require("../middleware/AuthVerification");

//user
router.post("/createUser", UserController.createUser);
router.get("/verifyUser/:email/:otp", UserController.verifyUser);
router.get("/LoginUser", UserController.LoginUser);
router.get("/LogOutUser", AuthVerification, UserController.LogOutUser);
router.put("/UpdateProfile", AuthVerification, UserController.UpdateProfile);

//Product
router.post(
  "/CreateProduct",
  AuthVerification,
  ProductController.CreateProduct
);
router.get("/ReadProduct", AuthVerification, ProductController.ReadProduct);
router.put(
  "/UpdateProduct/:id",
  AuthVerification,
  ProductController.UpdateProduct
);

router.delete(
  "/DeleteProduct/:id",
  AuthVerification,
  ProductController.DeleteProduct
);

router.get(
  "/ListByBrand/:brand",
  AuthVerification,
  ProductController.ListByBrand
);

router.get(
  "/ListByCategory/:category",
  AuthVerification,
  ProductController.ListByCategory
);
router.get(
  "/ListByProductName/:pname",
  AuthVerification,
  ProductController.ListByProductName
);

module.exports = router;
