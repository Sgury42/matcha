import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../redux/requests';
import { Card, makeStyles, Grid, Typography, FormControlLabel, RadioGroup, Radio} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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

const OrientationUpload = (props) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false)

  const [form, setForm] = useState({
    research_gender: props.research_gender ? props.research_gender : 'A',
    orientation: "bi"
  });

  useEffect(() => {
    if (props.research_gender === props.gender) {
      setForm({ ...form, 'orientation': "gay" });
    } else if (props.research_gender !== props.gender && props.research_gender !== "A") {
      setForm({ ...form, 'orientation': "hetero" });
    } else {
      setForm({ ...form, 'orientation': "bi"});
    }
    setIsMounted(true);
  }, [])

  useEffect(() => {
    if (isMounted || !props.research_gender) {
      dispatch(updateProfile('/accounts/research/gender/', { 'research_gender': form.research_gender }));
    }
  }, [form.research_gender])

  const handleChange = (e) => {
    if (e.target.value) {
      if (e.target.value === "hetero") {
        setForm({ ...form, 'research_gender': props.gender === "F" ? "M" : "F", 'orientation': e.target.value });
      } else if (e.target.value === "gay") {
        setForm({ ...form, 'research_gender': props.gender, 'orientation': e.target.value });
      } else if (e.target.value === "bi") {
        setForm({ ...form, 'research_gender': 'A', 'orientation': e.target.value});
      }
    }
  }

  return (
    <Grid container spacing={1} justify="center">
      <Grid item xs={12} >
        <Card id="Orientetion">
          <Typography className={ classes.formTitle } variant="h4">
            I am...
          </Typography>
          <Grid container align="center">
              <RadioGroup aria-label="orientation" name="orientation" value={ form.orientation } onChange={handleChange}>
                <Grid item xs={12} md={4}>
                  <FormControlLabel value="hetero" control={<Radio />} label="hetero" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel value="gay" control={<Radio />} label="gay" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel value="bi" control={<Radio />} label="bi" />
                </Grid>
              </RadioGroup>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  )
}

export default OrientationUpload;