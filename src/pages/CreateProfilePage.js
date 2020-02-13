import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { PictureUpload, BioUpload, HashtagsUpload, OrientationUpload, SlidersOptions } from '../components/index';

const CreateProfilePage = () => {

  // const steps = ["register", "pictures", "description", "hashtags", "orientationAndpreferences"];
  const history = useHistory();
  const step = useSelector(state => state.objects.profileStep);
  const isLoggedIn = useSelector(state => state.objects.auth);
  const currentUser = useSelector(state => state.objects.currentUser);

  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/');
    }
  })

  switch(step) {

    case 'picture': {
        return (
          <Grid container spacing={1} justify="center">
            <Grid item xs={12} sm={10} md={8} lg={6}>
              <PictureUpload pictures={ currentUser.pictures } />
            </Grid>
          </Grid>
        );
      }

    case 'description': {
      return (
        <Grid container spacing={1} justify="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <BioUpload createProfile='true' description={ currentUser.description } />
          </Grid>
        </Grid>
      );
    }

    case 'hashtags': {
      return (
        <HashtagsUpload />
      );
    }

    case 'orientationAndpreferences': {
      return (
        <>
        <OrientationUpload />
        <SlidersOptions />
        </>
      );
    }

    default:
      return (
        <Grid container spacing={1} justify="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <PictureUpload pictures={ currentUser.pictures } />
          </Grid>
        </Grid>
      );
  }
}

export default CreateProfilePage;