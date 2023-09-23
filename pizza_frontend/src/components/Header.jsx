import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "../assets/images/headerPizza.png";
import { RxCross1 } from "react-icons/rx";
import { RxAvatar } from "react-icons/rx";
import { AiFillPhone } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../redux/Action/user";
const Header = () => {
  const [open, setOpen] = useState(false);

  //  const {cartItems} = useSelector(state => state.cart);
  const { isAuthenticate,user } = useSelector((state) => state.user);
     
  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(loadUser());
  },[dispatch])

  return (
    <>
    <div className="headerContainer">
      {open ? (
        <div className="hambarger">
          <RxCross1 size={30} onClick={() => setOpen(false)} />
          <p>
            {" "}
            <Link to={"/"} onClick={() => setOpen(false)}>
              Home
            </Link>
          </p>
          <p>
            {" "}
            <Link to={"/pizza-room"} onClick={() => setOpen(false)}>
              Pizzas
            </Link>
          </p>
          <p>
            {" "}
            <Link to={"/orders"} onClick={() => setOpen(false)}>
              Orders
            </Link>
            {/* {cartItems.length > 0 ? <span>{cartItems.length}</span> : ""} */}
          </p>
          <p>
            {" "}
            <Link to={"/category"} onClick={() => setOpen(false)}>
              Category
            </Link>
          </p>
        </div>
      ) : (
        <GiHamburgerMenu
          className="hambargerIcon"
          size={30}
          onClick={() => setOpen(true)}
        />
      )}
      <div className="links">
        <p>
          {" "}
          <Link to={"/"}>Home</Link>
        </p>
        <p>
          {" "}
          <Link to={"/pizza-room"}>Menu</Link>
        </p>
        <p>
          {" "}
          <Link to={"/orders"}>Orders</Link>{" "}
          {/* {cartItems.length > 0 ? <span>{cartItems.length}</span> : ""} */}
        </p>
        <p>
          {" "}
          <Link to={"/category"}>Category</Link>
        </p>
      </div>

      <div className="logo">
        <Link to={"/"}>
          <img src={img} alt="Pizza Png" />{" "}
        </Link>
        <div className="logoHeading">
          <h3>Pizza Corner</h3>
          <p>Online Pizza app</p>
        </div>
      </div>
    </div>
    <div className="login">
          <h3 className=" flex flex-row gap-4 items-center text-[18px]">
            Contact delevery <AiFillPhone /> <span>(757-858-528)</span>
          </h3>

          {isAuthenticate ? (
            <Link to={"/user-profile"}>
              <img src={user?.image?.url} alt={"Profile pic"} />
            </Link>
          ) : (
            <Link to={"/logIn"}>
              <RxAvatar color="white" size={40} />
            </Link>
          )}
        </div>
       {
        isAuthenticate ? "" : (
          <div className=" signUpbar">
          <div className="signUp">
            <Link to={"/register"}> Sign Up </Link>
          </div>
        </div>
        )
       }
    </>
  );
};

export default Header;
