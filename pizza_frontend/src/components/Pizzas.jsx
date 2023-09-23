import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useSearchParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { CiPizza } from "react-icons/ci";
import { getAllProducts } from "../redux/Action/product";
import Loader from "./Loader";


const Pizzas = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState();
  const categoryData = searchParams.get("category");
  const { products, loading } = useSelector((state) => state.product);

  const addToCart = (options) => {};

  useEffect(() => {
   
    if(categoryData === null){
      const d = products;
      setData(d);
    }else{
    const d = products && products.filter((i) => i.category === categoryData);
    setData(d);
    }
  }, [products,categoryData]);

  return (
    <div className=" w-full min-h-screen h-auto">
      <div className=" flex flex-row items-center justify-center gap-3">
        <CiPizza color="red" size={35} />
        <h1 className=" text-[20px]"> Menu</h1>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="pizzaContainer">
          {data &&
            data.map((i) => (
              <PizzaCard
                key={i._id}
                name={i.name}
                imgSrc={i.image.url}
                descripto={i.description}
                price={i.price}
                stock={i.stock}
                handler={addToCart()}
              slugName={i.slug}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export const PizzaCard = ({
  name,
  imgSrc,
  price,
  stock,
  id,
  handler,
  descripto,
  slugName,
}) => {
 
  return (
    
    <div className="pizzaCard">
      <Link to={`/pizza/${slugName}`}>
        <img src={imgSrc} alt={name}  className=" rounded-full object-cover"/>
        <h3>{name}</h3>
        <p>{stock}</p>
        <h4>₹{price}</h4>
      </Link>
      <button>Order Now</button>
    </div>
  );
};

export default Pizzas;
