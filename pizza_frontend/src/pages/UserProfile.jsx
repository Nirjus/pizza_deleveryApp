import React from 'react'
import { AiOutlineCheckCircle, AiOutlineDashboard, AiOutlineHome, AiOutlineLogout, AiOutlineOrderedList, AiOutlineProfile, AiOutlinePropertySafety } from 'react-icons/ai'

const UserProfile = () => {
  return (
    <div className='profielContainer'>
        <div className="profile">
          
            <aside>
              <p><AiOutlineProfile />Profile</p>
           <p><AiOutlineDashboard /> DashBoard</p>
           <p><AiOutlineHome /> Address</p>
           <p><AiOutlineOrderedList /> Orders</p>
           <p><AiOutlineCheckCircle /> track Orders</p>
           <p><AiOutlinePropertySafety /> Change Passwords</p>
           <p><AiOutlineLogout />Log out</p>
            </aside>
            <main>
                <img src="" alt={"Profile Picture"} />
                <form action="">
                  
                </form>
            </main>
        </div>
    </div>
  )
}

export default UserProfile