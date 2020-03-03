import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
import Geocode from 'react-geocode';
import { updateProfile } from '../redux/requests';
import { Card, makeStyles, Grid, Typography, TextField } from '@material-ui/core';

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



const Location = (props) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    latitude: props.latitude ? props.latitude : '',
    longitude: props.longitude ? props.longitude : ''
  });

  const [currentAddress, setCurrentAddress] = useState('');
  const [address, setAddress] = useState('');

  // useEffect(() => {
  //   setForm({
  //     latitude: props.latitude ? props.latitude : '',
  //     longitude: props.longitude ? props.longitude : ''
  //   })
  // }, [props.latitude, props.longitude]);


  const handleChange = value => {
    setAddress(value);
  };
 
  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const LatLon = await getLatLng(results[0]);
    setAddress(value);
    setForm({['latitude']: LatLon.lat, ['longitude']: LatLon.lng});
    //////////////SEND REQUEST TO BACK TO SET NEW LOCATION //////////////////

    Geocode.setApiKey("AIzaSyCH94qlFWu_Vp6qeV5NISrdDFChutvy5-0");
    const code = await Geocode.fromLatLng(LatLon.lat, LatLon.lng);
    console.log(code);
  };

  useEffect(() => {
    console.log(form);
  },[form])


  return (
    <Grid container spacing={1} justify="center">
      <Grid item xs={12} >
        <Card id="Location">
          <Typography className={ classes.formTitle } variant="h4">
            I live in...
          </Typography>
          <Typography variant="body1">
            {currentAddress}
          </Typography>
          <Grid container align="center">
          <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect} >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => 
            <div>
              <TextField {...getInputProps({ placeholder: 'address...'})} />
              <div style={{maxHeight: "100px", overflowY: "scroll"}}>
                {loading ? <div>...loading</div> : null}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#D32F2F" : "#fff",
                    color: suggestion.active ? "white" : "black",
                    display: 'flex',
                    //flexWrap: 'wrap',
                    //flex: 1,
                    //alignItems: 'center',
                    maxWidth: "150px",
                    //overflow: 'hidden'
                  }
                  return <div {...getSuggestionItemProps(suggestion, {style})}>
                  {suggestion.description}</div>
                })}
              </div>
            </div>}
          </PlacesAutocomplete>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Location;