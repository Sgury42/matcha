import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDatas } from '../redux/requests';
import { useHistory } from 'react-router-dom';
import { deleteObject } from '../redux/objects/actions';
import { Snackbar, Grid } from '@material-ui/core';
import { SwipeBox } from '../components/index';
import Cookies from 'js-cookie';



const HomePage = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.objects.currentUser);
  const isLogged = useSelector(state => state.objects.auth);
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
    } else if (currentUser && currentUser.pictures && !currentUser.profilePicture) {
      history.push('/create-profile');
    }
  }, []);
  
  useEffect(() => {
    console.log(cibles);
  }, [cibles]);

  const handleClose = () => {
    setOpen(false);
    dispatch(deleteObject('alert'));
  };
  
  return (
    <>
    <Snackbar  open={ open } autoHideDuration={6000} transitionDuration={1000} message={ alert } onClose={ handleClose } />
    {cibles && 
      <SwipeBox userInfos={cibles[index]} usrId={cibles[index].id} currentUserId={currentUser.id} index={index} />
      //{/* <img src="https://cdn.pixabay.com/photo/2016/10/06/05/19/engagement-1718244_960_720.jpg" width="100%" /> */}
    }
    </>
  );

}

export default HomePage;