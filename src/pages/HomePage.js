import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteObject, setObject } from '../redux/objects/actions';
import { Snackbar, Typography } from '@material-ui/core';
import { SwipeBox } from '../components/index';
import Cookies from 'js-cookie';


const HomePage = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.objects.currentUser);
  const alert = useSelector(state => state.objects.alert);
  const cibles = useSelector(state => state.objects.cibles);
  const index = useSelector(state => state.objects.index);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    if (alert) {
      setOpen(true);
    }
  }, [alert]);

  useEffect(() => {
    if (!Cookies.get('token')) {
      history.push('/');
    } else if (currentUser && !currentUser.profilePicture) {
      history.push('/create-profile');
    }
  }, []);


  useEffect(() => {
    if (cibles && index >= cibles.length)
      dispatch(setObject('index', 0));
  }, [index, cibles, dispatch]);

  const handleClose = () => {
    setOpen(false);
    dispatch(deleteObject('alert'));
  };
  
  return (
    <>
    <Snackbar  open={ open } autoHideDuration={6000} transitionDuration={1000} message={ alert } onClose={ handleClose } />
    {Cookies.get('token') ?
    cibles && cibles[index] && currentUser && cibles.length ?
      <SwipeBox userInfos={cibles[index]} usrId={cibles[index].id} currentUser={currentUser} index={index} />
      :
      <Typography variant="h4" align="center">Nobody's around !</Typography>
      :
      <img src="https://cdn.pixabay.com/photo/2016/10/06/05/19/engagement-1718244_960_720.jpg" alt="background_picture" width="100%" />
    }
    </>
  );

}

export default HomePage;