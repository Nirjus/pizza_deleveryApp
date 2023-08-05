import React, { useState } from 'react'
import {  AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { useParams } from 'react-router-dom'
import "../styles/pizzaPage.scss"
import { item } from '../data/data';
const PizzaPage = () => {
    const params = useParams();
    const [temp,setTemp] = useState(1);
    const arrbtn = ["Small","Large","Medium"];

    const selectedPizza = item.find((i) => i.id === params.id);
    
  if(!selectedPizza){
    return <div>
        <h1>Pizza Not Found</h1>
    </div>;
  }

  return (
    <div className='singlePizza'>
        <div className="PizzaImage">
            <img src={selectedPizza.imgsrc} alt={selectedPizza.name}/>
        </div>
        <div className="singlePizzaInfo">
           <aside>
           <h1>{selectedPizza.name}</h1>
            <p>{selectedPizza.descriptio}</p>
            <h3>${selectedPizza.price}</h3>
           </aside>
           Chosse your Pizza Size:
               {
                arrbtn.map((i) =>(
                    <button>{i}</button>
                ))
               }
              <div className="pizzaorder">
                <p>Quantity :</p>
              <AiOutlinePlusCircle  onClick={() => setTemp(temp+1)} size={30} color="orange"/>
           {
            temp >= 1 ? (
                <p>{temp}</p>
            ) : (
                <p>1</p>
            )
           }
        <AiOutlineMinusCircle onClick={() => setTemp(temp-1)} size={30} color='orange'/>
              </div>
              <button >Add to cart</button>
        </div>
    </div>
  )
}

export default PizzaPage