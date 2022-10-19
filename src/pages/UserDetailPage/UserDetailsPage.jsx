import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import "./user_details_page.css";
import { Avatar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import RollKallRepository from "../../services/authentication_services/roll_kall_repository/roll_kall_repository";
import { useRef } from "react";
import checkoutIcon from "../../assets/images/time-out.png";
import checkInIcon from "../../assets/images/time.png";
import workHoursIcon from "../../assets/images/clock.png";
import absentsIcon from "../../assets/images/error.png";
import {changeToSeconds, convertToHMInString, convertToHM, getFirstDate, getPreviousDateByDays} from '../../utils/date_formatter';


const emailIcon = <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>;
const phoneIcon = <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>;
const addressIcon = <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>;

const avatarSize = 80; 

const rollKallRepository = new RollKallRepository();

const UserDetailsPage = () => {

  const params = useParams();

  let now = new Date();
  const date = new Date('2022-09-30');
  const startDate = getFirstDate(now);

  const endDate = getPreviousDateByDays(now,1);

  
  //states  
  const [tabIndex, setTabIndex] = useState(1);
  const [user, setUser] = useState({});
  const [averageChecks, setAverageChecks] = useState({});
  const shouldRender = useRef(true);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
     if(shouldRender.current){
      shouldRender.current = false;
      const fetchUser = async() => {
        const user = await rollKallRepository.fetchUserWithId(params.userId);
        if(!user) return;
        setUser(user);
       }
       fetchUser();
     }
  },[])

  useEffect(() => {
    shouldRender.current = true;
    if(shouldRender.current){
     shouldRender.current = false;
     const getUserAttendanceDates = async() => {
       const userDatesData = await rollKallRepository.fetchUserAttendanceDates(params.userId,
       startDate,endDate );
       if(!userDatesData) return;
      let newData = getDatesInSeconds(userDatesData);
      const avgData = {};
      const avgCheckIn = newData.reduce((total, data) => total + data.checkIn,0)/newData.length;
      const avgCheckOut = newData.reduce((total, data) => total + data.checkOut,0)/newData.length;
      const avgWorkingHrs = avgCheckOut - avgCheckIn;
      avgData.avgCheckIn = avgCheckIn;
      avgData.avgCheckout = avgCheckOut;
      avgData.avgWorkingHrs = avgWorkingHrs;
      setAverageChecks(avgData);
      }
      getUserAttendanceDates();
    }
 },[endDate])

 useEffect(()=> {
  shouldRender.current = true;
  if(shouldRender.current){
    shouldRender.current = false;
    const fetchUserLeaves = async () => {
    const leaves = await rollKallRepository.fetchUserLeaves(params.userId,
      startDate, endDate);
      if(!leaves) return;
      setLeaves(leaves);
  }
  fetchUserLeaves();}
 },[endDate])

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
                { user.imgUrl ?
                  <Avatar
                  src={`data:image/png;base64,${user.imgUrl}`}
                  alt="user profile pic"
                  sx={{ width: avatarSize, height: avatarSize }}
                />
               : 
                  <Avatar sx={{ width: avatarSize, height: avatarSize }} />
                  }
              </div>
              <div className="user-name bold">{ user ?`${user.first_name } ${user.last_name}` : 'Loading...'}</div>
              <div className="job-position">{user.job_title ? user.job_title : 'No job found'}</div>
            </div>
            <div className="user-name"></div>
            <div className="email-container space-between-inline">
              <div className="email-icon">{emailIcon}</div>
              <div className="email">{user ? user.email : 'No email found'}</div>
            </div>
            <div className="phone-container space-between-inline">
              <div className="phone-icon">{phoneIcon}</div>
              <div className="phone">{user.phone ? user.phone : 'No phone number'}</div>
            </div>
            <div className="address-container space-between-inline">
              <div className="address-icon">{addressIcon}</div>
              <div className="address">{user.address ? user.address : 'No address found'}</div>
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
              <div className="attendance-container">
                  <div className="average-field">
                    <AverageFields icon={checkInIcon}
                    title={'Avg clock in'}
                    content={averageChecks.avgCheckIn ?convertToHM(averageChecks.avgCheckIn) :
                    '00:00'}
                    /> 
                    <AverageFields icon={checkoutIcon}
                    title={'Avg clock out'}
                    content={averageChecks.avgCheckout ?convertToHM(averageChecks.avgCheckout) :
                      '00:00'}
                    />
                    <AverageFields icon={workHoursIcon}
                    title={'Avg Working Hrs'}
                    content={averageChecks.avgWorkingHrs ?convertToHMInString(averageChecks.avgWorkingHrs) :
                      '00h 00m'}
                    />
                    <AverageFields icon={absentsIcon}
                    title={'Absents/Leave'}
                    content={leaves ? leaves.length : '00'}
                    />
                  </div>
                  <div className="dates-table">Table</div>
              </div>
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

const getDatesInSeconds = (data) => {
  const dates = data.map(({check_in, check_out})=> {
    let checkIn = changeToSeconds(check_in);
    let checkOut = changeToSeconds(check_out);
    return {checkIn, checkOut};
  });
  return dates;
}

const AverageFields = ({icon, content, title}) => {
  return (
    <div className="average-field-container">
      <div className="icon">
        <img src= {icon} alt="" /></div>
      <div className="avg-data-col">
        <div className="avg-content bold">{content}</div>
        <div className="avg-title ">{title}</div>
      </div>
    </div>
  )
}


