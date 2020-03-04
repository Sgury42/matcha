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
  margBot: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    margin: theme.spacing(1),
  }
}));

// url to reverse geocoding = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=LAT,LNG&key=MY-API-KEY' 



const Location = (props) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    latitude: props.latitude ? props.latitude : '',
    longitude: props.longitude ? props.longitude : ''
  });

  const [currentAddress, setCurrentAddress] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    setForm({
      latitude: props.latitude ? props.latitude : 0,
      longitude: props.longitude ? props.longitude : 0
    })
    if (props.latitude && props.longitude) {
      getAddress(props.latitude, props.longitude);
    }
  }, [props.latitude, props.longitude]);

  useEffect(() => {
    console.log(form.latitude);
    console.log(form.longitude);
    if (form.latitude && form.longitude)
      dispatch(updateProfile('/accounts/locations', form));
  }, [form])


  const handleChange = value => {
    setAddress(value);
  };
 
  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const LatLon = await getLatLng(results[0]);
    setAddress(value);
    setForm({['latitude']: LatLon.lat, ['longitude']: LatLon.lng});
  };

  const getAddress = (lat, lng) => {
    const KEY = "AIzaSyCH94qlFWu_Vp6qeV5NISrdDFChutvy5-0";
    fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng +"&key=" + KEY)
    .then(response => {
      response.json()
      .then(datas => {
        const address = datas.results[0].formatted_address;
        setCurrentAddress(address);
      })
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    console.log(form);
  },[form])


  return (
    <Grid container spacing={1} justify="center">
      <Grid item xs={12} >
        <Card id="Location">
          <Typography className={ classes.margBot } variant="h4">
            I live in...
            {/* <span className={ classes.addressDisplay }>{currentAddress}</span> */}
          </Typography>
          <Typography variant="body1" className={ classes.margBot }>
            {currentAddress}
          </Typography>
          <Grid container align="center">
          <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect} >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => 
            <div>
              <TextField {...getInputProps({ placeholder: 'address...'})} />
              <div style={{overflowY: "scroll"}}>
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