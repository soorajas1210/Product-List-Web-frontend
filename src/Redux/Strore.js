import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./ProductSlice";
import CategoryReducer from "./CategorySlice";

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    categories : CategoryReducer
  },
});
