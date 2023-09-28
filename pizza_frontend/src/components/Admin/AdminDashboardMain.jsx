import React, { useEffect,useState } from "react";
import { RxArrowUp } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AgGridReact } from "ag-grid-react";
import { FaSun } from "react-icons/fa";
import { getAllUser } from "../../redux/Action/user";
import {  getAllOrdersForAdmin } from "../../redux/Action/order";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { MdUpdate, MdUpdateDisabled } from "react-icons/md";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const AdminDashboardMain = () => {
  const [click, setClick] = useState(false);

  const {users} = useSelector((state) => state.user);
  const {orders,loading} = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);


  const row = [];
  orders &&
  orders.forEach((i) => {
      row.push({
        Total_price: "₹ "+i.totalPrice,
        Total_Item: i.cart.length,
        Id: i._id,
        Status: i.status,
        Created: i.createdAt.slice(0, 10),
      });
    });

  const columns = [
    {
      headerName: "Total_price",
      field: "Total_price",
      checkboxSelection: true,
    },
    { headerName: "Total_Item", field: "Total_Item", tooltipField: "Total_price" },
    { headerName: "Order_ID", field: "Id" },
    { headerName: "Status", field: "Status" },
    { headerName: "Created_At", field: "Created"},
    {
        headerName: "Order_Details",
        field: "Id",
        cellRenderer: (e) => (
          <div>
          <Link to={`/order-details/${e.value}`}>
          <button
              className={`active:bg-slate-400 w-10 h-8 ml-6 border hover:bg-slate-300`}
            >
             <AiOutlineArrowRight size={25}/>
            </button>
          </Link>
          </div>
        ),
      },
      {
        headerName: "Update_status",
        field: "Id",
        cellRenderer: (e) => {
            const updateHandler = async (e) => {
                await axios.put(`${server}/api/order/update/${e.value}`,{},{withCredentials:true})
                .then((res) => {
                    toast.success(res.data.message);
                     window.location.reload(true);
                }).catch((error) => {
                    toast.error(error.response.data.message);
                })
            }
            return(
                <div>
               {
                e.data?.Status === "Delevered" ? (
                  <MdUpdateDisabled size={25}/>
                ) : (
                  <button
                  className={`active:bg-slate-400 w-10 h-8 ml-6 border hover:bg-slate-300`}
                  onClick={() => updateHandler(e)}
                >
                 <MdUpdate size={25}/>
                </button>
                )
               }
                </div>
            )
        },
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
 

  return (
    <div className=" w-[75%] min-h-screen flex justify-center items-center h-auto">
      <div className="w-[90%] h-[90%] bg-[#2a2a2a] rounded-[20px] shadow-xl">
        <div className="w-full text-white my-7 max-800px:my-5 flex max-800px:flex-col justify-evenly items-center">
               <div className=" w-[260px] h-[180px] mt-3 max-800px:w-[190px] justify-evenly flex-col flex items-center max-800px:h-[120px] rounded shadow-sm bg-[#141414a7]">
                <div className="w-[140px] h-[140px] max-800px:text-[10px] max-800px:w-[80px] max-800px:h-[80px] border-[10px] flex flex-col justify-center items-center  border-t-[#ff2424] border-r-[#ff2424] rounded-full"> 
                 <p>$800</p>
                 <p className=" flex items-center gap-2">10% <RxArrowUp size={20} color="red" /></p>
                </div>
                 <p className=" text-white">Total revenew</p>
               </div>
               <div className=" w-[260px] h-[180px] mt-3 max-800px:w-[190px] justify-evenly flex-col flex items-center max-800px:h-[120px] rounded shadow-sm bg-[#141414a7]">
               <div className="w-[140px] h-[140px] max-800px:text-[10px] max-800px:w-[80px] max-800px:h-[80px] border-[10px] flex flex-col justify-center items-center border-l-[#41ff02] border-b-[#41ff02] rounded-full">

               <p>$45000</p>
                 <p className=" flex items-center gap-2">50% <RxArrowUp size={20} color="green" /></p>
               </div>
                 <p className=" text-white">Last month sells</p>
               </div>
               <div className=" w-[260px] h-[180px] mt-3 max-800px:w-[190px] justify-evenly flex-col flex items-center max-800px:h-[120px] rounded shadow-sm bg-[#141414a7]">
                <div className="w-[140px] h-[140px] max-800px:text-[10px] max-800px:w-[80px] max-800px:h-[80px] border-[10px] flex flex-col justify-center items-center border-t-[#375cff] border-l-[#375cff] rounded-full">
                <p>{users?.length}</p>
                 <p className=" flex items-center gap-2">10% <RxArrowUp size={20} color="blue" /></p>
                </div>
                 <p className=" text-white">Total users</p>
               </div>
        </div>
        <div className="w-full text-white my-7 max-800px:my-5 flex justify-evenly items-center">
               <div className=" w-[90%] h-[70vh] mt-3  justify-evenly flex-col flex items-center max-800px:h-[30vh] rounded shadow-sm bg-[#141414a7]">
                 {/* Order details page */}
                 
    {
      loading ? <Loader /> : (
        <div className=" w-full flex justify-center items-center h-auto">
      <div className="w-[100%] min-h-[100%] h-auto bg-[#2a2a2a] rounded-[20px] shadow-xl mt-5 relative">
        <button
          className={` absolute right-1 top-1 z-30 border-2 ${
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
        <div className="w-full h-[70vh] max-800px:h-[40vh] ">
          <AgGridReact
            className={click ? "ag-theme-alpine-dark" : "ag-theme-alpine"}
            rowData={row}
            columnDefs={columns}
            defaultColDef={options}
            enableBrowserTooltips={true}
            pagination={true}
            paginationAutoPageSize={true}
          />
        </div>
       
      </div>
    </div>
      )
    }
    
               </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboardMain;
