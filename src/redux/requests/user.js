import axios from 'axios';
import { setObject, resetApp } from '../objects/actions';
import Cookies from 'js-cookie';
import { getPreciseDistance } from 'geolib';

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
          Cookies.set('token', response.data.token);
          dispatch(fetchCurrentUser());
          window.location.href = 'http://localhost:3000/create-profile';
          break ;
        case '/accounts/register/':
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
          console.log(error);
          if (error.response)
            dispatch(setObject('alert', error.response.data ? error.response.data : "Oups something went wrong !"));
            break ;
        case '/accounts/forgotPasswd':
          dispatch(setObject('alert', 'Oups something went wrong !'))
          break ;

        default:
          console.log(error);
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
      if (res2.data[0]) {
        await dispatch(setObject('currentUser', {
          ...res1.data,
          profilePicture: res2.data[0].url_picture,
          pictures: res3.data
        }))
      } else {
        await dispatch(setObject('currentUser', {
          ...res1.data,
          pictures: res3.data
        }))
      }
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
      dispatch(setObject('location', { 'latitude': response.data.lat, 'longitude': response.data.lon }));
    })
    .catch(function (error) {
      console.log(error.response);
    })
  }
}

export const fetchDatas = (path, usrLocation, perimeter) => {
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
    .then(async function (response) {
      if (path === '/matchs') {
        if (response.data.length) {
          const matches = [];
          await response.data.forEach( async (el) => {
            const date = new Date(el.lastConnection);
            const newEl = el;
            newEl['lastConnection'] = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit' }).format(date);
            await matches.push(newEl);
          });
          await dispatch(setObject('matches', matches));
        }
      } else if (path === '/cibles') {
        if (response.data.length) {
          const cibles = [];
          await response.data.forEach(async (el) => {
            const distance = await getPreciseDistance(usrLocation, el.location);
            if (distance < perimeter * 1000) {
              const newEl = el;
              newEl['distance'] = distance;
              await cibles.push(newEl);
            }
          });
          await cibles.sort((a, b) => (a.score > b.score) ? -1 : 1);
          await dispatch(setObject('cibles', cibles));
        }
      } else if (path === '/notifications') {
        dispatch(setObject('notifications', response.data));
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
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}