import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import filterReducer from "./slices/filterSlice";
import errorReducer from "./slices/errorSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    filter: filterReducer,
    error: errorReducer,
  },
});

export default store;
