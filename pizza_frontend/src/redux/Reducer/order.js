import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: true,
}

export const orderReducer = createReducer(initialState,{

    getAllOrderRequest:(state) => {
        state.loading = true;
    },
    getAllOrderSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticate = true;
        state.orders = action.payload;
    },
    getAllOrderFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    getSingleOrderRequest:(state) => {
        state.loading = true;
    },
    getSingleOrderSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticate = true;
        state.order = action.payload;
    },
    getSingleOrderFail: (state, action) => {
        state.loading = false;
        state.isAuthenticate = false;
        state.error = action.payload;
    },

    getAllOrderAdminRequest:(state) => {
        state.loading = true;
    },
    getAllOrderAdminSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticate = true;
        state.isAdmin = true;
        state.orders = action.payload;
    },
    getAllOrderAdminFail: (state, action) => {
        state.loading = false;
        state.isAuthenticate = false;
        state.isAdmin = false;
        state.error = action.payload;
    },

    CLEAR_ERROR:(state) => {
        state.error = null;
      },
      CLEAR_MESSAGE:(state) => {
       state.message = null;
     }
})