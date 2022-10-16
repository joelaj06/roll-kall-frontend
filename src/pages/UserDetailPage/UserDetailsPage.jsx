import React, {useState} from "react";
import { useParams } from "react-router-dom";
import "./user_details_page.css";
import { Avatar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const emailIcon = <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>;
const phoneIcon = <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>;
const addressIcon = <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>;

const avatarSize = 80; 

const UserDetailsPage = () => {
  const params = useParams();
  
  //states  
  const [tabIndex, setTabIndex] = useState(1);
  
  const onTabClick = (index) => {
    setTabIndex(index)
  }

  return (
    <div className="user-detail-main-container">
      <div className="user-detail-container">
        <div className="user-action-profile-container">
          <div className="user-detail-profile-container">
            <div className="account-status">
              <p>Active</p>
            </div>
            <div className="profile-image">
              <div className="user-avatar">
                <Avatar sx={{ width: avatarSize, height: avatarSize }} />
              </div>
              <div className="user-name bold">User name</div>
              <div className="job-position">Job position</div>
            </div>
            <div className="user-name"></div>
            <div className="email-container space-between-inline">
              <div className="email-icon">{emailIcon}</div>
              <div className="email">email</div>
            </div>
            <div className="phone-container space-between-inline">
              <div className="phone-icon">{phoneIcon}</div>
              <div className="phone">phone</div>
            </div>
            <div className="address-container space-between-inline">
              <div className="address-icon">{addressIcon}</div>
              <div className="address">address</div>
            </div>
          </div>
          <div className="block-btn-container ">
            <button className="block-btn">Block Account</button>
          </div>
        </div>
        <div className="main-contents-container">

          {/* ****************Tabs here*************** */}
          <div className="main-content-tab">
            <button onClick={() => onTabClick(1)} className={tabIndex === 1 ? " tab-btn btn-1 active-tab" : "tab-btn btn-1 "}>Attendance</button>

            <button onClick={() => onTabClick(2)} className={tabIndex === 2 ? " tab-btn btn-2 active-tab" : "tab-btn btn-2 "}>Leave Quota</button>
            
            <button onClick={() => onTabClick(3)} className={tabIndex === 3 ? " tab-btn btn-3 active-tab" : "tab-btn btn-3 "}>User Info</button>
          </div>

          {/* **************Tab contents here********** */}


          <div className="main-content-tab-contents">
            <div className={tabIndex === 1 ? "active-content":  "tab-content-1 tab-content"}>
              Attendance
            </div>
            <div className={tabIndex === 2 ? "active-content":  "tab-content-2 tab-content"}>
              Leave Quota
            </div>
            <div className={tabIndex === 3 ? "active-content":  "tab-content-3 tab-content"}>
              User info
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
