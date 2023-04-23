class Endpoints {
  static login = "users/login";
  static logout = "users/logout";
  static user = "users/user";
  static addUser = 'users';
  static users = (page, limit) => `users?page=${page}&limit=${limit}`;
  static fetchUsersWithQuery = (query) => `users?search_filter=true&query=${query}`;
  static teams = "teams";
  static organization = "organization";
  static attendanceDate = (userId,startDate, endDate) =>
   `attendance_dates/${userId}?date_filter=true&start_date=${startDate}&end_date=${endDate}`;
  static fetchActiveUsersOfTheWeek = "activeUsersOfTheWeek";
  static fetchLeavesOfTheWeek = "leavesOfTheWeek";
  static fetchAverageCheckInsOfTheWeek = "averageChecksOfTheWeek/checkIn";
  static fetchAverageCheckOutsOfTheWeek = "averageChecksOfTheWeek/checkOut";
  static userWithId = (userId) => `users/${userId}`;
  static userAttendanceDates = (userId, startDate, endDate) => `attendance_dates/${userId}?date_filter=true&start_date=${startDate}&end_date=${endDate}`;
  static userLeaves = (userId, startDate, endDate, category) =>
   `leaves/user/${userId}?date_filter=true&start_date=${startDate}&end_date=${endDate}&category_filter=true&category=${category}`;
   static updateUser = (userId) => `users/${userId}`;
   static  roles = 'roles';

}

export default Endpoints;
