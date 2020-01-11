import React, { useState } from 'react';
import { Grid, Card, Typography, makeStyles, Slider, Input, IconButton } from '@material-ui/core';
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
}));

const SlidersOptions = (e) => {

  const classes = useStyles();

  const [distanceMax, setDistanceMax] = useState(20);
  const [ageRange, setAgeRange] = useState([18, 25]);

  const handleSlidersOptions = () => {
    //   const result = await fetch(`localhost:8080/api/accounts/SlidersOption`, {
//     method: 'post',
//     body: JSON.stringify({ distanceMax, ageRange }),
//     headers: { 'Content-Type': 'application/json' }
// });
    
//   const body = await result.json();
//   if (result.ok) {
    // history.push('');
    // }
  }

  const handleDistanceChange = (e, newValue) => {
    setDistanceMax(newValue);
  }
  const handleInputDistanceChange = (e) => {
    setDistanceMax(e.target.value === '' ? '' : Number(e.target.value));
  }

  const handleAgeChange = (e, newValue) => {
    setAgeRange(newValue);
  }

  return (
    <Grid container spacing={1} justify="center" >
      <Grid item xs={12} >
        <Card id="slidersOptionsCard">
          <Typography className={classes.formTitle} variant="h4">
            I am looking for someone,
          </Typography>
          <Grid container align="flex-start">
            <Grid item xs={12}>
              <Typography variant="h5">around...</Typography>
              <Grid container spacing={2} direction="row">
                <Grid item xs={8}>
                  <Slider value={typeof distanceMax === 'number' ? distanceMax : 0} onChange={handleDistanceChange} 
                  color="secondary" max={250} aria-labelledby="distance-slider" />
                </Grid>
                <Grid item xs={4}>
                  <Input className={classes.input} value={distanceMax} margin="dense" onChange={handleInputDistanceChange}
                    inputProps={{ step: 10, min: 0, max: 250, type: 'number', 'aria-labelledby': 'input-slider', }} />
                  <Typography variant="body1">Km</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">between...</Typography>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Slider value={ageRange} onChange={handleAgeChange} valueLabelDisplay="auto" 
                  color="secondary" min={18} max={99} aria-labelledby="age-range-slider" />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">{ageRange[0]} to {ageRange[1]} years old</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.flexItem}>
              <IconButton name="submit" onClick={handleSlidersOptions}>
                <ChevronRightSharpIcon color="secondary" />
              </IconButton>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export default SlidersOptions;