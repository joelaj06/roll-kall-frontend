import React, { useMemo, useState, useEffect } from "react";
import "./leave_quota.css";
import { Box } from "@mui/material";
import {
  convertDateToString,
  convertDateToYYMMDD,
  getLastDayOfMonth,
  getFirstDate,
} from "../../utils/date_formatter";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import NoDataFound from "../NoDataFound/NoDataFound";
import RollKallRepository from "../../services/authentication_services/roll_kall_repository/roll_kall_repository";
import "react-datepicker/dist/react-datepicker.css";
import Tippy from "@tippyjs/react";
import AppCustomLeaveDateField from "../AppCustomLeaveDateField/AppCustomLeaveDateField";

const rollKallRepository = new RollKallRepository();

const LeaveQuota = () => {
  const params = useParams();

  const now = new Date();

  //states
  const [selectedDate, setSelectedDate] = useState(now);
  const [pageSize, setPageSize] = useState(10);
  const [leaves, setLeaves] = useState([]);
  const [category, setCategory] = useState("all");

  const startDate = getFirstDate(selectedDate);
  const lastDate = getLastDayOfMonth(selectedDate);
  const endDate = convertDateToYYMMDD(lastDate);

  useEffect(() => {
    // shouldRender.current = true;
    // if (shouldRender.current) {
    //   shouldRender.current = false;
    const fetchUserLeaves = async () => {
      const leaves = await rollKallRepository.fetchUserLeaves(
        params.userId,
        startDate,
        endDate,
        category
      );
      if (!leaves) return;
      setLeaves(leaves);
    };
    fetchUserLeaves();
    //  }
  }, [selectedDate, category]);

  const renderTitleCell = (params) => {
    if (params.row.title) {
      return params.row.title;
    } else {
      return "No Title";
    }
  };

  const renderIssuedCell = (params) => {
    return convertDateToString(params.row.createdAt);
  };

  const renderReqDateCell = (params) => {
    return convertDateToString(params.row.createdAt);
  };

  const renderStatusCell = (params) => {
    if (params.row.status === "pending") {
      return <div className="pending status">Pending</div>;
    } else {
      return <div className="approved status">Approved</div>;
    }
  };

  const handleCatChange = (value) => {
    setCategory(value);
  };

  const COLUMNS = useMemo(() => [
    {
      headerName: "Title",
      field: "title",
      sortable: false,
      filterable: false,
      renderCell: renderTitleCell,
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      headerName: "Issued",
      field: "createdAt",
      renderCell: renderIssuedCell,
      sortable: false,
      filterable: false,
      flex: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      headerName: "Requested Date",
      field: "date",
      renderCell: renderReqDateCell,
      sortable: false,
      filterable: false,
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      headerName: "Description",
      field: "notes",
      renderCell: (params) => (
        <Tippy content={params.row.notes} theme="light" placement="bottom">
          <div className="desc">{params.row.notes}</div>
        </Tippy>
      ),
      sortable: false,
      filterable: false,
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      headerName: "Status",
      field: "status",
      renderCell: renderStatusCell,
      sortable: false,
      filterable: false,
      // flex: 1,
      width: 100,
      headerClassName: "super-app-theme--header",
    },
  ]);

 

  return (
    <div className="leave-quota-container">
      <AppCustomLeaveDateField
      categoryFilter = {true}
      onChangeCat = {handleCatChange}
      onChangeDate ={(date) => setSelectedDate(date)}
      />
      <Box
        sx={{
          height: "calc(100vh - 130px)",
          width: "100%",
          backgroundColor: "white",
          "& .super-app-theme--header": {
            backgroundColor: "#f7f7f7",
            fontWeight: "bold",
            fontSize: "15px",
            textTransform: "uppercase",
            color: "black",
          },
        }}
      >
        <DataGrid
          disableSelectionOnClick={true}
          rows={leaves}
          columns={COLUMNS}
          getRowId={(row) => row._id}
          headerHeight={38}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 20, 30]}
          sx={{
            //   ".MuiDataGrid-columnSeparator": {
            //     display: "none",
            //   },
            //   "&.MuiDataGrid-root": {
            //     border: "none",
            //   },
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
  );
};

export default LeaveQuota;
