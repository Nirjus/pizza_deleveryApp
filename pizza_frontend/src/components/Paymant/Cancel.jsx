import React from 'react'
import { FaCross } from 'react-icons/fa'

const Cancel = () => {
  return (
    <div className=' w-full h-screen bg-[#e2e2e2]'>
        <div className="w-full h-full flex justify-center items-center  bg-[#e2e2e2]">
           <div className="w-full flex justify-center items-center">
           <FaCross size={50} color='red'/>
           <h1 className=' text-center'>Payment faild!</h1>
           </div>
        </div>
    </div>
  )
}

export default Cancel