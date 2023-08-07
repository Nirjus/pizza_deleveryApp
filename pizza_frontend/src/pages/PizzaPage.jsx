import React from "react";
import { useParams } from "react-router-dom";
import "../styles/pizzaPage.scss";
import { item } from "../data/data";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import image1 from "../assets/images/ingridients pic/cheese.png"
import image2 from "../assets/images/ingridients pic/massals.png"
import image3 from "../assets/images/ingridients pic/olives.png"
import image4 from "../assets/images/ingridients pic/oregano.png"
import image5 from "../assets/images/ingridients pic/pizzaDough.png"
import image6 from "../assets/images/ingridients pic/sausag.png"
import image7 from "../assets/images/ingridients pic/tomato.png"
const PizzaPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const arrbtn = ["Small", "Large", "Medium"];
  const { cartItems } = useSelector((state) => state.cart);
  const selectedPizza = item.find((i) => i.id === params.id);
  const selectedQty = cartItems.find((i) => i.id === selectedPizza.id);
  
  if (!selectedPizza) {
    return (
      <div className="notFound">
        <h1>Pizza Not Found !</h1>
      </div>
    );
  }

  const handler = (options) => {
    dispatch({
      type: "addToCart",
      payload: options
    });
    dispatch({
      type:"calculatePrice",
    })
    toast.success("Item added to cart");
  };

  return (
    <div className="singlePizza">
      <div className="PizzaImage">
        <img src={selectedPizza.imgSrc} alt={selectedPizza.name} />
      </div>
      <div className="singlePizzaInfo">
        <aside>
          <h1>{selectedPizza.name}</h1>
          <p>{selectedPizza.descriptio}</p>
          <h3>${selectedPizza.price}</h3>
        </aside>
        Chosse your Pizza Size:
        {arrbtn.map((i) => (
          <button>{i}</button>
        ))}
        <p>Ingredeients:</p>
        <div className="pizzaorder">
         <img src={image1} alt="" />
         <img src={image2} alt="" />
         <img src={image3} alt="" />
         <img src={image4} alt="" />
         <img src={image5} alt="" />
         <img src={image6} alt="" />
         <img src={image7} alt="" />
        
        </div>
        <button
          onClick={() =>
            handler({
              name: selectedPizza.name,
              qty:selectedQty ? selectedQty : 1,
              price: selectedPizza.price,
              imgSrc: selectedPizza.imgSrc,
              id: selectedPizza.id,
              stock:selectedPizza.stock,
              descriptio:selectedPizza.descriptio
            })
          }
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default PizzaPage;
