import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchDatas } from '../redux/requests';
import MatchListBox from '../components/MatchListBox';
import { Grid } from '@material-ui/core';
import Cookies from 'js-cookie';


const MatchPage = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const matches = useSelector(state => state.objects.matches);       /// !!!!!!!!!!!!!!!!!change for matches !!!!!!!!!!!!!!
  const currentUser = useSelector(state => state.objects.currentUser);
  
  useEffect(() => {
    if (!Cookies.get('token')) {
      history.push('/');
    }
  }, []);

  useEffect(() => {
    if (currentUser.pictures && !currentUser.profilePicture) {
      history.push('/create-profile');
    }
  }, [])

  useEffect(() => {
    // dispatch(fetchDatas('/matchs'));
  }, []);

  useEffect(() => {
    console.log(matches);
  }, [matches]);

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
      <MapMatches />
    </Grid>
  );
}

export default MatchPage;