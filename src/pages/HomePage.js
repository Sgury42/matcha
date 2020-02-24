import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDatas } from '../redux/requests';
import { useHistory } from 'react-router-dom';

const HomePage = (props) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.objects.currentUser);
  const isLogged = useSelector(state => state.objects.auth);
  
  useEffect(() => {
    if (isLogged) {
        if (currentUser.pictures && !currentUser.profilePicture) {
          history.push('/create-profile');
        } else 
            dispatch(fetchDatas('/cibles'));
    }
  }, []);
  

  return(null);

}

export default HomePage;