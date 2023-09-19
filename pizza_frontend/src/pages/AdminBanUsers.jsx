import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminDashboardBanUser from '../components/Admin/AdminDashboardBanUser.jsx'

const AdminBanUsers = () => {
  return (
    <div className=' w-full min-h-screen flex flex-row bg-[#272727] h-auto'>
       
         <AdminSidebar active={3} />
        
      
            <AdminDashboardBanUser />
   
    </div>
  )
}


export default AdminBanUsers