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

const Login = () => {
  const user = <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>;
  const lock = <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>;
  const eye = <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>;
  const eyeSlash = <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>;

  
  const [isVisible, setVisibility] = useState(false);
  const showPassword = () => {
    const password = document.getElementById('password');
    if(!isVisible) {
      password.setAttribute('type', 'text');
    }else{
      password.setAttribute('type', 'password');
    }
  }
  return (
    <div className="main-container">
      <div className="login-container">
        <form action="">
          <h3>Login</h3>
          <div className="input-wrapper email">
            <span className="icon">{user}</span>
            <input type="email" name="email" id="email" placeholder="Email" />
          </div>
          <div className="input-wrapper password">
            <span className="icon">{lock}</span>
          <div className="password-container">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <span className="view-password" onClick={ () => { setVisibility(!isVisible)
            showPassword()}}>{isVisible ? eyeSlash : eye}</span>
          </div>
          </div>
          <input type="submit" value="Sign in" />
        </form>
      </div>
    </div>
  );
};

export default Login;
