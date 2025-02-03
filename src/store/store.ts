import { configureStore } from "@reduxjs/toolkit";
import bitcoinReducer from "./bitcoinSlice";

export const store = configureStore({
  reducer: {
    bitcoin: bitcoinReducer,
  },
});

// Типы для использования в хуках
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
