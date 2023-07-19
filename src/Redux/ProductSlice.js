import { createSlice } from "@reduxjs/toolkit";

const initialState = { products: [], error: null };

export const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    Success: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    Fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default ProductSlice.reducer;

export const { Success, Fail } = ProductSlice.actions;
