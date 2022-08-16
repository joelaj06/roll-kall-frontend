import React, { useState } from 'react';
import './SideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faUsers, faPeopleGroup, faGear, faRightFromBracket, faShareFromSquare, faBars, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'


const SideBar = () => {
    const [isExpanded, setExpandState] = useState(false); 
    const dashboardIcon = <FontAwesomeIcon icon={faChartLine}></FontAwesomeIcon>
    const users = <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
    const teams = <FontAwesomeIcon icon={faPeopleGroup}></FontAwesomeIcon>
    const leaves = <FontAwesomeIcon icon={faShareFromSquare}></FontAwesomeIcon>
    const settings = <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
    const logout = <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>
    const hamburger = <FontAwesomeIcon icon={faBars} size = '1x'></FontAwesomeIcon>
    const arrowAngleRight = <FontAwesomeIcon icon={faChevronRight} size = '1x'></FontAwesomeIcon>
    const arrowAngleLeft = <FontAwesomeIcon icon={faChevronLeft} size = '1x'></FontAwesomeIcon>

    const menuItems = [
        {
            id: 1,
            title: "Overview",
            icon : dashboardIcon,
        },
        {
            id: 2,
            title: "All Users",
            icon : users,
        },
        {
            id: 3,
            title: "Teams",
            icon : teams,
        },
        {
            id: 4,
            title: "Leaves",
            icon : leaves,
        },
        {
            id: 5,
            title: "Settings",
            icon : settings,
        },
      
    ];
    return (
       <div className={isExpanded ? "side-nav-container" : "side-nav-container side-nav-container-NX"}>
        <div className="nav-upper">
            <div className="nav-heading">
                {isExpanded && <div className="nav-brand">
                    <h6>Attendance System WEB</h6>
                </div>}
                <button className={isExpanded ? 'hamburger hamburger-in' : 'hamburger hamburger-out'}
                onClick = {() => setExpandState(!isExpanded)}>
                    <span className='active'>{hamburger}</span>
                    <span className='inactive'>{isExpanded ? arrowAngleLeft : arrowAngleRight}</span>
                </button>
            </div>
            <div className="nav-menu">
               {
                menuItems.map(({title, icon, id}) =>{
                   return <a key={id} href="" className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}>
                        <span className='icon'>{icon}</span>
                        <p className='title'>{isExpanded && title}</p>
                    </a>
                })
               }
            </div>
        </div>
        <div className="nav-footer">
           { isExpanded && <div className="nav-details">
                <div className="nav-footer-info">
                    <p className="nav-footer-user-account-name">Efya Doe</p>
                    <p className="nav-footer-user-account-type">System Administrator</p>
                </div>
            </div>}
            <span className='logout-icon'>{logout}</span>
        </div>

       </div>
    )
}

export default SideBar