import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    firstName: 'Fufel',
    lastName: 'Fuflov',
  },
});

export default profileSlice.reducer;