import { FaHome, FaShoppingCart, FaShoppingBag, FaUser } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
export const navlink = [
  {
    id: 1,
    title: "Dashboard",
    link: "dashboard",
    img: <FaHome />,
  },
  {
    id: 2,
    title: "Products",
    link: "get-all-products",
    img: <FaShoppingBag />,
  },
  {
    id: 3,
    title: "Add Product",
    link: "add-product",
    img: <IoAddCircleSharp />,
  },
  {
    id: 4,
    title: "Orders",
    link: "get-all-orders",
    img: <FaShoppingCart />,
  },
  {
    id: 5,
    title: "Users",
    link: "get-all-users",
    img: <FaUser />,
  },
];
