import { v4 as uuidv4 } from 'uuid';
import { ADD_MESSAGE, ADD_CHAT } from '../actions/chatActions';

import { addMessage } from './messagesReducer';

const initialState = {
  byIds: {
    1: { id: 1, title: 'Chat 1', messageList: [1, 3] },
    2: { id: 2, title: 'Chat 2', messageList: [2] },
    3: { id: 3, title: 'Chat 3', messageList: [3] },
  },
  ids: [1, 2, 3],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return { ...state };
    case ADD_CHAT: {
      const newId = uuidv4();
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [newId]: { id: newId, title: `Чат ${newId}`, messageList: [] },
        },
        ids: [...state.ids, newId],
      };
    }
    case addMessage.toString():
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
