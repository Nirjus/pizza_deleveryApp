import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminDashboardGetAllPizza from '../components/Admin/AdminDashboardGetAllPizza.jsx'

const AdminAllPizza = () => {
  return (
    <div className=' w-full min-h-screen flex flex-row bg-[#272727] h-auto'>
       
         <AdminSidebar active={4} />
        
      
            <AdminDashboardGetAllPizza />
   
    </div>
  )
}
export default AdminAllPizza