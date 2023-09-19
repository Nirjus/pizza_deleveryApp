import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom";
import {RxAvatar} from "react-icons/rx";
import {toast} from "react-toastify"
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../redux/Action/user';
import "./regester.scss";
import { AiOutlineEye } from 'react-icons/ai';
import { FiEyeOff } from 'react-icons/fi';

const Registration = () => {

const dispatch = useDispatch();

const {message, error, loading} = useSelector((state) => state.user);

     const [name, setName] = useState("");      
     const [password, setPassword] = useState("");      
     const [email, setEmail] = useState("");      
     const [phone, setPhone] = useState("");      
     const [address, setAddress] = useState("");      
     const [image, setImage] = useState(null);    
     const [visible, setVisible]= useState(false);  
     
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
      dispatch(createUser(name,email,password,phone,address,image));
  
   }

   useEffect(() => {
     if(error){
      toast.error(error);
      dispatch({type:"CLEAR_ERROR"});
     }
     if(message){
      toast.success(message);
            setName("");
            setEmail("");
            setPassword("");
            setPhone("");
            setAddress("");
            setImage();
            dispatch({type:"CLEAR_MESSAGE"});
     }
   },[error,message,dispatch])

  return (
    <div className='registration'>
      <h1>Registration</h1>
        <form action="" onSubmit={submitHandler}>
           <div className='inputclass'>
             <label htmlFor="name" >Full name</label>
             <input type="text" 
            placeholder='Name..'
            id='name'
            required
            name='name'
               value={name}
               onChange={(e) => setName(e.target.value)}
               className='inputfild'
            />
           </div>
           <div className='inputclass'>
            <label htmlFor="email" >Email</label>
            <input type="email" 
            placeholder='Email..'
            id='email'
            required
            name='email'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className='inputfild'
            />
            </div>
            <div className='inputclass relative'>
            <label htmlFor="password" >Password</label>
             <input type={visible ? "text" : "password"} 
            placeholder='Password..'
            id='password'
            required
            name='password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className='inputfild'
            />
              {visible ? (
            <AiOutlineEye size={22} className=" absolute top-12 right-12 cursor-pointer" onClick={() => setVisible(false)} />
          ) : (
            <FiEyeOff size={22} className=" absolute top-12 right-12 cursor-pointer " onClick={() => setVisible(true)} />
          )}
            </div>
            <div className='inputclass'>
               <label htmlFor="number">Phone Number</label>
            <input type="text" 
            placeholder='Phone Number..'
            id="number"
            required
            name='phone'
               value={phone}
               onChange={(e) => setPhone(e.target.value)}
               className='inputfild'
            />
            </div>
            <div className='inputclass'>
               <label htmlFor="address">Address</label>
             <input type="text" 
            placeholder='Address..'
            id='address'
            required
            name='address'
               value={address}
               onChange={(e) => setAddress(e.target.value)}
               className='inputfild'
            />
            </div>
            <div className='imageInput'>
            <span>
               {
                  image? (
                     <img src={image} alt='avatar' className='' />
                  ):(<RxAvatar /> )
               }
            </span>
            <input 
            type="file"
             required
             name='image'
             accept='.jpg,.jpeg,.png'
             onChange={handleImageInput}
             className='fileinput'
            />
             </div>
            <button type="submit" disabled={loading}>Register</button>
            <div className='loginlink'>
               <p>already have an account?</p>
               <Link to={"/login"}>logIn</Link>
            </div>
        </form>
    </div>
  )
}

export default Registration