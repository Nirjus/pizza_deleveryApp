import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminDashboardAllUser from '../components/Admin/AdminDashboardAllUser.jsx'

const AdminAllUsers = () => {
  return (
    <div className=' w-full min-h-screen flex flex-row bg-[#272727] h-auto'>
       
         <AdminSidebar active={2} />
        
      
            <AdminDashboardAllUser />
   
    </div>
  )
}

export default AdminAllUsers