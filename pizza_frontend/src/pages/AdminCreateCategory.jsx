import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminDashboardCreateCategory from '../components/Admin/AdminDashboardCreateCategory'

const AdminCreateCategory = () => {
  return (
    <div className=' w-full min-h-screen flex flex-row bg-[#272727] h-auto'>
       
         <AdminSidebar active={10} />
        
      
            <AdminDashboardCreateCategory />
   
    </div>
  )
}


export default AdminCreateCategory