import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import graphReducer from "./graph";

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
});

export const store = configureStore({
  reducer: {
    graph: graphReducer,
  },
  middleware,
  devTools: process.env.REACT_APP_NODE !== "production",
});
