import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Box, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Tippy from "@tippyjs/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AddUser from "../../components/AddUser/AddUser";
import AppButton from "../../components/AppButton/AppButton";
import "../../components/DefautlActions/default_actions.css";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import AppSearchField from "../../components/SearchBar/AppSearchField";
import RollKallRepository from "../../services/authentication_services/roll_kall_repository/roll_kall_repository";
import "./users.css";

const rollKallRepository = new RollKallRepository();

const editIcon = <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>;
const deleteIcon = <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>;

const getFullName = (params) => {
  console.log(params);
  return `${params.row.first_name || ""} ${params.row.last_name || ""}`;
};

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
  // states
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [deletedUserId, setDeletedUserId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const shouldRender = useRef(true);

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
      valueGetter: (params) =>
        params.row.role ? params.row.role.name : "No Role",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      headerName: "Actions",
      field: "actions",
      // type: "actions",
      renderCell: (params) => (
        <Box>
          <Tippy content="Preview" placement="left">
            <Link to={`/users/${params.row._id}`}>
              <button className="icon-btn edit" onClick={() => {}}>
                {editIcon}
              </button>
            </Link>
          </Tippy>
          <Tippy content="Delete user" placement="left">
            <button
              onClick={(event) => {
                handleUserDelete(event, params);
              }}
              className="icon-btn delete"
            >
              {deleteIcon}
            </button>
          </Tippy>
        </Box>
      ),
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
  ]);

  const handleChange = (value) => {
    setQuery(value);
  };

  useEffect(() => {
    if (deletedUserId || refresh) {
      const fetchUsers = async () => {
        const users = await rollKallRepository.fetchUsers(1);
        if (!users) return;
        setUsers(users);
      };
      fetchUsers();
    } else {
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
  }, [deletedUserId, refresh]);

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

  const handleUserDelete = async (event, params) => {
    // const Swal = Swal.mixin({
    //   customClass: {
    //     confirmButton: "btn btn-success mr-1",
    //     cancelButton: "btn btn-danger ml-1",
    //   },
    //   buttonsStyling: false,
    // });

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deletedUser = await rollKallRepository.deleteUser(params.row._id);
        if (deletedUser) {
          setDeletedUserId(deletedUser);
          Swal.fire("Deleted!", "User deleted Successfully.", "success");
        } else {
          Swal.fire("Failed", "An error occurred", "error");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "User deletion canceled:)", "error");
      }
    });
  };

  const handleAddUser = () => {
    setOpenModal(true);
  };

  return (
    <div className="users-container">
      <div className="title">Users</div>
      <div className="controls-container">
        <AppSearchField
          onChange={handleChange}
          placeholder={"Search user by name and email"}
          value={query}
          onBtnClick={handleBtnClick}
          onKeyDown={handleKeyDown}
        />
        <AppButton
          text={"+ Add User"}
          bgColor={"bg-green"}
          onBtnClick={handleAddUser}
        />
      </div>
      <Modal
        open={openModal}
        onClose={setOpenModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <AddUser closeModal={setOpenModal} refresh={setRefresh} />
        </div>
      </Modal>
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
              rowsPerPageOptions={[10, 20, 30]}
              sx={{
                "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                  outline: "none !important",
                },
              }}
              slots={{
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
