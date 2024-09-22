import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { FaSearch, FaShoppingCart, FaSortDown, FaSortUp } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import logo from "../img/logo.png";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/signInSlice";
import { getProductToBill } from "../redux/addtocartSlice";

const Headerbar = () => {
  const { userList } = useSelector((state) => state.signin);
  const { cartList } = useSelector((state) => state.cart);
  // console.log("userList", userList);
  const [isdropOpen, setIsDropOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // console.log(token);
  useEffect(() => {
    if (token) {
      // console.log("hello");
      dispatch(getUser());
    }
    dispatch(getProductToBill([]));
  }, [token, dispatch]);
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/");
  };
  return (
    <>
      {/* --------------------headerbar----------------------------------- */}
      <div className="w-full h-20 bg-sky-950 text-white flex justify-between items-center px-2">
        <div className="container flex justify-between items-center">
          <Link className="logo w-[125px] md:w-[150px] " to="/">
            <img src={logo} alt="logo" className="w-full" />
          </Link>
          <div className=" gap-5 flex justify-between items-center">
            <div className="search lg:flex relative items-center hidden ">
              <input
                type="text"
                name="searchQuery"
                id="searchQuery"
                placeholder="search...."
                className="inputfield "
              />
              <button className="absolute top-3-5 right-3 text-black">
                <FaSearch />
              </button>
            </div>
            <div className=" gap-4 flex justify-between items-center">
              {token ? (
                <div className="relative flex flex-col items-center w-[105px] md:w-[135px] ">
                  <button
                    onClick={() => setIsDropOpen((prev) => !prev)}
                    className="text-gray-900 p-2 w-full flex items-center justify-between bg-white rounded-lg font-bold text-md"
                  >
                    {userList?.firstname}
                    {!isdropOpen ? <FaSortDown /> : <FaSortUp />}
                  </button>
                  {isdropOpen && (
                    <div className="bg-gray-700 text-white absolute z-10 top-14 rounded-lg p-2 w-full">
                      <ul>
                        <li>
                          <Link
                            to="/myoders"
                            className="nav-link w-100 flex items-center justify-start gap-3 py-2"
                            onClick={() => setIsDropOpen(false)}
                          >
                            <FaShoppingCart /> My Orders
                          </Link>
                        </li>
                        <li>
                          <button
                            className="nav-link w-100 flex items-center justify-start gap-3 py-2"
                            onClick={() => handleSignOut()}
                          >
                            <RiLogoutCircleRLine /> Sign out
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/signin" className="buttonStyle1">
                  sign In
                </Link>
              )}
              <div className="flex items-center relative">
                <Link to="/AddToCart" className="text-3xl">
                  <IoCart />
                </Link>
                <div className="w-5 h-5 rounded-full bg-sky-600 absolute left-4 bottom-4 flex justify-center items-center">
                  <p className="font-semibold">{cartList.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Headerbar;
