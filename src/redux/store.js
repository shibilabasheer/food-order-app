import { configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import userReducer from './slices/userSlice'
import dishesReducer from './slices/dishesSlice'
import cartReducer from './slices/cartSlice'

const storedDishes = localStorage.getItem('dishes');

const loggedUser = localStorage.getItem('user');
const userId = loggedUser.id;

let cartDishes = [];

if(userId)
{
  const savedCart = localStorage.getItem(`cart_${userId}`);
  cartDishes = savedCart ? JSON.parse(savedCart) : [];
}

const preloadedState = {

  dishes: storedDishes ? JSON.parse(storedDishes) : [],
  cart : cartDishes ,
}

export const Store = configureStore({
  reducer: {
    user: userReducer,
    dishes: dishesReducer,
    cart : cartReducer,
  },
  preloadedState,
});

Store.subscribe(() => {
  const state = Store.getState();
  localStorage.setItem('dishes', JSON.stringify(state.dishes));

  if(userId)
  localStorage.setItem(`cart_${userId}`, JSON.stringify(state.cart));
});
