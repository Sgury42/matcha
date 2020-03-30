import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchDatas } from '../redux/requests';
import { deleteObject } from '../redux/objects/actions';
import MatchListBox from '../components/MatchListBox';
import { Grid, Snackbar, Typography } from '@material-ui/core';
import Cookies from 'js-cookie';


const MatchListPage = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const matches = useSelector(state => state.objects.cibles);   //!!!!!!!!!!!!!make sure matches are displayed
  const currentUser = useSelector(state => state.objects.currentUser);
  const alert = useSelector(state => state.objects.alert);
  const [open, setOpen] = useState(false);

  
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

  useEffect(() => {
    if (currentUser && !currentUser.profilePicture) {
      history.push('/create-profile');
    }
  }, [])

  const MapMatches = () => {
    if (matches.length) {
      return (
        matches.map((match, key) =>
          <Grid item lg={2} md={4} sm={5} xs={11} key={key}>
            <MatchListBox match={match} currentUserId={currentUser.id} />
          </Grid>
        )
      );
    } else
    return null;
  }

  return (
    <Grid container spacing={1} justify='space-evenly'>
    {matches && matches.length ?
      matches && currentUser && <MapMatches />
      :
      <Typography variant="h4">You don't have any match yet !</Typography>
    }
      <Snackbar  open={ open } autoHideDuration={6000} transitionDuration={1000} message={ alert } onClose={ handleClose } />
    </Grid>
  );
}

export default MatchListPage;