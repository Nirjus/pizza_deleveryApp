import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminDashboardAllEvent from '../components/Admin/AdminDashboardAllEvent.jsx'

const AddminAllEvent = () => {
  return (
    <div className=' w-full min-h-screen flex flex-row bg-[#272727] h-auto'>
       
         <AdminSidebar active={7} />
        
      
            <AdminDashboardAllEvent />
   
    </div>
  )
}
export default AddminAllEvent