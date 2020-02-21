import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// import { Container } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import { HomePage, MatchPage, CreateProfilePage, LogInPage, NotFoundPage, SettingsPage, ProfilePage, } from './pages/index';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser, fetchLocation } from './redux/requests';
import Cookies from 'js-cookie';
import { setObject } from './redux/objects/actions';
import { NavBar, SignUpForm, ProfileBox } from './components/index';


const App = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(state => state.objects.currentUser);
  const isLoggedIn = useSelector(state => state.objects.auth);
  const profileStep = useSelector(state => state.objects.profileStep);

  useEffect(() => {
    console.log(Cookies.get('token'));
    dispatch(fetchCurrentUser());
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
          {/* <ProfileBox /> */}
          {/* <Container maxWidth="lg" id="page-body"> */}
            <Switch>
              <Route path="/" component={HomePage} exact />
              <Route path="/match" component={MatchPage} />
              <Route path="/logIn" component={LogInPage} />
              <Route path="/signUp" component={SignUpForm} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/settings" component={SettingsPage} />
              <Route path="/create-profile" component={CreateProfilePage} />
              <Route path="/:usrId" component={ProfileBox} />
              <Route component={NotFoundPage} />
            </Switch>
          {/* </Container> */}
        </div>
        </MuiThemeProvider>
  );
}

export default App;