import React, { useState } from 'react';
import { Card, makeStyles, Grid, Typography, IconButton, FormControlLabel, Checkbox} from '@material-ui/core';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
// import { useHistory } from "react-router-dom";

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
  submitButton: {
    margin: theme.spacing(1),
  },
}));



const OrientationUpload = () => {

  const classes = useStyles();
  // const history = useHistory();

  const [isHetero, setIsHetero] = useState(false);
  const [isGay, setIsGay] = useState(false);
  const [isBi, setIsBi] = useState(false);

  const handleChange = (e) => {
    if (e.target.value === 'hetero') {
      setIsHetero(true);
      setIsGay(false);
      setIsBi(false);
    } else if (e.target.value === 'gay') {
      setIsHetero(false);
      setIsGay(true);
      setIsBi(false);
    } 
    else {
      setIsHetero(false);
      setIsGay(false);
      setIsBi(true);
    }
  }

  const handleOrientationUpload = () => {
    // let orientation = 'bi';
    // if (isHetero) {
    //   orientation = 'hetero';
    // } else if (isGay) {
    //   orientation = 'gay';
    // }

//   const result = await fetch(`localhost:8080/api/accounts/OrientationUpload`, {
//     method: 'post',
//     body: JSON.stringify({ orientation }),
//     headers: { 'Content-Type': 'application/json' }
// });
    
//   const body = await result.json();
//   if (result.ok) {
    // history.push('');
    // }
  }


  return (
    <Grid container spacing={1} justify="center">
      <Grid item xs={12} >
        <Card id="OrientationCard">
          <Typography className={classes.formTitle} variant="h4" >
            I am...
          </Typography>
          <Grid container align="center">
          <Grid item xs={12} md={4}>
            <FormControlLabel control={
                <Checkbox value="hetero" color="secondary"
                checked={isHetero}
                onChange={handleChange} />
              }
              label="Hetero"
              />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControlLabel control={
                <Checkbox value="gay" color="secondary"
                checked={isGay}
                onChange={handleChange} />
              }
              label="Gay / Lesbian"
              />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControlLabel control={
                <Checkbox value="bi" color="secondary"
                checked={isBi}
                onChange={handleChange} />
              }
              label="Bi"
              />
          </Grid>
          <Grid item xs={12} className={classes.flexItem}>
          <IconButton name="submit" className={classes.submitButton} onClick={handleOrientationUpload}>
            <ChevronRightSharpIcon color="secondary" />
          </IconButton>
          </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export default OrientationUpload;