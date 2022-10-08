import React, { useState, useEffect, useRef } from "react";
import Chart from "../../components/Chart/Chart";
import "./dashboard.css";
import office from "../../assets/images/office.png";
import person from "../../assets/images/person.png";
import team from "../../assets/images/team.png";
import ontime from "../../assets/images/ontime.png";
import { printInitials } from "../../utils/initials";
import RollKallRepository from "../../services/authentication_services/roll_kall_repository/roll_kall_repository";
import Tippy from "@tippyjs/react";

const Dashboard = () => {
  let rollKallRepository = new RollKallRepository();

  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [attendanceDates, setAttendanceDate] = useState([]);
  const [averageUsersOfTheWeek, setAverageUsersOTheWeek] = useState({});
  const [leavesOfTheWeek , setLeavesOfTheWeek]= useState({});
  const [loading, setLoading] = useState(true);
  const [averageCheckInOfWeek, setAverageCheckInOfTheWeek] = useState({});
  const [averageCheckOutOfTheWeek, setAverageCheckOutOfTheWeek] = useState({}); 

   //refs
   const shouldRender = useRef(true);

  useEffect(() => {
    if(shouldRender.current){
      shouldRender.current = false;
      const getUsers = async () => {
        const usersData = await rollKallRepository.fetchUsers();
        if(usersData){
          setUsers(usersData);
        }
      };
      getUsers();

    }
  }, []);
  
  useEffect(() => {
    shouldRender.current = true;
    if(shouldRender.current){
      shouldRender.current = false;
      const getTeams = async () => {
        const teamsData = await rollKallRepository.fetchTeams();
        setTeams(teamsData);
      }
      getTeams();

    }
  }, []);
  
  useEffect( () => {
    shouldRender.current = true;
    if(shouldRender.current){
      shouldRender.current = false;
      const getAttendanceDates = async() => {
        const attendanceDateData = await rollKallRepository.fetchAttendanceDates(); 
        setAttendanceDate(attendanceDateData);
      };
      getAttendanceDates();
    }
  }, []);
  
  useEffect(() => {
    shouldRender.current = true;
    if(shouldRender.current){
      shouldRender.current = false;
      const getAverageUsersOfTheWeek = async() =>{
        setLoading(true);
        const response = await rollKallRepository.fetchActiveUsersOfTheWeek();
        if(response){
          setAverageUsersOTheWeek(response);
          setLoading(false);
        }
      }
      getAverageUsersOfTheWeek();
    }
  }, [])
  
  useEffect(() => {
    shouldRender.current = true;
    if(shouldRender.current){
      shouldRender.current = false;
      const getLeavesOfTheWeek = async() =>{
        setLoading(true);
        const response = await rollKallRepository.fetchLeavesOfTheWeek();
        if(response){
          setLeavesOfTheWeek(response);
          setLoading(false);
        }
      }
      getLeavesOfTheWeek();
    }
  }, []);

  useEffect(() => {
    shouldRender.current = true;
    if(shouldRender.current){
      shouldRender.current  = false;
      const getAverageCheckInOfTheWeek = async () => {
        setLoading(true);
        const response = await rollKallRepository.fetchAverageCheckIn();
        if(response){
          setAverageCheckInOfTheWeek(response);
          setLoading(false);
        }
      }
      getAverageCheckInOfTheWeek();
    }
  }, []);

  useEffect(() => {
    shouldRender.current = true;
    if(shouldRender.current){
      shouldRender.current = false;
      const getAverageCheckOutOfTheWeek = async () => {
        setLoading(true);
        const response = await rollKallRepository.fetchAverageCheckOut();
        if(response){
          setAverageCheckOutOfTheWeek(response);
          setLoading(false);
        }
      }
      getAverageCheckOutOfTheWeek();
    }
  }, []);
  
  
  return (
    <div className="dashboard-container">
      <div className="title">Dashboard</div>
      <div className="card-container">
        <div className="card students-card">
          <div className="card-icon student-icon">
            <img src={office} alt="" />
          </div>
          <div className="row2">
            <div className="card-title">Offices</div>
            <div className="card-quantity">1</div>
          </div>
        </div>
        <div className="card active-students-card">
          <div className="card-icon active-student-icon">
            <img src={person} alt="" />
          </div>
          <div className="row2">
            <div className="card-title">Users</div>
            <div className="card-quantity">{users ?users.length : 0}</div>
          </div>
        </div>

        <div className="card teams-card">
          <div className="card-icon team-icon">
            <img src={team} alt="" />
          </div>
          <div className="row2">
            <div className="card-title">Teams</div>
            <div className="card-quantity">{teams ? teams.length : 0}</div>
          </div>
        </div>
        <div className="card staffs-card">
          <div className="card-icon staff-icon">
            <img src={ontime} alt="" />
          </div>
          <div className="row2">
            <div className="card-title">Total Present</div>
            <div className="card-quantity">{attendanceDates ? attendanceDates.length : 0}</div>
          </div>
        </div>
      </div>
      {loading ? '': <div className="charts">
        <div className="chart-card">
           <Chart
            chartTitle={"Users"}
            dataY={averageUsersOfTheWeek.users}
            labels = {averageUsersOfTheWeek.dates}
            borderColor={"#ffad01"}
            toolTipLabel = {'Users'}
           
          //  fillColor={"#583e726c"}
          /> 
        </div>
        <div className="chart-card">
           <Chart
            chartTitle={"Leaves"}
            dataY={leavesOfTheWeek.leaves}
            labels = {leavesOfTheWeek.dates}
            borderColor={"#42d17e"}
            toolTipLabel = {'Leaves'}
          //  fillColor={"#583e726c"}
          /> 
        </div>
      </div>}
      <div className="users-present">
        <div className="user-present-title">Active Users</div>
        <div className="user-profile-container">
          {users.map((user) => {
            let userInitials = printInitials(`${user.first_name} ${user.last_name}`);
            return (
              <Tippy content = {`${user.first_name} ${user.last_name}`} placement = "top" >
             { user.imgUrl ? <img src={`data:image/png;base64,${user.imgUrl}`} alt="user profile pic" />
             : <div key={user._id} className="user-profile">
                {userInitials}
              </div>}
              </Tippy>
            );
          })}
        </div>
      </div>
      {loading ? '' : <div className=" charts avg-checks-container">
        <div className="avg-checks-charts">
          <Chart
           chartTitle={"Avg Check In"}
           dataY={averageCheckInOfWeek.avgTimes}
           labels = {averageCheckInOfWeek.dates}
           borderColor={"#583e72"}
           isTime = {true}
           showCard = {false}
           showXGrid = {false}
           toolTipLabel = {'Checked In'}
          />
        </div>
        <div className="avg-checks-charts">
          <Chart
           chartTitle={"Avg Check Out"}
           dataY={averageCheckOutOfTheWeek.avgTimes}
           labels = {averageCheckOutOfTheWeek.dates}
           borderColor={"#583e72"}
           isTime = {true}
           showCard = {false}
           showXGrid = {false}
           toolTipLabel = {'Checked Out'}
          />
        </div>
      </div>}
    </div>
  );
};


export default Dashboard;
