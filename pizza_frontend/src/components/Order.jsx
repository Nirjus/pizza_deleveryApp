import React from 'react'
import { Link } from 'react-router-dom'
import img1 from "../assets/images/pizza2.avif"
import img2 from "../assets/images/pizza1.jpg"
import img3 from "../assets/images/pizza3.png"
import {  AiOutlineShopping } from 'react-icons/ai'
const Order = () => {
  return (
    <div className='orderContainer'>
      <div className="orders">
        <h1><AiOutlineShopping  color={"red"} /> Your Orders</h1>
        <OrderCard name={"Chilli Pizza"} price={1000} items={12} imgSrc={img1}/>
       <OrderCard name={"Tomato Pizza"} items={10} price={1200} imgSrc={img2}/>
       <OrderCard name={"Slice Pizza"} items={4} price={1400} imgSrc={img3} />
      </div>
      <div className="totalOrder">
        <h2>Total number of Pizzas: {56}</h2>
        <h2>Total price: {13000}</h2>
        <Link to={"/checkout"}><button>Checkout(TOTAL)</button></Link>
      </div>
    </div>
  )
}

const OrderCard = ({name, items, price ,imgSrc}) => (
  <div className="orderCard">
  <img src={imgSrc} alt="orderd_Pizza" />
 <div className="orderInfo">
  <h2>Name of Pizza :{name}</h2>
 <p>Total Items {items}</p>
  <h4>Price: ₹{price}*{items}</h4>
  <Link to={"/checkout"}><button>Checkout</button></Link>
 </div>
</div>
)

export default Order