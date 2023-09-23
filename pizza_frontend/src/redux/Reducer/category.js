import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    loading: true,
}

export const categoryReducer = createReducer(initialState,
   {
        createCategoryRequest:(state) => {
        state.loading = true;
       },
       createCategorySuccess: (state, action) => {
         state.loading = false;
         state.message = action.payload;
       },
       createCategoryFail: (state,action) => {
        state.loading = false;
         state.error = action.payload;
       },

       updateCategoryRequest:(state) => {
        state.loading = true;
       },
       updateCategorySuccess: (state, action) => {
         state.loading = false;
         state.message = action.payload;
       },
       updateCategoryFail: (state,action) => {
        state.loading = false;
         state.error = action.payload;
       },
       
       getAllCategoryRequest:(state) => {
        state.loading = true;
       },
       getAllCategorySuccess: (state, action) => {
         state.loading = false;
         state.allCategory = action.payload;
       },
       getAllCategoryFail: (state,action) => {
        state.loading = false;
         state.error = action.payload;
       },

       getCategoryForAdminRequest:(state) => {
        state.categoryloading = true;
       },
       getCategoryForAdminSuccess: (state, action) => {
         state.categoryloading = false;
         state.allCategory = action.payload;
       },
       getCategoryForAdminFail: (state,action) => {
        state.categoryloading = false;
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