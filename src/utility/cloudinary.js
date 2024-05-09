const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: "jahidhasan57",
  api_key: "228717554245365",
  api_secret: "KIYRCet_2MbbpMgAvDxJDs3g-ks",
});

module.exports = cloudinary;
