import React, { useState } from "react";
import "./SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faUsers,
  faPeopleGroup,
  faGear,
  faRightFromBracket,
  faShareFromSquare,
  faBars,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css'; 


const dashboardIcon = <FontAwesomeIcon icon={faChartLine}></FontAwesomeIcon>;
const users = <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>;
const teams = <FontAwesomeIcon icon={faPeopleGroup}></FontAwesomeIcon>;
const leaves = <FontAwesomeIcon icon={faShareFromSquare}></FontAwesomeIcon>;
const settings = <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>;
const logout = <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>;
const hamburger = <FontAwesomeIcon icon={faBars} size="1x"></FontAwesomeIcon>;
const arrowAngleRight = (
  <FontAwesomeIcon icon={faChevronRight} size="1x"></FontAwesomeIcon>
);
const arrowAngleLeft = (
  <FontAwesomeIcon icon={faChevronLeft} size="1x"></FontAwesomeIcon>
);

const menuItems = [
  {
    id: 1,
    title: "Overview",
    icon: dashboardIcon,
    link: "/",
  },
  {
    id: 2,
    title: "All Users",
    icon: users,
    link: "/users",
  },
  {
    id: 3,
    title: "Teams",
    icon: teams,
    link: "/teams",
  },
  {
    id: 4,
    title: "Leaves",
    icon: leaves,
    link: "/leaves",
  },
  {
    id: 5,
    title: "Settings",
    icon: settings,
    link: "/settings",
  },
];


const SideBar = ({ user }) => {

  //states
  const [isExpanded, setExpandState] = useState(false);

  return (
    <div className="side-container">
      <div
        className={
          isExpanded
            ? "side-nav-container"
            : "side-nav-container side-nav-container-NX"
        }
      >
        <div className="nav-upper">
          <div className="nav-heading">
            {isExpanded && (
              <div className="nav-brand">
                <h4>Roll Kall</h4>
              </div>
            )}
            <button
              className={
                isExpanded
                  ? "hamburger hamburger-in"
                  : "hamburger hamburger-out"
              }
              onClick={() => setExpandState(!isExpanded)}
            >
              <span className="active">{hamburger}</span>
              <span className="inactive">
                {isExpanded ? arrowAngleLeft : arrowAngleRight}
              </span>
            </button>
          </div>
          <div className="nav-menu">
            {menuItems.map(({ title, icon, id, link }) => {
              return (
                 <Link
                  to={link}
                  key={id}
                  href=""
                  className={
                    isExpanded ? "menu-item"  : "menu-item menu-item-NX"
                  }
                >
                  <Tippy placement="right" content = {title}>
                    <span className="icon">{icon}</span>
                  </Tippy>
                  <p className="title">{isExpanded && title}</p>
                </Link>
              
              );
            })}
          </div>
        </div>
        <div className="nav-footer">
          {isExpanded && (
            <div className="nav-details">
              <div className="nav-footer-info">
                <p className="nav-footer-user-account-name">{`${user ? user.first_name : ''} ${user ? user.last_name : ''}`}</p>
                <p className="nav-footer-user-account-type">
                  {user ? user.role.name : ""}
                </p>
              </div>
            </div>
          )}
          <Tippy placement="right" content = "Logout">
          <span className="logout-icon">{logout}</span>
          </Tippy>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
