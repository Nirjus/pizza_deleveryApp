import React from 'react'
import Lottie from "lottie-react";
import animationLoader from "../assets/animation/animation_lmrhnidp.json";
const Loader = () => {
  
  return (
    <div className=' w-full h-screen flex items-center justify-center'>
        <Lottie animationData={animationLoader}  className=' w-[600px] h-[600px]' />
    </div>
  )
}

export default Loader