import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { FaSun } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/Action/user";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import Loader from "../Loader";

const AdminDashboardAllUser = () => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const { users,userloading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const deleteHandler = async (id) => {
    await axios
      .delete(`${server}/api/user/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
      dispatch(getAllUser());
  };


  const row = [];
  users &&
    users.forEach((i) => {
      row.push({
        Name: i.name,
        Email: i.email,
        Phone: i.phone,
        Address: i.address,
        Image: i.image.url,
        Joined: i.createdAt.slice(0, 10),
      });
    });

  const columns = [
    {
      headerName: "Name",
      field: "Name",
      checkboxSelection: true,
    },
    { headerName: "Email", field: "Email", tooltipField: "Name" },
    { headerName: "Phone_No", field: "Phone", tooltipField: "Name" },
    { headerName: "Address", field: "Address", tooltipField: "Name" },
    { headerName: "Avatar", field: "Image", 
    cellRenderer: (e) => (
      <div className=" pl-5">
        <img src={e.value} alt="avatar" className=" w-[40px] h-[40px] rounded-full object-cover" />
      </div>
    )
    ,tooltipField: "Name" },
    { headerName: "Joind_At", field: "Joined", tooltipField: "Name" },
    {
      headerName: "Delete",
      field: "Id",
      cellRenderer: (e) => (
        <div>
          <button
            className={`active:bg-slate-800 w-10 h-8 ml-6 ${click ? "hover:bg-slate-700" : "hover:bg-slate-200"}`}
            onClick={() => setUserId(e.value) || setOpen(true)}
          >
            <MdDelete size={20} />
          </button>
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
      userloading ? <Loader /> : (
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
              Are you sure you want to delete this user?
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

export default AdminDashboardAllUser;
