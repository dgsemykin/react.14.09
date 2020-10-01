import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
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

export const asyncAddMessage = payload => (dispatch, getState) => {
  const { author, chatId } = payload;

  if (author !== BOT_NAME) {
    setTimeout(() => {
      dispatch(
        addMessage({ author: BOT_NAME, message: 'Привет от бота', chatId, id: uuidv4() }),
      );
    }, 500);
  }

  dispatch(addMessage(payload));
};

export default messagesSlice.reducer;
