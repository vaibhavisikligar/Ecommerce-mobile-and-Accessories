const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({
      status: "fail",
      message: "missing authHeader",
    });
  }
  const token = authHeader;
  //   console.log("token", token);
  if (!token) {
    return res.status(400).json({
      status: "fail",
      message: "Token is Required",
    });
  }
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, decode) => {
      if (error) {
        return res.status(400).json({
          status: "fail",
          message: "Failed to authenticate token",
        });
      }
      req.user = decode.user;
      next();
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Token is invalid",
      error: error.message,
    });
  }
};
module.exports = verifyToken;
