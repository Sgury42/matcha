import React, { useState } from 'react';
import { makeStyles, Card, Grid, TextField, Typography, IconButton} from '@material-ui/core';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  box: {
    margin: 'auto',
    padding: theme.spacing(2),
  },
  // root: {
    // flexGrow: 1,
  // },
  grow: {
    flexGrow: 1,
  },
}));
  

const SignUpPage = () => {
  const history = useHistory();
  const classes = useStyles();

  const [login, setLogin] = useState('');
  const [firstname, setFirstname] = useState('');
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [repeatPasswd, setRepeatPasswd] = useState('');
  const [dateBirth, setDateBirth] = useState('2002-01-01');

  const addUsr = async (e) => {
    e.preventDefault();
    const result = await fetch(`localhost:8080/api/accounts/register`, {
      method: 'post',
      body: JSON.stringify({ login, firstname, name, mail, passwd, repeatPasswd, dateBirth }),
      headers: { 'Content-Type': 'application/json' }
  });
    // const body = await result.json();
    if (result.ok) {
      history.push('/uploadPicture');
    }
  }

  return (
    <Grid container spacing={1} justify="center">
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Card className={classes.card}>
          <form>
            <Typography variant="h2" align="center">
              Sign Up !
            </Typography>
              <Grid container id="infosInput" justify="center" alignItems="center" direction="column" >
                <TextField id="login" value={login} label="Login" type="text" variant="outlined" margin="normal" required={true}
                  onChange={(event) => setLogin(event.target.value)} />
                <TextField id="firstname" value={firstname} label="First name" type="text" variant="outlined" margin="normal"
                  onChange={(event) => setFirstname(event.target.value)} />
                <TextField id="name" value={name} label="Last name" type="text" variant="outlined" margin="normal" 
                  onChange={(event) => setName(event.target.value)} />
                <TextField id="mail" value={mail} label="Email" type="email" variant="outlined" margin="normal" required={true}
                  onChange={(event) => setMail(event.target.value)} />
                <TextField id="passwd" value={passwd} label="Password" type="password" variant="outlined" margin="normal" required={true}
                  onChange={(event) => setPasswd(event.target.value)} />
                <TextField id="repeatPasswd" value={repeatPasswd} label="Password confimation" type="password" variant="outlined" margin="normal" required={true}
                  onChange={(event) => setRepeatPasswd(event.target.value)} />
                <TextField id="dateBirth" value={dateBirth} label="Birthdate" type="date" margin="normal" InputLabelProps={{shrink: true,}} required={true}
                  onChange={(event) => setDateBirth(event.target.value)} />
                <IconButton name="submit" type="submit" onSubmit={e => addUsr(e) }>
                  <ChevronRightSharpIcon color="secondary" />
                </IconButton>
              </Grid>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}

export default SignUpPage;