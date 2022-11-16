import {createSlice} from '@reduxjs/toolkit';

type UserStateInit = {
  error: string;
  user: {};
  isAuth: boolean;
};

const initialState: UserStateInit = {
  error: '',
  user: {},
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoginState: state => {
      state.isAuth = true;
    },
  },
});

export const {userLoginState} = userSlice.actions;
export default userSlice.reducer;
