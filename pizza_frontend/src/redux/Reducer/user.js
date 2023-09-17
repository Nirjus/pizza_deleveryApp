import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticate: true,
}

export const userReducer = createReducer(initialState,
   {
        createUserRequest:(state) => {
        state.loading = true;
       },
       createUserSuccess: (state, action) => {
         state.loading = false;
         state.message = action.payload;
       },
       createUserFail: (state,action) => {
        state.loading = false;
         state.error = action.payload;
       },

       loginUserRequest:(state) => {
        state.loading = true;
       },
       loginUserSuccess: (state, action) => {
         state.loading = false;
         state.message = action.payload;
       },
       loginUserFail: (state,action) => {
        state.loading = false;
         state.error = action.payload;
       },

       loadUserRequest:(state) => {
        state.loading = true;
       },
       loadUserSuccess: (state, action) => {
         state.loading = false;
         state.isAuthenticate = true;
         state.user = action.payload;
       },
       loadUserFail: (state,action) => {
        state.loading = false;
         state.isAuthenticate = false;
         state.error = action.payload;
       },

       updateUserRequest:(state) => {
        state.loading = true;
       },
       updateUserSuccess: (state, action) => {
         state.loading = false;
         state.isAuthenticate = true;
         state.message = action.payload;
       },
       updateUserFail: (state,action) => {
        state.loading = false;
         state.isAuthenticate = false;
         state.error = action.payload;
       },

       updateUserPasswordRequest:(state) => {
        state.loading = true;
       },
       updateUserPasswordSuccess: (state, action) => {
         state.loading = false;
         state.isAuthenticate = true;
         state.message = action.payload;
       },
       updateUserPasswordFail: (state,action) => {
        state.loading = false;
         state.isAuthenticate = false;
         state.error = action.payload;
       },


       logoutUserRequest:(state) => {
        state.loading = true;
        state.isAuthenticate = true;
       },
       logoutUserSuccess: (state, action) => {
         state.loading = false;
         state.isAuthenticate = false;
         state.user = null;
         state.message = action.payload;
       },
       logoutUserFail: (state,action) => {
        state.loading = false;
         state.isAuthenticate = true;
         state.error = action.payload;
       },

       CLEAR_ERROR:(state) => {
         state.error = null;
       },
       CLEAR_MESSAGE:(state) => {
        state.message = null;
      }
   } 
)