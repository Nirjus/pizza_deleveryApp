import React, { useEffect, useState } from 'react'
import "../styles/activation.scss"
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import { server } from '../server';
import { TiTick } from "react-icons/ti"
import { RxCross1 } from 'react-icons/rx';
const ActivationPage = () => {

    const {token} = useParams();
    const [errors, setErrors] = useState(false);
  
    useEffect(() => {
        if(token){
      const activateUser = async () => {
        await axios.post(`${server}/api/user/verify`,{
            token
        }).then((res) => {
            toast.success(res.data.message);
        }).catch((error) => {
            setErrors(true);
            toast.error(error.response.data.message);
        })
      }
      activateUser();
        }
      
    },[token])
  return (
    <div className='activation'>
        {
            errors? (<h1><RxCross1 size={80} color='red'/> Something wrong</h1>) : (<h1><TiTick size={80} color={"green"} /> Account is acctivated</h1>) 
        }
    </div>
  )
}

export default ActivationPage