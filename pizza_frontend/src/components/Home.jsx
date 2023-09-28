import React, { useEffect, useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from "../assets/images/caurosul Images/cooker.png";
import img2 from "../assets/images/caurosul Images/eating pizzas.png";
import img3 from "../assets/images/caurosul Images/pizza delevery man.png";
import img4 from "../assets/images/pizza combos.png";
import Typed from "typed.js";
import { PizzaCard } from "./Pizzas";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/Action/product";
import { getAllEvent } from "../redux/Action/event";
import { Link } from "react-router-dom";


const Home = () => {
  const el = useRef(null);
  const dispatch = useDispatch();
  const {products} = useSelector((state) => state.product);
  const {events} = useSelector((state) => state.event);
  useEffect(() => {
     dispatch(getAllProducts());
     dispatch(getAllEvent());
     window.scrollTo(0,0);
  },[dispatch])

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["","H","Hu","Hun","Hung","Hunge","Hunger","Hungers","Hungers.","Hungers..","Hungers..."],
      startDelay: 300,
      typeSpeed: 50,
      backSpeed: 100,
      backDelay: 100,
      loop: true,
      showCursor: true,
      smartBackspace: true,
    });

    return () => {
      typed.destroy();
    };
  });

  return (
    <div className="homeContainer">
      <div className="homediv">
       

        <div className="carousolDiv">
          <div className="headingBanner">
            <h1>
              Pizza for <span ref={el}></span>
            </h1>
            <h1>Grab Pizza</h1>
          </div>
          <Carousel
            className="carousel"
            autoPlay
            interval={6000}
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            infiniteLoop
          >
            <div>
              <img src={img1} alt={"cooker"} />
              <p className="legend">Best cookers</p>
            </div>
            <div>
              <img src={img2} alt={"pizza eating"} />
              <p className="legend">Millions of happy customers</p>
            </div>
            <div>
              <img src={img3} alt={"pizza delevery man"} />
              <p className="legend">Fastest delevery</p>
            </div>
          </Carousel>
        </div>
      </div>
      <div className="offerSection">
        <div className="offers">
          {
            events && events.map((i) => (
              <div className="offerInfo">
              <h1>{i.name}</h1>
              <h4>
               {i.description}
              </h4>
  
              <h2>diccount up to {i.price} %</h2>
              <Link to={"/category"}>
              <button>visit</button>
              </Link>
             
            </div>
            ))
          }
          
          <div className="offerImage">
            <img src={img4} alt={"pizzaCombo"} />
          </div>
        </div>
      </div>
      <div className="featuredPizza">
        <h1>All time favorite Pizzas</h1>
        <div className="pizzaContainer">
          {
          products && products.length === 0 ? <div><h1>Not have any pizza</h1></div> :
          products && products.slice(0,5).map((i) => (
            <PizzaCard
              key={i._id}
              name={i.name}
              imgSrc={i.image.url}
              price={i.price}
              stock={i.stock}
              id={i._id}
              slugName={i.slug}
              descripto={i.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
