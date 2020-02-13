import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LogInForm } from '../components/index';

const LogInPage = () => {
  const history = useHistory();
  const isLoggedIn = useSelector(state => state.objects.auth);
  // const currentUser = useSelector(state => state.objects.currentUser);

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  });

  return (
    <LogInForm />
  );
}

export default LogInPage;