import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { accountApi  } from 'api/accountApi';
import { RootState } from 'app/store';
import { AccountState } from 'constants/AccountType';


export const GetInfoUser = createAsyncThunk(
  'Home/infoUser',
  async (user: any) => {
    const response: any = await accountApi.UserInfo(user);
    return response.data;
  }
);

const initialState: AccountState = {
  owner: "string",
  username: "string",
  avatarUrl: "string",
  loadding: true,
};

export const HomePageSlice = createSlice({
  name: 'HomePage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetInfoUser.pending, (state) => {
      state.loadding = true;
    });
    builder.addCase(GetInfoUser.rejected, (state) => {
      state.loadding = false;
      // state.error = 'Login Failed!';
    });
    builder.addCase(GetInfoUser.fulfilled, (state, action) => {
        // console.log(action.payload);
        if(action.payload.isSuccess){
          state.username = action.payload.username;
          state.avatarUrl = action.payload.avatar
        }
        else{
          window.location.replace(`http://localhost:3000/sign`);
        }
    });
  },
});

export default HomePageSlice.reducer;
export const selectHomePageUser = (state: RootState) => state.HomePage;