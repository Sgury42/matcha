import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteObject } from '../redux/objects/actions';
import PasswdUpdate from '../components/PasswdUpdate';
import { Grid, makeStyles, Snackbar } from '@material-ui/core';
import EmailUpdate from '../components/EmailUpdate';
import LoginUpdate from '../components/LoginUpdate';
import DeleteAccount from '../components/DeleteAccount';
import Cookies from 'js-cookie';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
    width: "100%"
  }
}));

const SettingsPage = () => {

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.objects.currentUser);
  const alert = useSelector(state => state.objects.alert);
  // const isLogged = useSelector(state => state.objects.auth);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (currentUser && !currentUser.profilePicture) {
      history.push('/create-profile');
    }
  }, [])

  useEffect(() => {
    if (!Cookies.get('token')) {
      history.push('/');
    }
  }, []);

  useEffect(() => {
    if (alert) {
      setOpen(true);
    }
  }, [alert]);

  const handleClose = () => {
    setOpen(false);
    dispatch(deleteObject('alert'));
  };

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
      <Snackbar  open={ open } autoHideDuration={6000} transitionDuration={1000} message={ alert } onClose={ handleClose } />
    </Grid>
  );
};

export default SettingsPage;