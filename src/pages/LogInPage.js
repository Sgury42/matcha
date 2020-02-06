import React, { useState } from 'react';
import { Card, makeStyles, Grid, TextField, Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  submitButton: {
    marginTop: theme.spacing(2),
  }
}));

const LogInPage = () => {
  const history = useHistory();
  const classes = useStyles();

  const [login, setLogin] = useState('');
  const [passwd, setPasswd] = useState('');

  const logIn = async (e) => {
    e.preventDefault();
    const result = await fetch(`localhost:8080/api/accounts/login`, {
      method: 'post',
      body: JSON.stringify({ login, passwd }),
      headers: { 'Content-Type': 'application/json' }
  });
    // const body = await result.json();
    if (result.ok) {
      history.push('/');
    }
  }


  return (
      <Grid container spacing={1} justify="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Card className={classes.card}>
            <form>
            <Typography variant="h2" align="center">
              Log In !
            </Typography>
              <Grid container id="infosInput" justify="center" alignItems="center" direction="column" >
                <TextField id="login" value={login} label="Login" type="text" variant="outlined" margin="normal" required={true}
                  onChange={(event) => setLogin(event.target.value)} />
                <TextField id="passwd" value={passwd} label="Password" type="password" variant="outlined" margin="normal" required={true}
                  onChange={(event) => setPasswd(event.target.value)} />
                <Button className={classes.submitButton} name="submit" type="submit" color="secondary" onSubmit={e => logIn(e) }>Submit</Button>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>
  );
}

export default LogInPage;