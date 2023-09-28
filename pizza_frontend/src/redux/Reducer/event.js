import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    loading: true,
}

export const eventReducer = createReducer(initialState,{

    getAllEventRequest:(state) => {
        state.loading = true;
    },
    getAllEventSuccess: (state, action) => {
        state.loading = false;
        state.events = action.payload;
    },
    getAllEventFail:(state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    getAllEventAdminRequest:(state) => {
        state.eventloading = true;
    },
    getAllEventAdminSuccess: (state, action) => {
        state.eventloading = false;
        state.events = action.payload;
    },
    getAllEventAdminFail:(state, action) => {
        state.eventloading = false;
        state.error = action.payload;
    },

       createEventRequest:(state) => {
        state.loading = true;
         },
        createEventSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
         },
       createEventFail:(state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    

    CLEAR_ERROR:(state) => {
        state.error = null;
      },
      CLEAR_MESSAGE:(state) => {
       state.message = null;
     }
})
