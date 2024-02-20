import { useState } from "react";
import "./user_info.css";
import { Avatar } from "@mui/material";
import RollKallRepository from "../../services/authentication_services/roll_kall_repository/roll_kall_repository";
import { defaultImageUrl } from "../../utils/defaultImage";
import NotificationService from "../../services/notification_service/notification_service";

const avatarSize = 150;

const rollKallRepository = new RollKallRepository();
const notificationService = new NotificationService();

const updateUserInfo = async (userId, userData) => {
  const user = await rollKallRepository.updateUser(userId, userData);
  return user;
};

const UserInfo = ({ user }) => {
  // states
  const [formData, setFormData] = useState({
    job_title: user.job_title ? user.job_title : "",
    email: user.email ? user.email : "",
    imgUrl: user.imgUrl ? user.imgUrl : "",
    first_name: user.first_name ? user.first_name : "",
    last_name: user.last_name ? user.last_name : "",
    address: user.address ? user.address : "",
    phone: user.phone ? user.phone : "",
  });

  const [imgUrl, setImgUrl] = useState(user.imgUrl);
  const [isLoading, setIsLoading] = useState(false);

  const onJobInputChange = (e) => {
    setFormData({ ...formData, job_title: e.target.value });
  };
  const onEmailInputChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };
  const onFirstNameInputChange = (e) => {
    setFormData({ ...formData, first_name: e.target.value });
  };
  const onLastNameInputChange = (e) => {
    setFormData({ ...formData, last_name: e.target.value });
  };
  const onAddressInputChange = (e) => {
    setFormData({ ...formData, address: e.target.value });
  };
  const onPhoneInputChange = (e) => {
    setFormData({ ...formData, phone: e.target.value });
  };
  const onImageInputChange = (e) => {
    e.preventDefault();
    console.log(e.target);
    if (e.target.files[0].size > 1000000) {
      console.log("File too large");
    } else {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        const result = reader.result;
        const base64String = result.replace(/^data:image\/[a-z]+;base64,/, "");
        setImgUrl(base64String);
        setFormData({ ...formData, imgUrl: base64String });
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newUser = await updateUserInfo(user._id, formData);
    if (newUser) {
      notificationService.showSuccess(
        "User info updated successfully",
        "userInfoUpdate"
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="user-info-main-container">
      <div className="user-info-container">
        <div className="user-info-row-1">
          <div className="user-edit-details-container">
            <div className="user-profile-img">
              <div className="existing-image">
                <Avatar
                  variant="square"
                  src={`data:image/png;base64,${
                    formData.imgUrl ? imgUrl : defaultImageUrl
                  }`}
                  alt="user profile pic"
                  sx={{ width: avatarSize, height: avatarSize }}
                />
              </div>
              <input
                type="file"
                name="image"
                id=""
                accept="image/png, image/jpeg"
                onChange={onImageInputChange}
              />
            </div>
            <form action="" onSubmit={onFormSubmit}>
              <div className="input-wrapper user-job-title">
                <label htmlFor="job">Job</label>
                <input
                  type="text"
                  name="job"
                  id="job"
                  placeholder="Job title"
                  value={formData.job_title}
                  onChange={onJobInputChange}
                />
              </div>
              <div className="input-wrapper user-email">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  disabled={true}
                  onChange={onEmailInputChange}
                />
              </div>
              <div className="input-wrapper user-firstname">
                <label htmlFor="fname">First Name</label>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={onFirstNameInputChange}
                />
              </div>
              <div className="input-wrapper user-lastname">
                <label htmlFor="lname">Last Name</label>
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={onLastNameInputChange}
                />
              </div>
              <div className="input-wrapper user-address">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={onAddressInputChange}
                />
              </div>
              <div className="input-wrapper phone-number">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={onPhoneInputChange}
                />
              </div>
              <button
                disabled={isLoading && true}
                className={
                  isLoading ? "update-user-btn-disabled" : "update-user-btn"
                }
              >
                Update User
              </button>
            </form>
          </div>
        </div>
        <div className="user-info-row2"></div>
      </div>
    </div>
  );
};

export default UserInfo;
