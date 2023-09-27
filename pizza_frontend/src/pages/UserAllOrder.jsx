import React from 'react'
import UserProfileSidebar from '../components/userprofileSideBar/UserProfileSidebar'
import UserAllOrdersComponent from '../components/UpdateProfileComponent/UserAllOrdersComponent.jsx'
import "../styles/fullUserProfile.scss"
const UserAllOrder = () => {
  return (
    <div className='profielContainer'>
        <div className="profile">
            <div className='profileSidebar'>
            <UserProfileSidebar active={4} />
            </div>
           
           <div className='profileSettings'>
           <UserAllOrdersComponent />
           </div>
        </div>
    </div>
  )
}
export default UserAllOrder