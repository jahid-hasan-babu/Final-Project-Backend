const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 50000;

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
