import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// import { Container } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import { HomePage, MatchPage, CreateProfilePage, LogInPage, NotFoundPage, SettingsPage, ProfilePage, } from './pages/index';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser, fetchDatas } from './redux/requests';
import Cookies from 'js-cookie';
import { setObject } from './redux/objects/actions';
import { NavBar, SignUpForm, ProfileBox } from './components/index';
// import io from 'socket.io-client';


const App = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(state => state.objects.currentUser);


  useEffect(() => {
    if (Cookies.get('token')) {
      dispatch(fetchCurrentUser());
      dispatch(setObject('auth', true));
      dispatch(fetchDatas('/cibles'));
      dispatch(fetchDatas('/matchs'));
    }
  }, []);

  useEffect(() => {
    if (currentUser.pictures && !currentUser.profilePicture) {
      history.push('/create-profile');
    }
  }, [currentUser]);

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
              <Route path="/match" component={MatchPage} />
              <Route path="/logIn" component={LogInPage} />
              <Route path="/signUp" component={SignUpForm} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/settings" component={SettingsPage} />
              <Route path="/create-profile" component={CreateProfilePage} />
              <Route path="/profile/:usrId" component={ProfileBox} />
              <Route path="/accounts/confirm/:token" component={LogInPage} />
              <Route component={NotFoundPage} />
            </Switch>
          {/* </Container> */}
        </div>
        </MuiThemeProvider>
  );
}

export default App;