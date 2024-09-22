import React, { useEffect, useState } from "react";
import { MdCurrencyRupee } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteProduct,
  getProductToBill,
  updateProductQuantity,
} from "../redux/addtocartSlice";

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
const AddToCart = () => {
  const { cartList } = useSelector((state) => state.cart);
  // console.log("cartList", cartList);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductToBill([]));
  }, [dispatch]);
  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(updateProductQuantity({ productId, newQuantity }));
  };
  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };
  const subtotalAmount = cartList.reduce((total, product) => {
    return total + product.productPrice * product.quantity;
  }, 0);
  const redirectClick = () => {
    const token = localStorage.getItem("token");
    const shipping = localStorage.getItem("shipping");
    const paymentmethod = localStorage.getItem("paymentmethod");
    if (token) {
      if (shipping && paymentmethod) {
        navigate("/place-order");
      } else {
        navigate("/shipping");
      }
    } else {
      navigate("/signin:id");
    }
  };

  return (
    <div className="container py-9 px-6">
      <div className="w-full flex gap-4 flex-col md:flex-row">
        <div className="w-full md:w-4/5 bg-gray-100 p-5">
          <h3 className="mb-5 text-2xl">
            {cartList.length === 0
              ? " Your Shopping Cart is empty"
              : "Shopping Cart"}
          </h3>
          {cartList?.map((item, index) => {
            const {
              _id,
              productBrand,
              productCategory,
              productImage,
              productName,
              productPrice,
              quantity,
            } = item;
            return (
              <div key={index}>
                <div className="w-full border-t-gray-700 border-l-0 border-r-0 border-b-0 border-2  flex gap-3 mb-3 ">
                  <div className="w-1/5 cart-product-img ">
                    <img
                      src={`https://ecommerce-mobile-accessories.onrender.com/api/products/upload/${productImage}`}
                      alt=""
                      className="w-full"
                    />
                  </div>
                  <div className="w-4/5 ">
                    <div className="w-full cart-product-info ">
                      <div className="flex flex-col md:flex-row">
                        <h2 className="font-bold text-lg mb-2 line-clamp-1">
                          {productName}
                        </h2>
                        <div className="product-price flex items-center">
                          <MdCurrencyRupee />
                          <h2 className="font-semibold text-lg">
                            {productPrice * quantity}
                          </h2>
                        </div>
                      </div>

                      <h4 className="mb-2">
                        <span className="font-semibold me-2">
                          Brand :{productBrand}
                        </span>
                      </h4>
                      <h4>
                        <span className="font-semibold me-2">
                          Category :{productCategory}
                        </span>
                      </h4>
                      <div className=" mt-14 flex items-center gap-5">
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
                        <button
                          className="py-1 px-3 text-sky-900 font-medium border-l-gray-700 border-2 border-t-0 border-b-0 border-r-0"
                          onClick={() => handleDeleteProduct(_id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="w-full border-t-gray-700 border-l-0 border-r-0 border-b-0 border-2 p-3 flex gap-3 mb-3 justify-end">
            <h3 className="flex font-semibold">
              SubTotal ({cartList.length} item) :
              <span className="flex items-center ">
                <MdCurrencyRupee />
                {subtotalAmount}
              </span>
            </h3>
          </div>
        </div>
        <div className="w-full md:w-1/5  ">
          <div className="bg-gray-100 p-5 flex justify-center">
            <div>
              <h3 className="flex font-semibold mb-4">
                SubTotal ({cartList.length} item) :
                <span className="flex items-center ">
                  <MdCurrencyRupee />
                  {subtotalAmount}
                </span>
              </h3>
              <button onClick={redirectClick} className="buttonStyle2">
                Proceed to Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
