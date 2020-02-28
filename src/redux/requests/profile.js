import axios from 'axios';
import { setObject, updateObject, addItem, removeItem } from '../objects/actions';
import Cookies from 'js-cookie';

export const hashtags = (usrHashtags) => {
  return (dispatch) => {
    if (!Cookies.get('token')) {
      return dispatch(setObject('auth', false));
    }
    axios.put('http://localhost:8080/accounts/hashtags/', usrHashtags, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "token": Cookies.get('token')
      }
    })
    .then(function (response) {
      dispatch(updateObject('currentUser', { hashtags: usrHashtags.hashtags }));
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}

export const updateProfile = (route, form) => {
  return (dispatch) => {
    if (!Cookies.get('token')) {
      return dispatch(setObject('auth', false));
    }
    axios.put('http://localhost:8080' + route, form, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "token": Cookies.get('token')
      }
    })
    .then(function (response) {
      switch(route) {
        case '/accounts/passwd/':
          dispatch(setObject('alert', 'password updated !'));
          break ;
        case '/accounts/mail/':
          dispatch(setObject('alert', 'email updated !'));
        case '/accounts/userLogin/':
          dispatch(setObject('alert', 'Hi ' + form.login));

        default :
          dispatch(updateObject('currentUser', form));
      }
    })
    .catch(function (error) {
      console.log(error.response);
    })
  }
}

export const profilePictureUpload = (formData) => {
  return (dispatch) => {
    if (!Cookies.get('token')) {
      return dispatch(setObject('auth', false));
    }
    axios.post('http://localhost:8080/accounts/profilePicture', formData, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "token": Cookies.get('token')
      }
    })
    .then(function (response) {
      dispatch(updateObject('currentUser', { 'profilePicture': response.data }));
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error.response);
    })
  }
}

export const pictureUpload = (formData) => {
  return (dispatch) => {
    if (!Cookies.get('token')) {
      return dispatch(setObject('auth', false));
    }
    axios.post('http://localhost:8080/accounts/pictures', formData, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "token": Cookies.get('token')
      }
    })
    .then(function (response) {
      dispatch(addItem('currentUser', 'pictures', response.data));
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}

export const deletePicture = (form, deleteFrom) => {
  return (dispatch) => {
    if (!Cookies.get('token')) {
      return dispatch(setObject('auth', false));
    }
    axios.delete('http://localhost:8080/accounts/pictures', {
      params: form,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "token": Cookies.get('token')
      }
    })
    .then(function (response) {
      if (deleteFrom === 'pictures')
        dispatch(removeItem('currentUser', 'pictures', response.data));
      else if (deleteFrom === 'profilePicture')
        // dispatch(updateObject('currentUser', { 'profilePicture': response.data }));
        console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}

export const usrInteraction = (route, form, index) => {
  return (dispatch) => {
    if (!Cookies.get('token')) {
      return dispatch(setObject('auth', false));
    }
    axios.post('http://localhost:8080' + route, form, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "token": Cookies.get('token')
      }
    })
    .then(function (response) {
      switch(route) {
        case '/likes':
          dispatch(setObject('index', index + 1));
          break ;
        default :
        console.log(response);
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}