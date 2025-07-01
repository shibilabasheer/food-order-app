import { createSlice } from '@reduxjs/toolkit';

const userFromStorage = JSON.parse(localStorage.getItem('user'));
const allUsersFromStorage = JSON.parse(localStorage.getItem('allUsers')) || [];

const initialState = {
  isLoggedIn: userFromStorage ? true : false,
  allUsers: allUsersFromStorage,
  user: userFromStorage || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.allUsers = [...state.allUsers, action.payload];
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('allUsers', JSON.stringify(state.allUsers));
    },
    login(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('user');
    }
  }
});

export const { register, login, logout } = userSlice.actions;
export default userSlice.reducer;

