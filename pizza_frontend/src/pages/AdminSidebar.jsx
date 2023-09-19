import React from 'react'
import { HiUsers } from "react-icons/hi2"
import { FaPizzaSlice, FaUserAltSlash } from "react-icons/fa"
import {MdCategory, MdCreateNewFolder, MdDashboard, MdEventAvailable, MdTipsAndUpdates} from "react-icons/md"
import { PiCookingPotBold } from "react-icons/pi"
import { IoFastFoodSharp, IoNewspaperSharp } from "react-icons/io5"
import { Link } from 'react-router-dom'
const AdminSidebar = ({active}) => {
  return (
    <div className=' w-[25%] min-h-screen h-auto border-2 border-[#ffd609] shadow-lg'>
        <div className="w-full min-h-screen h-auto flex flex-col justify-evenly items-center">
        <div className="w-[80%]  border-2 bg-[#f2dd8b16] hover:bg-[#f4ce44] transition duration-300 cursor-pointer m-5 border-[#eec41b] ">
               <Link to={"/admin-dashboard"} className='flex flex-row-reverse justify-center  items-center gap-3'>
               <p className={` font-medium text-[25px] ${active === 1 ? "text-[#f63434]" : "text-white"} max-800px:hidden`}>Dashboard</p>
                <MdDashboard size={25} color={`${active === 1 ? "red" : "white"}`}/>
               </Link>
            </div>
            <div className="w-[80%]  border-2 bg-[#f2dd8b16] hover:bg-[#f4ce44] transition duration-300 cursor-pointer m-5 border-[#eec41b] ">
               <Link to={"/admin-users"} className='flex flex-row-reverse justify-center  items-center gap-3'>
               <p className={` font-medium text-[25px] ${active === 2 ? "text-[#f63434]" : "text-white"} max-800px:hidden`}>All Users</p>
                <HiUsers size={25} color={`${active === 2 ? "red" : "white"}`}/>
               </Link>
            </div>
            <div className="w-[80%]  border-2 bg-[#f2dd8b16] hover:bg-[#f4ce44] transition duration-300 cursor-pointer m-5 border-[#eec41b] ">
               <Link to={"/admin-banusers"} className='flex flex-row-reverse justify-center  items-center gap-3'>
               <p className={` font-medium text-[25px] ${active === 3 ? "text-[#f63434]" : "text-white"} max-800px:hidden`}>Ban User</p>
                <FaUserAltSlash size={25} color={`${active === 3 ? "red" : "white"}`}/>
               </Link>
            </div>
            <div className="w-[80%]  border-2 bg-[#f2dd8b16] hover:bg-[#f4ce44] transition duration-300 cursor-pointer m-5 border-[#eec41b] ">
               <Link to={"/"} className='flex flex-row-reverse justify-center  items-center gap-3'>
               <p className={` font-medium text-[25px] ${active === 4 ? "text-[#f63434]" : "text-white"} max-800px:hidden`}>All Pizza</p>
                <FaPizzaSlice size={25} color={`${active === 4 ? "red" : "white"}`}/>
               </Link>
            </div>
            <div className="w-[80%]  border-2 bg-[#f2dd8b16] hover:bg-[#f4ce44] transition duration-300 cursor-pointer m-5 border-[#eec41b] ">
               <Link to={"/"} className='flex flex-row-reverse justify-center  items-center gap-3'>
               <p className={` font-medium text-[25px] ${active === 5 ? "text-[#f63434]" : "text-white"} max-800px:hidden`}>Create Pizza</p>
                <PiCookingPotBold size={25} color={`${active === 5 ? "red" : "white"}`}/>
               </Link>
            </div>
            <div className="w-[80%]  border-2 bg-[#f2dd8b16] hover:bg-[#f4ce44] transition duration-300 cursor-pointer m-5 border-[#eec41b] ">
               <Link to={"/"} className='flex flex-row-reverse justify-center  items-center gap-3'>
               <p className={` font-medium text-[25px] ${active === 6 ? "text-[#f63434]" : "text-white"} max-800px:hidden`}>Update Pizza</p>
                <MdTipsAndUpdates size={25} color={`${active === 6 ? "red" : "white"}`}/>
               </Link>
            </div>
            <div className="w-[80%]  border-2 bg-[#f2dd8b16] hover:bg-[#f4ce44] transition duration-300 cursor-pointer m-5 border-[#eec41b] ">
               <Link to={"/"} className='flex flex-row-reverse justify-center  items-center gap-3'>
               <p className={` font-medium text-[25px] ${active === 7 ? "text-[#f63434]" : "text-white"} max-800px:hidden`}>All Events</p>
                <MdEventAvailable size={25} color={`${active === 7 ? "red" : "white"}`}/>
               </Link>
            </div>
            <div className="w-[80%]  border-2 bg-[#f2dd8b16] hover:bg-[#f4ce44] transition duration-300 cursor-pointer m-5 border-[#eec41b] ">
               <Link to={"/"} className='flex flex-row-reverse justify-center  items-center gap-3'>
               <p className={` font-medium text-[25px] ${active === 8 ? "text-[#f63434]" : "text-white"} max-800px:hidden`}>Create Events</p>
                <MdCreateNewFolder size={25} color={`${active === 8 ? "red" : "white"}`}/>
               </Link>
            </div>
            <div className="w-[80%]  border-2 bg-[#f2dd8b16] hover:bg-[#f4ce44] transition duration-300 cursor-pointer m-5 border-[#eec41b] ">
               <Link to={"/"} className='flex flex-row-reverse justify-center  items-center gap-3'>
               <p className={` font-medium text-[25px] ${active === 9 ? "text-[#f63434]" : "text-white"} max-800px:hidden`}>All Category</p>
                <MdCategory size={25} color={`${active === 9 ? "red" : "white"}`}/>
               </Link>
            </div>
            <div className="w-[80%]  border-2 bg-[#f2dd8b16] hover:bg-[#f4ce44] transition duration-300 cursor-pointer m-5 border-[#eec41b] ">
               <Link to={"/"} className='flex flex-row-reverse justify-center  items-center gap-3'>
               <p className={` font-medium text-[25px] ${active === 10 ? "text-[#f63434]" : "text-white"} max-800px:hidden`}>Create Category</p>
                <IoNewspaperSharp size={25} color={`${active === 10 ? "red" : "white"}`}/>
               </Link>
            </div>
            <div className="w-[80%]  border-2 bg-[#f2dd8b16] hover:bg-[#f4ce44] transition duration-300 cursor-pointer m-5 border-[#eec41b] ">
               <Link to={"/"} className='flex flex-row-reverse justify-center  items-center gap-3'>
               <p className={` font-medium text-[25px] ${active === 11 ? "text-[#f63434]" : "text-white"} max-800px:hidden`}>Update Category</p>
                <IoFastFoodSharp size={25} color={`${active === 11 ? "red" : "white"}`}/>
               </Link>
            </div>
        </div>
    </div>
  )
}

export default AdminSidebar