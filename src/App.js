import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { HomePage, MatchListPage, CreateProfilePage, LogInPage, NotFoundPage, SettingsPage, ProfilePage, MatchPage } from './pages/index';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser, fetchDatas } from './redux/requests';
import Cookies from 'js-cookie';
import { setObject } from './redux/objects/actions';
import { NavBar, SignUpForm, ProfileBox, Chat } from './components/index';

import socketIOClient from 'socket.io-client';
import { connectSocket } from './socket/notifications';

const App = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(state => state.objects.currentUser);
  const isLogged = useSelector(state => state.objects.auth);
  // const matches = useSelector(state => state.objects.matches);

  useEffect(() => {
    if (Cookies.get('token')) {
        // dispatch(setObject('auth', true));
        dispatch(fetchCurrentUser());
        // dispatch(fetchDatas('/cibles'));
        dispatch(fetchDatas('/matchs'));
    }
  }, []);

  useEffect(() => {
    if (currentUser) { 
      if (currentUser.pictures && !currentUser.profilePicture) {
        history.push('/create-profile');
      }
      if (currentUser && Cookies.get('token'))
        dispatch(setObject('auth', true));
        dispatch(fetchDatas('/cibles', currentUser.location, currentUser.research_perimeter));
        dispatch(fetchDatas('/notifications'));
    }
  }, [currentUser]);

  useEffect(() => {
    if (isLogged) {
      const socket = socketIOClient('http://localhost:8080');
      connectSocket(socket, currentUser.id, dispatch, fetchDatas);
    }
  }, [isLogged]);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser])

  return (
      <MuiThemeProvider theme={theme}>
      <CssBaseline />
        <div className="App">
          <NavBar />
          {/* <Container maxWidth="lg" id="page-body"> */}
            <Switch>
              <Route path="/" component={HomePage} exact />
              <Route path="/match" component={MatchListPage} />
              <Route path="/logIn" component={LogInPage} />
              <Route path="/signUp" component={SignUpForm} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/settings" component={SettingsPage} />
              <Route path="/create-profile" component={CreateProfilePage} />
              <Route path="/matchProfile/:usrId" component={ProfileBox} />
              <Route path="/accounts/confirm/:token" component={LogInPage} />
              <Route path="/chat/:to_id/:from_id" component={Chat} />
              <Route component={NotFoundPage} />
            </Switch>
          {/* </Container> */}
        </div>
        </MuiThemeProvider>
  );
}

export default App;