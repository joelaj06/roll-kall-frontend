import React, { useState, forwardRef } from "react";
import "./app_custom_leave_date_field.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "@emotion/styled";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMonthYearInString } from "../../utils/date_formatter";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const calendarIcon = <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>;

const CustomSelect = styled(Select)(() => ({
  width: 40,
  height: 30,
  "&.MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#583e72",
    },
    "&:hover fieldset": {
      borderColor: "#583e72",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#583e72",
    },
  },
}));

const AppCustomLeaveDateField = ({
  categoryFilter = false,
  onChangeDate,
  onChangeCat,
}) => {
  const now = new Date();

  //states
  const [selectedDate, setSelectedDate] = useState(now);
  const [category, setCategory] = useState("");

  const handleSelectedDate = (date) => {
    setSelectedDate(date);
    onChangeDate(date);
  };

  const handleCatChange = (event) => {
    onChangeCat(event.target.value);
  };

  return (
    <div>
      <div className="date-field leave-date-field">
        <div className="date-display-container">
          <div className="date-text">{getMonthYearInString(selectedDate)}</div>
        </div>
        <DatePicker
          selected={selectedDate}
          onChange={handleSelectedDate}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          customInput={<MonthDateCustomInput />}
        />
        {categoryFilter ? (
          <FormControl size="small" sx={{ width: 40 }}>
            {/* <InputLabel disabled id="demo-simple-select-label">
            Status
          </InputLabel> */}
            <CustomSelect
              // labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Age"
              onChange={handleCatChange}
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"pending"}>Pending</MenuItem>
              <MenuItem value={"approved"}>Approved</MenuItem>
            </CustomSelect>
          </FormControl>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default AppCustomLeaveDateField;

const MonthDateCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className="example-custom-input" onClick={onClick} ref={ref}>
    {calendarIcon}
  </button>
));
