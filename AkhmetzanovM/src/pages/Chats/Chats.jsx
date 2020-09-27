import React, { Component } from 'react';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';

import MessageList from '../../components/MessageList/MessageList';
import FormMessage from '../../components/FormMessage';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import ChatList from '../../components/ChatList/ChatList';
import { Container } from '@material-ui/core';

class Chats extends Component {
  state = {
    chatList: {
      1: { id: 1, title: 'Chat 1', messageIdList: [1] },
      2: { id: 2, title: 'Chat 2', messageIdList: [2] },
    },
    messageList: {
      1: { id: 1, author: 'BOT', messageText: 'Тут никого нет' },
      2: { id: 2, author: 'BOT', messageText: 'Тут тоже никого нет' },
    },
    userName: 'Bob',
  };

  /**
   * Получение списка сообщений текущего чата
   */
  get messageList() {
    const { id } = this.props.match.params;
    const { chatList, messageList } = this.state;
    if (id in chatList) {
      return chatList[id].messageIdList.map((messageId) => messageList[messageId]);
    }
    return [];
  }

  /**
   * Получение списка чатов
   */
  get chatList() {
    const { chatList } = this.state;
    return Object.values(chatList);
  }

  /**
   * Добавляет сообщение в общий список
   * @param {String} message
   */
  addMessage = (messageText) => {
    const { id } = this.props.match.params;
    const newId = v4();

    this.setState(({ chatList, messageList, userName }) => ({
      chatList: {
        ...chatList,
        [id]: { ...chatList[id], messageIdList: [...chatList[id].messageIdList, newId] },
      },
      messageList: { ...messageList, [newId]: { id: newId, author: userName, messageText: messageText } },
    }));
  };

  /**
   * Добавляет новый пустой чат в список
   */
  addChat = () => {
    const newId = v4();
    console.log(this.state.chatList);

    this.setState(({ chatList }) => ({
      chatList: {
        ...chatList,
        [newId]: { id: newId, title: `New chat `, messageIdList: [] },
      },
    }));
  };

  /**
   * Автоответ бота
   */
  answerToMessage = () => {
    const { id } = this.props.match.params;
    const newId = v4();

    this.setState(({ chatList, messageList, userName }) => ({
      chatList: {
        ...chatList,
        [id]: { ...chatList[id], messageIdList: [...chatList[id].messageIdList, newId] },
      },
      messageList: {
        ...messageList,
        [newId]: { id: v4(), author: 'BOT', messageText: `${userName}, в чате больше никого нет. Кому ты пишешь?` },
      },
    }));
  };

  /**
   * Проверяет, чьё сообщение было последним и если это не бот, то запускает родительский метод автоответа
   */
  componentDidUpdate() {
    const { messageList } = this;
    if (messageList.length > 0 && messageList[messageList.length - 1].author != 'BOT') {
      this.answerToMessage(messageList[messageList.length - 1].author);
    }
  }

  render() {
    const { userName, chatList } = this.state;
    const { id } = this.props.match.params;
    const { addChat, addMessage } = this;
    return (
      <Layout>
        <ChatList chatList={this.chatList} addChat={addChat} />
        {id in chatList ? (
          <>
            <Header chatTitle={chatList[id].title} />
            <MessageList messageList={this.messageList} userName={userName} />
            <FormMessage addMessage={addMessage} />
          </>
        ) : (
          <Container>
            <h1>Выберите чат</h1>
          </Container>
        )}
      </Layout>
    );
  }
}

Chats.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Chats;
