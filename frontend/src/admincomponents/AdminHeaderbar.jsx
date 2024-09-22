import React, { useEffect, useState } from "react";
import { FaCaretDown, FaSortDown, FaSortUp } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../redux/signInSlice";

const AdminHeaderbar = () => {
  const { userList } = useSelector((state) => state.signin);
  // console.log(userList);
  const [isdropOpen, setIsDropOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(getUser());
  }, []);
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/");
  };
  return (
    <div>
      <div className="float-right me-10">
        <div className="relative w-28">
          <button
            onClick={() => setIsDropOpen((prev) => !prev)}
            className="text-gray-900 p-2 w-full flex items-center justify-between bg-white rounded-lg font-bold text-md"
          >
            {userList?.firstname}
            {!isdropOpen ? <FaSortDown /> : <FaSortUp />}
          </button>
          {isdropOpen && (
            <div className="w-full bg-sky-900 text-white absolute z-10 top-10">
              <ul>
                <li>
                  <button
                    className="nav-link w-100 flex items-center justify-start gap-3 p-2.5 font-bold"
                    onClick={() => handleSignOut()}
                  >
                    <RiLogoutCircleRLine />
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHeaderbar;
