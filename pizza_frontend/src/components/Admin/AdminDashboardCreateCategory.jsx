
import React, { useEffect, useState } from 'react'
import { RxAvatar } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, getAllCategoryForAdmin } from '../../redux/Action/category';

const AdminDashboardCreateCategory = () => {
   const dispatch = useDispatch();
   const {error, message, categoryloading} = useSelector((state) => state.category);
    const [name,setName] = useState("");
    const [image, setImage] = useState(null);

    const handleImageInput = (e) => {
     const file = e.target.files[0];
     const Reader = new FileReader();

     Reader.readAsDataURL(file);
     Reader.onload = () => {
        if(Reader.readyState === 2){
            setImage(Reader.result);
        }
     }
    }
    const submitHandler = async (e) => {
        e.preventDefault();
     await dispatch(createCategory(name, image));
     dispatch(getAllCategoryForAdmin());
    }

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch({type:"CLEAR_ERROR"});
           }
           if(message){
            toast.success(message);
                  setName("");
                  setImage();
                  dispatch({type:"CLEAR_MESSAGE"});
           }
    },[error,message,dispatch])
  return (
    <div className=" w-[75%] min-h-screen flex justify-center items-center h-auto">
      <div className="w-[90%] min-h-[90%] h-auto bg-[#2a2a2a] rounded-[20px] shadow-xl">
      
    <form action="" className=' w-full flex flex-col justify-center items-center p-3' onSubmit={submitHandler}>
        <div className=" 800px:w-[500px] w-full flex flex-col mt-8 gap-4 p-1">
            <label htmlFor="name" className='pl-3 text-white text-[17px] font-[200]'>Category Name</label>
            <input type="text"
               id='name'
               placeholder='Enter name..'
               required
               name='name'
               value={name}
               onChange={(e) => setName(e.target.value)}
               className=' outline-none bg-[#ded2b4] placeholder:text-[#777676] h-[50px] rounded-[20px] font-[500] text-[17px] 800px:p-5'
            />
        </div>
        
        <div className='w-[500px] max-800px:w-[250px] flex flex-row justify-between mt-8 800px:gap-4 p-1'>
            <span>
               {
                  image? (
                     <img src={image} alt='avatar' className=' w-[50px] h-[50px] object-cover rounded-full' />
                  ):(<RxAvatar color='white' className=' w-[50px] h-[50px]' /> )
               }
            </span>
            <input 
            type="file"
             required
             name='image'
             accept='.jpg,.jpeg,.png'
             onChange={handleImageInput}
             className='outline-none bg-[#ded2b4] cursor-pointer active:bg-[#ebce7c] h-[50px] rounded-[20px] font-[500] text-[17px] pt-3 '
            />
             </div>
        <div className=" 800px:w-[500px] w-full flex flex-col mt-8 gap-4 p-1">
           
            <input type="submit" disabled={categoryloading}
               className=' outline-none bg-[#414040] cursor-pointer active:bg-[#363636] hover:bg-[#7a7a7a]  h-[50px] rounded-[20px] font-[500] text-[17px] text-center text-white '
            />
        </div>
    </form>

      </div>
    </div>
  )
}

export default AdminDashboardCreateCategory