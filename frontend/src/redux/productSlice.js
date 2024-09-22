import { createSlice } from "@reduxjs/toolkit";
//get all products
export const getAllProduct =
  ({ page, limit, category, brand, sortOption, type, search }) =>
  async (dispatch) => {
    try {
      const response = await fetch(
        `https://ecommerce-mobile-accessories.onrender.com/api/products?page=${page}&limit=${limit}&search=${search}&category=${category}&brand=${brand}&sort=${sortOption}&type=${type}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      // console.log("data", data);
      dispatch(setAllProducrt(data));
      return data;
    } catch (error) {
      console.log("error", error);
      alert(error.message);
    }
  };
//get single product
export const getSingalProduct = (_id) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://ecommerce-mobile-accessories.onrender.com/api/products/${_id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    // console.log("data", data);
    dispatch(setSingleProduct(data.data));
    return data.data;
  } catch (error) {
    console.log("error", error);
    alert(error.message);
  }
};
// admin panal add product
export const addProduct =
  ({ formData }) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://ecommerce-mobile-accessories.onrender.com/api/products`,
        {
          method: "POST",
          headers: {
            authorization: token,
          },
          body: formData,
        }
      );
      const data = await response.json();
      // console.log("data", data);
      // dispatch(setAllProducrt(data));
      alert(data.message);
      return data;
    } catch (error) {
      console.log("error", error);
      alert(error.message);
    }
  };
//admin panal update product
export const updateProduct =
  ({ _id, formData }) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://ecommerce-mobile-accessories.onrender.com/api/products/${_id}`,
        {
          method: "PUT",
          headers: {
            authorization: token,
          },
          body: formData,
        }
      );
      const data = await response.json();
      // console.log("data", data);
      // dispatch(setAllProducrt(data));
      alert(data.message);
      return data;
    } catch (error) {
      console.log("error", error);
      alert(error.message);
    }
  };
//admin panal delete product
export const deleteProdcut = (_id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://ecommerce-mobile-accessories.onrender.com/api/products/${_id}`,
      {
        method: "DELETE",
        headers: {
          authorization: token,
        },
      }
    );
    const data = await response.json();
    // console.log("data", data);
    // dispatch(setAllProducrt(data));
    alert(data.message);
    return data;
  } catch (error) {
    console.log("error", error);
    alert(error.message);
  }
};
//create product review
export const createProductReview =
  ({ _id, rating, title, comment, navigate }) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://ecommerce-mobile-accessories.onrender.com/api/products/${_id}/review`,
        {
          method: "POST",
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating, title, comment }),
        }
      );
      const data = await response.json();
      console.log("data", data);
      dispatch(setSingleProduct(data));
      navigate("/myoders");
    } catch (error) {
      console.log("error", error);
      alert(error.message);
    }
  };
const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [],
    product: {},
  },
  reducers: {
    setAllProducrt: (state, action) => {
      state.productList = action.payload;
    },
    setSingleProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});
export const { setAllProducrt, setSingleProduct } = productSlice.actions;
export default productSlice.reducer;
