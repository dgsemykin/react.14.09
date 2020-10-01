/* eslint-disable no-shadow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
// import produce from 'immer';
import { connect } from 'react-redux';
import MessageList from '../../components/MessageList';
import FormMessage from '../../components/FormMessage';
import Layout from '../../components/Layout/Layout';
import { addMessage } from '../../reducers/messagesReducer';
import { getCurrentMessages } from '../../selectors/chatsSelectors';

class Chats extends Component {
  // componentDidUpdate() {
  //   const lastMessages = this.messages;

  //   if (lastMessages[lastMessages.length - 1]?.author !== 'Bot') {
  //     setTimeout(() => {
  //       this.addMessage({ author: 'Bot', message: 'привет, я бот' });
  //     }, 500);
  //   }
  // }

  submitMessage = ({ author, message }) => {
    const {
      addMessage,
      match: {
        params: { id },
      },
    } = this.props;
    addMessage({ author, message, chatId: id, id: uuidv4() });
  };

  render() {
    const { messages } = this.props;

    return (
      <Layout>
        <MessageList messages={messages} />
        <FormMessage addMessage={this.submitMessage} />
      </Layout>
    );
  }
}

Chats.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
  messages: PropTypes.arrayOf(PropTypes.any).isRequired,
  addMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { id },
    },
  } = ownProps;
  return {
    messages: getCurrentMessages(state, id),
  };
};

const mapDispatchToProps = {
  addMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chats);
