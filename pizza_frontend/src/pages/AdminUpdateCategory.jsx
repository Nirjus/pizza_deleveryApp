import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminDashboardUpdateCategory from '../components/Admin/AdminDashboardUpdateCategory'

const AdminUpdateCategory = () => {
  return (
    <div className=' w-full min-h-screen flex flex-row bg-[#272727] h-auto'>
       
         <AdminSidebar active={11} />
        
      
            <AdminDashboardUpdateCategory />
   
    </div>
  )
}

export default AdminUpdateCategory