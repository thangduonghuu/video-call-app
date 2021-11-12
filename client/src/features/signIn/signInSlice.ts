import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { accountApi } from "api/accountApi";
import { SignState, SignInInput } from "constants/AccountType";
import { useHistory } from "react-router";

export const signIn = createAsyncThunk(
  "account/sign-in",
  async (user: SignInInput) => {
    const response: any = await accountApi.signIn(user);
    return response.data;
    // console.log(response.data);
  }
);
export const CheckLoginUser = createAsyncThunk(
  "account/CheckLogin",
  async () => {
    const response: any = await accountApi.CheckLogin();
    return response.data;
    // console.log(response.data);
  }
);

const initialState: SignState = {
  id: "",
  loadding: false,
  error: "",
  isSuccess: false,
};

export const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.loadding = true;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.loadding = false;
      state.error = "Login Failed!";
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      if (action.payload.isSuccess) {
        localStorage.setItem("owner", action.payload.id);
        state.loadding = false;
        state.id = action.payload.id;
        window.location.assign("http://localhost:3000/home");
      }
    });
    builder.addCase(CheckLoginUser.pending, (state) => {
      state.loadding = true;
    });
    builder.addCase(CheckLoginUser.rejected, (state) => {
      state.loadding = false;
      state.error = "Login Failed!";
    });
    builder.addCase(CheckLoginUser.fulfilled, (state, action) => {
      if (action.payload.isSuccess) {
        window.location.assign(`http://localhost:3000/home`);
      }
    });
  },
});

export default signInSlice.reducer;
