import { createSlice } from '@reduxjs/toolkit';
import { BOT_NAME } from '../utils/constants';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    byIds: {
      1: {
        id: 1,
        author: BOT_NAME,
        message: 'Привет от бота',
      },
      2: {
        id: 2,
        author: BOT_NAME,
        message: 'Давай поболтаем',
      },
      3: {
        id: 3,
        author: BOT_NAME,
        message: 'Давай поболтаем, я в третьем чате',
      },
    },
    ids: [1, 2, 3],
  },
  reducers: {
    addMessage(state, action) {
      const { author, message, id } = action.payload;

      state.byIds[id] = { id, author, message };
      state.ids.push(id);
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
