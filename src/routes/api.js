const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");

//user
router.post("/createUser", UserController.createUser);
router.get("/verifyUser/:email/:otp", UserController.verifyUser);

module.exports = router;
