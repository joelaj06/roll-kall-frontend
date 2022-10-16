import React from "react";
import { useMemo, useState, useEffect, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import RollKallRepository from "../../services/authentication_services/roll_kall_repository/roll_kall_repository";
import { Avatar, Box } from "@mui/material";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import AppSearchField from "../../components/SearchBar/AppSearchField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import Swal from 'sweetalert2';
import '../../components/DefautlActions/default_actions.css';


const rollKallRepository = new RollKallRepository();

const editIcon = <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>;
const deleteIcon = <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>;

function getFullName(params) {
  return `${params.row.first_name || ""} ${params.row.last_name || ""}`;
}

function getUserProfileImg(params) {
  return params.row.imgUrl ? (
    <Avatar
      src={`data:image/png;base64,${params.row.imgUrl}`}
      alt="user profile pic"
    />
  ) : (
    <Avatar />
  );
}

const Users = () => {
  const COLUMNS = useMemo(() => [
    {
      headerName: "",
      field: "imgUrl",
      renderCell: getUserProfileImg,
      sortable: false,
      filterable: false,
      headerClassName: "super-app-theme--header",
      width: 60,
      // flex : 1,
    },
    {
      headerName: "Name",
      field: "name",
      valueGetter: getFullName,
      flex: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      headerName: "Email",
      field: "email",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      headerName: "Phone",
      field: "phone",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      headerName: "Role",
      field: "role",
      valueGetter: (params) => params.row.role.name,
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      headerName: "Actions",
      field: "actions",
     // type: "actions",
      renderCell: (params) => (
        <Box>
          <Tippy content="Edit user" placement="left">
            <Link to={`/users/${params.row._id}`}>
              <button
                className="icon-btn edit"
                onClick={(event) => {
                  handleUserEdit(event, params);
                }}
              >
                {editIcon}
              </button>
            </Link>
          </Tippy>
          <Tippy content="Delete user" placement="left">
            <button onClick={(event) => {handleUserDelete(event, params)}} className="icon-btn delete">{deleteIcon}</button>
          </Tippy>
        </Box>
      ),
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
  ]);

  // states
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [deletedUserId, setDeletedUserId] = useState(null);
  const shouldRender = useRef(true);

  const handleChange = (value) => {
    setQuery(value);
  };
  useEffect(() => {
    if(deletedUserId){
      const fetchUsers = async () => {
        const users = await rollKallRepository.fetchUsers(1);
        if (!users) return;
        setUsers(users);
    }
    fetchUsers();
  }else{

      if (shouldRender.current) {
        shouldRender.current = false;
        const fetchUsers = async () => {
          const users = await rollKallRepository.fetchUsers(1);
          if (!users) return;
          setUsers(users);
        };
        fetchUsers();
      }
    }
    
  }, [deletedUserId]);

  const handleBtnClick = async () => {
    // if(!query) return;
    const users = await rollKallRepository.fetchUsersWithQuery(
      query.toLowerCase()
    );
    if (!users) return;
    setUsers(users);
  };

  const handleKeyDown = async (e) => {
    if (e.keyCode === 13) {
      await handleBtnClick();
    }
  };

  const handleUserDelete = async(event, params) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mr-1',
        cancelButton: 'btn btn-danger ml-1'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deletedUser = await rollKallRepository.deleteUser(params.row._id);
        if(deletedUser){
          setDeletedUserId(deletedUser);
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'User deleted Successfully.',
            'success'
          );
        }else{
          swalWithBootstrapButtons.fire(
            'Failed',
            'An error occurred',
            'error'
          )
        }
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'User deletion canceled:)',
          'error'
        )
      }
    })
    

  };

  const handleUserEdit = (event, params) => {
    
  };

  return (
    <div className="users-container">
      <div className="title">Users</div>
      <AppSearchField
        onChange={handleChange}
        placeholder="Search user by name"
        value={query}
        onBtnClick={handleBtnClick}
        onKeyDown={handleKeyDown}
      />
      <div className="user-table-container">
        <div className="user-table-card">
          <Box
            sx={{
              height: "calc(100vh - 130px)",
              width: "100%",
              backgroundColor: "white",
              "& .super-app-theme--header": {
                backgroundColor: "#f7f7f7",
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "black",
              },
            }}
          >
            <DataGrid
              disableSelectionOnClick={true}
              rows={users}
              columns={COLUMNS}
              getRowId={(row) => row._id}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20]}
              sx={{
                "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                  outline: "none !important",
                },
              }}
              components={{
                NoRowsOverlay: NoDataFound,
              }}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Users;
