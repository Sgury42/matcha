import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { SignUpForm, PictureUpload, BioUpload, HashtagsUpload, OrientationUpload, SlidersOptions } from '../components/index';

const SignUpPage = () => {

  // const steps = ["register", "pictures", "description", "hashtags", "orientationAndpreferences"];
  const step = useSelector(state => state.objects.signUpStep);

  console.log(step);

  switch(step) {
    case 'register': {
      return (
        <SignUpForm />
      )
    }

    case 'picture': {
        return (
          <Grid container spacing={1} justify="center">
            <Grid item xs={12} sm={10} md={8} lg={6}>
              <PictureUpload />
            </Grid>
          </Grid>
        );
      }

    case 'description': {
      return (
        <BioUpload />
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
        <SignUpForm />
      )
  }
}

export default SignUpPage;