const express = require("express");
const multer = require("multer");
const verifyToken = require("../middleware/verifyToken");
const {
  createProduct,
  getAllProducts,
  getproduct,
  deleteProduct,
  updateProduct,
  createReview,
} = require("../controlers/productControler");

const router = new express.Router();

//  Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/product");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
// filter for only image file allow
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};
// Multer upload configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
router.post(
  "/products",
  upload.single("productImage"),
  verifyToken,
  createProduct
);
router.get("/products", getAllProducts);
router.get("/products/:id", getproduct);
router.delete("/products/:id", verifyToken, deleteProduct);
router.put(
  "/products/:id",
  upload.single("productImage"),
  verifyToken,
  updateProduct
);
router.post("/products/:id/review", verifyToken, createReview);
module.exports = router;
