import React, { Component, createRef } from 'react';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  root: {
    display: 'flex',
    position: 'absolute',
    bottom: '0',
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    width: '100%',
  },
});

class MessageField extends Component {
  state = {
    author: 'User',
    message: '',
  };

  inputRef = createRef();

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { current } = this.inputRef;
    if (current) {
      current.focus();
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { addMessage } = this.props;
    addMessage(this.state);
    this.setState({
      message: '',
    });
  };

  onChange = ({ target }) => {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { classes } = this.props;
    const { message } = this.state;
    return (
      <div>
        <form className={classes.root} id="main" onSubmit={this.onSubmit}>
          <TextField
            className={classes.input}
            name="message"
            label="Message"
            autoComplete="off"
            onChange={this.onChange}
            value={message}
            inputProps={{
              ref: this.inputRef
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<Icon>send</Icon>}
          >
            Send
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(MessageField);
