import React from 'react'
import { TiTick } from 'react-icons/ti'
import CheckoutSteps from '../Checkout/CheckoutSteps'

const Success = () => {
  return (
    <div className=' w-full min-h-screen  bg-[#e2e2e2]'>
      <CheckoutSteps active={3} />
        <div className="w-full h-full flex justify-center items-center  bg-[#e2e2e2]">
           <div className="w-full flex justify-center items-center">
           <TiTick size={50} color='green'/>
           <h1 className=' text-center'>Payment Success</h1>
           </div>
        </div>
    </div>
  )
}

export default Success