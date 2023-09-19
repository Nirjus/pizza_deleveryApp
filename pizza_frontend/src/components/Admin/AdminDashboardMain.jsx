import React from "react";
import { RxArrowUp } from "react-icons/rx";

const AdminDashboardMain = () => {
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
                <p>10</p>
                 <p className=" flex items-center gap-2">10% <RxArrowUp size={20} color="blue" /></p>
                </div>
                 <p className=" text-white">Total users</p>
               </div>
        </div>
        <div className="w-full text-white my-7 max-800px:my-5 flex justify-evenly items-center">
               <div className=" w-[90%] h-[60vh] mt-3  justify-evenly flex-col flex items-center max-800px:h-[30vh] rounded shadow-sm bg-[#141414a7]">
                 {/* Order details page */}
               </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboardMain;
