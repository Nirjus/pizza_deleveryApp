import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { FaSun } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";
import {  MdDelete, MdUpdate } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import {  getAllProductsForAdmin } from "../../redux/Action/product";
import Loader from "../Loader";
import { Link } from "react-router-dom";

const AdminDashboardGetAllPizza = () => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const { products,productloading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsForAdmin());
  }, [dispatch]);

  const deleteHandler = async (slug) => {
    await axios
      .delete(`${server}/product/delete/${slug}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
      dispatch(getAllProductsForAdmin());
  };


  const row = [];
  products &&
    products.forEach((i) => {
      row.push({
        Name: i.name,
        Category: i.category,
        Price: i.price,
        Stock: i.stock,
        Image: i.image.url,
        Created_At: i.createdAt.slice(0, 10),
      });
    });

  const columns = [
    {
      headerName: "Name",
      field: "Name",
      checkboxSelection: true,
    },
    { headerName: "Category", field: "Category", tooltipField: "Name" },
    { headerName: "Price", field: "Price", tooltipField: "Name" },
    { headerName: "Stock", field: "Stock", tooltipField: "Name" },
    { headerName: "Image", field: "Image", 
       cellRenderer: (e) => (
        <div className=" pl-5">
          <img src={e.value} alt="product" className=" w-[40px] h-[40px] rounded-full object-cover" />
        </div>
       )
  },
    { headerName: "Created_At", field: "Created_At", tooltipField: "Name" },
    {
      headerName: "Delete",
      field: "slug",
      cellRenderer: (e) => (
        <div>
          <button
            className={`active:bg-slate-800 w-10 h-8 ml-6 ${click ? "hover:bg-slate-700" : "hover:bg-slate-200"}`}
            onClick={() => setUserId(e.data.Slug) || setOpen(true)}
          >
            <MdDelete size={20} />
          </button>
        </div>
      ),
    },
    {
      headerName: "Update",
      field: "slug",
      cellRenderer: (e) => (
        <div className={`active:bg-slate-800 w-10 h-8 ml-6 ${click ? "hover:bg-slate-700" : "hover:bg-slate-200"}`}>
          <Link to={`/admin-updatepizza/${e.data.Slug}`}
          >
            <MdUpdate size={30} />
          </Link>
        </div>
      ),
    },
  ];

  const options = {
    sortable: true,
    editable: true,
    filter: true,
    floatingFilter: true,
    flex: 1,
    minWidth: 200,
    resizable: true,
  };
  let gridApi;
  const onGridReady = (parameter) => {
    gridApi = parameter.api;
  };
  const onExport = () => {
    gridApi.exportDataAsCsv();
  };

  return (
    <>
    {
      productloading ? <Loader /> : (
        <div className=" w-[75%] min-h-screen flex justify-center items-center h-auto">
      <div className="w-[90%] min-h-[90%] h-auto bg-[#2a2a2a] rounded-[20px] shadow-xl relative">
        <button
          className={` absolute right-1 top-8 z-30 border-2 ${
            click ? "border-[#ffffff]" : "border-[#000000]"
          }`}
        >
          {click ? (
            <FaSun color="white" size={18} onClick={() => setClick(false)} />
          ) : (
            <BsFillMoonStarsFill
              size={18}
              color="black"
              onClick={() => setClick(true)}
            />
          )}
        </button>
        <div className="w-full h-[94vh] max-800px:h-[80vh] m-auto my-7">
          <AgGridReact
            className={click ? "ag-theme-alpine-dark" : "ag-theme-alpine"}
            rowData={row}
            columnDefs={columns}
            defaultColDef={options}
            onGridReady={onGridReady}
            enableBrowserTooltips={true}
            pagination={true}
            paginationAutoPageSize={true}
          />
          <button className=" border-2 bg-[#ffce1b]" onClick={() => onExport()}>
            export
          </button>
        </div>
        {
        open ? (
          <div className="w-full fixed top-0 left-40 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
          <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-[#fff] rounded shadow p-5">
            <div className="w-full flex justify-end cursor-pointer">
              <RxCross1 size={25} onClick={() => setOpen(false)} />
            </div>
            <h3 className=" text-[25px] text-center py-5 font-Poppins text-[#000000a3]">
              Are you sure you want to delete this item?
            </h3>
            <div className="w-full flex justify-center items-center">
              <div
                className={` bg-black rounded-[10px] cursor-pointer text-white text-[18px] h-[42px] p-2 mr-4`}
                onClick={() => setOpen(false)}
              >
                {" "}
                cancel{" "}
              </div>
              <div
                className={`bg-black rounded-[10px] cursor-pointer text-white text-[18px] h-[42px] p-2 ml-4`}
                onClick={() => setOpen(false) || deleteHandler(userId)}
              >
                {" "}
                confirm{" "}
              </div>
            </div>
          </div>
        </div>
        ) : ("")
      }
      </div>
    </div>
      )
    }
    </>
  );
};

export default AdminDashboardGetAllPizza