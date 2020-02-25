import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDatas } from '../redux/requests';
import { useHistory } from 'react-router-dom';
import { deleteObject } from '../redux/objects/actions';
import { Snackbar } from '@material-ui/core';


const HomePage = (props) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.objects.currentUser);
  const isLogged = useSelector(state => state.objects.auth);
  const alert = useSelector(state => state.objects.alert);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    if (alert) {
      setOpen(true);
    }
  }, [alert]);
  
  useEffect(() => {
    if (isLogged) {
        if (currentUser.pictures && !currentUser.profilePicture) {
          history.push('/create-profile');
        } else 
            dispatch(fetchDatas('/cibles'));
    }
  }, []);

  const handleClose = () => {
    // if (reason === 'clickaway') {
    //   return;
    // }
    setOpen(false);
    dispatch(deleteObject('alert'));
  };
  

  return (
    <Snackbar  open={ open } autoHideDuration={6000} transitionDuration={1000} message={ alert } onClose={ handleClose } />
  );

}

export default HomePage;