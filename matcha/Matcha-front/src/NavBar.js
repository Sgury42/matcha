import React from 'react';
import { Link } from 'react-router-dom';
import { Button, AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';


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
  
const NavBarOut = () => {
  const classes = useStyles();

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
          <Link to="/signUp" className={classes.link}>
            <Button className={classes.menuButton} color="secondary" variant="contained">Signup</Button>
          </Link>
          <Link to="/logIn" className={classes.link}>
            <Button className={classes.menuButton} variant="outlined">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBarOut;