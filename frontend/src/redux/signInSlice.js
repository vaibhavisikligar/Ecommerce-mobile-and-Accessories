import { createSlice } from "@reduxjs/toolkit";
export const signin =
  ({ values, navigate }) =>
  async (dispatch) => {
    try {
      const response = await fetch(
        `https://ecommerce-mobile-accessories.onrender.com/api/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      // console.log(data);
      const token = data.token;
      const userType = data.data.userType;
      localStorage.setItem("token", token);
      localStorage.setItem("userType", userType);
      if (userType !== "user") {
        navigate("/admin");
      }
      dispatch(setuser(data));
      return data;
    } catch (error) {
      console.log("error", error);
      alert(error.message);
    }
  };
export const signup =
  ({ formData, navigate }) =>
  async () => {
    try {
      const response = await fetch(
        `https://ecommerce-mobile-accessories.onrender.com/api/signup`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        navigate("/signin");
      } else {
        throw new Error(data.error); // Handle specific error cases
      }
      return data.data;
    } catch (error) {
      console.log("error", error);
      alert(error.message);
    }
  };
export const getUser = () => async (dispatch) => {
  try {
    // console.log("hi");
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://ecommerce-mobile-accessories.onrender.com/api/user`,
      {
        method: "GET",
        headers: {
          authorization: token,
        },
      }
    );
    const data = await response.json();
    // console.log("data", data.data);
    dispatch(setuser(data.data));
    return data;
  } catch (error) {
    console.log("error", error);
    alert(error.message);
  }
};
export const getAllUser =
  ({ gender, search }) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://ecommerce-mobile-accessories.onrender.com/api/users?gender=${gender}&search=${search}`,
        {
          method: "GET",
          headers: {
            authorization: token,
          },
        }
      );
      const data = await response.json();
      // console.log("data", data);
      dispatch(setadminuser(data));
      return data;
    } catch (error) {
      console.log("error", error);
      alert(error.message);
    }
  };
const signInSlice = createSlice({
  name: "signin",
  initialState: {
    userList: [],
    allUserList: [],
  },
  reducers: {
    setuser: (state, action) => {
      state.userList = action.payload;
    },
    setadminuser: (state, action) => {
      state.allUserList = action.payload;
    },
  },
});
export const { setuser, setadminuser } = signInSlice.actions;
export default signInSlice.reducer;
