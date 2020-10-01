import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    firstName: 'Alexandr',
    lastName: 'Pogorelov',
  },
});

export default profileSlice.reducer;
