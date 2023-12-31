import React from 'react'
import UserProfileSidebar from '../components/userprofileSideBar/UserProfileSidebar'
import ProfileSettings from '../components/userProfile/ProfileSettings'
import "../styles/fullUserProfile.scss"
const UserProfile = () => {
  return (
    <div className='profielContainer'>
        <div className="profile">
            <div className='profileSidebar'>
            <UserProfileSidebar active={1} />
            </div>
           
           <div className='profileSettings'>
            <ProfileSettings />
           </div>
        </div>
    </div>
  )
}

export default UserProfile