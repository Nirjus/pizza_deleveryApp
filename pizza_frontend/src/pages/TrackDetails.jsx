import React,{useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrder } from "../redux/Action/order";
import { MdBuild, MdPayments, MdVerifiedUser } from 'react-icons/md';

const TrackDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.order);
  const order = orders && orders.find((i) => i._id === id);
    useEffect(() => {
      dispatch(getAllOrder());
    }, [dispatch, id]);
     
  return (
    <div className=' w-full min-h-screen h-auto'>
        <h1 className=" text-center text-[40px] font-[600] text-[#f65e2c]">
       Track Order Page
      </h1>
      <div className="w-full flex flex-row">
      <div className=" w-[30%]  justify-center text-white flex flex-col items-center">
        <div className=" bg-[#00f863] p-4 rounded-b-[30px] gap-3 flex items-center">
          <span className={ "text-[#ffffff]"}>Payment</span>{" "}
          <MdPayments
            size={25}
            color={`"#ffffff"`}
          />
        </div>
        <div className="bg-[#00f863] h-[40px] w-4"></div>
        <div className="bg-[#00f863] p-4  rounded-b-[30px] gap-3  flex items-center">
          <span className={ "text-[#ffffff]"}>Processing</span>{" "}
          <MdBuild
            size={25}
            color={ "#ffffff"}
          />
        </div>
        <div className={`${order.status === "Delevered" ? "bg-[#00f863]" : "bg-[#fff019]"} h-[40px] w-4`}></div>

        <div className={`${order.status === "Delevered" ? "bg-[#00f863]" : "bg-[#fff019]"} p-4 rounded-b-[30px] gap-3 flex items`}>
          <span className={ "text-[#ffffff]"}>Delevered</span>{" "}
          <MdVerifiedUser
            size={25}
            color={ "#ffffff"}
          />
        </div>
      </div>
        <div className=" w-[70%] flex justify-center items-center">
           <div className=' border p-4 bg-slate-100 shadow'>
            {order.status === "Processing" ? (
                <h1 className=' text-[18px] font-[3000]'>Your Order is processing, your order will be delevered very soon!</h1>
            ):(
                <h1 className=' text-[18px] font-[3000]'>Your Order is delevered successfully.</h1>
            )}
           </div>
        </div>
      </div>
    </div>
  )
}

export default TrackDetails