import React from "react";
import "../../styles/profilesettings.scss";
import { useSelector } from "react-redux";
const ProfileSettings = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="UPSContainer">
     
        <div className="imageDiv">
          {" "}
          <img src={user?.image?.url} alt={"avatar"} />{" "}
        </div>
        <h2>{user?.name}</h2>
        <div className="userDetails">
            <p>Email -</p>
            <p className="lightingText">{user?.email}</p>
            <p>Address -</p>
            <p className="lightingText">{user?.address}</p>
            <p>Phone No. -</p>
            <p className="lightingText">{user?.phone}</p>
        </div>
     
    </div>
  );
};

export default ProfileSettings;
