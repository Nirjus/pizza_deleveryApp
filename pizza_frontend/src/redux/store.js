import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./reducers";

const storedCartState = localStorage.getItem("cartState");
const initialCartState = storedCartState ? 
JSON.parse(storedCartState) : cartReducer

const store = configureStore({
  reducer: {
      cart: cartReducer,
  },
   preloadedState:{
    cart: initialCartState,
   }
});

store.subscribe(() => {
  const state = store.getState();
  // save cart state to local storage
  localStorage.getItem("cartState", JSON.stringify(state.cart));
})

export default store;
