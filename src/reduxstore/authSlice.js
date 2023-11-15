import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  theme: "light",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      (state.status = true), (state.userData = action.payload);
    },
    logOut: (state) => {
      (state.status = false), (state.userData = null);
    },
    ThemeTogglerFunction: (state) => {
      state.theme = state.theme == "light"?"dark":"light";
    },
  },
});

export const { login, logOut, ThemeTogglerFunction } = authSlice.actions;

export default authSlice.reducer;
