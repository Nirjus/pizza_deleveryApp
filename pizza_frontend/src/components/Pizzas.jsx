import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useSearchParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { CiPizza } from "react-icons/ci";
import Loader from "./Loader";
import { getAllCategory } from "../redux/Action/category";
import { addToCart } from "../redux/Action/cart";


const Pizzas = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState();
  const categoryData = searchParams.get("category");
  const { products, loading } = useSelector((state) => state.product);
   const {allCategory} = useSelector((state) => state.category);
   const categoryinfo = allCategory && allCategory.find((i) => i.name === categoryData);

  useEffect(() => {
   
    if(categoryData === null){
      const d = products;
      setData(d);
    }else{
    const d = products && products.filter((i) => i.category === categoryData);
    setData(d);
    }
  }, [products,categoryData]);
  useEffect(() => {
    dispatch(getAllCategory());
  },[dispatch])

  return (
    <div className=" w-full min-h-screen h-auto">
      <div className=" flex flex-row items-center justify-center gap-3">
       {
        categoryinfo ? (
          <>
           <img src={categoryinfo.image.url} alt={categoryinfo.name} className=" w-[40px] h-[40px] rounded-full m-2"/>
        <h1 className=" text-[20px]">{categoryinfo.name}</h1>
          </>
        ) : (
          <>
           <CiPizza color="red" size={35} />
        <h1 className=" text-[20px]"> Menu</h1>
          </>
        )
       }
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
                info={i}
                id={i._id}
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
  descripto,
  slugName,
  info
}) => {
  const {cart} = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if(isItemExists){
      toast.error("Item already in cart");
    }else{
        if(info.stock < 1){
          toast.error("This Item is Out of stock");
        }else{
          const cartData = {...info,qty:1}
          dispatch(addToCart(cartData));
          toast.success("Item Added to cart");
        }
    }
  };
  return (
    
    <div className="pizzaCard">
      <Link to={`/pizza/${slugName}`}>
        <img src={imgSrc} alt={name}  className=" rounded-full object-cover"/>
        <h3>{name}</h3>
        <p>{stock}</p>
        <h4>₹{price}</h4>
      </Link>
      <button onClick={() => handler(id)}>Order Now</button>
    </div>
  );
};

export default Pizzas;
