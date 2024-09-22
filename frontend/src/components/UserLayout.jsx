import React from "react";
import Headerbar from "./Headerbar";
import Footerbar from "./Footerbar";
import { Outlet, useNavigate } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Headerbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footerbar className="p-4 fixed bottom-0 w-full" />
    </div>
  );
};

export default UserLayout;
