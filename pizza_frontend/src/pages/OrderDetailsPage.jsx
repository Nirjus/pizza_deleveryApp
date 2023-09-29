import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrder } from "../redux/Action/order";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
const order = orders && orders.find((i) => i._id === id);
  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch, id]);
   
  return (
    <div className=" w-full min-h-screen h-auto">
      <h1 className=" text-center text-[40px] font-[600] text-[#f65e2c]">
        Order Details Page
      </h1>
      <h1 className=" text-[20px] text-[#393cf5] font-[500] ml-5">SubTotal Price: ₹ {order.subtotalPrice}</h1>
      <h1 className=" text-[20px] text-[#29dd3e] font-[500] ml-5">Shipping Charge: ₹ {order.shippingCharge}</h1>
      <h1 className=" text-[20px] text-[#f9236e] font-[500] ml-5">Total Price: ₹ {order.totalPrice}*</h1>

      <div className=" w-[80%] border shadow-md m-3 mx-auto">
        <h1 className=" text-center border p-2 text-white rounded-md font-[600] bg-[#000]">All Cart Items</h1>
        {order.cart.map((i) => (
          <div className=" flex flex-row px-2 h-[60px] items-center gap-[50px] max-800px:gap-[10px] cursor-pointer hover:bg-slate-200" key={i._id}>
            <img
              src={i.image.url}
              alt="itemPic"
              className=" w-[50px] h-[50px] rounded-full object-contain"
            />
            <h2 className=" p-1 border border-[#626262]">{i.name}</h2>
            <h1>₹ {i.price}</h1>
            <h1>*</h1>
            <h1 className=""> {i.qty}</h1>
          </div>
        ))}
      </div>
      <div className="w-[80%] border shadow-md p-4 m-3 mx-auto mt-[50px] cursor-pointer hover:bg-slate-200">
       <h1 className="text-[#000] font-[600] text-[17px] ">Order status: <span className=" pl-4 font-[400] text-[15px] text-[#353535]"> {order.status} </span></h1>
      </div>
      <br />
      <div className=" w-[80%] border shadow-md m-3 mx-auto">
        <h1 className=" text-center border p-2 text-white rounded-md font-[600] bg-[#000]">Shipping Address</h1>
        <div className=" cursor-pointer hover:bg-slate-200 flex flex-row items-center gap-10 px-2 h-[60px]">
      <h1 className=" text-[#000] font-[500] border border-[#292828] p-1"> City: {order.shippingAddress.city}</h1>
      <h1 className=" text-[#000] font-[500]"> State: {order.shippingAddress.state}</h1>
        </div>
        <div className=" cursor-pointer hover:bg-slate-200 flex flex-row items-center gap-10 px-2 h-[60px]">
      <h1 className=" text-[#000] font-[500]"> Zip Code: {order.shippingAddress.zipCode}</h1>
      <h1 className=" text-[#000] font-[500] border border-[#292828] p-1"> Country: {order.shippingAddress.country}</h1>
        </div>
      </div>
      <br />
      <div className="w-[80%] border shadow-md p-4 m-3 mx-auto mt-[50px] cursor-pointer flex flex-row items-center gap-[40px] max-800px:gap-[15px] hover:bg-slate-200">
       <h1 className="text-[#000] font-[600] text-[17px] ">Payment Type: <span className=" pl-4 font-[400] text-[15px] text-[#353535]"> {order?.paymentInfo?.paymentType} </span></h1>
       <h1 className="text-[#000] font-[600] text-[17px] ">Payment Status: <span className=" pl-4 font-[400] text-[15px] text-[#353535]"> {order?.paymentInfo?.status} </span></h1>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
