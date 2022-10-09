import React, { Fragment, useEffect, useState, useRef } from "react";
import "./App.css";
import Header from "./components/Header/Header.js";
import SideBar from "./components/SideBar/SideBar";
import Dashboard from "./pages/Dashboard/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./pages/UsersPage/Users";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AuthService from "./services/authentication_services/auth_service";
import PushNotification from "./utils/push_notification";

const pushNotification = new PushNotification();
let count = 1;

function App() {
  // states
  const [user, setUser] = useState({});

  //refs
  const shouldRender = useRef(true);

  let authService = new AuthService();
  const isAuthenticated = authService.authenticated;
  if (isAuthenticated) {
    useEffect(() => {
      if (shouldRender.current) {
        shouldRender.current = false;
        const fetchUser = async () => {
          let userData = await authService.loadUserData();
          if (!userData) return;
          setUser(userData);
        };
        fetchUser();
      }
    }, []);
  }

  welcomeNotification(user);

  getUserData(user);
  return isAuthenticated ? (
    <Router>
      <Fragment>
        <div>
          <Header user={user}></Header>
          <div className="body-container">
            <SideBar user={user}></SideBar>
            <div className="page-container">
              <Routes>
                <Route exact path="/" element={<ProtectedRoute />}>
                  <Route exact path="/" element={<Dashboard />} />
                </Route>
              </Routes>
              <Routes>
                <Route exact path="/users" element={<ProtectedRoute />}>
                  <Route exact path="/users" element={<Users />} />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </Fragment>
    </Router>
  ) : (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
      </Routes>
      <Routes>
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

function welcomeNotification(user) {
  if (!user) return;
  if (!user.first_name || !user.last_name) return;
  if (count > 1) return;
  pushNotification.pushToNotification(
    `Welcome ${user.first_name} ${user.last_name}, you logged in successfully`
  );
  count++;
}

export function getUserData(user) {
  if (!user) return;
  return user;
}
export default App;
