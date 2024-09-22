import React, { useEffect, useState } from "react";
import {
  FaRupeeSign,
  FaShoppingBag,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../redux/productSlice";
import { getAllUser } from "../redux/signInSlice";
import { getAllOrder } from "../redux/orderSlice";
const Dashboard = () => {
  const { productList } = useSelector((state) => state.product);
  const { allUserList } = useSelector((state) => state.signin);
  const { orderList } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [page, setpage] = useState(1);
  const [limit, setlimt] = useState(8);
  const [gender, setGender] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(getAllProduct({ page, limit }));
    dispatch(getAllUser({ gender, search }));
    dispatch(getAllOrder({ type: "dashboard" }));
  }, [page, limit, gender]);

  return (
    <div className="container py-16 px-6">
      <div className="w-full flex justify-between items-center gap-4">
        <div className="w-1/3 bg-gray-300 shadow-md rounded-md p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sky-800 flex justify-center items-center text-white">
            <FaRupeeSign />
          </div>
          <div>
            <h3>Total Sales</h3>
            <h6 className="flex items-center">
              <FaRupeeSign />
              {orderList.totalSales}
            </h6>
          </div>
        </div>
        <div className="w-1/3 bg-gray-300 shadow-md rounded-md p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sky-800 flex justify-center items-center text-white">
            <FaShoppingBag />
          </div>
          <div>
            <h3>Total Products</h3>
            <h6>{productList.totalProduct}</h6>
          </div>
        </div>
        <div className="w-1/3 bg-gray-300 shadow-md rounded-md p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sky-800 flex justify-center items-center text-white">
            <FaShoppingCart />
          </div>
          <div>
            <h3> Total Orders</h3>
            <h6>{orderList.totalsearchorder}</h6>
          </div>
        </div>
        <div className="w-1/3 bg-gray-300 shadow-md rounded-md p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sky-800 flex justify-center items-center text-white">
            <FaUser />
          </div>
          <div>
            <h3> Total Users</h3>
            <h6>{allUserList.totalSearchuser}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
