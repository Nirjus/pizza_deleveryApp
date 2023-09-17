import React from 'react'
import UserProfileSidebar from '../components/userprofileSideBar/UserProfileSidebar'
import UpdatePasswordComponent from '../components/UpdateProfileComponent/UpdatePasswordComponent.jsx'
import "../styles/fullUserProfile.scss"
const UpdatePasswordPage = () => {
  return (
    <div className='profielContainer'>
        <div className="profile">
            <div className='profileSidebar'>
            <UserProfileSidebar active={6} />
            </div>
           
           <div className='profileSettings'>
           <UpdatePasswordComponent />
           </div>
        </div>
    </div>
  )
}


export default UpdatePasswordPage