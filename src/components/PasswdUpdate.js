import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from '../redux/requests';
import { Card, Grid, Typography, TextField, IconButton } from "@material-ui/core";
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';


const PasswdUpdate = () => {

  // const [passwd, setPasswd] = useState('');
  // const [repeatPasswd, setRepeatPasswd] = useState('');
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    passwd: '',
    repeatPasswd: '',
  });

  const [errors, setErrors] = useState({
    passwdError: null,
    repeatPasswdError: null
  });

  const formIsValid = () => {
    const newErrors = {};
    if (form.passwd.length < 5 || !(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/).test(form.passwd)) {
      newErrors.passwdError = 'min 5 char, 1 Upcase, 1 number'
    }
    if (!form.repeatPasswd || form.repeatPasswd !== form.passwd) {
      newErrors.repeatPasswdError = "passwords don't match";
    }
    setErrors({...newErrors});
    if (Object.keys(newErrors).length) {
      return false;
    }
    return true;
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (formIsValid()) {
      dispatch(updateProfile('/accounts/passwd/', form));
      setForm({ passwd: '', repeatPasswd: ''});
    }
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <Grid item component={Card} xs={12}>
      <Grid container spacing={1} direction="column">
        <Typography variant="h4">Update my password</Typography>
        <form onSubmit={handleSubmit}>
        <Grid item >
          <TextField name="passwd" value={form.passwd} label="Password" type="password" variant="outlined" margin="normal"
              error={Boolean(errors.passwdError)} helperText={errors.passwdError} required={true}
              onChange={handleChange} fullWidth/>
        </Grid>
        <Grid item >
          <TextField name="repeatPasswd" value={form.repeatPasswd} label="Password confimation" type="password" variant="outlined" margin="normal"
              error={Boolean(errors.repeatPasswdError)} helperText={errors.repeatPasswdError} required={true}
              onChange={handleChange} fullWidth/>
        </Grid>
        <Grid item align="center">
          <IconButton name="submit" type="submit" >
            <ChevronRightSharpIcon color="secondary" />
          </IconButton>
        </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

export default PasswdUpdate;