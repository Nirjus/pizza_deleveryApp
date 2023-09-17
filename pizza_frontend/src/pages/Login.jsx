import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import "../styles/login.scss";
import { loadUser, loginUser } from "../redux/Action/user";
import { AiOutlineEye } from "react-icons/ai";
import { FiEyeOff } from "react-icons/fi";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, error, loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(email, password));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "CLEAR_ERROR" });
    }
    if (message) {
      toast.success(message);
      setName("");
      setEmail("");
      setPassword("");
      dispatch({ type: "CLEAR_MESSAGE" });
      navigate("/");
    }
  }, [error, message, dispatch, navigate]);

  return (
    <div className="registration">
      <h1>User LogIn</h1>
      <form action="" onSubmit={submitHandler}>
        <div className="inputclass">
          <label htmlFor="name">Full name</label>
          <input
            type="text"
            placeholder="Name.."
            id="name"
            required
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="inputfild"
          />
        </div>
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
        <div className="inputclass relative">
          <label htmlFor="password">Password</label>
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
        <div className="forgetPassword">
          <Link to={"/forget-password"}>Forgot Password?</Link>
        </div>
        <button type="submit" disabled={loading}>
          Log In
        </button>
        <div className="loginlink">
          <p>Don't have an account?</p>
          <Link to={"/register"}>Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
