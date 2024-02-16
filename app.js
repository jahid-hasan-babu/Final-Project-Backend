const express = require("express");
const app = express();
const router = require("./src/routes/api.js");
const mongoose = require("mongoose");
require("dotenv").config();

const cookieParser = require("cookie-parser");

const URL = process.env.DATABASE_URL;

//security middleware
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoSanitizer = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");

//Security middleware implement

app.use(cors());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(mongoSanitizer());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

//Database connection
mongoose
  .connect(URL)
  .then((res) => {
    console.log("Database Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

//Rata limiter
const limiter = rateLimit({
  windowMs: 24 * 60 * 1000,
  max: 1000,
});

//api call
app.use("/api/v1", router);

app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "not found" });
});
app.use(limiter);

module.exports = app;
