import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// import { Container } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import { HomePage, MatchPage, CreateProfilePage, LogInPage, NotFoundPage, SettingsPage, ProfilePage } from './pages/index';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser, fetchDatas } from './redux/requests';
import Cookies from 'js-cookie';
import openSocket, { io } from "socket.io-client";
import { setObject } from './redux/objects/actions';
import { NavBar, SignUpForm, ProfileBox, Chat } from './components/index';

const App = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const socket = openSocket('http://localhost:8080');
  const currentUser = useSelector(state => state.objects.currentUser);
  const isLogged = useSelector(state => state.objects.auth);
  // const matches = useSelector(state => state.objects.matches);

  useEffect(() => {
    if (Cookies.get('token')) {
        dispatch(setObject('auth', true));
        dispatch(fetchCurrentUser());
        dispatch(fetchDatas('/cibles'));
        // dispatch(fetchDatas('/matchs'));
    }
  }, []);

  useEffect(() => {
    if (currentUser) { 
      if (currentUser.pictures && !currentUser.profilePicture) {
        history.push('/create-profile');
      }
      socket.on('connect', (socket) => {
        console.log("usr room joined !")
        io.join('USR' + currentUser.id);
      });
    }
  }, [currentUser]);

// console.log(Cookies.get('token'));

  // useEffect(() => {
  //   console.log(matches);
  // }, [matches])

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