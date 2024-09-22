import { Navigate } from "react-router-dom";
const PrivateRouter = ({ children }) => {
  const userType = localStorage.getItem("userType");
  return userType === "admin" ? <Navigate to={"/admin"} /> : children;
};

export default PrivateRouter;
