import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, AppBar, Toolbar, Typography, makeStyles, IconButton, Badge, Drawer } from '@material-ui/core';
import { resetApp } from '../redux/objects/actions';
import { disconnect, updateProfile, fetchDatas } from '../redux/requests';
import Cookies from 'js-cookie';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import PowerSettingsNewOutlinedIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import NotificationsNoneRoundedIcon from '@material-ui/icons/NotificationsNoneRounded';
import socketIOClient from 'socket.io-client';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
      textDecoration: 'none',
  },
  titleLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  newNotif: {
    margin: 20,
    padding: 20,
    backgroundColor: 'rgb(211, 47, 47, 0.2)',
    borderRadius: 10,
    border: '1px solid rgb(211, 47, 47)'
  },
  oldNotif: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    border: '1px solid rgb(211, 47, 47)'
  }
}));
  
const NavBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [drowerIsOpen, setDrowerIsOpen] = useState(false);
  const notifications = useSelector(state => state.objects.notifications);
  const currentUser = useSelector(state => state.objects.currentUser);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    let count = 0;
    notifications.forEach((notif) => {
      if (notif.status) {
        count++;
      }
    })
    setNotificationCount(count);
  }, [notifications]);

  const notifCount = () => {
    let count = 0;
    notifications.forEach((notif) => {
      if (notif.status) {
        count++;
      }
    })
    setNotificationCount(count);
  }

  const logOut = () => {
    dispatch(disconnect());
    Cookies.remove('token');
    dispatch(resetApp());
    const socket = socketIOClient('http://localhost:8080');
    socket.close();
  }

  const handleClick = () => {
    setDrowerIsOpen(true);
    dispatch(updateProfile('/notifications/read', {id: currentUser.id}));
    dispatch(fetchDatas('/notifications'));
    notifCount();
  }

  const list = () => {
    return (
      notifications.map((notif, key) =>
      <div key={key}>
      {notif.status ?
        <div key={key} className={classes.newNotif}>
          <Typography variant="body1" key={key}>
            {notif.message}
          </Typography>
        </div>
        :
        <div key={key} className={classes.oldNotif}>
          <Typography variant="body1" key={key}>
            {notif.message}
          </Typography>
        </div>
        }
      </div>
      )
    )
  }

    return (
      <div className={classes.root}>
          <AppBar position="static" color="default">
              <Toolbar>
                <Link to="/" className={classes.titleLink}>
                  <Typography variant="h6" className={classes.title}>
                      Matcha !
                  </Typography>
                </Link>
                <div className={classes.grow} />
                {Cookies.get('token') ?
                <React.Fragment>
                  <Link to="/match">
                    <IconButton aria-label="match">
                      <FavoriteTwoToneIcon color="secondary" fontSize="large" />
                    </IconButton>
                  </Link>
                  <Link to="/profile">
                    <IconButton aria-label="profile">
                      <AccountCircleOutlinedIcon color='primary' fontSize='large' />
                    </IconButton>
                  </Link>
                  <Link to="/settings">
                    <IconButton aria-label="settings">
                      <SettingsOutlinedIcon color='primary' fontSize='large' />
                    </IconButton>
                  </Link>
                  <IconButton aria-label="notifications" onClick={handleClick}>
                    <Badge badgeContent={notificationCount} color="secondary" overlap="circle">
                      <NotificationsNoneRoundedIcon color='primary' fontSize='large' />
                    </Badge>
                  </IconButton>
                  <Drawer anchor='right' open={drowerIsOpen} onClose={() => setDrowerIsOpen(false)}>
                    {list()}
                  </Drawer>
                  <Link to="/" onClick={() => logOut()}>
                    <IconButton aria-label="LogOut">
                      <PowerSettingsNewOutlinedIcon color='secondary' fontSize='large' />
                    </IconButton>
                  </Link>
                </React.Fragment>
                :
                <React.Fragment>
            <Link to="/signUp" className={classes.link}>
              <Button className={classes.menuButton} color="secondary" variant="contained">Signup</Button>
            </Link>
            <Link to="/logIn" className={classes.link}>
              <Button className={classes.menuButton} variant="outlined">Login</Button>
            </Link>
            </React.Fragment>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
}

export default NavBar;