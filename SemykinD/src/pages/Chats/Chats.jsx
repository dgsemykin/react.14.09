import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import MessageField from '../../components/MessageField/MessageField';
import MessageList from '../../components/MessageList/MessageList';
import Layout from '../../components/Layout';
import { addMessageToState } from '../../actions/chatActions';
import { addMessage } from '../../reducers/messagesReducer';

const styles = theme => ({
  messageField: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    margin: theme.spacing(8),
    padding: theme.spacing(2),
    position: 'relative',
  },
});

class Chats extends Component {
  // componentDidUpdate() {
  //   const lastMessages = this.messages;
  //   if (lastMessages[lastMessages.length - 1]?.author !== 'Bot') {
  //     setTimeout(() => {
  //       this.addMessage({ author: 'Bot', message: 'Отстань от меня!' });
  //     }, 1000);
  //   }
  // }
  // get messages() {
  //   const {
  //     match: {
  //       params: { id },
  //     },
  //     chats,
  //     messages,
  //   } = this.props;
  //
  //   if (id in chats) {
  //     return chats[id].messageList.map(messId => messages[messId]);
  //   }
  //   return [];
  // }

  addMessage = ({ author, message }) => {
    const { id } = this.props.match.params;
    const newId = uuidv4();
    this.setState(({ chats, messages }) => ({
      chats: {
        ...chats,
        [id]: { ...chats[id], messageList: [...chats[id].messageList, newId] },
      },
      messages: { ...messages, [newId]: { id: newId, author, message } },
    }));
  };

  addChat = () => {
    const newId = uuidv4();
    this.setState(({ chats }) => ({
      chats: { ...chats, [newId]: { id: newId, title: `Чат ${newId}`, messageList: [] } },
    }));
  };

  render() {
    const { messages } = this.props;

    return (
      <Layout>
        <MessageList messages={this.messages} />
        <MessageField addMessage={this.addMessage} />
        <button onClick={() => this.props.addMessage()}>add message</button>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  chats: state.chats.byIds,
  messages: state.messages.byIds
});

const mapDispatchToProps = {
  addMessage,
};

// export default withStyless(styles)(Chats);
export default connect(mapStateToProps, mapDispatchToProps)(Chats);
