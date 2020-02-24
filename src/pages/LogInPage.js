import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteObject } from '../redux/objects/actions';
import { useHistory } from 'react-router-dom';
import { LogInForm } from '../components/index';
import { Snackbar } from '@material-ui/core';
import { confirmEmail } from '../redux/requests';

const LogInPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.objects.auth);
  const alert = useSelector(state => state.objects.error);
  const [open, setOpen] = useState(false);

  // const currentUser = useSelector(state => state.objects.currentUser);

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  });

  useEffect(() => {
    if (alert) {
      setOpen(true);
    }
  }, [alert]);

  const handleClose = () => {
    // if (reason === 'clickaway') {
    //   return;
    // }
    setOpen(false);
    dispatch(deleteObject('error'));
  };

  if (props.match.params.token) {
    dispatch(confirmEmail(props.match.params.token));
  }

  return (
    <>
      <LogInForm />
      <Snackbar  open={ open } autoHideDuration={6000} transitionDuration={1000} message={ alert } onClose={ handleClose } />
    </>
  );
}

export default LogInPage;