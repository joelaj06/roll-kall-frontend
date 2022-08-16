import React from 'react';
import './App.css';
import Header from './components/Header/Header.js';
import SideBar from './components/SideBar/SideBar';

function App() {
  return (
    <div className='page-container'>
      <Header></Header>
      <SideBar></SideBar>
    </div>
  );
}

export default App;
