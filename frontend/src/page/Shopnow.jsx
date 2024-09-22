import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getAllProduct, getSingalProduct } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Category1 from "../img/Category1.jpeg";
import Category2 from "../img/Category2.jpeg";
import Category3 from "../img/Category3.jpeg";
import Category4 from "../img/Category4.jpeg";
import Category5 from "../img/Category5.jpeg";
import category6 from "../img/Category6.jpeg";
import Select from "react-select";
const CategoryList = [
  { id: 1, tital: "Mobile", img: Category1 },
  { id: 2, tital: "Laptop", img: Category5 },
  { id: 3, tital: "Headphone", img: Category2 },
  { id: 4, tital: "AirPods", img: Category3 },
  { id: 5, tital: "Accessories", img: Category4 },
  { id: 6, tital: "Smart Watch", img: category6 },
];
const BrandList = [
  { id: 1, label: "Acer", value: "Acer" },
  { id: 2, label: "Apple", value: "Apple" },
  { id: 3, label: "ASUS", value: "ASUS" },
  { id: 4, label: "boAt", value: "boAt" },
  { id: 5, label: "Dell", value: "Dell" },
  { id: 6, label: "Fastrack", value: "Fastrack" },
  { id: 7, label: "Fire-Boltt", value: "Fire-Boltt" },
  { id: 8, label: "HP", value: "HP" },
  { id: 9, label: "JB ENTERPRISE", value: "JB ENTERPRISE" },
  { id: 10, label: "JBL", value: "JBL" },
  { id: 11, label: "Lenovo", value: "Lenovo" },
  { id: 12, label: "Mi", value: "Mi" },
  { id: 13, label: "Motorola", value: "Motorola" },
  { id: 14, label: "Noise", value: "Noise" },
  { id: 15, label: "Nokia", value: "Nokia" },
  { id: 16, label: "OnePlus", value: "OnePlus" },
  { id: 17, label: "Redmi", value: "Redmi" },
  { id: 18, label: "Sony", value: "Sony" },
];
const Options = [
  { id: 1, value: "asc", label: "Price: Low to High" },
  { id: 2, value: "desc", label: "Price: High to Low" },
  { id: 3, value: "newest", label: "Newest Arrivals" },
];

const Shopnow = () => {
  const { productList } = useSelector((state) => state.product);
  const [isdropOpen, setIsDropOpen] = useState(false);
  const [page, setpage] = useState(1);
  const [limit, setlimt] = useState(12);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePageClick = (selected) => {
    setpage(selected.selected + 1);
  };
  useEffect(() => {
    dispatch(
      getAllProduct({ page, limit, category, brand, sortOption, type: "shop" })
    );
  }, [page, limit, category, brand, sortOption]);
  const handleViewProduct = (_id) => {
    dispatch(getSingalProduct(_id));
    navigate(`/products/${_id}`);
  };
  const handleGenreChange = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setBrand(selectedValues);
  };
  return (
    <>
      {/* category list */}
      <div className="w-full bg-sky-900 h-32 py-2 overflow-x-auto ">
        <div className="w-full md:container flex justify-start md:justify-center gap-4 md:gap-6 items-center ">
          {CategoryList.map((item) => {
            const { id, tital, img } = item;
            return (
              <button key={id} onClick={() => setCategory(tital)}>
                <div className="Category">
                  <div className="category-img w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex justify-center items-center  object-fill">
                    <img
                      src={img}
                      alt=""
                      className="w-14 h-14 md:w-16 md:h-16 rounded-full"
                    />
                  </div>
                  <div className="category-tital text-center text-white text-sm md:text-base mt-2">
                    <h3>{tital}</h3>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full flex gap-3  ">
        {/* table pachi ni screen mate brand*/}
        <div className="md:w-[30%] lg:w-[20%] xl:w-[15%] bg-sky-950 text-white py-8 hidden md:block">
          <h4 className="px-8 mb-3 font-semibold">Brand</h4>
          <ul>
            {BrandList.map((item) => {
              const { id, label, value } = item;
              return (
                <li className="flex  items-center justify-start px-8" key={id}>
                  <label>
                    <input
                      type="checkbox"
                      name="brand"
                      value={value}
                      className="me-2"
                      onChange={(e) => {
                        var updatedList = [...brand];
                        if (!brand.includes(e.target.value)) {
                          updatedList = [...brand, e.target.value];
                        } else {
                          updatedList.splice(brand.indexOf(e.target.value), 1);
                        }
                        setBrand(updatedList);
                      }}
                    />
                    {label}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-full md:w-[70%] lg:w-[80%] xl:w-[85%]  py-4 px-6 md:px-4">
          <div className="w-full md:flex md:justify-end md:items-center">
            {/* sort by product price  */}
            <div className=" mb-4  w-full md:w-1/4 ">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="selectinputfield"
              >
                <option value="">Sort By</option>
                {Options.map((item) => {
                  const { id, value, label } = item;
                  return (
                    <option key={id} value={value}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* mobile screen mate brand  */}
            <div className="mb-4 w-full md:hidden">
              <div className="relative w-full">
                <button
                  onClick={() => setIsDropOpen((prev) => !prev)}
                  className="buttonStyle2 flex gap-2"
                >
                  Brand
                </button>
                {isdropOpen && (
                  <div className="bg-sky-950 text-black absolute z-10 top-10 rounded-lg p-2 w-full ">
                    <Select
                      value={BrandList.filter((option) =>
                        brand.includes(option.value)
                      )}
                      onChange={handleGenreChange}
                      options={BrandList}
                      isMulti={true}
                      name="brand"
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* all products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {productList?.data?.map((item) => {
              const { productImage, _id, productName, productPrice } = item;
              return (
                <div
                  className="w-full bg-gray-300 shadow-md rounded-md p-2"
                  key={_id}
                >
                  <div className="flex justify-center items-center">
                    <div className="w-48 object-fill 	 ">
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
                  <div className="mt-3 text-center">
                    <button
                      className="buttonStyle1"
                      onClick={() => handleViewProduct(_id)}
                    >
                      View More
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {/* pagination */}
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
    </>
  );
};

export default Shopnow;
