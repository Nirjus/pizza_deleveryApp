import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { TiTick } from "react-icons/ti";
const CheckoutSteps = ({ active }) => {
  return (
    <div className="w-full flex justify-center bg-[#e2e2e2] py-10">
      <div className="800px:w-[90%] w-full  justify-center text-white flex items-center">
        <div className=" bg-[#fff019] p-2 rounded-[20px] gap-3 flex items-center">
          <span className={`${active === 1 ? "text-[#00ff33]" : "text-[#ffffff]"}`}>Shipping</span>{" "}
          <FaShippingFast
            size={25}
            color={`${active === 1 ? "#00ff33" : "#ffffff"}`}
          />
        </div>
        <div className="bg-[#fff019] h-2 w-6"></div>
        <div className="bg-[#fff019] p-2  rounded-[20px] gap-3  flex items-center">
          <span className={`${active === 2 ? "text-[#00ff33]" : "text-[#ffffff]"}`}>Payment</span>{" "}
          <MdPayments
            size={25}
            color={`${active === 2 ? "#00ff33" : "#ffffff"}`}
          />
        </div>
        <div className="bg-[#fff019] h-2 w-6"></div>

        <div className="bg-[#fff019] p-2 rounded-[20px] gap-3 flex items">
          <span className={`${active === 3 ? "text-[#00ff33]" : "text-[#ffffff]"}`}>Success</span>{" "}
          <TiTick
            size={25}
            color={`${active === 3 ? "#00ff33" : "#ffffff"}`}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
