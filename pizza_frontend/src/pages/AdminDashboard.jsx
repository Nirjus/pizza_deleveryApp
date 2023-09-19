import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminDashboardMain from '../components/Admin/AdminDashboardMain'

const AdminDashboard = () => {
  return (
    <div className=' w-full min-h-screen flex flex-row bg-[#272727] h-auto'>
       
         <AdminSidebar active={1} />
        
      
            <AdminDashboardMain />
   
    </div>
  )
}

export default AdminDashboard