import React, { useEffect, useState } from 'react'
import { RxCamera} from "react-icons/rx";
import {toast} from "react-toastify"
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, updateUser } from '../../redux/Action/user';
import { AiOutlineEye } from 'react-icons/ai';
import { FiEyeOff } from 'react-icons/fi';

const UpdateProfileComponent = () => {
    const dispatch = useDispatch();
    const {message, error, loading, user} = useSelector((state) => state.user);

    const [name, setName] = useState("");      
    const [password, setPassword] = useState("");           
    const [phone, setPhone] = useState("");      
    const [address, setAddress] = useState("");      
    const [image, setImage] = useState(null);     
    const [visible, setVisible] = useState(false);
    const handleImageInput = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();
 
        Reader.readAsDataURL(file);
        Reader.onload = () => {
          if (Reader.readyState === 2) {
             setImage(Reader.result);
           }
        }
    }
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(updateUser(name,password,phone,address,image))
     
    }
 
    useEffect(() => {
      if(error){
       toast.error(error);
       dispatch({type:"CLEAR_ERROR"});
      }
      if(message){
       toast.success(message);
             setName("");
             setPassword("");
             setPhone("");
             setAddress("");
             setImage();
             dispatch({type:"CLEAR_MESSAGE"});
      }
    },[error,message,dispatch])
 
  return (
    <div className=' 800px:w-[70%]'>
          <form action="" onSubmit={submitHandler} className=' w-full flex flex-col justify-center items-center gap-2'>
         
              {
               image ? (
                  <img src={image} alt='avatar' className=' w-[200px] h-[200px] object-contain  rounded-full border-[3px] border-[#ff22e9]' />
               )   :   (
                  <img src={user?.image?.url} alt='avatar' className=' w-[200px] h-[200px] object-contain rounded-full border-[3px] border-[#7424ed]' />
               )
              }
               <div className="">
            <label htmlFor="image" className=' '><RxCamera size={30}  color={"black"} className=' translate-x-[60px] translate-y-[-40px] bg-slate-400 p-1 rounded-full cursor-pointer hover:bg-[#64d5dd]' /></label>
            <input  
            type="file"
             name='image'
             id='image'
             accept='.jpg,.jpeg,.png'
             onChange={handleImageInput}
             className=' hidden '
            />
             </div>
             <div className=' flex flex-row gap-[80px] w-full max-800px:flex-col max-800px:gap-0'>
           <div className=' w-full flex flex-col'>
             <label htmlFor="name" >Full name</label>
             <input type="text" 
            placeholder='Name..'
            id='name'
            name='name'
               value={name}
               onChange={(e) => setName(e.target.value)}
               className=' outline-none h-10 rounded px-4'
            />
           </div>
           <div className=' w-full flex flex-col'>
               <label htmlFor="address">Address</label>
             <input type="text" 
            placeholder='Address..'
            id='address'
            name='address'
               value={address}
               onChange={(e) => setAddress(e.target.value)}
               className=' outline-none h-10 rounded px-4 '
            />
            </div>
            </div>
            <div className=' flex flex-row gap-[80px] w-full max-800px:flex-col max-800px:gap-0'>
            <div className=' w-full flex flex-col relative'>
            <label htmlFor="password" >Password</label>
             <input type={visible ? "text" : "password"} 
            placeholder='Password..'
            id='password'
            name='password'
            required
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className=' outline-none h-10 rounded px-4'
            />
             {visible ? (
            <AiOutlineEye size={22} className=" absolute top-8 right-8 cursor-pointer" onClick={() => setVisible(false)} />
          ) : (
            <FiEyeOff size={22} className=" absolute top-8 right-8 cursor-pointer " onClick={() => setVisible(true)} />
          )}
            </div>
            <div className='w-full flex flex-col'>
               <label htmlFor="number">Phone Number</label>
            <input type="text" 
            placeholder='Phone Number..'
            id="number"
            name='phone'
               value={phone}
               onChange={(e) => setPhone(e.target.value)}
               className='  outline-none h-10 rounded px-4 '
            />
            </div>
            </div>
           
            <button type="submit" disabled={loading} className=' w-full border border-black h-[34px] 800px:mt-10 bg-[#ebebeb] active:bg-[#727272]'>Update</button>
           
        </form>
    </div>
  )
}

export default UpdateProfileComponent