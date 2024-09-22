import { createSlice } from "@reduxjs/toolkit";

const addtocartSlice = createSlice({
  name: "cart",
  initialState: {
    cartList: [],
    shipping: {},
    paymentmethod: "",
    delivery: 50,
  },
  reducers: {
    addtocartProduct: (state, action) => {
      const {
        _id,
        productName,
        productDesp,
        productPrice,
        productImage,
        productBrand,
        productCategory,
        countInStock,
        quantity,
      } = action.payload;
      const existingProductIndex = state.cartList.findIndex(
        (product) => product._id === _id
      );
      if (existingProductIndex !== -1) {
        state.cartList[existingProductIndex].quantity += quantity;
      } else {
        state.cartList.push({
          _id,
          productName,
          productDesp,
          productPrice,
          productImage,
          productBrand,
          productCategory,
          countInStock,
          quantity,
        });
      }
      localStorage.setItem("cartList", JSON.stringify(state.cartList));
    },
    getProductToBill: (state, action) => {
      const storedProducts = JSON.parse(localStorage.getItem("cartList")) || [];
      state.cartList = action.payload
        ? [...storedProducts, ...action.payload]
        : [...storedProducts];
    },
    updateProductQuantity: (state, action) => {
      const { productId, newQuantity } = action.payload;
      const products = state.cartList.findIndex(
        (product) => product._id === productId
      );
      if (products !== -1) {
        state.cartList[products].quantity = newQuantity;
        localStorage.setItem("cartList", JSON.stringify(state.cartList));
      }
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;
      state.cartList = state.cartList.filter((item) => item._id !== productId);
      localStorage.setItem("cartList", JSON.stringify(state.cartList));
    },
    addShipping: (state, action) => {
      const {
        fullname,
        phone,
        address1,
        address2,
        address3,
        pincode,
        city,
        countrystate,
        country,
      } = action.payload;
      state.shipping = {
        // Update shipping as an object
        fullname,
        phone,
        address1,
        address2,
        address3,
        pincode,
        city,
        countrystate,
        country,
      };
      localStorage.setItem("shipping", JSON.stringify(state.shipping));
    },
    getshipping: (state, action) => {
      const storedshipping = JSON.parse(localStorage.getItem("shipping")) || {};
      state.shipping = { ...storedshipping, ...action.payload };
    },
    addPaymentMethod: (state, action) => {
      state.paymentmethod = action.payload;
      localStorage.setItem(
        "paymentmethod",
        JSON.stringify(state.paymentmethod)
      );
    },
    getPaymentMethod: (state, action) => {
      const storedPaymentMethod =
        JSON.parse(localStorage.getItem("paymentmethod")) || "";
      state.paymentmethod = storedPaymentMethod;
    },
  },
});
export const {
  addtocartProduct,
  updateProductQuantity,
  getProductToBill,
  deleteProduct,
  addShipping,
  getshipping,
  addPaymentMethod,
  getPaymentMethod,
} = addtocartSlice.actions;
export default addtocartSlice.reducer;
