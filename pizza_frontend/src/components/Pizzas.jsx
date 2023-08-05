import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { item } from "../data/data";

const Pizzas = () => {

  const addToCart = () => {
    toast.success("Item added to cart");
  }
   
  return (
    <div className="pizzaContainer">
      {
      item.map((i) => (
        <PizzaCard 
        key={i.id}
        name={i.name} 
        imgSrc={i.imgsrc} 
        price={i.price} 
        stock={i.stock}
        id={i.id}
        handler={addToCart}
        />
      ))
      }
    </div>
  );
};

const PizzaCard = ({ name, imgSrc, price,stock,id,handler }) => {

return (
 <Link to={`/pizza/${id}`}>
  <div className="pizzaCard" >
    <img src={imgSrc} alt={name} />
    <h3>{name}</h3>
    <p>{stock}</p>
    <h4>₹{price}</h4>
    <button onClick={() => handler()}>Order Now</button>
    
  </div>
 </Link>
)
}

export default Pizzas;
