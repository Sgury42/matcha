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

const Location = (props) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false)

  const [form, setForm] = useState({
    latitude: props.latitude ? props.latitude : 0,
    longitude: props.longitude ? props.longitude : 0
  });
  const [currentAddress, setCurrentAddress] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (form.latitude && form.longitude) {
      if (isMounted)
        dispatch(updateProfile('/accounts/locations', form));
      getAddress(form.latitude, form.longitude);
    }
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
    const KEY = process.env.REACT_APP_GOOGLE_API_KEY;
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