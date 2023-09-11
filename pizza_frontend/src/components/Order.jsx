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
  const { cartItems, tax, totalPrice, totalItems } = useSelector(
    (state) => state.cart
  );

  const decrement = (id) => {
    dispatch({
      type: "decrement",
      payload: id,
    });
    dispatch({
      type: "calculatePrice",
    });
  };
  const increment = (id) => {
    dispatch({
      type: "addToCart",
      payload: { id },
    });
    dispatch({
      type: "calculatePrice",
    });
  };
  const deleteHandler = (id) => {
    dispatch({
      type: "deleteFromCart",
      payload: id,
    });
    dispatch({
      type: "calculatePrice",
    });
  };

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
              increment={increment}
              decrement={decrement}
              deleteHandler={deleteHandler}
            />
          ))
        ) : (
          <h1>No Items yet !</h1>
        )}
      </div>
      <div className="totalOrder">
        <h2>Total number of Pizzas: {totalItems}</h2>
        <h2>Tax: {tax}</h2>
        <h2>Total price: {totalPrice}</h2>
        <Link to={"/checkout"}>
          <button>Checkout(TOTAL)</button>
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
  increment,
  decrement,
  deleteHandler,
}) => (
  <div className="orderCard">
    <img src={imgSrc} alt="orderd_Pizza" />
    <div className="orderInfo">
      <h2>Name of Pizza :{name}</h2>
      <p>
        Total Items :
        <div>
          <AiOutlinePlusCircle onClick={() => increment(id)} size={30} />
          {items}{" "}
          <AiOutlineMinusCircle onClick={() => decrement(id)} size={30} />
        </div>
      </p>
      <h4>
        Price: ₹{price}*{items}
      </h4>
      <Link to={"/checkout"}>
        <button>Checkout</button>
      </Link>
      <AiFillDelete size={30} onClick={() => deleteHandler(id)} />
    </div>
  </div>
);

export default Order;
