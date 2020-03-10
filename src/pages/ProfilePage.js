import React, { useEffect }from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PictureUpload from '../components/PictureUpload';
import { fetchDatas } from '../redux/requests';
// import { DescriptionUpload } from '../components/index';
import DescriptionUpload from '../components/DescriptionUpload';
import HashtagsUpload from '../components/HashtagsUpload';
import OrientationUpload from '../components/OrientationUpload';
import SlidersOptions from '../components/SlidersOptions';
import Location from '../components/Location'
import { Grid, Card,  } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';



const ProfilePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.objects.currentUser);

  useEffect(() => {
    if (!Cookies.get('token')) {
      history.push('/');
    }
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.pictures && !currentUser.profilePicture)
      history.push('/create-profile');
  }, [currentUser]);

  return (
    <Grid container justify='space-evenly'>
      <Grid item md={11} lg={10}>
        <Grid container justify="space-evenly" wrap="wrap" alignItems="stretch">
          <Grid item md={12} lg={7}>
              {currentUser && <PictureUpload pictures={ currentUser.pictures } profilePicture={ currentUser.profilePicture } />}
          </Grid>
          <Grid item md={12} lg={4} >
            <Card>
              {currentUser && <OrientationUpload gender={ currentUser.gender } research_gender={ currentUser.research_gender } />}
              {currentUser && <Location latitude={ currentUser.location.latitude } longitude={ currentUser.location.longitude } />}
              {currentUser && <SlidersOptions research_perimeter={ currentUser.research_perimeter } research_ageMin={ currentUser.research_age_min }
              research_ageMax={ currentUser.research_age_max } />}
            </Card>
          </Grid>
          <Grid item xs={12} >
          {currentUser && <DescriptionUpload description={ currentUser.description } />}
            {currentUser && <HashtagsUpload usrHashtags={ currentUser.hashtags } />}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfilePage;
