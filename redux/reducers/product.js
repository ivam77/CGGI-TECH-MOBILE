import { createReducer } from "@reduxjs/toolkit";
import { setProduct } from "../actions/product.js";

const initialState = {
  product: {}
}

  const productRedu = createReducer(initialState, (builder) => { 
    builder
      .addCase(setProduct, (state, action) => {
        const newState = {
          ...state,
          product : action.payload
        }
        return newState
      })
  })

export default productRedu