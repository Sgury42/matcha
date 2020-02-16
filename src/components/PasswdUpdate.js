import React, { useState } from "react";
import { Card, Grid, Typography, TextField, IconButton } from "@material-ui/core";
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';


const PasswdUpdate = () => {

  const [passwd, setPasswd] = useState('');
  const [repeatPasswd, setRepeatPasswd] = useState('');
  const [errors, setErrors] = useState({
    passwdError: null,
    repeatPasswdError: null
  });
  const formIsValid = () => {
    const newErrors = {};
    if (passwd.length < 5 || !(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/).test(passwd)) {
      newErrors.passwdError = 'min 5 char, 1 Upcase, 1 number'
    }
    if (!repeatPasswd || repeatPasswd !== passwd) {
      newErrors.repeatPasswdError = "passwords don't match";
    }
    setErrors({...newErrors});
  }

  return (
    <Grid item component={Card} xs={12}>
      <Grid container spacing={1} direction="column">
        <Typography variant="h4">Update my password</Typography>
        <Grid item >
          <TextField id="passwd" value={passwd} label="Password" type="password" variant="outlined" margin="normal"
              error={Boolean(errors.passwdError)} helperText={errors.passwdError} required={true}
              onChange={(event) => setPasswd(event.target.value)} fullWidth/>
        </Grid>
        <Grid item >
          <TextField id="repeatPasswd" value={repeatPasswd} label="Password confimation" type="password" variant="outlined" margin="normal"
              error={Boolean(errors.repeatPasswdError)} helperText={errors.repeatPasswdError} required={true}
              onChange={(event) => setRepeatPasswd(event.target.value)} fullWidth/>
        </Grid>
        <Grid item align="center">
          <IconButton name="submit" onClick={() => formIsValid() }>
            <ChevronRightSharpIcon color="secondary" />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PasswdUpdate;