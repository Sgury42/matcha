import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Card, Typography, makeStyles, Slider, Input } from '@material-ui/core';
import { updateProfile } from '../redux/requests';


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
}));


const SlidersOptions = (props) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false)


  const [form, setForm] = useState({
    research_perimeter: props.research_perimeter ? props.research_perimeter : 0,
    ageRange: [props.research_ageMin ? props.research_ageMin : 18, props.research_ageMax ? props.research_ageMax : 25 ]
  });

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleDistanceChange = (e, newValue) => {
    setForm({ ...form, 'research_perimeter': newValue });
  }
  const handleInputDistanceChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value === '' ? '' : Number(e.target.value)});
  }

  const handleDistanceBlur = () => {
    if (form.research_perimeter < 0) {
      setForm({ ...form, 'research_perimeter': 0 });
    } else if (form.research_perimeter > 250) {
      setForm({ ...form, 'research_perimeter': 250 });
    }
  };

  const handleAgeChange = async (e, newValue) => {
    await setForm({ ...form, 'ageRange': newValue });
  }

  useEffect(() => {
    if (isMounted || !props.research_perimeter) {
      const timer = setTimeout(() => {
        dispatch(updateProfile('/accounts/research/perimeter/', form));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [form.research_perimeter]);

  useEffect(() => {
    if (isMounted || !props.research_ageMax || !props.research_ageMin) {
      const timer = setTimeout(() => {
        dispatch(updateProfile('/accounts/research/agemin/', {'research_ageMin': form.ageRange[0]}));
        dispatch(updateProfile('/accounts/research/agemax/', {'research_ageMax': form.ageRange[1]}));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [form.ageRange]);
 
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
                  <Slider value={typeof form.research_perimeter === 'number' ? form.research_perimeter : 0} onChange={handleDistanceChange} 
                  color="secondary" max={250} aria-labelledby="distance-slider" />
                </Grid>
                <Grid item xs={4}>
                  <Input name='research_perimeter' className={classes.input} value={form.research_perimeter} margin="dense"
                  onBlur={handleDistanceBlur} onChange={handleInputDistanceChange}
                    inputProps={{ step: 10, min: 0, max: 250, type: 'number', 'aria-labelledby': 'input-slider', }} />
                  <Typography variant="body1">Km</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">between...</Typography>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Slider value={form.ageRange} onChange={handleAgeChange} valueLabelDisplay="auto" 
                  color="secondary" min={18} max={99} aria-labelledby="age-range-slider" />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">{form.ageRange[0]} to {form.ageRange[1]} years old</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export default SlidersOptions;