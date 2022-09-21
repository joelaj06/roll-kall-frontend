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

const Login = () => {
  const user = <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>;
  const lock = <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>;
  const eye = <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>;
  const eyeSlash = <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>;

  const notificationService = new NotificationService();
  const authService = new AuthService();

  const formData = {
    email : '',
    password : ''
  }
  
  // states
  const [isVisible, setVisibility] = useState(false);
  const [isEnabled, setEnableButton] = useState(true);


  const showPassword = () => {
    const password = document.getElementById("password");
    if (!isVisible) {
      password.setAttribute("type", "text");
    } else {
      password.setAttribute("type", "password");
    }
  };

  const onEmailInputChange = (event) => { 
    formData.email = event.target.value;
  }

  const onPasswordInputChange = (event) => {
     formData.password = event.target.value; 
  }

  const validateEmail = (email) => {
    var regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(email && String(email).toLowerCase().match(regExp)){
      return true;
    }else{
       notificationService.showError('Fields Cannot Be Empty');
       return false;
    }
  }

  const validatePassword = (password) => {
    if(password.length < 4){
      notificationService.showError('Invalid Password');
      return false;
    }else{
      return true;
    }
  }

  const onFormSubmit = async (e) => {
      e.preventDefault();   
    //  console.log(formData)
      if(validateEmail(formData.email) && validatePassword(formData.password)){
        const data = await authService.login(formData);
       // console.log(data);
      }else{
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
            <input type="submit" value="Sign in" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
