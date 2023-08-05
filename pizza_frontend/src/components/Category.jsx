import React from 'react'
import { Link } from 'react-router-dom'
import img1 from "../assets/images/slicesOfPizza1.png"
import img2 from "../assets/images/sliceOfPizza2.png"
import img3 from "../assets/images/slicesOfPizza3.png"
const Category = () => {
  return (
    <div className='categoryContainer'>
      <div className="veg">
         <div className="vegInfo">
          <h2>Italian <br /> Pizza</h2>
          <p>Italian pizza ipsum dolor sit, amet consectetur adipisicing elit. Labore quos repudiandae quis d.</p>
          <Link to={"/pizza-room"}><button>Explore</button></Link>
         </div>
         <div className="vegPic">
          <img src={img2} alt="vegPic" />
         </div>
      </div>
      <div className="nonVeg">
      <div className="nonvegInfo">
          <h2>Chessy <br /> Pizza</h2>
          <p>Italian pizza ipsum dolor sit, amet consectetur adipisicing elit. Labore quos repudiandae quis d.</p>
          <Link to={"/pizza-room"}><button>Explore</button></Link>
         </div>
         <div className="nonvegPic">
          <img src={img1} alt="nonvegpic" />
         </div>
      </div>
      <div className="vegan">
      <div className="veganInfo">
          <h2>HOt <br /> Pizza</h2>
          <p>Italian pizza ipsum dolor sit, amet consectetur adipisicing elit. Labore quos repudiandae quis d.</p>
          <Link to={"/pizza-room"}><button>Explore</button></Link>
         </div>
         <div className="veganPic">
          <img src={img3} alt="veganpic" />
         </div>
      </div>
    </div>
  )
}

export default Category