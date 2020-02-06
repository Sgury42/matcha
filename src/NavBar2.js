import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, makeStyles, IconButton } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import PowerSettingsNewOutlinedIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';

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
  titleLink: {
      textDecoration: 'none',
      color: 'inherit',
  },
}));

const NavBar2 = () => {
    const classes = useStyles();
    

    const logOut = async () => {
        //log out user !
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
                    <Link to="/" onClick={() => logOut()}>
                      <IconButton aria-label="LogOut">
                        <PowerSettingsNewOutlinedIcon color='secondary' fontSize='large' />
                      </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
);
}

export default NavBar2;