import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { deleteProdcut, getAllProduct } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const Options = [
  { id: 1, value: "asc", lable: "Price: Low to High" },
  { id: 2, value: "desc", lable: "Price: High to Low" },
  { id: 3, value: "newest", lable: "Newest Arrivals" },
];
const AdminGetAllProducts = () => {
  const { productList } = useSelector((state) => state.product);
  const [page, setpage] = useState(1);
  const [limit, setlimt] = useState(8);
  const [search, setSearch] = useState("");

  const [sortOption, setSortOption] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePageClick = (selected) => {
    setpage(selected.selected + 1);
  };
  useEffect(() => {
    dispatch(getAllProduct({ page, limit, sortOption, search, type: "admin" }));
  }, [page, limit, sortOption, search]);

  if (!productList || productList.length === 0) {
    return <p>No product available.</p>;
  }
  const handleDeleteProduct = async (_id) => {
    await dispatch(deleteProdcut(_id)); // Wait for the deletion to complete
    dispatch(getAllProduct({ page, limit })); // Fetch the updated product list
  };
  const handleEditProduct = (_id, item) => {
    navigate(`/admin/get-all-products/edit-product/${_id}`, { state: item });
  };
  return (
    <div className="container py-16 px-5">
      <div className="w-full flex justify-between items-center mb-3">
        <div className="w-1/4 relative">
          <div className="w-full flex">
            <input
              type="text"
              className="inputfield"
              name="search"
              value={search}
              placeholder="Search...."
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="absolute right-3 top-3.5">
              <FaSearch />
            </button>
          </div>
        </div>
        <div className="w-1/4 mb-4 ">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="inputfield1"
          >
            <option value="">Sort By</option>
            {Options.map((item) => {
              const { id, value, lable } = item;
              return (
                <option key={id} value={value}>
                  {lable}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-4 gap-2  mb-3">
          {productList?.data &&
            productList?.data?.map((item) => {
              const {
                productImage,
                _id,
                productName,
                productPrice,
                productDesp,
                countInStock,
                productBrand,
                productCategory,
              } = item;
              return (
                <div
                  className="w-9/12	 bg-gray-300 shadow-md rounded-md p-2 mb-3"
                  key={_id}
                >
                  <div className="flex justify-center items-center">
                    <div className="w-48 object-fill ">
                      <img
                        src={`https://ecommerce-mobile-accessories.onrender.com/api/products/upload/${productImage}`}
                        alt="productimg"
                        className="w-48 h-56"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="line-clamp-1">{productName}</h5>
                    <h3>{productPrice}</h3>
                  </div>
                  <div className="mt-3 flex justify-between items-center ">
                    <button
                      className="buttonStyle3"
                      onClick={() => handleEditProduct(_id, item)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="buttonStyle3"
                      onClick={() => handleDeleteProduct(_id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex justify-center items-center">
          <ReactPaginate
            breakLabel={<span className="paginationButton">...</span>}
            nextLabel={
              <span className="paginationButton">
                <FaAngleDoubleRight />
              </span>
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={8}
            pageCount={productList.totalPage}
            previousLabel={
              <span className="paginationButton">
                <FaAngleDoubleLeft />
              </span>
            }
            renderOnZeroPageCount={null}
            containerClassName={"containerClassName"}
            pageClassName={"pageClassName"}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminGetAllProducts;
