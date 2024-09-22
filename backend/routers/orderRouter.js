const express = require("express");
const router = new express.Router();
const {
  createOrder,
  getorder,
  getAllOrders,
  getAllOrdersByUser,
  orderPay,
} = require("../controlers/orderControler");
const verifyToken = require("../middleware/verifyToken");
router.post("/order", verifyToken, createOrder);
router.get("/order/:id", verifyToken, getorder);
router.get("/odersbyuser", verifyToken, getAllOrdersByUser);
router.put("/order/:id/pay", verifyToken, orderPay);
router.get("/order", getAllOrders);
module.exports = router;
