import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signin } from "../redux/signInSlice";
import logo from "../img/logo.png";
const initialValues = {
  email: "",
  password: "",
};
const handleValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email Reduired"),
  password: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Password Required"),
});
const SignIn = () => {
  const location = useLocation();
  const [formvalue, setFormvalue] = useState(initialValues);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  const handleSubmit = (values) => {
    // console.log("value", values);
    dispatch(signin({ values, navigate }));
    if (location.pathname === "/signin" && userType !== "admin") {
      navigate("/");
    } else if (location.pathname === "/signin:id") {
      navigate("/AddToCart");
    }
  };
  return (
    <div className="container py-40 ">
      <div className="flex justify-center items-center">
        <div className="logo w-[150px] ">
          <img src={logo} alt="logo" className="w-full" />
        </div>
      </div>

      <div className="flex justify-center items-center px-8">
        <div className="w-full md:w-1/2 lg:w-1/3  bg-gray-100 border-2 border-gray-400 rounded-md p-4 ">
          <h2 className="text-2xl font-normal mb-4">Sign in</h2>
          <Formik
            initialValues={formvalue}
            validationSchema={handleValidation}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-3">
                <Field
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="inputfield"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500"
                />
              </div>
              <div className="mb-3">
                <Field
                  type="Password"
                  name="password"
                  placeholder="Password"
                  className="inputfield"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500"
                />
              </div>
              <div className="text-right mb-3 ">
                <Link className="text-sky-900 font-normal">
                  Forgot Password?
                </Link>
              </div>
              <div className="text-center ">
                <button className="buttonStyle2" type="submit">
                  Sign in
                </button>
              </div>
              <hr className="border-gray-400 m-5" />
              <div className="text-center ">
                <Link to="/signup" className="buttonStyle2">
                  Create Your Account
                </Link>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
