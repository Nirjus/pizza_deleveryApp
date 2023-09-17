import React, {  useState } from "react";
import { toast } from "react-toastify";
import "../styles/login.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../server";
import { AiOutlineEye } from "react-icons/ai";
import { FiEyeOff } from "react-icons/fi";

const ResetPassword = () => {
 
    const {token} = useParams();
     const navigate = useNavigate();
    const [password, setPassword] = useState("");
     const [visible, setVisible] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
      await axios.put(`${server}/api/user/reset-password`,{
        token, password
      }).then((res) => {
        toast.success(res.data.message);
        setPassword("");
        navigate("/login");
      }).catch((error) => {
        toast.error(error.response.data.message);
      })
  };

  return (
    <div className="registration">
      <h1>Reset your Password</h1>
      <form action="" onSubmit={submitHandler}>
      
      <div className="inputclass relative">
          <label htmlFor="password">New Password</label>
          <input
            type={visible ? "text" : "password"}
            placeholder="Password.."
            id="password"
            required
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="inputfild"
          />
          {visible ? (
            <AiOutlineEye size={22} className=" absolute top-12 right-12 cursor-pointer" onClick={() => setVisible(false)} />
          ) : (
            <FiEyeOff size={22} className=" absolute top-12 right-12 cursor-pointer " onClick={() => setVisible(true)} />
          )}
        </div>
       
        <button type="submit">
         Update
        </button>
    
      </form>
    </div>
  );
};


export default ResetPassword