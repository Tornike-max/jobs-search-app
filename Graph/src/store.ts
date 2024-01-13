import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./redux/filterSlice";

export const store = configureStore({
  reducer: {
    filterSlice: filterSlice,
  },
});
