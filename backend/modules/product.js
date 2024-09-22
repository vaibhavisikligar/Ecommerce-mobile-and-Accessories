const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    user_Fname: { type: String, required: true },
    user_Lname: { type: String, required: true },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productName: {
      type: String,
      required: true,
    },
    productDesp: {
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
    totalreview: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);
const Prodcut = new mongoose.model("Prodcut", productSchema);
module.exports = Prodcut;
