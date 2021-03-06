import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Card, IconButton } from '@material-ui/core';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
import { PictureUpload, DescriptionUpload, HashtagsUpload, OrientationUpload, SlidersOptions, Location } from '../components/index';
import { setObject } from '../redux/objects/actions';
import Cookies from 'js-cookie';


const CreateProfilePage = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const step = useSelector(state => state.objects.profileStep);
  const currentUser = useSelector(state => state.objects.currentUser);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!Cookies.get('token'))
      history.push('/');
  });

  useEffect(() => {
    if (currentUser) {
      setDataLoaded(true);
    }
  }, [currentUser]);

  useEffect(() => {
    if (dataLoaded && currentUser && currentUser.profilePicture)
      history.push('/profile');
  }, [dataLoaded]);

  const handleClick = () => {
    dispatch(setObject('profileStep', false));
    history.push('/profile');
  }

  switch(step) {

    case 'picture': {
        return (
          <Grid container spacing={1} justify="center">
            <Grid item xs={12} sm={10} md={8} lg={6}>
              {currentUser && <PictureUpload pictures={ currentUser.pictures } profilePicture={ currentUser.profilePicture } />}
            </Grid>
          </Grid>
        );
      }

    case 'description': {
      return (
        <Grid container spacing={1} justify="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            { currentUser && <DescriptionUpload createProfile='true' description={ currentUser.description } />}
          </Grid>
        </Grid>
      );
    }

    case 'hashtags': {
      return (
        <Grid container spacing={1} justify="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            {currentUser && <HashtagsUpload createProfile='true' usrHashtags={ currentUser.hashtags } />}
          </Grid>
        </Grid>
      );
    }

    case 'orientationAndpreferences': {
      return (
        <Grid container spacing={1} justify="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Card>
              {currentUser && <OrientationUpload gender={ currentUser.gender } research_gender={ currentUser.research_gender } />}
              {currentUser && <Location latitude={ currentUser.latitude } longitude={ currentUser.longitude } />}
              {currentUser && <SlidersOptions research_perimeter={ currentUser.research_perimeter } research_ageMin={ currentUser.research_age_min }
                research_ageMax={ currentUser.research_age_max } />}
              <Grid item align='center'>
                <IconButton name="next" onClick={ handleClick }>
                  <ChevronRightSharpIcon color="secondary" />
                </IconButton>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      );
    }

    default:
      return (
        <Grid container spacing={1} justify="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            {currentUser && <PictureUpload pictures={ currentUser.pictures } />}
          </Grid>
        </Grid>
      );
  }
}

export default CreateProfilePage;