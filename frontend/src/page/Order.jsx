import React, { useEffect } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingalOrder } from "../redux/orderSlice";
import { FaLocationDot } from "react-icons/fa6";
import moment from "moment";
import { MdCurrencyRupee } from "react-icons/md";

const Order = () => {
  const { orderList } = useSelector((state) => state.order);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getSingalOrder(id));
  }, [dispatch]);
  const handleSubmit = () => {
    navigate("/");
    localStorage.removeItem("cartList");
  };
  return (
    <div className="container py-8">
      <div className="w-full bg-gray-300 mb-3 p-3">
        <h3 className="font-semibold">
          hey {orderList?.user?.map((e) => e.firstname)}
          <span className="ms-1">
            {orderList?.user?.map((e) => e.lastname)}
          </span>
          ,
        </h3>
        <h3>Your order is confirmed!</h3>
        <p>Thank you for shopping!</p>
      </div>
      <div className="w-full flex  bg-gray-300 p-3 mb-4">
        {orderList && (
          <>
            <div className="w-1/3	customer flex gap-6 ">
              <div className="icon w-12 h-12 rounded-full bg-sky-900 flex justify-center items-center">
                <FaUser />
              </div>
              <div className="info">
                <h2 className="font-semibold">Customer</h2>
                <h3>
                  {orderList?.user?.map((e) => e.firstname)}
                  <span className="ms-1">
                    {orderList?.user?.map((e) => e.lastname)}
                  </span>
                </h3>
                <h3> {orderList?.user?.map((e) => e.email)}</h3>
              </div>
            </div>
            <div className="w-1/3	 order-info flex gap-6">
              <div className="icon w-12 h-12 rounded-full bg-sky-900 flex justify-center items-center">
                <FaShoppingCart />
              </div>
              <div className="info">
                <h2 className="font-semibold">Order info</h2>
                <h3>{orderList?.paymentmethod}</h3>
                <h3
                  className={` ${
                    orderList?.isPaid === false
                      ? "text-red-500"
                      : "text-green-700"
                  } font-semibold`}
                >
                  {orderList?.isPaid === false ? "Not paid" : "Paide "}
                </h3>
              </div>
            </div>
            <div className="w-1/3	 delivery-info flex gap-6">
              <div className="icon w-12 h-12 rounded-full bg-sky-900 flex justify-center items-center">
                <FaLocationDot />
              </div>
              <div className="info">
                <h2 className="font-semibold">Deliver to</h2>
                <h3>{orderList?.shipping?.address1}</h3>
                <h3>{orderList?.shipping?.address3}</h3>
                <h3>{orderList?.shipping?.address2}</h3>
                <h3>
                  {orderList?.shipping?.countrystate}
                  <span className="ms-1">
                    {orderList?.shipping?.country} -
                    {orderList?.shipping?.pincode}
                  </span>
                </h3>
                <h3 className="font-semibold text-green-700">
                  Arriving
                  <span className="ms-1">
                    {moment(orderList?.deliveredAt).format("DD MMM , YYYY")}
                  </span>
                </h3>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="w-full  bg-gray-300 p-3">
        <table className="table-auto ">
          <thead className="text-xs uppercase  bg-sky-900 text-white ">
            <tr className="border-2 border-solid border-l-0 border-r-0 ">
              <th className="py-3  px-6">Product Image</th>
              <th className="py-3  px-6">Product Name</th>
              <th className="py-3  px-6">quantity</th>
              <th className="py-3  px-6">Product Price</th>
            </tr>
          </thead>
          <tbody>
            {orderList.cartItems?.map((item) => {
              const { _id, productImage, productName, productPrice, quantity } =
                item;
              return (
                <tr key={_id}>
                  <td className="py-4 px-5 w-28 h-28">
                    <img
                      src={`https://ecommerce-mobile-accessories.onrender.com/api/products/upload/${productImage}`}
                      alt=""
                      className="w-full"
                    />
                  </td>
                  <td className="my-4 px-5 line-clamp-1">{productName}</td>
                  <td className="py-4 px-5">{quantity}</td>
                  <td className="py-4 px-5">{productPrice * quantity}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td className="font-semibold">Subtotal:</td>
              <td className="flex items-center">
                <MdCurrencyRupee />
                {orderList.subtotalPrice}
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td className="font-semibold">Delivery:</td>
              <td className="flex items-center">
                <MdCurrencyRupee />
                {orderList.shippingPrice}
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td className="font-semibold">Total:</td>
              <td className=" flex items-center">
                <MdCurrencyRupee />
                {orderList.totalPrice}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="text-right mt-3">
        <button className="buttonStyle2" onClick={() => handleSubmit()}>
          ok
        </button>
      </div>
    </div>
  );
};

export default Order;
