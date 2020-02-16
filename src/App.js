import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// import { Container } from '@material-ui/core';
import HomePage from './pages/HomePage';
import { CssBaseline } from '@material-ui/core';
import MatchPage from './pages/MatchPage';
import CreateProfilePage from './pages/CreateProfilePage';
import LogInPage from './pages/LogInPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import NavBar from './components/NavBar';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser, fetchLocation } from './redux/requests';
import { SignUpForm } from './components/index';
import Cookies from 'js-cookie';
import { setObject } from './redux/objects/actions';


const App = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(state => state.objects.currentUser);
  const isLoggedIn = useSelector(state => state.objects.auth);
  const profileStep = useSelector(state => state.objects.profileStep);

  useEffect(() => {
    dispatch(fetchCurrentUser());
    if (currentUser && [!currentUser.latitude || !currentUser.longitude]) {
      dispatch(fetchLocation());
    }
  }, []);

  useEffect(() => {
    if (currentUser.pictures && !currentUser.pictures.length) {
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
              <Route component={NotFoundPage} />
            </Switch>
          {/* </Container> */}
        </div>
        </MuiThemeProvider>
  );
}

export default App;