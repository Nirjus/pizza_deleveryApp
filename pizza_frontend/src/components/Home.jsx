import React, { useEffect, useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from "../assets/images/caurosul Images/cooker.png";
import img2 from "../assets/images/caurosul Images/eating pizzas.png";
import img3 from "../assets/images/caurosul Images/pizza delevery man.png";
import img4 from "../assets/images/pizza combos.png";
import Typed from "typed.js";
import { PizzaCard } from "./Pizzas";
import { item } from "../data/data";


const Home = () => {
  const el = useRef(null);
 
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Hungers...", ""],
      startDelay: 300,
      typeSpeed: 100,
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
              Pizza for <span ref={el}>Hungers...</span>
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
          <div className="offerInfo">
            <h1>Crunchy and Crispy Pizza combo</h1>
            <h4>
              pizza, dish of Italian origin consisting of a flattened disk of
              bread dough topped with some combination of olive oil, oregano,
              tomato,
            </h4>

            <h2>15:15:45</h2>

            <button>Order Now</button>
          </div>
          <div className="offerImage">
            <img src={img4} alt={"pizzaCombo"} />
          </div>
        </div>
      </div>
      <div className="featuredPizza">
        <h1>All time favorite Pizzas</h1>
        <div className="pizzaContainer">
          {item.slice(0, 5).map((i) => (
            <PizzaCard
              key={i.id}
              name={i.name}
              imgSrc={i.imgSrc}
              price={i.price}
              stock={i.stock}
              id={i.id}
              descripto={i.descriptio}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
