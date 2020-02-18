// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
// import { updateProfile } from '../redux/requests';
// import { Card, makeStyles, Grid, Typography } from '@material-ui/core';

// const useStyles = makeStyles(theme => ({
//   grow: {
//     flexGrow: 1,
//   },
//   formTitle: {
//     marginBottom: theme.spacing(4),
//   },
//   submitButton: {
//     margin: theme.spacing(1),
//   },
// }));



// const Location = (props) => {

//   const classes = useStyles();
//   const dispatch = useDispatch();

//   const [form, setForm] = useState({
//     latitude: props.latitude ? props.latitude : '',
//     longitude: props.longitude ? props.longitude : ''
//   });

//   const [address, setAddress] = useState('');


//   const handleChange = address => {
//     setAddress(address);
//   };
 
//   const handleSelect = address => {
//     geocodeByAddress(address)
//       .then(results => getLatLng(results[0]))
//       .then(latLng => console.log('Success', latLng))
//       .catch(error => console.error('Error', error));
//   };


//   return (
//     <Grid container spacing={1} justify="center">
//       <Grid item xs={12} >
//         <Card id="Location">
//           <Typography className={ classes.formTitle } variant="h4">
//             I live in...
//           </Typography>
//           <Grid container align="center">
//           <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
//           {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//           <div>
//             <input
//               {...getInputProps({
//                 placeholder: 'Search Places ...',
//                 className: 'location-search-input',
//               })}
//             />
//             <div className="autocomplete-dropdown-container">
//               {loading && <div>Loading...</div>}
//               {suggestions.map(suggestion => {
//                 const className = suggestion.active
//                   ? 'suggestion-item--active'
//                   : 'suggestion-item';
//                 // inline style for demonstration purpose
//                 const style = suggestion.active
//                   ? { backgroundColor: '#fafafa', cursor: 'pointer' }
//                   : { backgroundColor: '#ffffff', cursor: 'pointer' };
//                 return (
//                   <div
//                     {...getSuggestionItemProps(suggestion, {
//                       className,
//                       style,
//                     })}
//                   >
//                     <span>{suggestion.description}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </PlacesAutocomplete>
 
//           </Grid>
//         </Card>
//       </Grid>
//     </Grid>
//   )
// }

// export default Location;