import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminDashboardCreateEvent from '../components/Admin/AdminDashboardCreateEvent.jsx'

const AdminCreateEvent = () => {
  return (
    <div className=' w-full min-h-screen flex flex-row bg-[#272727] h-auto'>
       
         <AdminSidebar active={8} />
        
      
            <AdminDashboardCreateEvent />
   
    </div>
  )
}

export default AdminCreateEvent