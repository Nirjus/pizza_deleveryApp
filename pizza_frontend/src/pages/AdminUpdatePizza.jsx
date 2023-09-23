import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminDashboardUpdateAllPizza from '../components/Admin/AdminDashboardUpdateAllPizza'

const AdminUpdatePizza = () => {
  return (
    <div className=' w-full min-h-screen flex flex-row bg-[#272727] h-auto'>
       
         <AdminSidebar active={6} />
        
      
            <AdminDashboardUpdateAllPizza />
   
    </div>
  )
}

export default AdminUpdatePizza