import React from 'react';
import MaterialTable from 'material-table';
import { users } from '../../dummy';


const Users = () => {

  const COLUMNS = [
    {
      title: 'Name',
      field: 'name'
    },

    {
      title: 'Gender',
      field: 'gender'
    },
    {
      title: 'Id Number',
      field: 'studentId',
    },
    {
      title: 'Programme',
      field: 'programme'
    },
    {
      title: 'Level',
      field: 'level'
    },
  ];


  return (
    <div className='users-container'>
      <div className="title">
        Users
      </div>
      <div className="user-table-container">
        <div className="user-table-card">
          <MaterialTable  title={''}  columns= {COLUMNS} data ={users}/>
        </div>
      </div>
    </div>
  )
}

export default Users