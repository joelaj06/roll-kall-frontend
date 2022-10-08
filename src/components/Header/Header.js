import React from 'react'
import './Header.css'
import profilePic from '../../assets/images/img_avatar.png'


const Header = ({user}) => {
    console.log(user)
    return (
        <ul className="nav justify-content-end">
            <div className="email">{ user ? user.email : ''}</div>
            <div className="profile-pic">
                <img src={ profilePic} alt="user profile pic" />
                {/* <img src={user ? `data:image/png;base64,${user.imgUrl}` : profilePic} alt="user profile pic" /> */}
            </div>
        </ul>
    )
}

export default Header