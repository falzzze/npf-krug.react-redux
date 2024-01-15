import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setError } from "./errorSlice";
import createSelectUser from "../../utils/createSelectUser";

const initialState = [];

export const fetchRandomUser = createAsyncThunk(
  "users/fetchRandomUser",
  async (url, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.get(url);
      const randomIndex = Math.floor(Math.random() * res.data.length);
      const randomUser = res.data[randomIndex];
      return randomUser;
    } catch (error) {
      dispatch(setError(error.message));
      return rejectWithValue(error);
    }
  }
);

export const fetchUsersViaAPI = createAsyncThunk(
  "users/fetchUsersViaAPI",
  async (url, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.get(url);
      res.data.forEach((user) => {
        dispatch(addUser(createSelectUser(user, "API")));
      });
    } catch (error) {
      dispatch(setError(error.message));
      return rejectWithValue(error);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    deleteUser: (state, action) => {
      return state.filter((user) => user.id !== action.payload);
    },
    toggleSelected: (state, action) => {
      state.forEach((user) => {
        if (user.id === action.payload) {
          user.isSelected = !user.isSelected;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRandomUser.fulfilled, (state, action) => {
      if (action.payload?.name && action.payload?.username) {
        state.push(createSelectUser(action.payload, "random"));
      }
    });
    builder.addCase(fetchUsersViaAPI.fulfilled, (state, action) => {});
  },
});

export const { addUser, deleteUser, toggleSelected } = usersSlice.actions;

export const selectUsers = (state) => state.users;

export default usersSlice.reducer;
