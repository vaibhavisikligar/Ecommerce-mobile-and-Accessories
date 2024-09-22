import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getAllProduct, getSingalProduct } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Category1 from "../img/Category1.jpeg";
import Category2 from "../img/Category2.jpeg";
import Category3 from "../img/Category3.jpeg";
import Category4 from "../img/Category4.jpeg";
import Category5 from "../img/Category5.jpeg";
import category6 from "../img/Category6.jpeg";

const GetAllProducts = ({ children }) => {
  const { productList } = useSelector((state) => state.product);
  const [page, setpage] = useState(1);
  const [limit, setlimt] = useState(8);
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CategoryList = [
    { id: 1, tital: "Mobile", img: Category1 },
    { id: 2, tital: "Laptop", img: Category5 },
    { id: 3, tital: "Headphone", img: Category2 },
    { id: 4, tital: "AirPods", img: Category3 },
    { id: 5, tital: "Accessories", img: Category4 },
    { id: 6, tital: "Smart Watch", img: category6 },
  ];
  useEffect(() => {
    dispatch(getAllProduct({ page, limit, category, type: "landing" }));
  }, [page, limit, category]);
  const handleViewProduct = (_id) => {
    dispatch(getSingalProduct(_id));
    navigate(`/products/${_id}`);
  };
  return (
    <>
      {/* -----------------------Categorybar------------------------------------------ */}
      <div className="w-full bg-sky-900 h-32 py-2 overflow-x-auto ">
        <div className="w-full md:container flex justify-start md:justify-center gap-4 md:gap-6 items-center ">
          {CategoryList.map((item) => {
            // console.log(item);
            const { id, tital, img } = item;
            return (
              <button key={id} onClick={() => setCategory(tital)}>
                <div className="Category">
                  <div className="category-img w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex justify-center items-center  object-fill">
                    <img
                      src={img}
                      alt=""
                      className="w-14 h-14 md:w-16 md:h-16 rounded-full"
                    />
                  </div>
                  <div className="category-tital text-center text-white text-sm md:text-base mt-2">
                    <h3>{tital}</h3>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      {children}
      <div className="container py-8 px-8">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
            {productList?.data?.map((item) => {
              const { productImage, _id, productName, productPrice } = item;
              return (
                <div
                  className=" bg-gray-300 shadow-md rounded-md p-2"
                  key={_id}
                >
                  <div className="flex justify-center items-center">
                    <div className="w-48 object-fill 	 ">
                      <img
                        src={`https://ecommerce-mobile-accessories.onrender.com/api/products/upload/${productImage}`}
                        alt="productimg"
                        className="w-48 h-56"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="line-clamp-1">{productName}</h5>
                    <h3>{productPrice}</h3>
                  </div>
                  <div className="mt-3 text-center">
                    <button
                      className="buttonStyle1"
                      onClick={() => handleViewProduct(_id)}
                    >
                      View More
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default GetAllProducts;
