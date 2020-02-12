import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { CssBaseline } from '@material-ui/core';
import MatchPage from './pages/MatchPage';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
// import BioUpload from './components/BioUpload';
// import HashtagsUpload from './components/HashtagsUpload';
// import SlidersOptions from './components/SlidersOptions';
// import OrientationUpload from './components/OrientationUpload';
import NavBar from './components/NavBar';
// import ProfileBox from './components/ProfileBox';

class App extends Component {
  render() {
    return (
       <Router>
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
                <Route path="/signUp" component={SignUpPage} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/settings" component={SettingsPage} />
                <Route component={NotFoundPage} />
              </Switch>
            {/* </Container> */}
          </div>
         </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;