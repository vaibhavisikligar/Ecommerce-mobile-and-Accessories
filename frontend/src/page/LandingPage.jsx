import React from "react";
import heroimg from "../img/hero.png";
import GetAllProducts from "./GetAllProducts";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <GetAllProducts>
        <div className="w-full bg-gradient-to-r from-sky-800 to-sky-700 py-8">
          <div className="container">
            <div className="w-full flex justify-between items-center flex-col md:flex-row px-8">
              <div className="landing-tital w-full mb-3 ">
                <h2 className="w-full md:w-1/2 font-bold text-white   text-4xl md:text-5xl">
                  Our Best Collections For You
                </h2>
                <p className="mt-4 mb-6 w-full md:w-1/2 text-white">
                  best-selling laptops, thin and light laptops, and on DSLR and
                  mirrorless cameras,iPads, iPad Pro, iPad Mini, Samsung Galaxy
                  Tab S7+, Lenovo IdeaPad, Honor Pad 5, camera accessories
                  ,mobiles ,smart watches etc....
                </p>
                <Link className="buttonStyle1" to="/shop">
                  Shop Now
                </Link>
              </div>
              <div className="landing-img w-full md:w-1/2 flex justify-center items-center">
                <img src={heroimg} alt="landing image" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </GetAllProducts>
    </>
  );
};

export default LandingPage;
