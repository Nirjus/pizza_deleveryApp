import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../redux/Action/category'
import Loader from './Loader'
const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {allCategory,loading} = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getAllCategory());
  },[dispatch])
  return (
   <>
   {
    loading ? <Loader /> : (
      <div className='categoryContainer'>
      {
        allCategory && allCategory.map((i,key) => {
          const handleSubmit = (i) => {
            navigate(`/pizza-room?category=${i.name}`);
            // window.location.reload();
          }
          return(
            <div className={`veg ${key % 2 === 0 ? "!bg-[#1bff06]" : "!bg-[#f72d2d]"}`} key={i._id}>
            <div className="vegInfo">
             <h2>{i.name}</h2>
             <p>Italian pizza ipsum dolor sit, amet consectetur adipisicing elit. Labore quos repudiandae quis d.</p>
             <button onClick={() => handleSubmit(i)}>Explore</button>
            </div>
            <div className="vegPic">
             <img src={i.image?.url} alt="vegPic" />
            </div>
         </div>
          )
     })
      }
  </div>
    )
   }
   </>
  )
}

export default Category