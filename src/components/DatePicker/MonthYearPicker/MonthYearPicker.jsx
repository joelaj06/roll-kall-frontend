import React, { useState } from "react";
import DatePicker from 'react-datepicker';


const MonthPicker = ({onChange}) => {
  const [date, setDate] = useState();
  const handleDateChange = (date) => {
    onChange(date);
  }
  return (
    <div>
       <DatePicker
      selected={date}
      onChange={handleDateChange}
      dateFormat="MM/yyyy"
      showMonthYearPicker
    />
    </div>
  );
};

export default MonthPicker;
