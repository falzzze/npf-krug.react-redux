import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  name: "",
  email: "",
  onlySelected: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setUsernameFilter: (state, action) => {
      state.username = action.payload;
    },
    setNameFilter: (state, action) => {
      state.name = action.payload;
    },
    setEmailFilter: (state, action) => {
      state.email = action.payload;
    },
    setOnlySelectedFilter: (state) => {
      state.onlySelected = !state.onlySelected;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const {
  setUsernameFilter,
  setNameFilter,
  setEmailFilter,
  setOnlySelectedFilter,
  resetFilters,
} = filterSlice.actions;

export const selectUsernameFilter = (state) => state.filter.username;
export const selectNameFilter = (state) => state.filter.name;
export const selectEmailFilter = (state) => state.filter.email;

export const selectOnlySelectedFilter = (state) => state.filter.onlySelected;

export default filterSlice.reducer;
