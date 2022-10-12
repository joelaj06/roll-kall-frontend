import React from 'react';
import { useMemo, useState,  useEffect,useRef} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import RollKallRepository from '../../services/authentication_services/roll_kall_repository/roll_kall_repository';
import { Avatar, Box } from '@mui/material';
import NoDataFound from '../../components/NoDataFound/NoDataFound';



const rollKallRepository = new RollKallRepository();

function getFullName(params) {
  return `${params.row.first_name || ''} ${params.row.last_name || ''}`;
}

function getUserProfileImg(params) {
   return params.row.imgUrl ? 
   <Avatar src={`data:image/png;base64,${params.row.imgUrl}`} alt="user profile pic" />
   : <Avatar/>
}

const Users = () => {

  const COLUMNS = useMemo (() => [
    {
      headerName: '',
      field: 'imgUrl',
      renderCell : getUserProfileImg,
      sortable : false,
      filterable : false,
      headerClassName: 'super-app-theme--header',
      width : 60
     // flex : 1,
    },
    {
      headerName: 'Name',
      field: 'name',
      valueGetter : getFullName,
      flex : 1,
      headerClassName: 'super-app-theme--header',
    },

    {
      headerName: 'Email',
      field: 'email',
      flex : 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      headerName : 'Phone',
      field : 'phone',
      flex : 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      headerName: 'Role',
      field: 'role',
      valueGetter : (params) => params.row.role.name,
      flex : 1,
      headerClassName: 'super-app-theme--header',
    },
  ]);

  const [users , setUsers] = useState([]);
  const shouldRender = useRef(true);

  useEffect(() => {
    console.log('calling users...')
   if(shouldRender.current){
    shouldRender.current = false;
    const fetchUsers = async() => {
      const users = await rollKallRepository.fetchUsers();
      if(!users) return;
      setUsers(users);
    }
    fetchUsers();
   }
  }, [])


  return (
  
    <div className='users-container'>
      <div className="title">
        Users
      </div>
      <div className="user-table-container">
        <div className="user-table-card">
        <Box 
    sx={
      {
        height : '100vh',
        width : '100%',
        backgroundColor : 'white',
        '& .super-app-theme--header': {
          backgroundColor: '#f7f7f7',
          fontWeight : 'bold',
          textTransform : 'uppercase',
          color : 'black'
        },
      }
    }
    >
      
      <DataGrid
      disableSelectionOnClick={true}
      rows={users}
      columns = {COLUMNS}
       getRowId = {row => row._id}
       sx={{
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
           outline: "none !important",
        },
     }}
     components = {{
      NoRowsOverlay : NoDataFound
     }}
      />
    </Box>
        </div>
      </div>
    </div>
  )
}

export default Users