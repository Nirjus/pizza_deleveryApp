import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminDashboardCreatePizza from '../components/Admin/AdminDashboardCreatePizza.jsx'

const AdminCreatePizza = () => {
  return (
    <div className=' w-full min-h-screen flex flex-row bg-[#272727] h-auto'>
       
         <AdminSidebar active={5} />
        
      
            <AdminDashboardCreatePizza />
   
    </div>
  )
}



export default AdminCreatePizza