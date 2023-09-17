import React from 'react'
import { AiFillBook, AiFillFacebook, AiFillInstagram, AiFillTwitterSquare, AiOutlineSend } from "react-icons/ai"
const Footer = () => {
  return (
    <div className='footerContainer'>
       <div className=" flex flex-col justify-center w-[30%] max-800px:w-full gap-8 items-center text-white">
        <h1 className=' '>Follow for more Amazing Updates</h1>
           <div className="social">
           <p>Follow Us on.</p>
            <div className=" flex flex-row gap-4 ">
            <a href={"https://facebook.com"} target='blank'><AiFillFacebook size={25}/></a>
           <a href={"https://instagram.com"} target='blank'><AiFillInstagram size={25}/></a>
         <a href={"https://facebook.com"} target='blank'><AiFillTwitterSquare size={25}/></a>
            </div>
           </div>
       </div>
       <div className="sbscribe">
        <h1>Sbscribe for latest offer</h1>
       <form action="">
          <input type="text" name="email" id="" placeholder='Email..' required/>
          <button type="submit"><AiOutlineSend size={24}/></button>
        </form>
       </div>
       <div className="blogs">
        <h1>Read Our Blogs</h1>
        <AiFillBook size={35}/>
       </div>
    </div>
  )
}

export default Footer