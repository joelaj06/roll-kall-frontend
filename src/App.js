import React from 'react';
import './App.css';
import Header from './components/Header/Header.js';
import SideBar from './components/SideBar/SideBar';
import Dashboard from './pages/Dashboard/Dashboard';
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import Users from './pages/UsersPage/Users';
import Login from './pages/Login/Login';
function App() {

  const token = false;
  return (

    !token ? <Login/> :
    <Router>
      <div >
      <Header></Header>
      <div className='body-container'>
        <SideBar></SideBar>
        <div className='page-container'>
          <Routes>
            <Route path= '/' element={<Dashboard/>}/>
          </Routes>
          <Routes>
            <Route path= '/users' element={<Users/>}/>
          </Routes>
         
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
