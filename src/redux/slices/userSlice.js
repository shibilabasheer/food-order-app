import { createSlice } from '@reduxjs/toolkit';

const userFromStorage = JSON.parse(localStorage.getItem('user'));

const initialState = {
    isLoggedIn: userFromStorage ? true : false,
    user: userFromStorage || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { 
    register(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
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

