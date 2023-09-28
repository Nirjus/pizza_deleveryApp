import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/pizzaPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/Action/product";
import {toast} from "react-toastify";
import image1 from "../assets/images/ingridients pic/cheese.png"
import image2 from "../assets/images/ingridients pic/massals.png"
import image3 from "../assets/images/ingridients pic/olives.png"
import image4 from "../assets/images/ingridients pic/oregano.png"
import image5 from "../assets/images/ingridients pic/pizzaDough.png"
import image6 from "../assets/images/ingridients pic/sausag.png"
import image7 from "../assets/images/ingridients pic/tomato.png"
import Loader from "../components/Loader";
import { addToCart } from "../redux/Action/cart";

const PizzaPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {product,loading} = useSelector((state) => state.product);
  const {cart} = useSelector((state) => state.cart);
  const arrbtn = ["Small", "Large", "Medium"];
  // const selectedItem = product.slug === params.slug;
  
  useEffect(() => {
      dispatch(getProduct(params.slug));
  },[dispatch,params])
   
  const handler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if(isItemExists){
      toast.error("Item already in cart");
    }else{
        if(product.stock < 1){
          toast.error("This Item is Out of stock");
        }else{
          const cartData = {...product,qty:1}
          dispatch(addToCart(cartData));
          toast.success("Item Added to cart");
        }
    }
  };
  return (
    <>
    {
      loading ? <Loader /> : (
      <>
      {
        product ? (
          <div className="singlePizza">
          <div className="PizzaImage">
            <img src={product.image.url} alt={product.name} />
          </div>
          <div className="singlePizzaInfo">
            <aside>
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              <h3>₹ {product.price}</h3>
            </aside>
            Chosse your {product?.category} Size:
            {arrbtn.map((i) => (
              <button>{i}</button>
            ))}
           {
            product.category === "Pizza" ? (
              <div>
              <select name="" id="" className=" mt-5 w-full rounded px-2 h-10 outline-none text-white bg-[#f87e41]">
              <option value="">Chose your cheese type</option>
              <option value="Mozzarella Cheese">Mozzarella Cheese</option>
              <option value="Provolone Cheese">Provolone Cheese</option>
              <option value="Cheddar Cheese">Cheddar Cheese</option>
              <option value="Parmesan Cheese">Parmesan Cheese</option>
              <option value="Goat Cheese">Goat Cheese</option>
            </select>
            <select name="" id="" className=" mt-5 w-full rounded px-2 h-10 outline-none text-white bg-[#f87e41]">
              <option value="">Chose your sauce</option>
              <option value="Pesto Sauce">Pesto Sauce</option>
              <option value="Creamy Alfredo Sauce">Creamy Alfredo Sauce</option>
              <option value="BBQ Sauce Isn't Just for Ribs">BBQ Sauce Isn't Just for Ribs</option>
              <option value="Taco Pizzas with Salsa and Refried Beans">Taco Pizzas with Salsa and Refried Beans</option>
              <option value="Ranch ">Ranch </option>
            </select>
            </div>
            ) : ""
           }
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
            onClick={() => handler(product._id)}
            >
              Add to cart
            </button>
          </div>
        </div>
        ) : (
          <div><h1>Product not found</h1></div>
        )
      }
      </>
      )
    }
    </>
  );
};

export default PizzaPage;
