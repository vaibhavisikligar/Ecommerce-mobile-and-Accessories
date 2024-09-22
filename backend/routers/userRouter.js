const express = require("express");
const multer = require("multer");
const {
  signup,
  signin,
  getuser,
  getAlluser,
} = require("../controlers/userControler");
const verifyToken = require("../middleware/verifyToken");
const router = new express.Router();

//  Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/user");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
// Filter for image files only
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
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
router.post("/signup", upload.single("avatar"), signup);
router.post("/signin", signin);
router.get("/user", verifyToken, getuser);
router.get("/users", verifyToken, getAlluser);
module.exports = router;
