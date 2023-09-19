import React, { useEffect } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineOrderedList,
  AiOutlineProfile,
  AiOutlinePropertySafety,
} from "react-icons/ai";
import "./profileSidebr.scss"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logoutUser } from "../../redux/Action/user";
import { toast } from "react-toastify";
import { FaUserShield } from "react-icons/fa";

const UserProfileSidebar = ({active}) => {
  const dispatch = useDispatch();
  const {message, error, user} = useSelector((state) => state.user);

  const logoutHandler = async () => {
    
    await dispatch(logoutUser());
     dispatch(loadUser());
  }

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch({type:"CLEAR_ERROR"});
     }
     if(message){
      toast.success(message);
      dispatch({type:"CLEAR_MESSAGE"});
     }
   },[error,message,dispatch])

  return (
    <div className="sidebar">
      <aside>
       <Link to={"/profile-settings"}>
       <p>
          <AiOutlineProfile size={30} color={active === 1 ? "red" : "black"} />
        <span style={{color:`${active === 1 ? "red" : "black"}`}}> View Profile</span>
        </p>
       </Link>
      {
        user?.isAdmin === true ? (
          <Link to={"/admin-dashboard"}>
          <p>
             <FaUserShield size={30} color={active === 2 ? "red" : "black"} />
           <span style={{color:`${active === 2 ? "red" : "black"}`}}> Admin Dashboard</span>
           </p>
          </Link>
        ) : ( "" )
      }
       <Link to={"/update-user"}>
       <p>
          <AiOutlineHome size={30} color={active === 3 ? "red" : "black"} />
        <span style={{color:`${active === 3 ? "red" : "black"}`}}> Update Profile</span>
        </p>
       </Link>
       <Link to={"/user-orders"}>
       <p>
          <AiOutlineOrderedList size={30} color={active === 4 ? "red" : "black"} />
        <span style={{color:`${active === 4 ? "red" : "black"}`}}> Your orders</span>
        </p>
       </Link>
       <Link to={"/track-orders"}>
       <p>
          <AiOutlineCheckCircle size={30} color={active === 5 ? "red" : "black"} />
        <span style={{color:`${active === 5 ? "red" : "black"}`}}> Track orders</span>
        </p>
       </Link>
       <Link to={"/change-password"}>
       <p>
          <AiOutlinePropertySafety size={30} color={active === 6 ? "red" : "black"} />
        <span style={{color:`${active === 6 ? "red" : "black"}`}}> Change Password</span>
        </p>
       </Link>
       <button className=" flex flex-row gap-4 active:text-[#ff2c2c]" onClick={logoutHandler}>
       
          <AiOutlineLogout size={30} />
        <span className=" max-800px:hidden"> Log Out</span>
      
       </button>
      </aside>
    </div>
  );
};

export default UserProfileSidebar;
