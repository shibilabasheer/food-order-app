import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {

    addCart: (state, action) => {
      state.push(action.payload);
    },
    updateCart: (state, action) => {
      const index = state.findIndex(cart => cart.id === action.payload.id);
      state[index] = action.payload;
    },
    deleteCart: (state, action) => {
      return state.filter(cart => cart.id != action.payload)
    },
    clearUserCart: (state, action) => {
      const userId = action.payload;
      return state.filter(cart => cart.user !== userId);
    }
  },
});

export const { addCart, updateCart, deleteCart ,clearUserCart } = cartSlice.actions;
export default cartSlice.reducer;