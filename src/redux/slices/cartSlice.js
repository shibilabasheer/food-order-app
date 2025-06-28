import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {

    addCart : (state,action) => {
        state.push(action.payload);
    },
    updateCart : (state,action) => {
        const index = state.findIndex(cart => cart.id === action.payload.id);
        state[index] = action.payload;
    },
    deleteCart : (state,action) => {
        return state.filter(cart => cart.id != action.payload)
    }    
  },
});

export const { addCart, updateCart, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;