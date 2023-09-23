import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminDashboardGetAllCategory from '../components/Admin/AdminDashboardGetAllCategory'

const AdminAllCategory = () => {
  return (
    <div className=' w-full min-h-screen flex flex-row bg-[#272727] h-auto'>
       
         <AdminSidebar active={9} />
        
      
            <AdminDashboardGetAllCategory />
   
    </div>
  )
}
export default AdminAllCategory