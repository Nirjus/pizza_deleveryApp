import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import img from "../assets/images/headerPizza.png"
import { RxCross1 } from "react-icons/rx"
import { GiHamburgerMenu } from "react-icons/gi"
const Header = () => {

   const [open, setOpen] = useState(false)

  return (
    <div className='headerContainer'>
       {
        open ? (
          <div className="hambarger">
    <RxCross1 size={30} onClick={() => setOpen(false)}/>
     <p> <Link to={"/"} onClick={() => setOpen(false)}>Home</Link></p>
     <p> <Link to={"/pizza-room"} onClick={() => setOpen(false)}>Pizzas</Link></p>
     <p> <Link to={"/orders"} onClick={() => setOpen(false)}>Orders</Link></p>
      <p> <Link to={"/category"} onClick={() => setOpen(false)}>Category</Link></p>
     </div>
        ) : <GiHamburgerMenu className='hambargerIcon' size={30} onClick={() => setOpen(true)} />
      }
    <div className="links">
    <p> <Link to={"/"}>Home</Link></p>
     <p> <Link to={"/pizza-room"}>Pizzas</Link></p>
     <p> <Link to={"/orders"}>Orders</Link></p>
      <p> <Link to={"/category"}>Category</Link></p>
    </div>
    <div className="logo">
      <img src={img} alt="Pizza Png" />
      <div className="logoHeading">
      <h3>Pizza Corner</h3>
      <p>Online Pizza app</p>
      </div>
    </div>
    </div>
  )
}

export default Header