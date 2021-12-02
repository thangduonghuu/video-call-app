import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { accountApi } from "api/accountApi";
import { MeetingRoom } from "api/MeetingAPI";
import { RootState } from "app/store";
import { AccountState } from "constants/AccountType";

export const GetInfoUser = createAsyncThunk(
  "Home/infoUser",
  async (user: any) => {
    const response: any = await accountApi.UserInfo(user);
    return response.data;
  }
);

export const CreateAMeeting = createAsyncThunk(
  "MeetingRoom/CreateAMeeting",
  async (user: any) => {
    const response: any = await MeetingRoom.CreateMeeting(user);
    return response.data;
  }
);

const initialState: AccountState = {
  owner: "",
  username: "",
  avatarUrl: "",
  loadding: true,
};

export const HomePageSlice = createSlice({
  name: "HomePage",
  initialState,
  reducers: {
    createAroom: (state, action) => {
      action.payload.socketId.emit("create_room", {
        RoomId: action.payload.roomId,
        UserRoom: localStorage.getItem("owner"),
      });
    },
    uploadAvatar: (state, action) => {
      state.avatarUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetInfoUser.pending, (state) => {
      state.loadding = true;
    });
    builder.addCase(GetInfoUser.rejected, (state) => {
      state.loadding = false;
    });
    builder.addCase(GetInfoUser.fulfilled, (state, action) => {
      if (action.payload.isSuccess) {
        state.username = action.payload.username;
        state.avatarUrl = action.payload.avatar;
        localStorage.setItem("username", action.payload.username);
        localStorage.setItem("avatar", action.payload.avatar);
      }
      /// commet khi chay online
      // else {
      //   window.location.replace(`http://localhost:3000/sign`);
      //   localStorage.clear();
      // }
    });

    builder.addCase(CreateAMeeting.pending, (state) => {
      state.loadding = true;
    });
    builder.addCase(CreateAMeeting.rejected, (state) => {
      // console.log(state);

      state.loadding = false;
    });
    builder.addCase(CreateAMeeting.fulfilled, (state, action) => {
      if (action.payload.isSuccess) {
        window.location.replace(
          `http://localhost:3000/MeetingRoom/${action.payload.roomId}`
        );
      } else {
        window.location.replace(`http://localhost:3000/sign`);
        localStorage.clear();
      }
    });
  },
});

export default HomePageSlice.reducer;
export const { createAroom, uploadAvatar } = HomePageSlice.actions;
export const selectHomePageUser = (state: RootState) => state.HomePage;
