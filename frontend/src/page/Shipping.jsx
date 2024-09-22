import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addPaymentMethod, addShipping } from "../redux/addtocartSlice";
import { useNavigate } from "react-router-dom";
const initialValues = {
  fullname: "",
  phone: "",
  address1: "",
  address2: "",
  address3: "",
  pincode: "",
  city: "",
  countrystate: "",
  country: "",
};
const initialValues1 = {
  paymentmethod: "",
};
const handleValidation = Yup.object().shape({
  fullname: Yup.string().required("Full name required!"),
  phone: Yup.number()
    .min(10, "phone Must be 10 Digits! ")
    .required(" Phone required!"),
  address1: Yup.string().required("Flat,House,Buliding,Company required!"),
  address2: Yup.string().required("Area,Street,Sector,Village required!"),
  address3: Yup.string().required("Landmark required!"),
  pincode: Yup.number()
    .min(6, " Pincode only 6 Digits! ")
    .required(" Pincode required!"),
  city: Yup.string().required("City required!"),
  countrystate: Yup.string().required("State required!"),
  country: Yup.string().required("Country required!"),
});
const handleValidation1 = Yup.object().shape({
  paymentmethod: Yup.string().required("Payment method required!"),
});
const Shipping = () => {
  const [formvalue, setFormvalue] = useState(initialValues);
  const [paymentmethod, setPaymentmethod] = useState(initialValues1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    // console.log("values", values);
    dispatch(addShipping(values));
  };
  const handlesubmit1 = (values) => {
    // console.log("values", values);
    dispatch(addPaymentMethod(values));
    navigate("/place-order");
  };
  return (
    <div className="container py-14 px-3">
      <div className="w-full flex justify-between items-start gap-2 flex-col md:flex-row">
        <div className="md:w-3/4 w-full  bg-gray-100 border-2 border-gray-400 rounded-md p-3 mb-3">
          <h2 className="text-2xl font-normal mb-4">
            Enter a new delivery address
          </h2>
          <Formik
            initialValues={formvalue}
            validationSchema={handleValidation}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="w-full flex flex-col md:flex-row gap-2 mb-3">
                <div className="mb-3 w-full">
                  <label htmlFor="fullname" className="mb-2 px-2">
                    Full Name
                  </label>
                  <Field
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    className="inputfield"
                  />
                  <ErrorMessage
                    name="fullname"
                    component="p"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-3 w-full">
                  <label htmlFor="fullname" className="mb-2 px-2">
                    Mobile number
                  </label>
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
              </div>
              <div className="w-full flex flex-col md:flex-row gap-2 mb-3">
                <div className="mb-3 w-full">
                  <label htmlFor="address1" className="mb-2 px-2">
                    Flat,House,Buliding,Company
                  </label>
                  <Field
                    type="text"
                    name="address1"
                    placeholder="address"
                    className="inputfield"
                  />
                  <ErrorMessage
                    name="address1"
                    component="p"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-3 w-full">
                  <label htmlFor="address2" className="mb-2 px-2">
                    Area,Street,Sector,Village
                  </label>
                  <Field
                    type="text"
                    name="address2"
                    placeholder="address"
                    className="inputfield"
                  />
                  <ErrorMessage
                    name="address2"
                    component="p"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row gap-2 mb-3">
                <div className="mb-3 w-full">
                  <label htmlFor="address3" className="mb-2 px-2">
                    Landmark
                  </label>
                  <Field
                    type="text"
                    name="address3"
                    placeholder="address"
                    className="inputfield"
                  />
                  <ErrorMessage
                    name="address3"
                    component="p"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-3 w-full">
                  <label htmlFor="pincode" className="mb-2 px-2">
                    Pincode
                  </label>
                  <Field
                    type="number"
                    name="pincode"
                    placeholder="Pincode"
                    className="inputfield"
                  />
                  <ErrorMessage
                    name="pincode"
                    component="p"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="w-full flex  flex-col md:flex-row gap-2 mb-3">
                <div className="mb-3 w-full">
                  <label htmlFor="city" className="mb-2 px-2">
                    City
                  </label>
                  <Field
                    type="text"
                    name="city"
                    placeholder="City"
                    className="inputfield"
                  />
                  <ErrorMessage
                    name="city"
                    component="p"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-3 w-full">
                  <label htmlFor="countrystate" className="mb-2 px-2">
                    countrystate
                  </label>
                  <Field
                    type="text"
                    name="countrystate"
                    placeholder="state"
                    className="inputfield"
                  />
                  <ErrorMessage
                    name="countrystate"
                    component="p"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="w-full flex  flex-col md:flex-row gap-2 mb-3">
                <div className="mb-3 w-full md:w-1/2">
                  <label htmlFor="city" className="mb-2 px-2">
                    City
                  </label>
                  <Field
                    type="text"
                    name="country"
                    placeholder="Country"
                    className="inputfield"
                  />
                  <ErrorMessage
                    name="country"
                    component="p"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="text-center ">
                <button className="buttonStyle2" type="submit">
                  Use this address
                </button>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="md:w-1/4 w-full  bg-gray-100 border-2 border-gray-400 rounded-md p-3">
          <h2 className="text-xl font-normal mb-4">Select payment method</h2>
          <Formik
            initialValues={paymentmethod}
            validationSchema={handleValidation1}
            onSubmit={handlesubmit1}
          >
            <Form>
              <div className="flex flex-col">
                <label className="mb-3 text-black">
                  <Field
                    type="radio"
                    name="paymentmethod"
                    value="Cash on delivery"
                    className="text-[#495057] border-[#D9DBDA]-500 border-2 me-2 "
                  />
                  Cash on delivery
                </label>
                <label className="mb-3 text-black">
                  <Field
                    type="radio"
                    name="paymentmethod"
                    value="paypal"
                    className="text-[#495057] border-[#D9DBDA]-500 border-2 me-2"
                  />
                  paypal
                </label>
                <label className="mb-3 text-black">
                  <Field
                    type="radio"
                    name="paymentmethod"
                    value="card"
                    className="text-[#495057] border-[#D9DBDA]-500 border-2 me-2"
                  />
                  Credit /Debit card
                </label>
              </div>
              <ErrorMessage
                name="paymentmethod"
                component="p"
                className="errorclass"
              />
              <div className="text-center ">
                <button className="buttonStyle2" type="submit">
                  Continue
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
