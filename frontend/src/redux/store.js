import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import addtocartSlice from "./addtocartSlice";
import signInSlice from "./signInSlice";
import orderSlice from "./orderSlice";
const store = configureStore({
  reducer: {
    product: productSlice,
    cart: addtocartSlice,
    signin: signInSlice,
    order: orderSlice,
  },
});
export default store;
