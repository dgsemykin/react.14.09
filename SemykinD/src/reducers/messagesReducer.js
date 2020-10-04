import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
  name: 'message',
  initialState: {
    byIds: {
      1: {
        id: 1,
        author: 'Bot',
        message: 'Я бот, чего ты от меня хочешь, кожаный мешок?',
      },
      2: {
        id: 2,
        author: 'Bot',
        message: 'Вали отсюда!',
      },
      3: {
        id: 3,
        author: 'Bot',
        message: 'ПиуПиу',
      },
    },
  },
  reducers: {
    addMessage(state, action) {},
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
