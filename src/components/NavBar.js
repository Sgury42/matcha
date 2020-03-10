import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import openSocket from "socket.io-client";
import { Button, AppBar, Toolbar, Typography, makeStyles, IconButton, Badge } from '@material-ui/core';
import { resetApp } from '../redux/objects/actions';
import Cookies from 'js-cookie';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import PowerSettingsNewOutlinedIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import NotificationsNoneRoundedIcon from '@material-ui/icons/NotificationsNoneRounded';
import { disconnect } from '../redux/requests';


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
  title: {
    flexGrow: 1,
  },
  link: {
      textDecoration: 'none',
  },
  titleLink: {
    textDecoration: 'none',
    color: 'inherit',
},
}));
  
const NavBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const socket = openSocket('http://localhost:8080');

  // const isLoggedIn = useSelector(state => state.objects.auth);
  const notifications = useSelector(state => state.objects.notifications);

  // socket.on('test', (msg) => {console.log(msg)});

  const logOut = () => {
    dispatch(disconnect());
    Cookies.remove('token');
    dispatch(resetApp());
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
                  <IconButton aria-label="notifications">
                    <Badge badgeContent={notifications.length ? notifications.length : "0"} color="secondary" overlap="circle">
                      <NotificationsNoneRoundedIcon color='primary' fontSize='large' />
                    </Badge>
                  </IconButton>
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