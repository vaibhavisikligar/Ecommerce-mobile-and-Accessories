import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import UserLayout from "./components/UserLayout";
import LandingPage from "./page/LandingPage";
import GetSingalProduct from "./page/GetSingalProduct";
import AddToCart from "./page/AddToCart";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";
import AdminLayout from "./admincomponents/AdminLayout";
import Dashboard from "./adminpage/Dashboard";
import AdminGetAllProducts from "./adminpage/AdminGetAllProducts";
import AdminAddProduct from "./adminpage/AdminAddProduct";
import Shopnow from "./page/Shopnow";
import PrivateRouter from "./components/PrivateRouter";
import PrivateAdminRouter from "./admincomponents/PrivateAdminRouter";
import AdminGetAllUser from "./adminpage/AdminGetAllUser";
import Shipping from "./page/Shipping";
import PlaceOrder from "./page/PlaceOrder";
import Order from "./page/Order";
import AdminGetAllOrders from "./adminpage/AdminGetAllOrders";
import MyOrders from "./page/MyOrders";
import ProductReview from "./page/ProductReview";
import AdminOrder from "./adminpage/AdminOrder";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route
              index
              element={
                <PrivateRouter>
                  <LandingPage />
                </PrivateRouter>
              }
            />
            <Route
              path="shop"
              element={
                <PrivateRouter>
                  <Shopnow />
                </PrivateRouter>
              }
            />
            <Route
              path="products/:_id"
              element={
                <PrivateRouter>
                  <GetSingalProduct />
                </PrivateRouter>
              }
            />
            <Route
              path="products/:_id/review"
              element={
                <PrivateRouter>
                  <ProductReview />
                </PrivateRouter>
              }
            />
            <Route
              path="AddToCart"
              element={
                <PrivateRouter>
                  <AddToCart />
                </PrivateRouter>
              }
            />
            <Route
              path="shipping"
              element={
                <PrivateRouter>
                  <Shipping />
                </PrivateRouter>
              }
            />
            <Route
              path="place-order"
              element={
                <PrivateRouter>
                  <PlaceOrder />
                </PrivateRouter>
              }
            />
            <Route
              path="order/:id"
              element={
                <PrivateRouter>
                  <Order />
                </PrivateRouter>
              }
            />
            <Route
              path="myoders"
              element={
                <PrivateRouter>
                  <MyOrders />
                </PrivateRouter>
              }
            />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              index
              element={
                <PrivateAdminRouter>
                  <Dashboard />
                </PrivateAdminRouter>
              }
            />
            <Route
              path="dashboard"
              element={
                <PrivateAdminRouter>
                  <Dashboard />
                </PrivateAdminRouter>
              }
            />
            <Route
              path="get-all-products"
              element={
                <PrivateAdminRouter>
                  <AdminGetAllProducts />
                </PrivateAdminRouter>
              }
            />
            <Route
              path="get-all-products/edit-product/:_id"
              element={
                <PrivateAdminRouter>
                  <AdminAddProduct />
                </PrivateAdminRouter>
              }
            />
            <Route
              path="add-product"
              element={
                <PrivateAdminRouter>
                  <AdminAddProduct />
                </PrivateAdminRouter>
              }
            />
            <Route
              path="get-all-users"
              element={
                <PrivateAdminRouter>
                  <AdminGetAllUser />
                </PrivateAdminRouter>
              }
            />
            <Route
              path="get-all-orders"
              element={
                <PrivateAdminRouter>
                  <AdminGetAllOrders />
                </PrivateAdminRouter>
              }
            />
            <Route
              path="get-all-orders/order/:id"
              element={
                <PrivateAdminRouter>
                  <AdminOrder />
                </PrivateAdminRouter>
              }
            />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signin:id" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
