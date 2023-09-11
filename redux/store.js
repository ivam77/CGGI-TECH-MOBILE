import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsReducer";
import productRedu from "./reducers/product";
import userReducer from "./reducers/userReducer";


export const store = configureStore({
    reducer: {
        product: productRedu,
        products: productsReducer,
        user: userReducer,
      },
})