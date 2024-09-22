import { Navigate } from "react-router-dom";
const PrivateAdminRouter = ({ children }) => {
  const userType = localStorage.getItem("userType");
  return userType !== "admin" ? <Navigate to={"/"} /> : children;
};

export default PrivateAdminRouter;
