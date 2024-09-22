const mongoose = require("mongoose");
const Product = require("../modules/product");
const createProduct = async (req, res) => {
  try {
    const productImage = req.file ? req.file.filename : null;
    const {
      productName,
      productDesp,
      productPrice,
      countInStock,
      productBrand,
      productCategory,
    } = req.body;

    if (
      !productName ||
      !productDesp ||
      !productPrice ||
      !countInStock ||
      !productBrand ||
      !productCategory ||
      !productImage
    ) {
      return res.status(400).json({
        status: "fail",
        message: "All field are mandetry!",
      });
    }
    const newProduct = new Product({
      productName,
      productDesp,
      productPrice,
      countInStock,
      productBrand,
      productCategory,
      productImage,
      user_id: req.user._id,
    });
    const product = await newProduct.save();
    res.status(201).json({
      status: "success",
      message: "Product create successfully........",
      data: product,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      status: "fail",
      message: "product not created",
      error: error.message,
    });
  }
};
//get all products
const getAllProducts = async (req, res) => {
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
      search !== ""
        ? {
            $or: [
              { productName: { $regex: regex } },
              { productBrand: { $regex: regex } },
              { productCategory: { $regex: regex } },
              { productPrice: !isNaN(search) ? parseInt(search) : null },
            ],
          }
        : {};

    //filter for filterBrand
    const filterBrand = {};
    if (req.query.brand) {
      const brand = req.query.brand.split(",");
      filterBrand.productBrand = { $in: brand }; // Use $in operator to match any productBrand in the array
    }
    //filter for filterCategory
    const filterCategory = {};
    if (req.query.category) {
      filterCategory.productCategory = req.query.category;
    }

    let query;
    if (req.query.type === "landing") {
      query = {
        $and: [filterCategory],
      };
    } else if (req.query.type === "shop") {
      query = {
        $and: [filterCategory, filterBrand],
      };
    } else if (req.query.type === "admin") {
      query = {
        $and: [searchQuery],
      };
    }

    // Sorting
    let sortOption = {};
    if (req.query.sort === "asc") {
      sortOption = { productPrice: 1 }; // Ascending order
    } else if (req.query.sort === "desc") {
      sortOption = { productPrice: -1 }; // Descending order
    } else if (req.query.sort === "newest") {
      sortOption = { createdAt: -1 }; // Newest arrivals first
    } else if (!req.query.sort) {
      sortOption = { _id: 1 };
    }
    // console.log(query);
    // console.log(sortOption);
    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .sort(sortOption);
    if (!products) {
      res.status(404).json({
        status: "fail",
        message: "Products not found",
      });
    }
    //total page and total product
    const totalProduct = await Product.countDocuments();
    const totalSearchProduct = await Product.countDocuments(query);
    const totalPage = Math.ceil(totalSearchProduct / limit);

    res.status(200).json({
      status: "success",
      message: "products data fetch successfully......",
      data: products,
      startIndex,
      endIndex,
      totalProduct,
      totalSearchProduct,
      totalPage,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "products data not fetch",
      error: error.message,
    });
  }
};
//get single product
const getproduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await Product.findById({ _id });
    if (!product) {
      res.status(404).json({
        status: "fail",
        message: "Products not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "product data fetch successfully......",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "products data not fetch",
      error: error.message,
    });
  }
};
//update product
const updateProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const {
      productName,
      productDesp,
      productPrice,
      countInStock,
      productBrand,
      productCategory,
    } = req.body;

    let productImage;
    if (req.file && req.file.filename) {
      productImage = req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(
      {
        _id,
        user_id: req.user._id,
      },
      {
        productName,
        productDesp,
        productPrice,
        countInStock,
        productBrand,
        productCategory,
        productImage,
      },
      { new: true }
    );
    if (!product) {
      res.status(404).json({
        status: "fail",
        message: "Products not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "product data Update successfully......",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "product data not Update",
      error: error.message,
    });
  }
};
//delete product
const deleteProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await Product.findByIdAndDelete({
      _id,
      user_id: req.user._id,
    });
    if (!product) {
      res.status(404).json({
        status: "fail",
        message: "Products not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "product data Delete successfully......",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "product data not Delete",
      error: error.message,
    });
  }
};
//create product review
const createReview = async (req, res) => {
  try {
    const _id = req.params.id;
    console.log("user", req.user._id);
    const { title, comment, rating } = req.body;

    const product = await Product.findById(_id);
    if (!product) {
      return res.status(400).json({
        status: "fail",
        message: "product not found!",
      });
    }

    const exitsreview = product.reviews.find(
      (review) => review.user_id.toString() === req.user._id.toString()
    );

    console.log(exitsreview);
    if (exitsreview) {
      return res.status(400).json({
        status: "fail",
        message: "You have already reviewed this product",
      });
    } else {
      const newReview = {
        user_id: req.user._id,
        user_Fname: req.user.firstname,
        user_Lname: req.user.lastname,
        title,
        comment,
        rating,
      };
      product.reviews.push(newReview);
    }

    product.totalreview = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    const reviewProduct = await product.save();

    res.status(201).json({
      status: "success",
      data: reviewProduct,
      message: "product review create successfully.......",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "product review not created",
      error: error.message,
    });
  }
};
module.exports = {
  createProduct,
  getAllProducts,
  getproduct,
  deleteProduct,
  updateProduct,
  createReview,
};
