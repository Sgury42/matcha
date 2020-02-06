import React, { useState } from 'react';
import { Card, TextField, Grid, Typography, IconButton } from '@material-ui/core';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';


const EmailUpdate = () => {

  const [mail, setMail] = useState('');
  const [error, seterror] = useState('');

  const formIsValid = () => {
    seterror('');
    if (!mail || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail))) {
      seterror('email is not valid');
  }
}

  return (
    <Card>
      <Grid container spacing={6} direction="column">
        <Grid item>
          <Typography variant="h4">Update my email</Typography>
        </Grid>
        <Grid item>
            <TextField id="mail" value={mail} label="New email" variant="outlined" margin="normal"
              error={Boolean(error)} helperText={error} required={true}
              onChange={(event) => setMail(event.target.value)} fullWidth />
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

export default EmailUpdate;