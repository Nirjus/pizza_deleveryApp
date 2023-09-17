import React from 'react'
import UserProfileSidebar from '../components/userprofileSideBar/UserProfileSidebar'
import UpdateProfileComponent from '../components/UpdateProfileComponent/UpdateProfileComponent.jsx'
import "../styles/fullUserProfile.scss"
const UpdateProfile = () => {
  return (
    <div className='profielContainer'>
        <div className="profile">
            <div className='profileSidebar'>
            <UserProfileSidebar active={3} />
            </div>
           
           <div className='profileSettings'>
            <UpdateProfileComponent />
           </div>
        </div>
    </div>
  )
}


export default UpdateProfile