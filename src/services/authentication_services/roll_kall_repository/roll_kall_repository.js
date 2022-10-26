import Endpoints from "../endpoints";
import HTTPClient from "../../../api/http_client";
import { DateTime } from "luxon";
import AuthService from "../auth_service";

class RollKallRepository {

  #client = new HTTPClient();
  #authService = new AuthService();

  fetchUsers = async (page) => {
    const users = await this.#client.get(Endpoints.users(page,20));
    if (users) return users.data;
  };

  fetchUsersWithQuery = async (query) => {
    const users = await this.#client.get(Endpoints.fetchUsersWithQuery(query));
    if(users) return users.data;
  }

  fetchTeams = async () => {
    const teams = await this.#client.get(Endpoints.teams);
    if (teams) return teams.data;
  };

  fetchAttendanceDates = async () => {
    const getUser = await this.#authService.loadUserData();
   if(!getUser) return;
    const userId = getUser.id;
    let endDate = new Date().toISOString();
    let startDate = DateTime
      .local()
      .startOf("day")
      .toUTC()
      .toISO();
    const attendanceDates = await this.#client.get(
      Endpoints.attendanceDate(userId, startDate, endDate)
    );
    if (attendanceDates) return attendanceDates.data;
  };

  fetchActiveUsersOfTheWeek = async () => {
    const activeUsersOfTheWeek = await this.#client.get(Endpoints.fetchActiveUsersOfTheWeek);
    if(activeUsersOfTheWeek) return activeUsersOfTheWeek.data;
  }

  fetchLeavesOfTheWeek = async() => {
    const leavesOfTheWeek = await this.#client.get(Endpoints.fetchLeavesOfTheWeek);
    if(leavesOfTheWeek) return leavesOfTheWeek.data;
  }

  fetchAverageCheckIn = async () => {
    const averageCheckIn = await this.#client.get(Endpoints.fetchAverageCheckInsOfTheWeek);
    if(averageCheckIn) return averageCheckIn.data;
  }
  fetchAverageCheckOut = async () => {
    const averageCheckOuts = await this.#client.get(Endpoints.fetchAverageCheckOutsOfTheWeek);
    if(averageCheckOuts) return averageCheckOuts.data;
  }

  fetchUserWithId = async (userId) => {
    const user = await this.#client.get(Endpoints.userWithId(userId));
    if(user) return user.data;
  }

  fetchUserAttendanceDates = async (userId, startDate, endDate) => {
    const userAttendanceDates = await this.#client.get(Endpoints.userAttendanceDates(userId, startDate, endDate));
    if(userAttendanceDates) return userAttendanceDates.data;
  }

  fetchUserLeaves = async (userId, startDate, endDate, category) => {
    const userLeaves = await this.#client.get(Endpoints.userLeaves(userId, startDate, endDate,category));
    if(userLeaves) return userLeaves.data;
  }

  deleteUser = async (userId) => {
    const user = await this.#client.delete(Endpoints.userWithId(userId));
    if(user) return user.data;
  }

  updateUser = async (userId, userData) => {
    const user = await this.#client.clientPut(Endpoints.updateUser(userId), userData);
    if(user) return user.data;
  }
}

export default RollKallRepository;
