import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllOrderByUser } from "../redux/orderSlice";
import moment from "moment";
const MyOrders = () => {
  const { orderList } = useSelector((state) => state.order);
  // console.log("orderList", orderList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllOrderByUser());
  }, [dispatch]);

  return (
    <div className="container py-8 px-4">
      <div className="w-full">
        <h2 className="text-3xl font-normal">Your Orders</h2>
      </div>
      <hr className="border-gray-400 mt-5 mb-5" />
      {orderList?.data?.map((item) => {
        const {
          _id,
          cartItems,
          createdAt,
          isPaid,
          isDelivered,
          deliveredAt,
          shipping,
          totalPrice,
        } = item;
        return (
          <div
            className="w-full border-2  border-gray-400 rounded-md mb-3"
            key={_id}
          >
            <div className="w-full bg-gray-100 card-header flex justify-between items-center px-6 py-2">
              <div className="w-1/2 flex justify-evenly items-center">
                <div>
                  <h6 className="font-semibold">Order place</h6>
                  <h6>{moment(createdAt).format("DD MMM, YYYY")}</h6>
                </div>
                <div>
                  <h6 className="font-semibold">Total</h6>
                  <h6>{totalPrice}</h6>
                </div>
                <div>
                  <h6 className="font-semibold">Ship to</h6>
                  <h6>{shipping.fullname}</h6>
                </div>
              </div>
              <div className="w-1/2 flex justify-end items-center">
                <div>
                  <h6 className="font-semibold">order # {_id}</h6>
                  <div className="flex gap-6">
                    <h6>view order details</h6>
                    <h6>invoice</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-evenly items-center">
                <h3
                  className={`font-semibold mt-3 mb-3  ${
                    isDelivered === false ? "text-red-500" : "text-green-700"
                  }`}
                >
                  {isDelivered === false ? (
                    <span>
                      Delivery
                      <span className="ms-1">
                        {moment(deliveredAt).format("DD MMM, YYYY hh:mm A")}
                      </span>
                    </span>
                  ) : (
                    <span>
                      Delivered
                      <span className="ms-1">
                        {moment(deliveredAt).format("DD MMM, YYYY hh:mm A")}
                      </span>
                    </span>
                  )}
                </h3>
              </div>

              {cartItems.map((item) => {
                const { productImage, _id, productName } = item;
                return (
                  <div
                    className="flex justify-between items-center gap-3"
                    key={_id}
                  >
                    <div className="w-3/4 flex items-center">
                      <div className="w-1/5 flex items-center justify-center">
                        <img
                          src={`https://ecommerce-mobile-accessories.onrender.com/api/products/upload/${productImage}`}
                          alt=""
                          className="w-20 h-20"
                        />
                      </div>
                      <div className="w-3/5">
                        <h6 className="line-clamp-1">{productName}</h6>
                      </div>
                    </div>
                    <div className="w-1/4">
                      {isDelivered === true ? (
                        <Link
                          to={`/products/${_id}/review`}
                          className="buttonStyle2"
                        >
                          Write a product review
                        </Link>
                      ) : (
                        ""
                      )}
                      {/* <Link
                        to={`/products/${_id}/review`}
                        className="buttonStyle2"
                      >
                        Write a product review
                      </Link> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyOrders;
