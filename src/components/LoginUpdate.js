import React, { useState } from 'react';
import { Card, Grid, Typography, TextField, IconButton } from '@material-ui/core';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';

const LoginUpdate = () => {

  const [login, setLogin] = useState('');
  const [error, seterror] = useState('');

  const formIsValid = () => {
    seterror('');
    if (!login || login.length < 2 || login.length > 15) {
      seterror('2 to 15 characters');
    }
  }

  return (
    <Card>
      <Grid container spacing={6} direction="column">
        <Grid item>
          <Typography variant="h4">Update my login</Typography>
        </Grid>
        <Grid item>
            <TextField id="login" value={login} label="New login" variant="outlined" margin="normal"
              error={Boolean(error)} helperText={error} required={true}
              onChange={(event) => setLogin(event.target.value)} fullWidth />
        </Grid>
        <Grid item align="center">
          <IconButton name="submit" onClick={() => formIsValid() }>
            <ChevronRightSharpIcon color="secondary" />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
}

export default LoginUpdate;