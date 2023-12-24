import { configureStore } from "@reduxjs/toolkit";
import pokeDataReducer from "./features/pokeDataSlice";

export const store = configureStore({
  reducer: {
    pokeDataReducer,
  },
});
