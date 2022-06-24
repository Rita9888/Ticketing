import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "../features/eventSlice";
import ticketReducer from "../features/ticketSlice";
import { enableMapSet } from "immer";
enableMapSet();

export const store = configureStore({
  reducer: {
    events: eventReducer,
    tickets: ticketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
