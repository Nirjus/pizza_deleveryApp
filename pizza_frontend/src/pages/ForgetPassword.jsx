import React, {  useState } from "react";

import { toast } from "react-toastify";

import "../styles/login.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../server";

const ForgetPassword = () => {
 
 
  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
      await axios.post(`${server}/user/forget-password`,{
        email
      }).then((res) => {
        toast.success(res.data.message);
        setEmail("");
      }).catch((error) => {
        toast.error(error.response.data.message);
      })
  };


  return (
    <div className="registration">
      <h1>Recovery Password</h1>
      <form action="" onSubmit={submitHandler}>
      
        <div className="inputclass">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email.."
            id="email"
            required
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inputfild"
          />
        </div>
       
        <button type="submit">
         Submit
        </button>
        <div className=" flex flex-row gap-14 mt-7">
          <p>Back to Log In page?</p>
          <Link to={"/login"} className=" text-[#a93535]">Login</Link>
        </div>
      </form>
    </div>
  );
};


export default ForgetPassword