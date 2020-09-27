import React from 'react';
import Message from '../Message/Message';
import PropTypes from 'prop-types';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  list: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(9, 2, 11, 2),
    boxSizing: 'border-box',
    height: '100vh',
    overflow: 'scroll',
    width: '100%',
  },
}));

const MessageList = ({ messageList, userName }) => {
  const classes = useStyles();

  return (
    <Container className={classes.list}>
      {messageList.map((message) => (
        <Message key={message.id} message={message} userName={userName} />
      ))}
    </Container>
  );
};

MessageList.propTypes = {
  messageList: PropTypes.array.isRequired,
  userName: PropTypes.string.isRequired,
};

export default MessageList;
