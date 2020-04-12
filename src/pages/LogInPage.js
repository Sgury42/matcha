import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteObject } from '../redux/objects/actions';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { LogInForm } from '../components/index';
import { Snackbar } from '@material-ui/core';
import { confirmEmail } from '../redux/requests';

const LogInPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useSelector(state => state.objects.alert);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (Cookies.get('token')) {
      history.push('/profile');
    }
  }, []);

  useEffect(() => {
    if (alert) {
      setOpen(true);
    }
  }, [alert]);

  const handleClose = () => {
    setOpen(false);
    dispatch(deleteObject('alert'));
  };

  useEffect (() => {
    if (props.match.params.token) {
      dispatch(confirmEmail(props.match.params.token));
    }
  })


  return (
    <>
      <LogInForm />
      <Snackbar  open={ open } autoHideDuration={5000} transitionDuration={1000} message={ alert } onClose={ handleClose } />
    </>
  );
}

export default LogInPage;