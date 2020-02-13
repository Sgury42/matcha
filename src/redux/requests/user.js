import axios from 'axios';
import { setObject, updateObject } from '../objects/actions';
import Cookies from 'js-cookie';



export const register = (form) => {
  return (dispatch) => {
    axios.post('http://localhost:8080/accounts/register/', form, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
    })
    .then(function (response) {
      console.log(response);
      dispatch(setObject('profileStep', "picture"));
    })
    .catch(function (error) {
      dispatch(setObject('error', error.response.data));
    })
  }
}

export const logIn = (form) => {
  console.log(form);
  return (dispatch) => {
    axios.post('http://localhost:8080/accounts/login/', {mail: form.mail, passwd: form.passwd } , {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
    })
    .then(function (response) {
      console.log(response.data.token);
      dispatch(setObject('auth', true));
      Cookies.set('token', response.data.token);
      dispatch(fetchCurrentUser());
    })
    .catch(function (error) {
      console.log(error.response);
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
      axios.get('http://localhost:8080/accounts/pictures/', {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "token": Cookies.get('token')
        }
      })
      .then(function (response) {
        dispatch(updateObject('currentUser', { pictures: response.data }));
      })
      .catch(function (error) {
        console.log(error.response);
      })
    })
    .catch(function (error) {
      console.log(error.response);
      dispatch(setObject('auth', false));
    })
  }
}

export const addPicture = (picturePath) => {
  const picture = {
    url_picture: picturePath
  }

  return (dispatch) => {
    if (!Cookies.get('token')) {
      return dispatch(setObject('auth', false));
    }
    axios.post('http://localhost:8080/accounts/pictures/', picture, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "token": Cookies.get('token')
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}

export const description = (form, createProfile) => {
  return (dispatch) => {
    if (!Cookies.get('token')) {
      return dispatch(setObject('auth', false));
    }
    axios.put('http://localhost:8080/accounts/description/', form, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "token": Cookies.get('token')
      }
    })
    .then(function (response) {
      if (createProfile) {
        dispatch(setObject('profileStep', 'hashtags'));
      }
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}