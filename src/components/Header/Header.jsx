import "./Header.css";
import profilePic from "../../assets/images/img_avatar.png";
import PropTypes from "prop-types";

const Header = ({ email }) => {
  return (
    <ul className="nav">
      <div className="email">{email ? email : ""}</div>
      <div className="profile-pic">
        <img src={profilePic} alt="user profile pic" />
        {/* <img src={user ? `data:image/png;base64,${user.imgUrl}` : profilePic} alt="user profile pic" /> */}
      </div>
    </ul>
  );
};

Header.propTypes = {
  email: PropTypes.string,
};

export default Header;
