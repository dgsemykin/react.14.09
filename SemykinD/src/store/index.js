// import { createStore } from 'redux';
// import rootReducer from '../reducers';
//
// const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// );
//
// export default store;

import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../reducers/chatReducer';
import messagesReducer from '../reducers/messagesReducer';

export default configureStore({
  reducer: {
    chats: chatReducer,
    messages: messagesReducer,
  },
});
