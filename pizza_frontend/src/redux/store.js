import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./reducers";

const storedCartState = localStorage.getItem("myCartState");
const initialCartState = storedCartState ? 
JSON.parse(storedCartState) : {
  cartItems:[],
  tax:0,
  subTotal:0,
  totalPrice:0,
  totalItems:0,
}

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
  localStorage.setItem("myCartState", JSON.stringify(state.cart));
})

export default store;
