import React from 'react'
import UserProfileSidebar from '../components/userprofileSideBar/UserProfileSidebar'
import UserOrderTrack from '../components/userProfile/UserOrderTrack.jsx'
import "../styles/fullUserProfile.scss"
const UserTrackOrder = () => {
  return (
    <div className='profielContainer'>
        <div className="profile">
            <div className='profileSidebar'>
            <UserProfileSidebar active={5} />
            </div>
           
           <div className='profileSettings'>
           <UserOrderTrack />
           </div>
        </div>
    </div>
  )
}
export default UserTrackOrder