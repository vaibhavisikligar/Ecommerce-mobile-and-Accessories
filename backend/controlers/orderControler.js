const { default: mongoose } = require("mongoose");
const Order = require("../modules/order");
const User = require("../modules/user");
//create order
const createOrder = async (req, res) => {
  try {
    const user_id = req.user._id;
    const {
      cartList,
      shipping,
      paymentmethod,
      subtotalAmount,
      delivery,
      totalprice,
    } = req.body;
    if (cartList && cartList.length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "Cartitems not found!",
      });
    }
    // Calculate delivery date (5 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    console.log(deliveryDate);
    const order = new Order({
      user_id,
      cartItems: cartList,
      shipping,
      paymentmethod: paymentmethod.paymentmethod,
      subtotalPrice: subtotalAmount,
      shippingPrice: delivery,
      totalPrice: totalprice,
      deliveredAt: deliveryDate,
    });
    const newOrder = await order.save();
    res.status(201).json({
      status: "success",
      message: "Order create successfully...",
      data: newOrder,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Order not create ",
      error: error.message,
    });
  }
};
// get single order by orderid
const getorder = async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id);
    const order = await Order.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(_id) } },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
    ]);
    // const order = await Order.findById({ _id });
    console.log(order);
    if (!order) {
      return res
        .status(400)
        .json({ status: "fail", message: "Order not found!" });
    }
    res.status(200).json({
      status: "success",
      data: order,
      message: "Order data fetch successfully.....",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Order data not fetch",
      error: error.message,
    });
  }
};
// get all orders by user
const getAllOrdersByUser = async (req, res) => {
  try {
    const user_id = req.user._id;
    const order = await Order.find({ user_id });
    if (!order) {
      return res.status(400).json({
        status: "fail",
        message: "Orders not found!",
      });
    }
    res.status(200).json({
      status: "success",
      data: order,
      message: "Orders data fetch successfully.......",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Order data not fetch",
      error: error.message,
    });
  }
};
//get all orders
const getAllOrders = async (req, res) => {
  try {
    //paginagtion
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 8;
    const skip = (page - 1) * limit;
    const startIndex = skip + 1;
    const endIndex = page * limit;

    //search
    const search = req.query.search;
    const regex = new RegExp(search, "i");
    const searchQuery =
      req.query.type === "dashboard"
        ? {}
        : req.query.type === "get-all-orders" && search !== ""
        ? {
            $or: [
              { "shipping.fullname": { $regex: regex } },
              { "shipping.city": { $regex: regex } },
              { "shipping.countrystate": { $regex: regex } },
            ],
          }
        : {};
    // console.log("searchQuery", searchQuery);
    const order = await Order.aggregate([
      { $match: searchQuery },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    //total page and total order
    const totalOrder = await Order.countDocuments();
    const totalsearchorder = await Order.countDocuments(searchQuery);
    const totalpage = Math.ceil(totalsearchorder / limit);
    //find total sales
    let totalSales = 0;
    order.forEach((item) => {
      totalSales += item.totalPrice;
    });

    if (!order || order.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Orders not found!",
      });
    }

    res.status(200).json({
      status: "success",
      data: order,
      startIndex,
      endIndex,
      totalOrder,
      totalsearchorder,
      totalpage,
      totalSales,
      message: "orders data fetch successfully....",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "orders data not fetch",
      error: error.message,
    });
  }
};
// order pay cash on delivery order
const orderPay = async (req, res) => {
  try {
    const _id = req.params.id;
    const order = await Order.findById(_id);
    if (!order) {
      return res
        .status(400)
        .json({ status: "fail", message: "Order not found!" });
    }

    // Update the order fields with payment and delivery information
    order.isPaid = true;
    order.paidAt = Date.now();
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    // Save the updated order
    const updatedOrder = await order.save();

    res.status(201).json({
      status: "success",
      data: updatedOrder,
      message: "Order paid successfully.....",
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(400).json({
      status: "fail",
      message: "Order payment failed!",
    });
  }
};
module.exports = {
  createOrder,
  getorder,
  getAllOrders,
  getAllOrdersByUser,
  orderPay,
};
