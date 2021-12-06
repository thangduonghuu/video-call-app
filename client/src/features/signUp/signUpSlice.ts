import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import { accountApi } from 'api/accountApi';
import { SignState, SignUpInput } from 'constants/AccountType';
import { useHistory } from 'react-router';

export const signUp = createAsyncThunk(
  'account/sign-up',
  async (user: SignUpInput) => {
    const response: any = await accountApi.signUp(user);
    return response.data;
  }
);

const initialState: SignState = {
  id: '',
  loadding: false,
  error: '',
  isSuccess: false,
};

export const signUpSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.loadding = true;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.loadding = false;
      state.error = 'Login Failed!';
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
        if(action.payload.isSuccess){
          message.info(' Đăng Ký thành công')
        }
    });
  },
});

export default signUpSlice.reducer;
