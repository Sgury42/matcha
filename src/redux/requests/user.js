import axios from 'axios';
import { rejects } from 'assert';


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
      dispatch(alert(error.response.data, "error"));
      rejects(null);
    })
  }
}