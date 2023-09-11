import { createAction } from "@reduxjs/toolkit";

export const setProduct = createAction(
  'SET_PRODUCT',
  (product) => {
    return {
      payload: product
    }
  }
)