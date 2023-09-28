import {configureStore} from "@reduxjs/toolkit"
import { userReducer } from "./Reducer/user";
import { productReducer } from "./Reducer/product";
import { categoryReducer } from "./Reducer/category";
import { cartReducer } from "./Reducer/cart";
import { orderReducer } from "./Reducer/order";
import { eventReducer } from "./Reducer/event";


const Store = configureStore({
  reducer:{
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    cart: cartReducer,
    order: orderReducer,
    event: eventReducer,
  }
})

export default Store;