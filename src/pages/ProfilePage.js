import React from 'react';
import { useSelector } from 'react-redux';
import PictureUpload from '../components/PictureUpload';
// import { DescriptionUpload } from '../components/index';
import DescriptionUpload from '../components/DescriptionUpload';
import HashtagsUpload from '../components/HashtagsUpload';
import OrientationUpload from '../components/OrientationUpload';
import SlidersOptions from '../components/SlidersOptions';
import Location from '../components/Location'
import { Grid, Card,  } from '@material-ui/core';
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
      <Grid item md={11} lg={10}>
        <Grid container justify="space-evenly" wrap="wrap" alignItems="stretch">
          <Grid item md={12} lg={7}>
              <PictureUpload pictures={ currentUser.pictures } profilePicture={ currentUser.profilePicture } />
          </Grid>
          <Grid item md={12} lg={4} >
            <Card>
              <OrientationUpload gender={ currentUser.gender } research_gender={ currentUser.research_gender } />
              <Location />
              <SlidersOptions research_perimeter={ currentUser.research_perimeter } research_ageMin={ currentUser.research_age_min }
                research_ageMax={ currentUser.research_age_max } />
            </Card>
          </Grid>
          <Grid item xs={12} >
          <DescriptionUpload description={ currentUser.description } />
            <HashtagsUpload usrHashtags={ currentUser.hashtags } />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfilePage;
