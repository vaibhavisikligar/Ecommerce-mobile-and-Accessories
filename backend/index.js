const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
require("./conn/db");
const port = process.env.PORT || 8000;
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const orderRouter = require("./routers/orderRouter");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", orderRouter);

app.use("/api/signup/upload", express.static("public/img/user"));
app.use("/api/products/upload", express.static("public/img/product"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,PUT,PATCH,GET,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.listen(port, () => {
  console.log(`connection set at port ${port}`);
});
