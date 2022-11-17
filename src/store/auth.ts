import {createSlice} from '@reduxjs/toolkit';

interface UserInfo {
  email: string;
  first_name: string;
  user_id: string;
}

type UserStateInit = {
  error: string;
  user: UserInfo;
  isAuth: boolean;
};

const initialState: UserStateInit = {
  error: '',
  user: {
    first_name: '',
    email: '',
    user_id: '',
  },
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoginState: (state, action) => {
      state.isAuth = true;
      state.user.email = action.payload.email;
      state.user.user_id = action.payload.id;
      state.user.first_name = action.payload.givenName;
    },
    userLogoutState: state => {
      state.isAuth = false;
    },
  },
});

export const {userLoginState} = userSlice.actions;
export default userSlice.reducer;
