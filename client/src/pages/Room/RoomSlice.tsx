import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { RoomMeeting } from "constants/RoomMeeting";

const initialState: RoomMeeting = {
  socketId: "",
  username: "",
  MemberInRoom: [],
  loadding: true,
};
export const RoomMeetingSlice = createSlice({
  name: "RoomMeeting",
  initialState,
  reducers: {
    joinRoom: (state, action) => {
      action.payload.socketInfo.emit("join_room", {
        room_id: action.payload.RoomId,
        ownerId: localStorage.getItem("owner"),
        peerId: action.payload.peerId,
      });
    },
    someOneJoinRoom: (state, action) => {
      state.MemberInRoom = action.payload;
    },
    someOneDisconnect: (state, action) => {
      console.log("hello");

      let userDisconect = action.payload.idUserDisconnect;
      const div = document.getElementsByClassName(userDisconect)[0];

      if (div) {
        div.remove();
      }
      // Remove class "info"
    },
  },
});
export default RoomMeetingSlice.reducer;
export const { joinRoom, someOneJoinRoom, someOneDisconnect } =
  RoomMeetingSlice.actions;
export const selectuserInRoom = (state: RootState) => state.RoomMeeting;
