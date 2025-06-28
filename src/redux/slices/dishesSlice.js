import { createSlice } from '@reduxjs/toolkit';

const dishesSlice = createSlice({
  name: 'dishes',
  initialState: [],
  reducers: {
    addDish: (state, action) => {
      state.push(action.payload);
    },
    updateDish: (state, action) => {
      const index = state.findIndex(dish => dish.id === action.payload.id);
      state[index] = action.payload;
    },
    deleteDish: (state, action) => {
      return state.filter(dish => dish.id !== action.payload);
    },
  },
});

export const { addDish, updateDish, deleteDish } = dishesSlice.actions;
export default dishesSlice.reducer;