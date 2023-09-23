import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    loading: true,
}

export const productReducer = createReducer(initialState,
   {
        createProductRequest:(state) => {
        state.loading = true;
       },
       createProductSuccess: (state, action) => {
         state.loading = false;
         state.message = action.payload;
       },
       createProductFail: (state,action) => {
        state.loading = false;
         state.error = action.payload;
       },

       updateProductRequest:(state) => {
        state.loading = true;
       },
       updateProductSuccess: (state, action) => {
         state.loading = false;
         state.message = action.payload;
       },
       updateProductFail: (state,action) => {
        state.loading = false;
         state.error = action.payload;
       },

       getProductRequest:(state) => {
          state.loading = true;
       },
       getProductSuccess:(state,action) => {
         state.loading = false;
         state.product = action.payload;
       },
       getProductFail:(state,action) => {
        state.loading = false;
        state.error = action.payload;
       },
       
       getAllProductRequest:(state) => {
        state.loading = true;
       },
       getAllProductSuccess: (state, action) => {
         state.loading = false;
         state.products = action.payload;
       },
       getAllProductFail: (state,action) => {
        state.loading = false;
         state.error = action.payload;
       },

       getProductsForAdminRequest:(state) => {
        state.productloading = true;
       },
       getProductsForAdminSuccess: (state, action) => {
         state.productloading = false;
         state.products = action.payload;
       },
       getProductsForAdminFail: (state,action) => {
        state.productloading = false;
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