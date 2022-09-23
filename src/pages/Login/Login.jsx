import React from "react";
import "./login.css";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import NotificationService from "../../services/notification_service/notification_service";
import AuthService from "../../services/authentication_services/auth_service";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Login = () => {
  const user = <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>;
  const lock = <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>;
  const eye = <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>;
  const eyeSlash = <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>;

  const notificationService = new NotificationService();
  const authService = new AuthService();

  // const formData = {
  //   email: "",
  //   password: "",
  // };

  // states
  const [formData, setFormData] = useState({email: '', password: ''});
  const [isVisible, setVisibility] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const showPassword = () => {
    const password = document.getElementById("password");
    if (!isVisible) {
      password.setAttribute("type", "text");
    } else {
      password.setAttribute("type", "password");
    }
  };

  const onEmailInputChange = (event) => {
   setFormData({...formData, email : event.target.value});
  };

  const onPasswordInputChange = (event) => {
    setFormData({...formData, password : event.target.value});
  };

  const validateEmail = (email) => {
    var regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (
      email &&
      String(email)
        .toLowerCase()
        .match(regExp)
    ) {
      return true;
    } else {
      notificationService.showError("Fields Cannot Be Empty");
      return false;
    }
  };

  const validatePassword = (password) => {
    if (password.length < 4) {
      notificationService.showError("Invalid Password");
      return false;
    } else {
      return true;
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    //  console.log(formData)
    if (validateEmail(formData.email) && validatePassword(formData.password)) {
      setLoading(true);
      console.log(isLoading);
      const data = await authService.login(formData);
      if (typeof data === "undefined") {
        setLoading(false);
        console.log(isLoading);
        console.log(data);
      }
    } else {
      return;
    }
  };

  return (
    <div className="main-container">
      <div className="background-dark-overlay">
        <div className="login-container">
          <form onSubmit={onFormSubmit}>
            <h3>Login</h3>
            <div className="input-fields">
              <div className="input-wrapper email">
                <span className="icon">{user}</span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={onEmailInputChange}
                />
              </div>
              <div className="input-wrapper password">
                <span className="icon">{lock}</span>
                <div className="password-container">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={onPasswordInputChange}
                  />
                  <span
                    className="view-password"
                    onClick={() => {
                      setVisibility(!isVisible);
                      showPassword();
                    }}
                  >
                    {isVisible ? eyeSlash : eye}
                  </span>
                </div>
              </div>
            </div>
            {isLoading ? <LoadingSpinner/>: 
            <input type="submit" disabled={isLoading} value="Sign in" />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
