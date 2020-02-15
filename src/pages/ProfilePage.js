import React from 'react';
import { useSelector } from 'react-redux';
import PictureUpload from '../components/PictureUpload';
// import { DescriptionUpload } from '../components/index';
import DescriptionUpload from '../components/DescriptionUpload';
import HashtagsUpload from '../components/HashtagsUpload';
import OrientationUpload from '../components/OrientationUpload';
import SlidersOption from '../components/SlidersOptions';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';


const ProfilePage = () => {
  const history = useHistory();
  const isLoggedIn = useSelector(state => state.objects.auth);
  const currentUser = useSelector(state => state.objects.currentUser);

  if (!isLoggedIn) {
    history.push('/');
  }


  return (
    <Grid container justify='space-evenly'>
      <Grid item xs={11} md={10} lg={9}>
          <Grid container justify="space-evenly" wrap="wrap">
          <Grid container xs={12} md={8} spacing={5}>
            <Grid item xs={12}>
              <PictureUpload />
            </Grid>
            <Grid item xs={12}>
              <DescriptionUpload description={ currentUser.description } />
            </Grid>
          </Grid>
          <Grid container xs={12} md={4} align="flex-start">
            <Grid item xs={12}>
                <OrientationUpload />
            </Grid>
            <Grid item xs={12}>
              <SlidersOption />
            </Grid>
          </Grid>
          <Grid item xs={12} >
            <HashtagsUpload usrHashtags={ currentUser.hashtags } />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfilePage;
