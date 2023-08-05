import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./reducers";

// Load cart state from local storage if available
const storedCartState = localStorage.getItem('cartState');
const initialCartState = storedCartState
  ? JSON.parse(storedCartState)
  : {
      cartItems: [],
      subTotal: 0,
      shipping: 0,
      tax: 0,
      total: 0,
    };

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: initialCartState, // Set the initial state for the cart reducer
  },
});

// Subscribe to store updates and save cart state to local storage
store.subscribe(() => {
  const state = store.getState();
  // Save the cart state to local storage
  localStorage.setItem('cartState', JSON.stringify(state.cart));
});

export default store;
