import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, makeStyles, Grid, TextField, Button, Typography } from '@material-ui/core';
import { logIn } from '../redux/requests';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  submitButton: {
    marginTop: theme.spacing(2),
  }
}));

const LogInPage = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.objects.auth);

  const [form, setForm] = useState({
    mail: '',
    passwd: '',
  })
  const { mail, passwd } = form;

  if (isLoggedIn) {
    history.push('/');
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(logIn(form));
  }

  return (
      <Grid container spacing={1} justify="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Card className={classes.card}>
            <form onSubmit={handleSubmit}>
            <Typography variant="h2" align="center">
              Log In !
            </Typography>
              <Grid container id="infosInput" justify="center" alignItems="center" direction="column" >
                <TextField name="mail" value={mail} label="Mail" type="text" variant="outlined" margin="normal" required={true}
                  onChange={handleChange} />
                <TextField name="passwd" value={passwd} label="Password" type="password" variant="outlined" margin="normal" required={true}
                  onChange={handleChange} />
                <Button className={classes.submitButton} name="submit" type="submit" color="secondary">Submit</Button>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>
  );
}

export default LogInPage;