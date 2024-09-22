const mongoose = require("mongoose");
const validator = require("validator");
const shippingSchema = {
  fullname: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    min: [10, "Pleace Enter the 10 digit"],
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    required: true,
  },
  address3: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
    min: [6, "Pleace Enter the 6 digit"],
  },
  city: {
    type: String,
    required: true,
  },
  countrystate: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
};
const orderItemSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Prodcut",
  },
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  countInStock: {
    type: Number,
    default: 1,
    required: true,
  },
  productBrand: {
    type: String,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    cartItems: [orderItemSchema],
    shipping: shippingSchema,
    paymentmethod: { type: String, required: true, default: "paypal" },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      updateTime: { type: String },
      email: { type: String },
    },
    subtotalPrice: { type: Number },
    shippingPrice: { type: Number },
    totalPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
