import React from 'react';
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

  return (
    <Grid container spacing={1} justify="center">
      <Grid item lg={3} md={5} xs={11}>
        <PasswdUpdate />
      </Grid>
      <Grid item lg={3} md={5} xs={11}>
        <EmailUpdate />
      </Grid>
      <Grid item lg={3} md={5} xs={11}>
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