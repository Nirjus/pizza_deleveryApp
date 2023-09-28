import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { getAllEventForAdmin } from "../../redux/Action/event";

const AdminDashboardAllEvent = () => {
  const { events, eventloading } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEventForAdmin());
  }, [dispatch]);

  const deleteHandler = async (slug) => {
    await axios
      .delete(`${server}/event/delete/${slug}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    dispatch(getAllEventForAdmin());
  };

  return (
    <>
      {eventloading ? (
        <Loader />
      ) : (
        <div className=" w-[75%] min-h-screen flex justify-center items-center h-auto">
          <div className="w-[90%] min-h-[90%] h-auto bg-[#2a2a2a] rounded-[20px] shadow-xl relative">
            {events &&
              events.map((i) => (
                  <div className=" text-white p-10 border border-[#fff]">
                    <h1 className=" text-[20px] underline font-[600]">
                      Event Name :
                    </h1>
                    <h1>{i.name}</h1>
                    <br />
                    <br />
                    <h1 className=" text-[20px] underline font-[600]">
                      Event Description :{" "}
                    </h1>
                    <p>{i.description}</p>
                    <br />
                    <br />
                    <h1 className=" text-[20px] underline font-[600]">
                      Event Discount percentage :{" "}
                    </h1>
                    <h2>{i.price} %</h2>

                    <div className=" mt-5">
                      <button className=" rounded-[10px] bg-[#ee4630] p-3 active:bg-[#ab3323] text-white"
                      onClick={() => deleteHandler(i.slug)}
                      >
                        Delete Event
                      </button>
                    </div>
                  </div>
           
              ))}
              {
                events.length === 0 && (
                    <div className=" w-full flex items-center justify-center">
                    <h1 className=" text-white text-[25px] font-[600]">Not have any events!</h1>
                    </div>
                )
              }
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardAllEvent;
