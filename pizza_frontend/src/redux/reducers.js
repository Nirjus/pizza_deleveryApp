import { createReducer } from "@reduxjs/toolkit";

export const cartReducer = createReducer({


    cartItems:[],
    tax:0,
    subTotal:0,
    totalPrice:0,
    totalItems:0,
},{
    addToCart: (state, action) => {
        const item = action.payload;

        const isItemExists = state.cartItems.find(i => i.id === item.id);

        if(isItemExists){
            state.cartItems.forEach(i => {
                if(i.id === item.id){
                    i.qty += 1;
                }
            })
        }else{
            state.cartItems.push(item);
        }
    },

    decrement: (state, action) => {
        const item = state.cartItems.find(i => i.id === action.payload);
      
        if(item.qty > 1){
            state.cartItems.forEach((i) => {
                if(i.id === item.id){
                    i.qty -= 1;
                }
            })
        }
    },

    deleteFromCart: (state, action) => {
       state.cartItems = state.cartItems.filter(i => i.id !== action.payload);

    },

    calculatePrice:(state) => {
        let sum = 0;
        let totalQty = 0;
        state.cartItems.forEach(i => (sum += i.price *i.qty))
        state.subTotal = sum;
        state.tax = +(state.subTotal*0.18).toFixed();
        state.totalPrice = state.tax + state.subTotal;
        state.cartItems.forEach(i => (totalQty += i.qty));
        state.totalItems = totalQty;
    }
})