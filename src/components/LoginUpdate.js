import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Grid, Typography, TextField, IconButton } from '@material-ui/core';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
import { updateProfile } from '../redux/requests';

const LoginUpdate = () => {

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    login: ''
  })
  const [error, seterror] = useState('');

  const formIsValid = () => {
    seterror('');
    if (!form.login || form.login.length < 2 || form.login.length > 15) {
      seterror('2 to 15 characters');
    }
    if (error.length) {
      return false;
    }
    return true;
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (formIsValid()) {
      dispatch(updateProfile('/accounts/userLogin/', form));
      setForm({login: ''});
    }
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <Grid item component={Card} xs={12}>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={6} direction="column">
        <Grid item>
          <Typography variant="h4">Update my login</Typography>
        </Grid>
        <Grid item>
            <TextField name="login" value={form.login} label="New login" variant="outlined" margin="normal"
              error={Boolean(error)} helperText={error} required={true}
              onChange={handleChange} fullWidth />
        </Grid>
        <Grid item align="center">
          <IconButton name="submit" type="submit" >
            <ChevronRightSharpIcon color="secondary" />
          </IconButton>
        </Grid>
      </Grid>
    </form>
    </Grid>
  );
}

export default LoginUpdate;