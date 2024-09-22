import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getPaymentMethod,
  getProductToBill,
  getshipping,
  updateProductQuantity,
} from "../redux/addtocartSlice";
import { MdCurrencyRupee } from "react-icons/md";
import { createOrder } from "../redux/orderSlice";
const options = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
];
const PlaceOrder = () => {
  const { cartList, shipping, paymentmethod, delivery } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(updateProductQuantity({ productId, newQuantity }));
  };
  useEffect(() => {
    dispatch(getProductToBill());
    dispatch(getshipping());
    dispatch(getPaymentMethod());
  }, [dispatch]);
  const subtotalAmount = cartList.reduce((total, product) => {
    return total + product.productPrice * product.quantity;
  }, 0);
  const totalprice = subtotalAmount + delivery;
  const handlePlaceOrder = () => {
    const orderData = {
      cartList,
      shipping,
      paymentmethod,
      subtotalAmount,
      delivery,
      totalprice,
    };

    dispatch(createOrder(orderData, navigate));
  };

  return (
    <div className="container py-8">
      <div className="w-full flex justify-center items-start gap-2">
        <div className="w-3/4  bg-gray-100 border-2 border-gray-400 rounded-md p-4 mb-3">
          <div className="w-full delivery-address flex justify-between  border-b-gray-700 border-l-0 border-r-0 border-t-0 border-2 py-3">
            <div className="titla">
              <h2 className="font-semibold">
                1) <span>Delivery address</span>
              </h2>
            </div>
            <div className="info">
              <p>{shipping.fullname}</p>
              <p>{shipping.address1}</p>
              <p>{shipping.address2}</p>
              <p>{shipping.address3}</p>
              <p>
                {shipping.city},{shipping.countrystate} {shipping.pincode}
              </p>
            </div>
            <div className="link">Change</div>
          </div>
          <div className="w-full payment-method flex justify-between  border-b-gray-700 border-l-0 border-r-0 border-t-0 border-2 py-3">
            <div className="titla">
              <h2 className="font-semibold">
                2) <span>Payment method</span>
              </h2>
            </div>
            <div className="info">
              {paymentmethod && paymentmethod.paymentmethod}
            </div>
            <div className="link">Change</div>
          </div>
          <div className="w-full review-items  py-3">
            <div className="titla mb-3">
              <h2 className="font-semibold">
                3) <span>Review items</span>
              </h2>
            </div>
            <div className="w-full items  bg-gray-100 border-2 border-gray-400 rounded-md p-4 ">
              {cartList?.map((item) => {
                const {
                  _id,
                  productImage,
                  productName,
                  productPrice,
                  quantity,
                } = item;
                return (
                  <div className="w-full mb-3 flex gap-2" key={_id}>
                    <div className="w-28 h-28 ">
                      <img
                        src={`https://ecommerce-mobile-accessories.onrender.com/api/products/upload/${productImage}`}
                        alt=""
                        className="w-full"
                      />
                    </div>
                    <div className="w-3/4 item-info">
                      <h5 className="line-clamp-1 font-semibold mb-2">
                        {productName}
                      </h5>
                      <h5 className="flex items-center font-medium mb-2">
                        <MdCurrencyRupee />
                        {productPrice * quantity}
                      </h5>
                      <div className="">
                        <select
                          className="bg-sky-900 border border-gray-300 text-white text-sm rounded-md p-2"
                          value={quantity}
                          onChange={(e) =>
                            handleQuantityChange(_id, parseInt(e.target.value))
                          }
                        >
                          {options.map((item, index) => {
                            const { value, label } = item;
                            return (
                              <option key={index} value={value}>
                                {label}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-1/4  bg-gray-100 border-2 border-gray-400 rounded-md p-3 mb-3">
          <h2 className="font-semibold mb-3">Order summary</h2>
          <div className="summary  border-b-gray-700 border-l-0 border-r-0 border-t-0 border-2 py-3">
            <h5 className="flex justify-between">
              Items:
              <span className="flex items-center">
                <MdCurrencyRupee />
                {subtotalAmount}
              </span>
            </h5>
            <h5 className="flex justify-between">
              Delivery:
              <span className="flex items-center">
                <MdCurrencyRupee />
                {delivery}
              </span>
            </h5>
            <h5 className="flex justify-between">
              Total:
              <span className="flex items-center">
                <MdCurrencyRupee />
                {totalprice}
              </span>
            </h5>
          </div>
          <h3 className="flex justify-between py-3 font-medium">
            Order Total:
            <span className="flex items-center">
              <MdCurrencyRupee />
              {totalprice}
            </span>
          </h3>
          <div className="text-center">
            <button className="buttonStyle2 " onClick={handlePlaceOrder}>
              Place your order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
