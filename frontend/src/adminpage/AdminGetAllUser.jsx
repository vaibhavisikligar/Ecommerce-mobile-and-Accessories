import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../redux/signInSlice";
import { FaSearch } from "react-icons/fa";

const options = [
  { id: 1, value: "female", label: "Female" },
  { id: 2, value: "male", label: "Male" },
];
const AdminGetAllUser = () => {
  const { allUserList } = useSelector((state) => state.signin);
  const [gender, setGender] = useState("");
  const [search, setSearch] = useState("");
  // console.log("allUserList", allUserList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser({ gender, search }));
  }, [gender, search]);
  return (
    <div className="container py-16 px-5">
      <div className="w-full flex justify-between items-center mb-5">
        <div className="w-1/4 ">
          <div className="w-full flex relative ">
            <input
              type="text"
              name="search"
              value={search}
              placeholder="Search......"
              onChange={(e) => setSearch(e.target.value)}
              className="inputfield1"
            />
            <button className="absolute right-3 top-3.5">
              <FaSearch />
            </button>
          </div>
        </div>
        <div className="w-1/4">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="selectinputfield"
          >
            <option value="">select</option>
            {options.map((item) => {
              const { id, value, label } = item;
              return (
                <option key={id} value={value}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <table className="table-auto w-full">
        <thead className="text-xs uppercase  bg-sky-900 text-white ">
          <tr className="border-2 border-solid border-l-0 border-r-0 ">
            <th className="py-3  px-6">No.</th>

            <th className="py-3  px-6">User name</th>
            <th className="py-3  px-6">City</th>
            <th className="py-3  px-6">Phone</th>
            <th className="py-3  px-6">Gender</th>
            <th className="py-3  px-6">Email</th>
          </tr>
        </thead>
        <tbody>
          {allUserList?.data?.map((item, index) => {
            const {
              _id,
              avatar,
              city,
              email,
              firstname,
              lastname,
              gender,
              phone,
            } = item;
            return (
              <tr
                className="odd:bg-sky-950  even:bg-sky-900 text-white text-center"
                key={_id}
              >
                <td className="py-4 px-5">{index + 1}</td>
                <td className="py-4 px-5 flex justify-start items-center gap-3">
                  <div className="w-14 h-14">
                    {avatar ? (
                      <img
                        src={`https://ecommerce-mobile-accessories.onrender.com/api/signup/upload/${avatar}`}
                        alt="avatar"
                        className="w-14 h-14 border-2 bg-white rounded-full flex justify-center items-center  object-fill overflow-hidden"
                      />
                    ) : (
                      <p>No poster available</p>
                    )}
                  </div>

                  <p>
                    {firstname} <span>{lastname}</span>
                  </p>
                </td>
                <td className="py-4 px-5">{city}</td>
                <td className="py-4 px-5">{phone}</td>
                <td className="py-4 px-5">{gender}</td>
                <td className="py-4 px-5">{email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminGetAllUser;
