import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { RoomMeeting } from "constants/RoomMeeting";

const initialState: RoomMeeting = {
  socketId :"",
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
      });
    },
    someOneJoinRoom: (state, action) => {
      state.MemberInRoom = action.payload;
    },
  },
});
export default RoomMeetingSlice.reducer;
export const { joinRoom, someOneJoinRoom } = RoomMeetingSlice.actions;
export const selectuserInRoom = (state: RootState) => state.RoomMeeting;
