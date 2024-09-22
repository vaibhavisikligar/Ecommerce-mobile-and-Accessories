import { createSlice } from "@reduxjs/toolkit";
//create order for user
export const createOrder = (orderData, navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://ecommerce-mobile-accessories.onrender.com/api/order`,
      {
        method: "POST",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );
    const data = await response.json();

    dispatch(setOrder(data));
    localStorage.removeItem("shipping");
    localStorage.removeItem("paymentmethod");
    navigate(`/order/${data?.data?._id}`);
  } catch (error) {
    console.log("error", error);
    alert(error.message);
  }
};
//get all order for admin
export const getAllOrder =
  ({ search, type }) =>
  async (dispatch) => {
    try {
      const response = await fetch(
        `https://ecommerce-mobile-accessories.onrender.com/api/order?search=${search}&type=${type}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      // console.log("data", data);
      dispatch(setOrder(data));
      return data;
    } catch (error) {
      console.log("error", error);
      alert(error.message);
    }
  };
// single order for user and admin
export const getSingalOrder = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://ecommerce-mobile-accessories.onrender.com/api/order/${id}`,
      {
        method: "GET",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    // console.log("data", data?.data[0]);
    dispatch(setOrder(data?.data[0]));
    return data;
  } catch (error) {
    console.log("error", error);
    alert(error.message);
  }
};
//get all order by user for user
export const getAllOrderByUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://ecommerce-mobile-accessories.onrender.com/api/odersbyuser`,
      {
        method: "GET",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    // console.log("data", data);
    dispatch(setOrder(data));
    return data;
  } catch (error) {
    console.log("error", error);
    alert(error.message);
  }
};
// order pay for
export const orderPay = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://ecommerce-mobile-accessories.onrender.com/api/order/${id}/pay`,
      {
        method: "PUT",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log("data", data?.data[0]);
    dispatch(setOrder(data?.data[0]));
    return data;
  } catch (error) {
    console.log("error", error);
    alert(error.message);
  }
};
const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderList: [],
  },
  reducers: {
    setOrder: (state, action) => {
      state.orderList = action.payload;
    },
  },
});
export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
