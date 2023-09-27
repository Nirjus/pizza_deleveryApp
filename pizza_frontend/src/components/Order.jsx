import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiFillDelete,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
  AiOutlineShopping,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {addToCart, removeFromCart} from "../redux/Action/cart";
import { toast } from "react-toastify";

const Order = () => {
  const dispatch = useDispatch();
    const {cart} = useSelector((state) => state.cart);
    const navigate = useNavigate();

    const totalPrice = cart.reduce((acc,item) => acc + item.qty * item.price,0);
    const totalFood = cart.reduce((acc,item) => acc + item.qty ,0);
    const qtyChangeHandler = (data) => {
      dispatch(addToCart(data));
    }
    const removeItem = (data) => {
      dispatch(removeFromCart(data))
    }
    const totalCheckOut = (data) => {
      navigate(`/checkout?item=${data}`)
    }
  return (
    <div className="orderContainer">
      <div className="orders">
        <h1 className=" flex flex-row items-center gap-3 m-2">
          <AiOutlineShopping color={"red"} size={20} /> Your Orders
        </h1>
        {cart.length > 0 ? (
          cart.map((i) => (
            <OrderCard
              key={i._id}
              name={i.name.slice(0,15) + ".."}
              price={i.price}
              items={i.qty}
              imgSrc={i.image.url}
              id={i._id}
            data={i}
            quantityChangeHandler={qtyChangeHandler}
            removeFromCart={removeItem}
            />
          ))
        ): (
          <h1 className=" mt-10">Not have any cart Item!</h1>
        ) }
      </div>
      <div className="totalOrder">
        <h2>Total Food Items: {totalFood}</h2>
        <h2>Tax: {0}</h2>
        <h2>Total price: ₹{totalPrice}</h2>
       
          <button onClick={() => totalCheckOut(cart)}>Checkout(₹{totalPrice})</button>

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
  data,
  quantityChangeHandler,
  removeFromCart
}) => {

  const [value, setValue] = useState(items);
  const navigate = useNavigate();
  const incrementHandler = (data) => {
    if(data.stock <= value){
      toast.error("This Item is Out of stock");
    }else{
      setValue(value +1);
    const updateCartQty = {...data, qty:value + 1};
    quantityChangeHandler(updateCartQty);
    }
 }
 const decrementHandler = (data) => {
  setValue(value === 1 ? 1 : value - 1);
  const updateCartQty = {...data, qty:value === 1 ? 1 : value -1 };
  quantityChangeHandler(updateCartQty);
}
 const singleCheckout = (data) => {
  navigate(`/checkout?item=${data._id}`);

 }
  return(
  <div className="orderCard">
    <img src={imgSrc} alt="orderd_Pizza" />
    <div className="orderInfo">
      <h2>Item Name:{name}</h2>
      <p>
        Total Items :
        <div>
          <AiOutlinePlusCircle  size={30} onClick={() => incrementHandler(data)} />
          {value}{" "}
          <AiOutlineMinusCircle  size={30} onClick={() => decrementHandler(data)}/>
        </div>
      </p>
      <h4>
        Price: ₹{price}*{items}
      </h4>
     
        <button onClick={() => singleCheckout(data)}>Checkout</button>
     
      <AiFillDelete size={30} onClick={() => removeFromCart(data)} className=" mt-[-50px] mr-[-170px]" />
    </div>
  </div>
)};

export default Order;
