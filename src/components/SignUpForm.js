import React, { useState, useEffect } from 'react';
import { makeStyles, Card, Grid, TextField, Typography, IconButton, RadioGroup, Radio, FormControlLabel} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
import { register } from '../redux/requests'
// import { useHistory } from "react-router-dom";
// import Joi from '@hapi/joi';
// import ErrorDisplay from '../components/ErrorDisplay';

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
  formTitle: {
    marginBottom: theme.spacing(4),
  },
}));
  

const SignUpForm = () => {
  // const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  // const [login, setLogin] = useState('');
  const [form, setForm] = useState({
    firstname: '',
    name: '',
    mail: '',
    passwd: '',
    repeatPasswd: '',
    dateBirth: '2002-01-01',
    gender: ''
  })
  const { firstname, name, mail, passwd, repeatPasswd, dateBirth, gender } = form
  const [errors, setErrors] = useState({
    genderError: null,
    nameError: null,
    firstnameError: null,
    mailError: null,
    passwdError: null,
    repeatPasswdError: null
  });

  // const handleError = (key, message) => {
  //   // setErrors({...errors, [key]: message }); return new Error();
  //   console.log(newErrors)
  //   newErrors[key] = message;
  //   return new Error();
  // }

  // let newErrors = {};

  // const Schema = Joi.object().keys({
  //   'gender': Joi.string().required().error(() => handleError('genderError', 'gender required')),
  //   'name': Joi.string().min(2).max(15).required().error(() => handleError('nameError', 'max 15 characters')),
  //   'firstname': Joi.string().min(2).max(15).required().error(() => handleError('firstnameError', 'between 2 to 15 characters')),
  //   'mail': Joi.string().email({minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required().error(() => handleError('mailError', 'email not valid')),
  //   'passwd': Joi.string().pattern(new RegExp('^(?=.*[A-Z])')).required().error(() => handleError('passwdError', 'min 5 character, 1 Uppercase, 1 number')), // Min 5 caracteres, min 1 alpha, min 1 num
  //   'repeatPasswd': Joi.any().valid(Joi.ref('passwd')).required().error(() => handleError('repeatPasswdError', "passwords don't match")),
  //   'dateBirth': Joi.required()
  // })
  useEffect(() => {
    if (!Object.keys(errors).length) {
      addUsr();
    }
  }, [errors])

  const formIsValid = () => {
    const newErrors = {};
    if (gender !== 'woman' && gender !== 'man') {
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

  const addUsr = async () => {
    // e.preventDefault();
  //     console.log("It's all good !");
  //   const result = await fetch(`localhost:8080/api/accounts/register`, {
  //     method: 'post',
  //     body: JSON.stringify({ firstname, name, mail, passwd, repeatPasswd, dateBirth, gender }),
  //     headers: { 'Content-Type': 'application/json' }
  // });

  //   const body = await result.json();
  //   if (result.ok) {
  //     history.push('/uploadPicture');
  //   }
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (formIsValid()) {
      dispatch(register(form))
    }
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <Grid container spacing={1} justify="center">
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Card className={classes.card}>
          <form onSubmit={handleSubmit}>
            <Typography className={classes.formTitle} variant="h2" align="center" >
              Sign Up !
            </Typography>
            {/* <ErrorDisplay errors={ errors }/> */}
              <Grid container id="infosInput" justify="center" alignItems="center" direction="column" >
                <Grid item id="genderChoice">
                  <Typography variant="h5">I am...</Typography>
                  <RadioGroup aria-label="gender" name="gender" value={form.gender} onChange={handleChange}>
                    <FormControlLabel value="woman" control={<Radio />} label="a woman" />
                    <FormControlLabel value="man" control={<Radio />} label="a man" />
                </RadioGroup>
                </Grid>
                <Typography variant="caption" color="error">{ errors.genderError }</Typography>
                {/* <TextField id="login" value={login} label="Login" type="text" variant="outlined" margin="normal" required={true} */}
                  {/* onChange={(event) => setLogin(event.target.value)} /> */}
                <TextField name="firstname" value={firstname} label="First name" type="text" variant="outlined" margin="normal" 
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