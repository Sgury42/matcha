import axios from 'axios';
import { setObject, updateObject, resetApp } from '../objects/actions';
import Cookies from 'js-cookie';
import { useState } from 'react';


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
          window.location.href = 'http://localhost:3000/profile';
          break ;
        case '/accounts/register/':
          console.log(response);
          dispatch(setObject('alert', 'Check your mail box !'));
          dispatch(setObject('status', 'registrationOK'));
          break ;
        case '/accounts/forgotPasswd':
          dispatch(setObject('alert', 'Check your mail box !'));
          break ;
        default:
          console.log(response);
      }
    })
    .catch(function (error) {
      switch(route) {
        case '/accounts/login/':
          if (error.response && (error.response.status === 404 || error.response.status === 403))
            dispatch(setObject('alert', 'Are you sure you already have an account?'));
          else
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

export function fetchCurrentUser() {
  return async (dispatch) => {
    if (!Cookies.get('token')) {
      return dispatch(setObject('auth', false));
    }
    try {
      const [res1, res2, res3] = await Promise.all([
        axios.get('http://localhost:8080/accounts/params/', {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "token": Cookies.get('token')
          }
        }),
        axios.get('http://localhost:8080/accounts/getProfilePicture/', {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "token": Cookies.get('token')
          }
        }),
        axios.get('http://localhost:8080/accounts/pictures', {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "token": Cookies.get('token')
          }
        })
      ])
      await dispatch(setObject('currentUser', {
        ...res1.data,
        profilePicture: res2.data[0].url_picture,
        pictures: res3.data
      }))
    } catch (e) {
      console.log(e)
      dispatch(setObject('auth', false))
    }
  }
}

export const fetchLocation = () => {
  return (dispatch) => {
    axios('http://ip-api.com/json')
    .then(function (response) {
      // console.log(response);
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
        dispatch(setObject('matches', response.data));
      } else if (path === '/cibles') {
        dispatch(setObject('cibles', response.data));
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

export const disconnect = () => {
  return (dispatch) => {
    if (!Cookies.get('token')) {
      return dispatch(setObject('auth', false));
    }
    axios.post('http://localhost:8080/disconnect', null, {
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

export const deleteAccount = () => {
  return (dispatch) => {
    if (!Cookies.get('token')) {
      return dispatch(setObject('auth', false));
    }
    axios.delete('http://localhost:8080/accounts', {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "token": Cookies.get('token')
      }
    })
    .then(function (response) {
      Cookies.remove('token');
      dispatch(resetApp());
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}