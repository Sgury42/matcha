import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, TextField, Grid, Typography, IconButton } from '@material-ui/core';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
import { updateProfile } from '../redux/requests';


const EmailUpdate = () => {

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    mail: '',
  });
  const [error, setError] = useState('');

  const formIsValid = () => {
    setError('');
    if (!form.mail.length || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.mail))) {
      setError('email is not valid');
  }
  if (error.length) {
    return false;
  }
  return true;
}

const handleSubmit = e => {
  e.preventDefault();

  if (formIsValid()) {
    dispatch(updateProfile('/accounts/mail/', form));
    setForm({mail: ''});
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
          <Typography variant="h4">Update my email</Typography>
        </Grid>
        <Grid item>
            <TextField name="mail" value={form.mail} label="New email" variant="outlined" margin="normal"
              error={Boolean(error)} helperText={error} required={true}
              onChange={handleChange} fullWidth />
        </Grid>
        <Grid item align="center">
          <IconButton name="submit" type="submit">
            <ChevronRightSharpIcon color="secondary" />
          </IconButton>
        </Grid>
      </Grid>
      </form>
    </Grid>
  );
}

export default EmailUpdate;