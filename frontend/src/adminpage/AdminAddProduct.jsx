import React, { useEffect, useRef, useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../redux/productSlice";
import { useLocation, useParams } from "react-router-dom";
const initialValues = {
  productName: "",
  productDesp: "",
  productPrice: "",
  productImage: "",
  countInStock: "",
  productBrand: "",
  productCategory: "",
};
const handleValidate = Yup.object().shape({
  productName: Yup.string().required("Product Name Required!"),
  productDesp: Yup.string().required("Product Description Required!"),
  productPrice: Yup.number().required("Product Price Required!"),
  productImage: Yup.mixed()
    .required("product Image Reduired!")
    .test(
      "fileType",
      "Unsupported file format",
      (value) =>
        value &&
        ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
          value.type
        )
    ),
  countInStock: Yup.number().required("Count InStock Required!"),
  productBrand: Yup.string().required("Product Brand Required!"),
  productCategory: Yup.string().required("Product Category Required!"),
});
const AdminAddProduct = () => {
  const [formdata, setFormdata] = useState(initialValues);
  const fileInputRef = useRef(null); // Create a ref for the file input element
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { _id } = useParams();
  // console.log("state", state);
  useEffect(() => {
    if (state) {
      setFormdata(state); // Assuming setFormdata is a function to set form values
      // console.log("state", state);
    } else {
      setFormdata(initialValues);
    }
  }, [state]);
  const handlesubmit = (values) => {
    // console.log("values", values);
    const formData = new FormData();
    formData.append("productName", values.productName);
    formData.append("productDesp", values.productDesp);
    formData.append("productPrice", values.productPrice);
    formData.append("productImage", values.productImage);
    formData.append("countInStock", values.countInStock);
    formData.append("productBrand", values.productBrand);
    formData.append("productCategory", values.productCategory);
    if (state) {
      dispatch(updateProduct({ _id: state._id, formData }));
    } else {
      dispatch(addProduct({ formData }));
      setFormdata({
        productName: "",
        productDesp: "",
        productPrice: "",
        productImage: "",
        countInStock: "",
        productBrand: "",
        productCategory: "",
      });
    }
  };
  return (
    <div className="container py-16 px-5 ">
      <div className="flex justify-center items-center m-6">
        <h3 className="text-3xl font-medium">
          {state ? "Edit Product" : "Add Product"}
        </h3>
      </div>
      <div className="flex justify-center items-center mt-3">
        <div className="w-1/2 bg-gray-300 shadow-md rounded-md p-2 ">
          <Formik
            initialValues={formdata}
            validationSchema={handleValidate}
            onSubmit={handlesubmit}
            enableReinitialize="true"
          >
            {({ setFieldValue, values }) => (
              <Form>
                <div className="mb-3">
                  <Field
                    type="text"
                    name="productName"
                    value={values.productName}
                    placeholder="Product Name"
                    className="inputfield"
                  />
                  <ErrorMessage
                    name="productName"
                    component="p"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-3">
                  <Field
                    as="textarea"
                    type="text"
                    name="productDesp"
                    value={values.productDesp}
                    placeholder="Product Description"
                    className="inputfield"
                  />
                  <ErrorMessage
                    name="productDesp"
                    component="p"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-3">
                  <Field
                    type="number"
                    name="productPrice"
                    value={values.productPrice}
                    placeholder="Product Price"
                    className="inputfield"
                  />
                  <ErrorMessage
                    name="productPrice"
                    component="p"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    name="productImage"
                    className="inputfield"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("productImage", file);
                    }}
                  />
                  <ErrorMessage
                    name="productImage"
                    component="p"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-3">
                  <Field
                    type="number"
                    name="countInStock"
                    value={values.countInStock}
                    placeholder="Count InStock"
                    className="inputfield"
                  />
                  <ErrorMessage
                    name="countInStock"
                    component="p"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-3">
                  <Field
                    type="text"
                    name="productBrand"
                    value={values.productBrand}
                    placeholder="Product Brand"
                    className="inputfield"
                  />
                  <ErrorMessage
                    name="productBrand"
                    component="p"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-3">
                  <Field
                    type="text"
                    name="productCategory"
                    value={values.productCategory}
                    placeholder="Product Category"
                    className="inputfield"
                  />
                  <ErrorMessage
                    name="productCategory"
                    component="p"
                    className="text-red-500"
                  />
                </div>
                <div className="text-center ">
                  <button className="buttonStyle2" type="submit">
                    {state ? "Update" : "Add"}
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

export default AdminAddProduct;
