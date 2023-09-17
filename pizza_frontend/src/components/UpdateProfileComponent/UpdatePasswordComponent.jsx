import React, { useEffect, useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai';
import { FiEyeOff } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loadUser, updateUserPassword } from '../../redux/Action/user';

const UpdatePasswordComponent = () => {

    const dispatch = useDispatch();
    const {message, error, loading } = useSelector((state) => state.user);

   const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [visible1, setVisible1] = useState(false);
   const [visible2, setVisible2] = useState(false);
   const [visible3, setVisible3] = useState(false);

   const submitHandler = async (e) => {
    e.preventDefault();
   await dispatch(updateUserPassword(oldPassword,newPassword));
   dispatch(loadUser());
   }

   useEffect(() => {
    if(error){
     toast.error(error);
     dispatch({type:"CLEAR_ERROR"});
    }
    if(message){
     toast.success(message);
           setOldPassword("");
           setNewPassword("");
           setConfirmPassword("");
           dispatch({type:"CLEAR_MESSAGE"});
    }
  },[error,message,dispatch])

  return (
    <div className=' 800px:w-[60%]'>
    <form action="" onSubmit={submitHandler} className=' w-full flex flex-col justify-center items-center gap-7'>
   
      
      <div className=' w-full flex flex-col relative'>
      <label htmlFor="oldPassword" >Old Password</label>
       <input type={visible1 ? "text" : "password"} 
      placeholder='oldPassword..'
      id='oldPassword'
      name='oldPassword'
      required
         value={oldPassword}
         onChange={(e) => setOldPassword(e.target.value)}
         className=' outline-none h-12 rounded px-4'
      />
       {visible1 ? (
      <AiOutlineEye size={22} className=" absolute top-9 right-8 cursor-pointer" onClick={() => setVisible1(false)} />
    ) : (
      <FiEyeOff size={22} className=" absolute top-9 right-8 cursor-pointer " onClick={() => setVisible1(true)} />
    )}
      </div>
      <div className=' w-full flex flex-col relative'>
      <label htmlFor="newPassword" >New Password</label>
       <input type={visible2 ? "text" : "password"} 
      placeholder='New Password..'
      id='newPassword'
      name='newPassword'
      required
         value={newPassword}
         onChange={(e) => setNewPassword(e.target.value)}
         className=' outline-none h-12 rounded px-4'
      />
       {visible2 ? (
      <AiOutlineEye size={22} className=" absolute top-9 right-8 cursor-pointer" onClick={() => setVisible2(false)} />
    ) : (
      <FiEyeOff size={22} className=" absolute top-9 right-8 cursor-pointer " onClick={() => setVisible2(true)} />
    )}
      </div>
      <div className=' w-full flex flex-col relative'>
      <label htmlFor="confirmPassword" >Confirm Password</label>
       <input type={visible3 ? "text" : "password"} 
      placeholder='Confirm Password..'
      id='confirmPassword'
      name='confirmPassword'
      required
         value={confirmPassword}
         onChange={(e) => setConfirmPassword(e.target.value)}
         className=' outline-none h-12 rounded px-4'
      />
       {visible3 ? (
      <AiOutlineEye size={22} className=" absolute top-9 right-8 cursor-pointer" onClick={() => setVisible3(false)} />
    ) : (
      <FiEyeOff size={22} className=" absolute top-9 right-8 cursor-pointer " onClick={() => setVisible3(true)} />
    )}
      </div>
     
      <button type="submit" disabled={loading} className=' w-full border border-black h-[34px] 800px:mt-10 bg-[#ebebeb] active:bg-[#727272]'>Update</button>
     
  </form>
</div>
  )
}

export default UpdatePasswordComponent