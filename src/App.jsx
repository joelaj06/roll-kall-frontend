import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import SideBar from "./components/SideBar/SideBar";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./pages/UsersPage/Users";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AuthService from "./services/authentication_services/auth_service";
import PushNotification from "./utils/push_notification";
import UserDetailsPage from "./pages/UserDetailPage/UserDetailsPage";

const pushNotification = new PushNotification();
let count = 1;

function App() {
  // states
  const [user, setUser] = useState({});
  const [isAuthenticated, setAuthenticated] = useState(false);

  //refs
  const shouldRender = useRef(true);

  let authService = React.useMemo(() => new AuthService(), []);

  useEffect(() => {
    const fetchUser = async () => {
      let userData = await authService.loadUserData();
      if (!userData) return;
      setUser(userData);
    };

    const checkUserAuthentication = async () => {
      const isAuthenticated = authService.isAuthenticated();
      setAuthenticated(isAuthenticated);
      console.log(isAuthenticated);
    };

    if (shouldRender.current) {
      shouldRender.current = false;
      fetchUser();
      checkUserAuthentication();
    }
  }, []);
  return isAuthenticated ? (
    <Router>
      <>
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
              <Routes>
                <Route
                  exact
                  path="/users/:userId"
                  element={<UserDetailsPage />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </>
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

function getUserData(user) {
  if (!user) return;
  return user;
}
export default App;
