import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import MessageField from '../../components/MessageField/MessageField';
import MessageList from '../../components/MessageList/MessageList';
import Layout from '../../components/Layout';
import { addMessageToState } from '../../actions/chatActions';
import { addMessage } from '../../reducers/messagesReducer';
import {getCurrentMessages} from "../../selectors/chatsSelectors";

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
  submitMessage = ({ author, message }) => {
    const {
      addMessage,
      match: {
        params: {id},
      },
    } = this.props;
    addMessage({ author, message, chatId: id, id: uuidv4() });

  };

  render() {
    const { messages } = this.props;

    return (
      <Layout>
        <MessageList messages={messages} />
        <MessageField addMessage={this.submitMessage} />
      </Layout>
    );
  }
}

const mapStateToProps = (state, ownProps) =>{
  const {
    match: {
      params: { id },
    },
    chats,
    messages,
  } = ownProps;
  return {
    messages: getCurrentMessages(state, id)
  }
};

const mapDispatchToProps = {
  addMessage,
};

// export default withStyless(styles)(Chats);
export default connect(mapStateToProps, mapDispatchToProps)(Chats);
