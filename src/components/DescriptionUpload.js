import React, { useState } from 'react';
import { Card, makeStyles, Grid, Typography, IconButton, TextField, useTheme } from '@material-ui/core';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
import { useDispatch } from 'react-redux';
import { description, updateProfile } from '../redux/requests';
import { setObject } from '../redux/objects/actions';


const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  formTitle: {
    marginBottom: theme.spacing(4),
  },
  flexItem: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  submitButton: {
    margin: theme.spacing(1),
  }
}));

const DescriptionUpload = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    description: props.description ? props.description : '',
  });
  const [charCount, setCharCount] = useState(form.description ? form.description.length : 0);

  const handleChange = (e) => {
    const { length } = e.target.value;

    if (length <= 150) {
      setForm({ ...form, [e.target.name]: e.target.value });
      setCharCount(e.target.value.length);
    }
  }


  const handleSubmit = () => {
    dispatch(updateProfile('/accounts/description/', form));
    dispatch(setObject('profileStep', 'hashtags'));
  }

  return (
    <Grid container spacing={1} justify="center">
    <Grid item xs={12} >
      <Card id="ImageUploadCard">
        <Typography className={classes.formTitle} variant="h2" align="center" >
            Describe yourself :
        </Typography>
        <Grid container>
          <TextField type="text" name="description" variant="outlined" fullWidth={true} multiline={true} rows='5' 
            onChange={handleChange} value={form.description}
          />
          <Grid item xs={12}>
            <Typography align="right" style={{ color: theme.palette.primary.light }}>{charCount}/150</Typography>
          </Grid>
          <Grid item xs={12} className={classes.flexItem}>
            <IconButton name="submit" className={classes.submitButton} onClick={handleSubmit}>
              <ChevronRightSharpIcon color="secondary" />
            </IconButton>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  </Grid>
  );
}

export default DescriptionUpload;