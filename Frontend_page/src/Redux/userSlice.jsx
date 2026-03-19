import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    role: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.role = action.payload.role;
    },
    clearUser: (state) => {
      state.name = "";
      state.role = "";
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;