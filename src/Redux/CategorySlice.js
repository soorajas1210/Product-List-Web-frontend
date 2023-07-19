import { createSlice } from "@reduxjs/toolkit";

const initialState = { categories: [], error: null };

export const CategorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categorySuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    },
    categoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default CategorySlice.reducer;
 
export const { categoryFail,categorySuccess } = CategorySlice.actions;
