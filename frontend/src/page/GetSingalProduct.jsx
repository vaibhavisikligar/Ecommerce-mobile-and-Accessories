import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingalProduct } from "../redux/productSlice";
import { useLocation, useParams } from "react-router-dom";
import { MdCurrencyRupee } from "react-icons/md";
import { addtocartProduct } from "../redux/addtocartSlice";

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

const GetSingalProduct = () => {
  const { _id } = useParams();
  const { product } = useSelector((state) => state.product);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getSingalProduct(_id));
  }, [dispatch, _id]);
  const handleAddToCart = (productId, state) => {
    const cartProduct = {
      _id: productId,
      productName: state.state.productName,
      productDesp: state.state.productDesp,
      productPrice: state.state.productPrice,
      productImage: state.state.productImage,
      productBrand: state.state.productBrand,
      productCategory: state.state.productCategory,
      countInStock: state.state.countInStock,
      quantity: quantity,
    };
    dispatch(addtocartProduct(cartProduct));
  };
  return (
    <div className="container py-8 ">
      <div className="  w-full flex justify-center items-center flex-col md:flex-row">
        <div className="product-img md:w-1/2 lg:w-1/3 xl:w-1/4 w-full">
          <div className="flex justify-center items-center px-6">
            <img
              src={
                product && product.productImage
                  ? `https://ecommerce-mobile-accessories.onrender.com/api/products/upload/${product.productImage}`
                  : ""
              }
              alt="productimg"
              className="w-full"
            />
          </div>
        </div>
        <div className="product-info w-full md:w-1/2 p-4 bg-gray-50 px-6">
          <h3 className="font-medium text-2xl mb-2">{product?.productName}</h3>
          <h2 className="flex items-center text-2xl font-bold mb-2">
            <MdCurrencyRupee />
            {product?.productPrice}
          </h2>
          <h3 className="font-medium mb-2">Brand : {product?.productBrand}</h3>
          <h3 className="font-medium mb-2 ">
            Category : {product?.productCategory}
          </h3>
          <ul className="list-disc">
            {product?.productDesp?.split("/.").map((e) => (
              <li key={e} className="mb-2">
                {e}
              </li>
            ))}
          </ul>
          <select
            className="mt-4 bg-sky-900 border border-gray-300 text-white text-sm rounded-md p-2"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
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
          <div className="mt-3">
            <button
              className="buttonStyle2"
              onClick={() => handleAddToCart(_id, { state: product })}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetSingalProduct;
