import React from 'react';
import Chart from '../../components/Chart/Chart';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { data, users } from '../../dummy';
import staff from '../../assets/images/staff.png';
import student from '../../assets/images/student.png';
import team1 from '../../assets/images/team1.png';
import { printInitials } from '../../utils/initials';


const Dashboard = () => {
    const studentIcon = <FontAwesomeIcon icon={faUser} />
    return (
        <div className='dashboard-container'>
            <div className="title">
                Dashboard
            </div>
            <div className="card-container">
                <div className="card students-card">
                    <div className="card-icon student-icon">
                       <img src={student}alt="" />
                        </div>
                    <div className="row2">
                        <div className="card-title">Students</div>
                        <div className="card-quantity">201</div>
                    </div>
                </div>
                <div className="card active-students-card">
                    <div className="card-icon active-student-icon">
                        <img src={student} alt="" />
                    </div>
                    <div className="row2">
                        <div className="card-title">Active Students</div>
                        <div className="card-quantity">{users.length}</div>
                    </div>
                </div>
                <div className="card staffs-card">
                    <div className="card-icon staff-icon">
                        <img src={staff} alt="" />
                    </div>
                    <div className="row2">
                        <div className="card-title">Teachers</div>
                        <div className="card-quantity">11</div>
                    </div>
                </div>
                <div className="card teams-card">
                    <div className="card-icon team-icon">
                        <img src={team1} alt="" />
                    </div>
                    <div className="row2">
                        <div className="card-title">Teams</div>
                        <div className="card-quantity">7</div>
                    </div>
                </div>
            </div>
            <div className="charts">
               <div className=" chart-card daily-user">
               <Chart chartTitle={"Daily User Chart"} yDataKey={'number'}
                    xDataKey={'date'}
                    data={data}
                    strokeColor={'#583e72'}
                />
               </div>
            </div>
            <div className="users-present">
                <div className="user-present-title">
                    Active Users
                </div>
               <div className="user-profile-container">
               {
                    users.map(user =>{
                        let userInitials = printInitials(user.name);
                        return <div key={user.id} className="user-profile">
                            {userInitials}
                        </div>
                    })
                }
               </div>
            </div>
        </div>
    )
}

export default Dashboard