import React, { useState, useEffect } from 'react';
import { Card, makeStyles, Grid, Typography, IconButton, TextField, useTheme, Chip, Button, FormControlLabel, Checkbox} from '@material-ui/core';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
import red from '@material-ui/core/colors/red';
import { useHistory } from "react-router-dom";

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
    // display: 'flex',
    // alignItems: 'center',
    // flexDirection: 'column'
  },
  submitButton: {
    margin: theme.spacing(1),
  },
  hashtagsCards: {
    maxLength: '500px',
  }
}));



const OrientationUpload = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Grid container spacing={1} justify="center">
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Card id="OrientationCard">
          <Typography className={classes.formTitle} variant="h4" >
            I am...
          </Typography>
          <Grid container align="center">
          <Grid item xs={12} md={4}>
            <FormControlLabel control={
                <Checkbox value="hetero" color="secondary" />
                // checked={state.checkedB}
                // onChange={handleChange('checkedB')}
              }
              label="Hetero"
              />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControlLabel control={
                <Checkbox value="gay" color="secondary" />
                // checked={state.checkedB}
                // onChange={handleChange('checkedB')}
              }
              label="Gay / Lesbian"
              />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControlLabel control={
                <Checkbox value="bi" color="secondary" />
                // checked={state.checkedB}
                // onChange={handleChange('checkedB')}
              }
              label="Bi"
              />
          </Grid>
          <Grid item xs={12} className={classes.flexItem}>
          <IconButton name="submit" className={classes.submitButton} >
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