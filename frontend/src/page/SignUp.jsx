import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import logo from "../img/logo.png";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../redux/signInSlice";
const initialValues = {
  firstname: "",
  lastname: "",
  city: "",
  phone: "",
  gender: "",
  email: "",
  password: "",
  confirmPassword: "",
  avatar: "",
};
const handleValidate = Yup.object().shape({
  firstname: Yup.string().required("First name required!"),
  lastname: Yup.string().required("Last name required!"),
  city: Yup.string().required("city reduired!"),
  phone: Yup.number()
    .min(10, "phone Must be 10 Digits! ")
    .required(" Phone required!"),
  gender: Yup.string().required("Gender  reduired!"),
  email: Yup.string().email("Invalid email address").required("Email reduired"),
  password: Yup.string()
    .max(15, "Must be 15 characters or less!")
    .required("Password required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password not match!")
    .required("Confirm Password  reduired!"),
  avatar: Yup.mixed()
    .required("Avatar reduired!")
    .test(
      "fileType",
      "Unsupported file format",
      (value) =>
        value &&
        ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
          value.type
        )
    ),
});
const SignUp = () => {
  const [formvalue, setFormvalue] = useState(initialValues);
  const fileInputRef = useRef(null); // Create a ref for the file input element
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    // console.log("values", values);
    const formData = new FormData();
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("city", values.city);
    formData.append("phone", values.phone);
    formData.append("gender", values.gender);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("confirmPassword", values.confirmPassword);
    formData.append("avatar", values.avatar);
    // console.log("formData", formData);
    dispatch(signup({ formData, navigate }));
  };
  return (
    <div className="container py-6 ">
      <div className="flex justify-center items-center">
        <div className="logo w-[120px] ">
          <img src={logo} alt="logo" className="w-full" />
        </div>
      </div>
      <div className=" flex justify-center items-center px-8">
        <div className=" w-full md:w-1/2 lg:w-1/3 bg-gray-100 border-2 border-gray-400 rounded-md p-4">
          <h2 className="text-2xl font-normal mb-4">Create Account</h2>
          <Formik
            initialValues={formvalue}
            validationSchema={handleValidate}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="mb-3">
                  <Field
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    className="inputfield"
                  />
                  <ErrorMessage
                    name="firstname"
                    component="p"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-3">
                  <Field
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    className="inputfield"
                  />
                  <ErrorMessage
                    name="lastname"
                    component="p"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-3">
                  <Field
                    type="text"
                    name="city"
                    placeholder="city"
                    className="inputfield"
                  />
                  <ErrorMessage
                    name="city"
                    component="p"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-3">
                  <Field
                    type="number"
                    name="phone"
                    placeholder="Phone"
                    className="inputfield"
                  />
                  <ErrorMessage
                    name="phone"
                    component="p"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-5 ">
                  <div>
                    <label className="me-3 ms-2 text-[#495057]">
                      <Field
                        type="radio"
                        name="gender"
                        value="male"
                        className="text-[#495057] border-[#D9DBDA]-500 border-2  "
                      />
                      Male
                    </label>
                    <label className="ms-2 text-[#495057]">
                      <Field
                        type="radio"
                        name="gender"
                        value="female"
                        className="text-[#495057] border-[#D9DBDA]-500 border-2"
                      />
                      Female
                    </label>
                  </div>
                  <ErrorMessage
                    name="gender"
                    component="p"
                    className="errorclass"
                  />
                </div>
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
                <div className="mb-3">
                  <Field
                    type="Password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="inputfield"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    name="avatar"
                    className="inputfield"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("avatar", file);
                    }}
                  />
                  <ErrorMessage
                    name="avatar"
                    component="p"
                    className="text-red-500"
                  />
                </div>
                <div className="text-center ">
                  <button className="buttonStyle2" type="submit">
                    Sign up
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
