import axios from 'axios';
import { setObject, updateObject } from '../objects/actions';
import Cookies from 'js-cookie';

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
      console.log(response);
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
      dispatch(updateObject('currentUser', form));
      console.log(response);
    })
    .catch(function (error) {
      console.log(error.response);
    })
  }
}
export const newData = (route, form) => {
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
      dispatch(updateObject('currentUser', form));
      console.log(response);
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
      console.log(response);
    })
    .catch(function (error) {
      console.log(error.response);
    })
  }
}