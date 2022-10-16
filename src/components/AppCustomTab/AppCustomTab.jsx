import React, {useState} from "react";
import "./app_custom_tab.css";



const AppCustomTab = ({}) => {

  //states  
  const [tabIndex, setTabIndex] = useState(1);
  
  const onTabClick = (index) => {
    setTabIndex(index)
  }

  return (
        <div className="main-tab-contents-container">
          <div className="main-content-tab">
            <button onClick={() => onTabClick(1)} className={tabIndex === 1 ? " tab-btn btn-1 active-tab" : "tab-btn btn-1 "}>Attendance</button>
            <button onClick={() => onTabClick(2)} className={tabIndex === 2 ? " tab-btn btn-2 active-tab" : "tab-btn btn-2 "}>Leave Quota</button>
            <button onClick={() => onTabClick(3)} className={tabIndex === 3 ? " tab-btn btn-3 active-tab" : "tab-btn btn-3 "}>User Info</button>
          </div>
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
    
  );
};



export default AppCustomTab;
