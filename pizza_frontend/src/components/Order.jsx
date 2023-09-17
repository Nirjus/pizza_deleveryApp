import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillDelete,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
  AiOutlineShopping,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
const Order = () => {
  const dispatch = useDispatch();
    const cartItems = [1,2,3,4,5];
  return (
    <div className="orderContainer">
      <div className="orders">
        <h1>
          <AiOutlineShopping color={"red"} /> Your Orders
        </h1>
        {cartItems.length > 0 ? (
          cartItems.map((i) => (
            <OrderCard
              key={i.id}
              name={i.name}
              price={i.price}
              items={i.qty}
              imgSrc={i.imgSrc}
              id={i.id}
             
            />
          ))
        ) : (
          <h1>No Items yet !</h1>
        )}
      </div>
      <div className="totalOrder">
        <h2>Total number of Pizzas: {120}</h2>
        <h2>Tax: {20}</h2>
        <h2>Total price: {120}</h2>
        <Link to={"/checkout"}>
          <button>Checkout(1520)</button>
        </Link>
      </div>
    </div>
  );
};

const OrderCard = ({
  name,
  items,
  price,
  imgSrc,
  id,
 
}) => (
  <div className="orderCard">
    <img src={imgSrc} alt="orderd_Pizza" />
    <div className="orderInfo">
      <h2>Name of Pizza :{name}</h2>
      <p>
        Total Items :
        <div>
          <AiOutlinePlusCircle  size={30} />
          {items}{" "}
          <AiOutlineMinusCircle  size={30} />
        </div>
      </p>
      <h4>
        Price: ₹{price}*{items}
      </h4>
      <Link to={"/checkout"}>
        <button>Checkout</button>
      </Link>
      <AiFillDelete size={30} />
    </div>
  </div>
);

export default Order;
