class Endpoints {
  static login = "users/login";
  static logout = "users/logout";
  static user = "users/user";
  static users = "users";
  static fetchUsersWithQuery = (query) => `users?search_filter=true&query=${query}`;
  static teams = "teams";
  static organization = "organization";
  static attendanceDate = (userId,startDate, endDate) =>
   `attendance_dates/${userId}?date_filter=true&start_date=${startDate}&end_date=${endDate}`;
  static fetchActiveUsersOfTheWeek = "activeUsersOfTheWeek";
  static fetchLeavesOfTheWeek = "leavesOfTheWeek";
  static fetchAverageCheckInsOfTheWeek = "averageChecksOfTheWeek/checkIn";
  static fetchAverageCheckOutsOfTheWeek = "averageChecksOfTheWeek/checkOut";

}

export default Endpoints;
