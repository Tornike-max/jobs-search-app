import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    nextPage: (state) => {
      state.page = state.page + 1;
    },
    prevPage: (state) => {
      if (state.page === 1) return;
      state.page = state.page - 1;
    },
  },
});

export const { nextPage, prevPage } = filterSlice.actions;

export default filterSlice.reducer;
