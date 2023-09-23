import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/pizzaPage.scss";
import { useDispatch, useSelector } from "react-redux";
import image1 from "../assets/images/ingridients pic/cheese.png"
import image2 from "../assets/images/ingridients pic/massals.png"
import image3 from "../assets/images/ingridients pic/olives.png"
import image4 from "../assets/images/ingridients pic/oregano.png"
import image5 from "../assets/images/ingridients pic/pizzaDough.png"
import image6 from "../assets/images/ingridients pic/sausag.png"
import image7 from "../assets/images/ingridients pic/tomato.png"
import Loader from "../components/Loader";
import { getProduct } from "../redux/Action/product";
const PizzaPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {product,loading} = useSelector((state) => state.product);
  const arrbtn = ["Small", "Large", "Medium"];
  // const selectedItem = product.slug === params.slug;
    const handler = (options) => {
    
  };
  useEffect(() => {
      dispatch(getProduct(params.slug));
  },[dispatch,params])

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
              <h3>${product.price}</h3>
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
