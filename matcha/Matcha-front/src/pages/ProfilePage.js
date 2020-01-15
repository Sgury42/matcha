import React from 'react';
import Imageupload from '../components/ImageUpload';
import BioUpload from '../components/BioUpload';
import HashtagsUpload from '../components/HashtagsUpload';
import OrientationUpload from '../components/OrientationUpload';
import SlidersOption from '../components/SlidersOptions';
import { Grid } from '@material-ui/core';

const UserPage = () => {
  return (
    <Grid container justify='space-evenly'>
      <Grid item xs={12}>
          <Grid container justify="space-evenly" wrap="wrap">
          <Grid container xs={12} spacing={5}>
            <Grid item xs={12} md={8}>
              <Imageupload />
            </Grid>
            <Grid container xs={12} md={4} align="flex-start">
            <Grid item xs={12}>
                <OrientationUpload />
            </Grid>
            <Grid item xs={12}>
              <SlidersOption />
            </Grid>
          </Grid>
          </Grid>
          <Grid item xs={12}>
              <BioUpload />
            </Grid>
          <Grid item xs={12} >
            <HashtagsUpload />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UserPage;