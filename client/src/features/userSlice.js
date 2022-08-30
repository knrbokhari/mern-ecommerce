import { createSlice } from "@reduxjs/toolkit";

// appApi
import appApi from "../api/appApi";

const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
