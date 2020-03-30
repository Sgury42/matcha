import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, makeStyles, Grid, TextField, Button, Typography, Link, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import { sendReq } from '../redux/requests';
import { deleteObject } from '../redux/objects/actions'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  submitButton: {
    marginTop: theme.spacing(2),
  },
  link: {
    marginTop: theme.spacing(5),
  }
}));

const LogInForm = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const isLoggedIn = useSelector(state => state.objects.auth);

  const [form, setForm] = useState({
    mail: '',
    passwd: '',
  })
  const { mail, passwd } = form;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(sendReq('/accounts/login/', form));
  }

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn])

  const handleClick = (e, action) => {
    if (action === 'sendNewPasswd') {
      dispatch(sendReq('/accounts/forgotPasswd', { mail: form.mail }));
      setOpen(false);
    } else
      setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Grid container spacing={1} justify="center">
        <Grid item xs={12} sm={10} md={8} lg={5}>
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
                <Button className={classes.submitButton} name="submit" type="submit" color="secondary" variant="outlined">Submit</Button>
                <Link onClick={handleClick} color="secondary" className={classes.link}>I forgot my password !</Link>
              </Grid>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Reset password</DialogTitle>
        <DialogContent>
          <DialogContentText>To receive a new password enter your email addresse and check your mail box.</DialogContentText>
          <TextField autoFocus margin="dense" name="mail" label="Email" type="email" value={mail} fullWidth
          onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={e => handleClick(e, 'sendNewPasswd')} color="secondary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
            </form>
          </Card>
        </Grid>
      </Grid>
  );
}

export default LogInForm;