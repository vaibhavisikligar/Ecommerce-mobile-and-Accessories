const User = require("../modules/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// signup user
const signup = async (req, res) => {
  try {
    console.log(req.body);
    const avatar = req.file ? req.file.filename : null;
    const {
      firstname,
      lastname,
      city,
      phone,
      gender,
      email,
      password,
      confirmPassword,
      userType,
    } = req.body;

    // check all field
    if (
      !firstname ||
      !lastname ||
      !city ||
      !gender ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are mandetry!",
      });
    }
    // check email
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return res.status(400).json({
        status: "fail",
        message: "Email Already exits!",
      });
    }
    //password hash
    const hashPassword = await bcrypt.hash(password, 10);
    const hashCpassword = await bcrypt.hash(confirmPassword, 10);

    //password match with confirmPassword
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "fail",
        message: "Password not match with ConfirmPassword",
      });
    }
    // create new user
    const newUser = new User({
      firstname,
      lastname,
      city,
      phone,
      gender,
      email,
      password: hashPassword,
      confirmPassword: hashCpassword,
      avatar,
      userType,
    });
    const user = await newUser.save();
    return res.status(201).json({
      status: "success",
      message: "User signup successfully.......",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "User not signup successfully.......",
      error: error.message,
    });
  }
};

// signin user
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check all field
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Email and Password are mandetry!",
      });
    }
    // check email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found!",
      });
    }
    //compare password
    const comparePassword =
      user && (await bcrypt.compare(password, user.password));
    //check compare password
    if (comparePassword) {
      // genrated token
      const token = jwt.sign({ user: user }, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: "3h",
      });
      return res.status(201).json({
        status: "success",
        data: user,
        token: token,
        message: "User login successfully.......",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "User not login successfully.......",
      error: error.message,
    });
  }
};

//getuser
const getuser = async (req, res) => {
  try {
    const _id = req.user._id;
    const user = await User.findById({ _id });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "user not found!",
      });
    }
    return res.status(200).json({
      status: "success",
      data: user,
      message: "user data fetch successfully......",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "user data not fetch",
      error: error.message,
    });
  }
};
const getAlluser = async (req, res) => {
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
              { firstname: { $regex: regex } },
              { lastname: { $regex: regex } },
              { email: { $regex: regex } },
              { city: { $regex: regex } },
            ],
          }
        : {};
    //filter for gender
    const filterGender = {};
    if (req.query.gender) {
      filterGender.gender = req.query.gender;
    }
    const query = {
      $and: [searchQuery, filterGender, { userType: "user" }],
    };
    // console.log(query);
    const user = await User.find(query).skip(skip).limit(limit);
    if (!user) {
      res.status(404).json({
        status: "fail",
        message: "Products not found",
      });
    }
    //total page and total product
    const totaluser = await User.countDocuments();
    const totalSearchuser = await User.countDocuments(query);
    const totalPage = Math.ceil(totalSearchuser / limit);

    res.status(200).json({
      status: "success",
      message: "user data fetch successfully......",
      data: user,
      startIndex,
      endIndex,
      totaluser,
      totalSearchuser,
      totalPage,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "user  not fetch",
      error: error.message,
    });
  }
};
module.exports = { signup, signin, getuser, getAlluser };
