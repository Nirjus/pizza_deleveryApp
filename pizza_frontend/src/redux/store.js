import {configureStore} from "@reduxjs/toolkit"
import { userReducer } from "./Reducer/user";
import { productReducer } from "./Reducer/product";
import { categoryReducer } from "./Reducer/category";


const Store = configureStore({
  reducer:{
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
  }
})

export default Store;