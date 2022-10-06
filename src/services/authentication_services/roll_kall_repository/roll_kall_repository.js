import Endpoints from "../endpoints";
import HTTPClient from "../../../api/http_client";
import { DateTime } from "luxon";
import AuthService from "../auth_service";

class RollKallRepository {

  #client = new HTTPClient();
  #authService = new AuthService();

  fetchUsers = async () => {
    const users = await this.#client.get(Endpoints.users);
    if (users) return users.data;
  };

  fetchTeams = async () => {
    const teams = await this.#client.get(Endpoints.teams);
    if (teams) return teams.data;
  };

  fetchAttendanceDates = async () => {
    const getUser = await this.#authService.loadUserData();
    const userId = getUser.data.id;
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
}

export default RollKallRepository;
