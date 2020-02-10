import axios from 'axios';
import { setObject } from '../objects/actions';


export const register = (form) => {
  return (dispatch) => {
    axios.post('http://localhost:8080/accounts/register/', form, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error.response.data);
      dispatch(setObject('error', error.response.data));
    })
  }
}