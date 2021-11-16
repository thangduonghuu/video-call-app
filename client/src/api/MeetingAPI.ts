import axios from "axios";
// const API = "https://servervideocall.herokuapp.com";
const API = "http://localhost:4000"
export const MeetingRoom = {
  CreateMeeting: (params: any) => {
    return axios
      .post(
        `${API}/MeetingRoom/CreateMeetingRoom`,
        {
          owner: window.localStorage.getItem("owner"),
          RoomName: params.roomId,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);

        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
