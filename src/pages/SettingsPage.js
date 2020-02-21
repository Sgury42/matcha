import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {useSelector } from 'react-redux';
import PasswdUpdate from '../components/PasswdUpdate';
import { Grid, makeStyles } from '@material-ui/core';
import EmailUpdate from '../components/EmailUpdate';
import LoginUpdate from '../components/LoginUpdate';
import DeleteAccount from '../components/DeleteAccount';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
    width: "100%"
  }
}));

const SettingsPage = () => {

  const classes = useStyles();
  const history = useHistory();
  const currentUser = useSelector(state => state.objects.currentUser);

  useEffect(() => {
    if (currentUser.pictures && !currentUser.profilePicture) {
      history.push('/create-profile');
    }
  }, [])

  return (
    <Grid container spacing={5} justify="center" alignItems="stretch">
      <Grid item md={3} xs={11}>
        <PasswdUpdate />
      </Grid>
      <Grid item md={3} xs={11}>
        <EmailUpdate />
      </Grid>
      <Grid item md={3} xs={11}>
        <LoginUpdate />
      </Grid>
      <div className={classes.grow} />
      <Grid item xs={11}>
        <DeleteAccount />
      </Grid>
    </Grid>
  );
};

export default SettingsPage;