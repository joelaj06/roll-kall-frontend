import React from 'react'
import './Header.css'
import profilePic from '../../assets/images/img_avatar.png'


const Header = () => {
    return (
        <ul className="nav justify-content-end">
            <div className="email">usermail@gmail.com</div>
            <div className="profile-pic">
                <img src={profilePic} alt="user profile pic" />
            </div>
        </ul>
    )
}

export default Header