import React, { Fragment } from "react";
import "./App.css";
import Header from "./components/Header/Header.js";
import SideBar from "./components/SideBar/SideBar";
import Dashboard from "./pages/Dashboard/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./pages/UsersPage/Users";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AuthService from "./services/authentication_services/auth_service";

function App() {
  let authService = new AuthService();
  const isAuthenticated = authService.authenticated;
  console.log(isAuthenticated);
  return isAuthenticated ? (
    <Router>
      <Fragment>
        <div>
          <Header></Header>
          <div className="body-container">
            <SideBar></SideBar>
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
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
