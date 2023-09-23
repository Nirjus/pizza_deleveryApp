
import React, { useEffect, useState } from 'react'
import { RxAvatar } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, getAllProductsForAdmin } from '../../redux/Action/product';
import { getAllCategoryForAdmin } from '../../redux/Action/category';

const AdminDashboardCreatePizza = () => {
   const dispatch = useDispatch();
   const {error, message, productloading} = useSelector((state) => state.product);
  const { allCategory } = useSelector((state) => state.category);
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [stock,setStock] = useState(0);
    const [price,setPrice] = useState(0);
    const [category,setCategory] = useState("");
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
     await dispatch(createProduct(name, description, stock, price, category, image));
     dispatch(getAllProductsForAdmin());
    }
    useEffect(() => {
      dispatch(getAllCategoryForAdmin());
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
                  setCategory("");
                  setImage();
                  dispatch({type:"CLEAR_MESSAGE"});
           }
    },[error,message,dispatch])
  return (
    <div className=" w-[75%] min-h-screen flex justify-center items-center h-auto">
      <div className="w-[90%] min-h-[90%] h-auto bg-[#2a2a2a] rounded-[20px] shadow-xl">
      
    <form action="" className=' w-full flex flex-col justify-center items-center p-3' onSubmit={submitHandler}>
        <div className=" 800px:w-[500px] w-full flex flex-col mt-8 gap-4 p-1">
            <label htmlFor="name" className='pl-3 text-white text-[17px] font-[200]'>Food Name</label>
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
            <label htmlFor="description" className='pl-3 text-white text-[17px] font-[200]'>Food Description</label>
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
            <label htmlFor="stock" className=' pl-3 text-white text-[17px] font-[200]'>Food Stock</label>
            <input type="number"
               id='stock'
               placeholder='Enter Stock of food..'
               required
               name='stock'
               value={stock}
               onChange={(e) => setStock(e.target.value)}
               className=' outline-none bg-[#ded2b4] placeholder:text-[#7c7a7a] h-[50px] rounded-[20px] font-[500] text-[17px] 800px:p-5'
            />
        </div>
        <div className=" 800px:w-[500px] w-full flex flex-col mt-8 gap-4 p-1">
            <label htmlFor="price" className=' pl-3 text-white text-[17px] font-[200]'>Food Price</label>
            <input type="number"
               id='price'
               placeholder='Enter Price of food..'
               required
               name='price'
               value={price}
               onChange={(e) => setPrice(e.target.value)}
               className=' outline-none bg-[#ded2b4] placeholder:text-[#6d6c6c] h-[50px] rounded-[20px] font-[500] text-[17px] 800px:p-5'
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
            <label htmlFor="category" className='pl-3 text-white text-[17px] font-[200]'>Category</label>
            <select  
            value={category}
            id='category'
            onChange={(e) => setCategory(e.target.value)}
            className='outline-none bg-[#ded2b4] placeholder:text-[#6d6c6c] h-[50px] rounded-[20px] font-[500] text-[17px] px-4'
            >
               <option value="burger">choose a category</option>
              {
               allCategory && allCategory.map((i) => (
                  <option value={i.name} key={i.name}>{i.name}</option>
               ))
              }
            </select>
        </div>
        <div className=" 800px:w-[500px] w-full flex flex-col mt-8 gap-4 p-1">
           
            <input type="submit" disabled={productloading}
               className=' outline-none bg-[#414040] cursor-pointer active:bg-[#363636] hover:bg-[#7a7a7a]  h-[50px] rounded-[20px] font-[500] text-[17px] text-center text-white '
            />
        </div>
    </form>

      </div>
    </div>
  )
}

export default AdminDashboardCreatePizza