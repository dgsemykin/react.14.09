import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import cn from 'classnames';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { addChatToState } from '../../actions/chatActions';

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  secondList: {
    marginTop: 'auto',
  },
  active: {
    textDecoration: 'none',
  },
}));

const ChatList = () => {
  const classes = useStyles();

  const chats = useSelector(store => store.chats.byIds);
  const dispatch = useDispatch();

  const addChat = () => {
    dispatch(addChatToState());
  };

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: cn(classes.drawerPaper),
      }}
      open
    >
      <div className={classes.toolbarIcon}>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {Object.values(chats).map(({ id, title }) => (
          <NavLink key={id} to={`/chats/${id}`} activeClassName={classes.active}>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Button onClick={addChat}>Add Chat</Button>
      <Divider className={classes.secondList} />
      <List>
        <ListSubheader inset>Saved reports</ListSubheader>
        <Link to="/about">
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default ChatList;
