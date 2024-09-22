import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import AdminHeaderbar from "./AdminHeaderbar";
const AdminLayout = () => {
  return (
    <div className=" flex flex-row h-screen w-full">
      <div className="w-[15%] bg-sky-900 text-white py-3 ">
        <Sidebar />
      </div>
      <div className="w-[85%] bg-sky-950 h-16 py-3.5  ">
        <AdminHeaderbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
