import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import signInReducer from 'features/signIn/signInSlice';
import signUpReducer from 'features/signUp/signUpSlice';
import HomePageReducer from 'pages/HomePage/HomePageSlice';
import RoomMeetingReducer from 'pages/Room/RoomSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    signIn: signInReducer,
    signUp: signUpReducer,
    HomePage: HomePageReducer,
    RoomMeeting: RoomMeetingReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
