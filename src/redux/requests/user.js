import axios from 'axios';
import { setObject, updateObject } from '../objects/actions';
import Cookies from 'js-cookie';

export const sendReq = (route, form) => {
  return (dispatch) => {
    axios.post('http://localhost:8080' + route, form, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
    })
    .then(function (response) {
      switch(route) {
        case '/accounts/login/':
          dispatch(setObject('auth', true));
          Cookies.set('token', response.data.token);
          dispatch(fetchCurrentUser());
          break ;
        case '/accounts/register/':
          dispatch(setObject('alert', 'Check your mail box !'));
          dispatch(setObject('status', 'registrationOK'));
          break ;
        case '/accounts/forgotPasswd':
          dispatch(setObject('alert', 'Check your mail box !'));
          break ;
      }
    })
    .catch(function (error) {
      switch(route) {
        case '/accounts/login/':
          if (error.response.status === 404 || error.response.status === 403)
            dispatch(setObject('alert', 'Are you sure you already have an account?'));
          else
            console.log('test');
            dispatch(setObject('alert', 'Oups try again !'));
          break ;
        case '/accounts/register/':
          if (error.response)
            dispatch(setObject('alert', error.response.data ? error.response.data : "Oups something went wrong !"));
            break ;
        case '/accounts/forgotPasswd':
          dispatch(setObject('alert', 'Oups something went wrong !'))
          break ;
      }
    })
  }
}

export const fetchCurrentUser = () => {
  return (dispatch) => {
    if (!Cookies.get('token')) {
      return dispatch(setObject('auth', false));
    }
    axios.get('http://localhost:8080/accounts/params/', {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "token": Cookies.get('token')
      }
    })
    .then(function (response) {
      dispatch(setObject('currentUser', response.data[0]));
      dispatch(setObject('auth', true));
      axios.get('http://localhost:8080/accounts/getProfilePicture/', {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "token": Cookies.get('token')
        }
      })
      .then(function (response) {
        if (response.data[0]) {
          dispatch(updateObject('currentUser', { profilePicture: response.data[0].url_picture }));
        }
        axios.get('http://localhost:8080/accounts/pictures', {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "token": Cookies.get('token')
          }
        })
        .then(function (response) {
          dispatch(updateObject('currentUser', { pictures: response.data} ));
        })
        .catch(function (error) {
          console.log(error);
        })
      })
      .catch(function (error) {
        console.log(error);
      })
    })
    .catch(function (error) {
      console.log(error);
      dispatch(setObject('auth', false));
    })
  }
}

export const fetchLocation = () => {
  return (dispatch) => {
    axios('http://ip-api.com/json')
    .then(function (response) {
      dispatch(setObject('location', { 'latitude': response.data.lat, 'longitude': response.data.lon }));
    })
    .catch(function (error) {
      console.log(error.response);
    })
  }
}

export const fetchDatas = (path) => {
  return (dispatch) => {
    if (!Cookies.get('token')) {
      return dispatch(setObject('auth', false));
    }
    axios.get('http://localhost:8080' + path, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "token": Cookies.get('token')
      }
    })
    .then(function (response) {
      if (path === '/matchs') {
        console.log(response);
      } else if (path === '/cibles') {
        console.log(response);
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}

export const confirmEmail = (token) => {
  return (dispatch) => {
    axios.put('http://localhost:8080/accounts/confirm/' + token, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      }
    })
    .then(function (response) {
      dispatch(setObject('alert', 'email verified !'));
      console.log(response);
        
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}