import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { CssBaseline, Container } from '@material-ui/core' 
import SignUpPage from './pages/signUp/SignUpPage';
import LogInPage from './pages/LogInPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import NavBarOut from './NavBar';
// import BioUpload from './components/BioUpload';
// import HashtagsUpload from './components/HashtagsUpload';
import OrientationUpload from './components/OrientationUpload';
// import NavBar2 from './NavBar2'

class App extends Component {
  render() {
    return (
       <Router>
       <MuiThemeProvider theme={theme}>
        <CssBaseline />
          <div className="App">
            <NavBarOut />
            <OrientationUpload />
            {/* <NavBar2 /> */}
            <Container maxWidth="md" id="page-body">
              <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/logIn" component={LogInPage} />
                <Route path="/signUp" component={SignUpPage} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/settings" component={SettingsPage} />
                <Route component={NotFoundPage} />
              </Switch>
            </Container>
          </div>
         </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;