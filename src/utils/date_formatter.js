function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getLastDate(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

function getFirstDate(date){
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  return convertDateToYYMMDD(firstDay);
}

function convertDateToYYMMDD(date){
  return date.toISOString().split('T')[0];
}

function lastDayOfMonth(Year, Month) {
  return new Date((new Date(Year, Month, 1)) - 1);
}

function getLastDayOfMonth(date){
  return new Date(date.getFullYear(), 
  date.getMonth() + 1, 0, 23, 59, 59)
}

function getPreviousDateByDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() - days);
  return result.toISOString().split("T")[0];
}

function getAllPreviousDatesByDays(days) {
  let dates = [];
  let now = new Date();
  dates.push(now.toISOString().split("T")[0]);
  for (let i = 1; i < days; i++) {
    dates.push(getPreviousDateByDays(now, i));
  }
  return dates;
}

function changeToSeconds(time){
  /// time should be in the format 00:00
  let hours = time.split(':')[0];
  let mins = time.split(':')[1];
  let secs = (hours*60*60) + (mins*60);
  return secs;
}



function convertToHM(value) {
    const sec = parseInt(value, 10);
    let hours   = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60); 
    let seconds = sec - (hours * 3600) - (minutes * 60); 
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes;
}

function convertToHMInString(value){
  const sec = parseInt(value, 10);
  let hours   = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - (hours * 3600)) / 60); 
  let seconds = sec - (hours * 3600) - (minutes * 60); 
  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+'h '+minutes+'m';
}

function sqlTimestampToJs(date) {
  var t = date.split(/[- :]/);
  var newDate = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
  return newDate;
}

const convertDateToString = (dateTime) => {
  const date = dateTime.split('T')[0];
  const time = dateTime.split('T')[1].split('.')[0];
  const dateA = `${date} ${time}`
  const dateToString = sqlTimestampToJs(dateA).toDateString();
  return dateToString;

}

const getMonthYearInString = (date) => {
  const month = date.toDateString().split(' ')[1];
  const year = date.toDateString().split(' ')[3];
  return `${month} ${year}`;
}


  export {
  addDays,
  getLastDate,
  getPreviousDateByDays,
  getAllPreviousDatesByDays,
  changeToSeconds,
  convertToHM,
  getFirstDate,
  convertDateToYYMMDD,
  convertToHMInString,
  convertDateToString,
  getLastDayOfMonth,
  lastDayOfMonth,
  getMonthYearInString
};
