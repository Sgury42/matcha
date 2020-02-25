import React, { useState, useEffect} from 'react';
import { makeStyles, Card, Grid, TextField, Typography, IconButton, RadioGroup, Radio, FormControlLabel, Snackbar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
import { sendReq, fetchLocation } from '../redux/requests';
import { deleteObject } from '../redux/objects/actions';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  box: {
    margin: 'auto',
    padding: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  formTitle: {
    marginBottom: theme.spacing(4),
  },
}));
  

const SignUpForm = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const alert = useSelector(state => state.objects.alert);
  const isLoggedIn = useSelector(state => state.objects.auth);
  const location = useSelector(state => state.objects.location);
  const status = useSelector(state => state.objects.status);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    login: '',
    firstname: '',
    name: '',
    mail: '',
    passwd: '',
    repeatPasswd: '',
    dateBirth: '2002-01-01',
    gender: '',
    latitude: 0,
    longitude: 0
  })
  const { login, firstname, name, mail, passwd, repeatPasswd, dateBirth, gender } = form;
  const [errors, setErrors] = useState({
    loginError: null,
    genderError: null,
    nameError: null,
    firstnameError: null,
    mailError: null,
    passwdError: null,
    repeatPasswdError: null
  });

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (status === 'registrationOK') {
      history.push('/');
    }
  }, [status]);

  useEffect (() => {
    dispatch(fetchLocation());
  }, []);

  useEffect(() => {
    setForm({ ...form, ['latitude']: location.latitude ? location.latitude : 0, ['longitude']: location.longitude ? location.longitude : 0});
  }, [location]);

  const formIsValid = () => {
    const newErrors = {};
    if (login.length < 2 || login.length > 50) {
      newErrors.loginError = '2 to 50 characters';
    }
    if (gender !== 'F' && gender !== 'H') {
      newErrors.genderError = 'gender required';
    }
    if (!firstname || firstname.length < 2 || firstname.length > 15) {
      newErrors.firstnameError = '2 to 15 characters';
    }
    if (name.length > 15){
      newErrors.nameError = '15 characters max'
    }
    if (!mail || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail))) {
    newErrors.mailError = 'email is not valid';
    }
    if (passwd.length < 5 || !(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/).test(passwd)) {
      newErrors.passwdError = 'min 5 char, 1 Upcase, 1 number'
    }
    if (!repeatPasswd || repeatPasswd !== passwd) {
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
      dispatch(sendReq('/accounts/register/', form));
    }
  }

  useEffect(() => {
    if (alert) {
      setOpen(true);
    }
  }, [alert]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleClose = () => {
    setOpen(false);
    dispatch(deleteObject('alert'));
  };

  return (
    <Grid container spacing={1} justify="center">
      <Grid item xs={12} sm={10} md={8} lg={5}>
        <Card className={classes.card}>
          <Snackbar  open={ open } autoHideDuration={6000} transitionDuration={1000} message={ alert } onClose={ handleClose } />
          <form onSubmit={handleSubmit}>
            <Typography className={classes.formTitle} variant="h2" align="center" >
              Sign Up !
            </Typography>
              <Grid container id="infosInput" justify="center" alignItems="center" direction="column" >
                <Grid item id="genderChoice">
                  <Typography variant="h5">I am...</Typography>
                  <RadioGroup aria-label="gender" name="gender" value={gender} onChange={handleChange}>
                    <FormControlLabel value="F" control={<Radio />} label="a woman" />
                    <FormControlLabel value="H" control={<Radio />} label="a man" />
                </RadioGroup>
                </Grid>
                <Typography variant="caption" color="error">{ errors.genderError }</Typography>
                <TextField name="login" value={login} label="Login" type="text" variant="outlined" margin="normal"
                  error={Boolean(errors.loginError)} helperText={errors.loginError} required={true}
                  onChange={handleChange} /> 
                <TextField name="firstname" value={firstname} label="Firstname" type="text" variant="outlined" margin="normal" 
                  error={Boolean(errors.firstnameError)} helperText={errors.firstnameError} required={true}
                  onChange={handleChange} />
                <TextField name="name" value={name} label="Last name" type="text" variant="outlined" margin="normal" 
                  error={Boolean(errors.nameError)} helperText={errors.nameError}
                  onChange={handleChange} />
                <TextField name="mail" value={mail} label="Email" variant="outlined" margin="normal"
                  error={Boolean(errors.mailError)} helperText={errors.mailError} required={true}
                  onChange={handleChange} />
                <TextField name="passwd" value={passwd} label="Password" type="password" variant="outlined" margin="normal"
                  error={Boolean(errors.passwdError)} helperText={errors.passwdError} required={true}
                  onChange={handleChange} />
                <TextField name="repeatPasswd" value={repeatPasswd} label="Password confimation" type="password" variant="outlined" margin="normal"
                error={Boolean(errors.repeatPasswdError)} helperText={errors.repeatPasswdError} required={true}
                  onChange={handleChange} />
                <TextField name="dateBirth" value={dateBirth} label="Birthdate" type="date" margin="normal" InputLabelProps={{shrink: true,}} required={true}
                  onChange={handleChange} />
                <IconButton name="submit" type="submit">
                  <ChevronRightSharpIcon color="secondary" />
                </IconButton>
              </Grid>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}

export default SignUpForm;