
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, getAllEventForAdmin } from '../../redux/Action/event';

const AdminDashboardCreateEvent = () => {
   const dispatch = useDispatch();
   const {error, message, events,eventloading} = useSelector((state) => state.event);
  
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [stock,setStock] = useState(0);
    const [price,setPrice] = useState(0);

  
    const submitHandler = async (e) => {
        e.preventDefault();
     await dispatch(createEvent(name, description, stock, price));
     dispatch(getAllEventForAdmin());
    }
    useEffect(() => {
      dispatch(getAllEventForAdmin());
    }, [dispatch]);

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch({type:"CLEAR_ERROR"});
           }
           if(message){
            toast.success(message);
                  setName("");
                  setDescription("");
                  setStock(0);
                  setPrice(0);
                  dispatch({type:"CLEAR_MESSAGE"});
           }
    },[error,message,dispatch])
  return (
    <div className=" w-[75%] min-h-screen flex justify-center items-center h-auto">
      <div className="w-[90%] min-h-[90%] h-auto bg-[#2a2a2a] rounded-[20px] shadow-xl">
      
    <form action="" className=' w-full flex flex-col justify-center items-center p-3' onSubmit={submitHandler}>
        <div className=" 800px:w-[500px] w-full flex flex-col mt-8 gap-4 p-1">
            <label htmlFor="name" className='pl-3 text-white text-[17px] font-[200]'>Offer Name</label>
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
        <div className=" 800px:w-[500px] w-full flex flex-col mt-8 gap-4 p-1">
            <label htmlFor="description" className='pl-3 text-white text-[17px] font-[200]'>Offer Description</label>
           <textarea  id="description"
           placeholder='Enter description..' 
            required
           rows="5"
           value={description}
           onChange={(e) => setDescription(e.target.value)}
           className=' outline-none bg-[#ded2b4] placeholder:text-[#7b7a7a] rounded-[20px] font-[500] text-[17px] p-5'
           />
        </div>
        <div className=" 800px:w-[500px] w-full flex flex-col mt-8 gap-4 p-1">
            <label htmlFor="stock" className=' pl-3 text-white text-[17px] font-[200]'>Offer stock</label>
            <input type="number"
               id='stock'
               placeholder='Enter stock..'
               required
               name='stock'
               value={stock}
               onChange={(e) => setStock(e.target.value)}
               className=' outline-none bg-[#ded2b4] placeholder:text-[#7c7a7a] h-[50px] rounded-[20px] font-[500] text-[17px] 800px:p-5'
            />
        </div>
        <div className=" 800px:w-[500px] w-full flex flex-col mt-8 gap-4 p-1">
            <label htmlFor="price" className=' pl-3 text-white text-[17px] font-[200]'>Offer discount Percentage</label>
            <input type="number"
               id='price'
               placeholder='Enter discount..'
               required
               name='price'
               value={price}
               onChange={(e) => setPrice(e.target.value)}
               className=' outline-none bg-[#ded2b4] placeholder:text-[#6d6c6c] h-[50px] rounded-[20px] font-[500] text-[17px] 800px:p-5'
            />
        </div>
       
        <div className=" 800px:w-[500px] w-full flex flex-col mt-8 gap-4 p-1">
           
           {
            events && events.length === 0 ? (
              <input type="submit" disabled={eventloading}
              className=' outline-none bg-[#414040] cursor-pointer active:bg-[#363636] hover:bg-[#7a7a7a]  h-[50px] rounded-[20px] font-[500] text-[17px] text-center text-white '
           />
            ) : (
              <div>
              <h1 className=' text-white text-[17px]'>Allready have a running event on the pannel!</h1>
              <p className=' text-white text-[14px] font-[200]'>if you want to create a new offer banner, first delete the previous one.</p>
              </div>
            )
           }
        </div>
    </form>

      </div>
    </div>
  )
}


export default AdminDashboardCreateEvent