import React, { useEffect, useState, useMemo, useRef } from "react";
import "./attendance_records.css";
import {
  changeToSeconds,
  convertToHMInString,
  convertToHM,
  getFirstDate,
  convertDateToString,
  getLastDayOfMonth,
  convertDateToYYMMDD,
} from "../../utils/date_formatter";
import { useParams } from "react-router-dom";
import checkoutIcon from "../../assets/images/time-out.png";
import checkInIcon from "../../assets/images/time.png";
import workHoursIcon from "../../assets/images/clock.png";
import absentsIcon from "../../assets/images/error.png";
import { DataGrid } from "@mui/x-data-grid";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import { Box, Divider } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import { CallMade, SouthEast, Place } from "@mui/icons-material";
import RollKallRepository from "../../services/authentication_services/roll_kall_repository/roll_kall_repository";
import Tippy from "@tippyjs/react";
import AppCustomLeaveDateField from "../AppCustomLeaveDateField/AppCustomLeaveDateField";

//icons
const arrowUpRightIcon = <CallMade sx={{ fontSize: 15 }} />;
const arrowDownRightIcon = <SouthEast sx={{ fontSize: 15 }} />;
const locationPin = <Place sx={{ fontSize: 15, color: "#ff8d72" }} />;

const rollKallRepository = new RollKallRepository();

const AttendanceRecords = () => {

  const params = useParams();

  let now = new Date();

  //states
  const [averageChecks, setAverageChecks] = useState({});
  const shouldRender = useRef(true);
  const [leaves, setLeaves] = useState([]);
  const [userAttendanceDates, setUserAttendanceDates] = useState([]);
  const [preferredDate, setPreferredDate] = useState(now);

  const startDate = getFirstDate(preferredDate);
  const lastDate = getLastDayOfMonth(preferredDate);
  const endDate = convertDateToYYMMDD(lastDate);

  useEffect(() => {
    // shouldRender.current = true;
    // if (shouldRender.current) {
    // shouldRender.current = false;
    const getUserAttendanceDates = async () => {
      const userDatesData = await rollKallRepository.fetchUserAttendanceDates(
        params.userId,
        startDate,
        endDate
      );
      if (!userDatesData) return;
      setUserAttendanceDates(userDatesData);
      let newData = getDatesInSeconds(userDatesData);
      const avgData = {};
      const avgCheckIn =
        newData.reduce((total, data) => total + data.checkIn, 0) /
        newData.length;
      const avgCheckOut =
        newData.reduce((total, data) => total + data.checkOut, 0) /
        newData.length;
      const avgWorkingHrs = avgCheckOut - avgCheckIn;
      avgData.avgCheckIn = avgCheckIn;
      avgData.avgCheckout = avgCheckOut;
      avgData.avgWorkingHrs = avgWorkingHrs;
      setAverageChecks(avgData);
    };
    getUserAttendanceDates();
    //  }
  }, [preferredDate]);

  useEffect(() => {
    shouldRender.current = true;
    if (shouldRender.current) {
      shouldRender.current = false;
      const fetchUserLeaves = async () => {
        const leaves = await rollKallRepository.fetchUserLeaves(
          params.userId,
          startDate,
          endDate,
          'all'
        );
        if (!leaves) return;
        setLeaves(leaves);
      };
      fetchUserLeaves();
    }
  }, [preferredDate]);


  const formateDateToString = (params) => {
    return convertDateToString(params.row.createdAt);
  };
  const getWorkingHours = (params) => {
    const checkIn = changeToSeconds(params.row.check_in);
    const checkOut = changeToSeconds(params.row.check_out);
    const workHrs = checkOut - checkIn;
    const workHrsTime = convertToHMInString(workHrs);
    return workHrsTime;
  };

  const renderCheckOutCell = (params) => (
    <div className="clock-out-container">
      <div className="icon">{arrowUpRightIcon}</div>
      <div className="time">{params.row.check_out}</div>
    </div>
  );
  const renderCheckInCell = (params) => (
    <div className="clock-out-container">
      <div className="icon">{arrowDownRightIcon}</div>
      <div className="time">{params.row.check_in}</div>
    </div>
  );
  const renderLocationCell = (params) => (
    <Tippy  content={params.row.location}
        theme = "light" 
        placement="bottom">
           <div className="clock-out-container">
      <div className="icon">{locationPin}</div>
      <div className="time">{params.row.location}</div>
    </div>
          </Tippy>
  );

  const COLUMNS = useMemo(() => [
    {
      headerName: "Date",
      field: "createdAt",
      sortable: false,
      filterable: false,
      renderCell: formateDateToString,
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      headerName: "Clock In",
      field: "check_in",
      renderCell: renderCheckInCell,
      sortable: false,
      filterable: false,
      flex: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      headerName: "Clock Out",
      field: "check_out",
      renderCell: renderCheckOutCell,
      sortable: false,
      filterable: false,
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      headerName: "Working Hr's",
      field: "working_hours",
      renderCell: getWorkingHours,
      sortable: false,
      filterable: false,
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      headerName: "Location",
      field: "location",
      renderCell: renderLocationCell,
      sortable: false,
      filterable: false,
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
  ]);
  return (
    <div className="attendance-container">
     
      <AppCustomLeaveDateField 
      onChangeDate={(date) => setPreferredDate(date)}
      />
      <Divider></Divider>
      <div className="average-field">
        <AverageFields
          icon={checkInIcon}
          title={"Avg clock in"}
          content={
            averageChecks.avgCheckIn
              ? convertToHM(averageChecks.avgCheckIn)
              : "00:00"
          }
        />
        <AverageFields
          icon={checkoutIcon}
          title={"Avg clock out"}
          content={
            averageChecks.avgCheckout
              ? convertToHM(averageChecks.avgCheckout)
              : "00:00"
          }
        />
        <AverageFields
          icon={workHoursIcon}
          title={"Avg Working Hrs"}
          content={
            averageChecks.avgWorkingHrs
              ? convertToHMInString(averageChecks.avgWorkingHrs)
              : "00h 00m"
          }
        />
        <AverageFields
          icon={absentsIcon}
          title={"Absents/Leave"}
          content={leaves ? leaves.length : "00"}
        />
      </div>
      <div className="dates-table">
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
            rows={userAttendanceDates}
            columns={COLUMNS}
            getRowId={(row) => row._id}
            headerHeight={38}
            //  pageSize={pageSize}
            //  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            // rowsPerPageOptions={[10, 20, 30]}
            sx={{
              ".MuiDataGrid-columnSeparator": {
                display: "none",
              },
              "&.MuiDataGrid-root": {
                border: "none",
              },
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
  );
};

export default AttendanceRecords;

const getDatesInSeconds = (data) => {
  const dates = data.map(({ check_in, check_out }) => {
    let checkIn = changeToSeconds(check_in);
    let checkOut = changeToSeconds(check_out);
    return { checkIn, checkOut };
  });
  return dates;
};

const AverageFields = ({ icon, content, title }) => {
  return (
    <div className="average-field-container">
      <div className="icon">
        <img src={icon} alt="" />
      </div>
      <div className="avg-data-col">
        <div className="avg-content bold">{content}</div>
        <div className="avg-title ">{title}</div>
      </div>
    </div>
  );
};

 

