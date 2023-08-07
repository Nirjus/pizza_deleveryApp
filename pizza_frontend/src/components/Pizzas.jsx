import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { item } from "../data/data";
import { useDispatch } from "react-redux";

const Pizzas = () => {

  const dispatch = useDispatch();

  const addToCart = (options) => {
     dispatch({type:"addToCart", payload:options})
     dispatch({
      type:"calculatePrice",
    })
    toast.success("Item added to cart");
  }
   
  return (
    <div className="pizzaContainer">
      {
      item.map((i) => (
        <PizzaCard 
        key={i.id}
        name={i.name} 
        imgSrc={i.imgSrc} 
        price={i.price} 
        stock={i.stock}
        id={i.id}
        descripto={i.descriptio}
        handler={addToCart}
        />
      ))
      }
    </div>
  );
};

const PizzaCard = ({ name, imgSrc, price,stock,id,handler,descripto }) => {

return (
 
  <div className="pizzaCard" >
    <Link to={`/pizza/${id}`}>
    <img src={imgSrc} alt={name} />
    <h3>{name}</h3>
    <p>{stock}</p>
    <h4>₹{price}</h4>
    </Link>
    <button onClick={() => handler({imgSrc,name,qty:1,stock,price,id,descripto })}>Order Now</button>
    
  </div>

)
}

export default Pizzas;
