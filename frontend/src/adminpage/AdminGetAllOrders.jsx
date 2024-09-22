import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllOrder } from "../redux/orderSlice";
import { FaEye, FaRegEdit, FaSearch } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
import moment from "moment";
import { Link } from "react-router-dom";

const AdminGetAllOrders = () => {
  const { orderList } = useSelector((state) => state.order);
  // console.log("orderlist", orderList);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrder({ search, type: "get-all-orders" }));
  }, [dispatch, search]);
  return (
    <div className="container py-16 px-5">
      <div className="w-full mb-4">
        <div className="w-1/4 relative">
          <div className="w-full flex">
            <input
              type="text"
              name="search"
              value={search}
              placeholder="Search...."
              onChange={(e) => setSearch(e.target.value)}
              className="inputfield1"
            />
            <button className="absolute right-3 top-3.5">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
      <table className="table-auto w-full">
        <thead className="text-xs uppercase  bg-sky-900 text-white ">
          <tr className="border-2 border-solid border-l-0 border-r-0 ">
            <th className="py-3  px-6">No.</th>
            <th className="py-3  px-6">User name</th>
            <th className="py-3  px-6">Email</th>
            <th className="py-3  px-6">Total</th>
            <th className="py-3  px-6">Status</th>
            <th className="py-3  px-6">City</th>
            <th className="py-3  px-6">State</th>
            <th className="py-3  px-6">Order date</th>
            <th className="py-3  px-6">Delivery date</th>
            <th className="py-3  px-6">Action</th>
          </tr>
        </thead>
        <tbody>
          {orderList?.data?.map((item, index) => {
            const { _id, totalPrice, createdAt, deliveredAt, user, shipping } =
              item;
            return (
              <tr
                key={_id}
                className="odd:bg-sky-950  even:bg-sky-900 text-white text-center"
              >
                <td className="py-4 px-5">{index + 1}</td>
                {user.map((item, index) => {
                  const { firstname, lastname, email } = item;
                  return (
                    <Fragment key={index}>
                      <td className="py-4 px-5">
                        <p>
                          {firstname}
                          <span className="ms-2">{lastname}</span>
                        </p>
                      </td>
                      <td className="py-4 px-5">{email}</td>
                    </Fragment>
                  );
                })}
                <td className="py-4 px-5">{totalPrice}</td>
                <td
                  className={`py-4 px-5 font-semibold ${
                    moment().isSame(moment(deliveredAt), "day")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {moment().isSame(moment(deliveredAt), "day")
                    ? "Received"
                    : "Pending"}
                </td>
                <td className="py-4 px-5">{shipping.city}</td>
                <td className="py-4 px-5">{shipping.countrystate}</td>
                <td className="py-4 px-5">
                  {moment(createdAt).format("DD MMM , YYYY")}
                </td>
                <td className="py-4 px-5">
                  {moment(deliveredAt).format("DD MMM , YYYY")}
                </td>
                <td className="py-4 px-5 ">
                  <Link to={`/admin/get-all-orders/order/${_id}`}>
                    <FaEye />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminGetAllOrders;
