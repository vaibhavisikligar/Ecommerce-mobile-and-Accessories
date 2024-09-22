import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createProductReview, getSingalProduct } from "../redux/productSlice";
import { FaStar } from "react-icons/fa";

const ProductReview = () => {
  const { _id } = useParams();
  const { product } = useSelector((state) => state.product);
  const [rating, setrating] = useState(0);
  const [hover, sethover] = useState(0);
  const [title, settitle] = useState("");
  const [comment, setcomment] = useState("");
  //   console.log("product", product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getSingalProduct(_id));
  }, [dispatch, _id]);
  const handleSubmit = () => {
    console.log("_id, rating, title, comment ", _id, rating, title, comment);
    dispatch(createProductReview({ _id, rating, title, comment, navigate }));
  };
  return (
    <div className="container py-8 px-4">
      <div className="w-full flex flex-col md:flex-row md:justify-between items-center bg-gray-200 p-3 mb-3">
        <div className="md:w-1/2 w-full">
          <h3 className="text-2xl font-medium">Ratings & Reviews</h3>
        </div>
        <div className="md:w-1/2 w-full flex justify-between items-center">
          <h5 className="line-clamp-1">{product.productName}</h5>
          <img
            src={
              product.productImage
                ? `https://ecommerce-mobile-accessories.onrender.com/api/products/upload/${product.productImage}`
                : ""
            }
            alt=""
            className="w-16 h-16"
          />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-2">
        <div className=" md:w-2/5 lg:w-1/4 w-full bg-gray-200 ">
          <div className=" border-2 border-b-gray-300 p-4 ">
            <h3 className="font-medium">What makes a good review </h3>
          </div>
          <div className="p-4">
            <div className="border-2 border-b-gray-300 mb-1">
              <h3 className="mb-1 font-normal">Have you used this product?</h3>
              <p className="mb-3 font-light">
                Your review should be about your experience with the product
              </p>
            </div>
            <div className="border-2 border-b-gray-300 mb-1">
              <h3 className="mb-1 font-normal">Why review a product?</h3>
              <p className="mb-3 font-light">
                Your valuable feedback will help fellow shoppers decide!
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-normal">How to review a product?</h3>
              <p className="mb-3 font-light">
                Your review should include facts.An honest opinion is always
                appreciated.if you have an issue with the product or service
                please contact us from the help center
              </p>
            </div>
          </div>
        </div>
        <div className="md:w-3/5 lg:w-3/4 w-full bg-gray-200">
          <div className="w-full ">
            <div className="w-full p-4 border-2 border-b-gray-300 ">
              <h3 className="font-medium mb-3 ">Rate this product</h3>
              <div className="w-full flex gap-3  ">
                {[...Array(5)].map((star, index) => {
                  const currentvalue = index + 1;
                  return (
                    <label key={index} className="flex">
                      <input
                        type="radio"
                        name="rating"
                        value={currentvalue}
                        className="hidden"
                        onClick={() => setrating(currentvalue)}
                      />
                      <FaStar
                        className="cursor-pointer"
                        size={25}
                        color={
                          currentvalue <= (hover || rating) ? "#082f49" : "gray"
                        }
                        onMouseEnter={() => sethover(currentvalue)}
                        onMouseLeave={() => sethover(0)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="w-full p-4">
              <h3 className="font-medium mb-3 ">Review this product</h3>
              <div className="mb-3">
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                  placeholder="Title......"
                  className="inputfield"
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="comment"
                  value={comment}
                  onChange={(e) => setcomment(e.target.value)}
                  placeholder="Description....."
                  className="inputfield"
                  rows="5"
                />
              </div>
            </div>
            <div className="text-right p-4">
              <button className="buttonStyle2" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
