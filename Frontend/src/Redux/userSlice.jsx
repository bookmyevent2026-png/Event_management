import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    name: "",
    role: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.role = action.payload.role;
    },
    clearUser: (state) => {
      state.id = "";
      state.name = "";
      state.role = "";
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;