import React from "react";
import logo from "../img/logo.png";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa";
const Footerbar = () => {
  return (
    <>
      <div className="w-full bg-sky-900 py-6 text-white px-8 ">
        <div className="container flex justify-between flex-col md:flex-row ">
          <div className="logo ">
            <img src={logo} alt="logo" className="w-1/2 md:w-full" />
          </div>
          <div className="help mb-4">
            <h2 className="font-bold mb-2">Help</h2>
            <ul>
              <li>Payments</li>
              <li>Shipping</li>
              <li>Cancellation & Return</li>
              <li>FAQ</li>
              <li>Report infringement</li>
            </ul>
          </div>
          <div className="policy mb-4">
            <h2 className="font-bold mb-2">Consumer Policy</h2>
            <ul>
              <li>Cancellation & Returns</li>
              <li>Terms of use</li>
              <li>Security</li>
              <li>Privacy</li>
              <li>Sitemap</li>
            </ul>
          </div>
          <div className="follow ">
            <h2 className="font-bold mb-2">Follow</h2>
            <ul className="flex justify-between items-center gap-3">
              <li className="w-10 h-10 bg-sky-900 flex items-center justify-center rounded-full hover:bg-white hover:text-sky-900">
                <FaFacebookF />
              </li>
              <li className="w-10 h-10 bg-sky-900 flex items-center justify-center rounded-full hover:bg-white hover:text-sky-900">
                <FaInstagram />
              </li>
              <li className="w-10 h-10 bg-sky-900 flex items-center justify-center rounded-full hover:bg-white hover:text-sky-900">
                <FaTwitter />
              </li>
              <li className="w-10 h-10 bg-sky-900 flex items-center justify-center rounded-full hover:bg-white hover:text-sky-900">
                <FaGooglePlusG />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footerbar;
