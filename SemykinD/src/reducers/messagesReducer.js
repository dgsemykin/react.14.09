import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const messagesSlice = createSlice({
  name: 'messages',
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
    ids: [1, 2, 3]
  },
  reducers: {
    addMessage(state, action) {
      const newId = uuidv4();
      const { id, author, message } = action.payload;

      state.byIds[id] = {id, author, message};
      state.ids.push(id);
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
