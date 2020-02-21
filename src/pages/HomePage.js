import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDatas } from '../redux/requests';
import { useHistory } from 'react-router-dom';

const HomePage = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const isLogged = useSelector(state => state.objects.auth);
  
  useEffect(() => {
    if (isLogged) {
      dispatch(fetchDatas('/cibles'));
    }
  }, []);

  return(null);

}

export default HomePage;