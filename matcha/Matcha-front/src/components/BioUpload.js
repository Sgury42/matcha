import React, { useState, useEffect } from 'react';
import { Card, makeStyles, Grid, Typography, IconButton, TextField, useTheme } from '@material-ui/core';
// import { useHistory } from "react-router-dom";
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';


const useStyles = makeStyles(theme => ({
  // root: {
    // flexGrow: 1,
  // },
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

const BioUpload = () => {
  const classes = useStyles();
  // const history = useHistory();
  const theme = useTheme();

  const [charCount, setCharCount] = useState(0);
  const [bio, setBio] = useState('');

  useEffect(() => {
    console.log(charCount)
  }, [charCount]);

  const handleChange = (e) => {
    const { length } = e.target.value;

    if (length <= 450) {
      setBio(e.target.value);
      setCharCount(e.target.value.length);
    }
  }

  const submitBio = async () => {
  //   const result = await fetch(`localhost:8080/api/accounts/bio`, {
  //     method: 'post',
  //     body: JSON.stringify({ bio }),
  //     headers: { 'Content-Type': 'application/json' }
  // });

  //   const body = await result.json();
  //   if (result.ok) {
  //     history.push('');
  //   }
  }

  return (
    <Grid container spacing={1} justify="center">
    <Grid item xs={12} >
      <Card id="ImageUploadCard">
        <Typography className={classes.formTitle} variant="h2" align="center" >
            Describe yourself :
        </Typography>
        <Grid container>
          <TextField type="text" variant="outlined" fullWidth={true} multiline={true} rows='5' rowsMax="10"
            onChange={(e) => handleChange(e)} value={bio}
          />
          <Grid item xs={12}>
            <Typography align="right" style={{ color: theme.palette.primary.light }}>{charCount}/450</Typography>
          </Grid>
          <Grid item xs={12} className={classes.flexItem}>
            <IconButton name="submit" className={classes.submitButton} onClick={ () => submitBio() }>
              <ChevronRightSharpIcon color="secondary" />
            </IconButton>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  </Grid>
  );
}

export default BioUpload;