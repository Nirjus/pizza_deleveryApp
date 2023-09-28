import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { FaSun } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { getAllOrder } from "../../redux/Action/order";
import { Link } from "react-router-dom";
import { MdTrackChanges } from "react-icons/md";

const UserOrderTrack = () => {
  const [click, setClick] = useState(false);
  const { orders,loading } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);
 

  const row = [];
  orders &&
  orders.forEach((i) => {
      row.push({
        Total_price: "₹ "+i.totalPrice,
        Total_Item: i.cart.length,
        Id: i._id,
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
    { headerName: "Created_At", field: "Created"},
    {
        headerName: "Track_order",
        field: "Id",
        cellRenderer: (e) => (
          <div>
          <Link to={`/track-order-details/${e.value}`}>
          <button
              className={`active:bg-slate-400 w-10 h-8 ml-6 border hover:bg-slate-300`}
            >
             <MdTrackChanges size={25}/>
            </button>
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
 

  return (
    <>
    {
      loading ? <Loader /> : (
        <div className=" w-full flex justify-center items-center h-auto">
      <div className="w-[90%] min-h-[90%] h-auto bg-[#2a2a2a] rounded-[20px] shadow-xl my-5 relative">
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
        <div className="w-full h-[70vh] max-800px:h-[75vh] m-auto my-7">
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
    </>
  );
};

export default UserOrderTrack