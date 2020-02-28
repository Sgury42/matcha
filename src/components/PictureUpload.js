import React, { useState, useEffect } from 'react';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
import { Card, makeStyles, Grid, Typography, Box, Button, IconButton } from '@material-ui/core';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import { useDispatch } from 'react-redux';
import { addPicture, profilePictureUpload, pictureUpload, deletePicture } from '../redux/requests';
import { setObject } from '../redux/objects/actions';


const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  formTitle: {
    marginBottom: theme.spacing(4),
  },
  profilePicture: {
    borderRadius: '100%',
  },
  flexItem: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  }
}));

const defaultProps = {
  m: 1,
  style: { width: '25vw', height: '25vw', maxWidth: '20em', maxHeight: '20em' },
  overflow: 'hidden',
};

const PictureUpload = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ppIcon = "https://i0.wp.com/www.industrialontologies.org/wp-content/uploads/2018/10/cropped-blank-profile-picture-973460_640.png?ssl=1";

  const [profilePicture, setProfilePicture] = useState({
    preview: props.profilePicture ? props.profilePicture : ppIcon,
  })
  const [pictures, setPictures] = useState(props.pictures ? props.pictures : []);
  const [imgCounter, setImgCounter] = useState(pictures.length);
  const [isDisabled, setIsDisabled] = useState(false);
  const [counter, setCounter] = useState(pictures.length);
  const [PPMissing, setPPMissing] = useState("");

  useEffect(() => {
    if (imgCounter >= 4) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [imgCounter]);

  useEffect(() => {
    setPictures(props.pictures ? props.pictures : []);
  }, [props.pictures]);

  useEffect(() => {
    setImgCounter(pictures.length);
    setCounter(pictures.length);
  }, [pictures])

  useEffect(() => {
    setProfilePicture(props.profilePicture ? props.profilePicture : ppIcon);
  }, [props.profilePicture]);

  const handleSubmit = () => {
    if (profilePicture === ppIcon) {
      setPPMissing("Profile Picture is missing !");
      return false;
    }
    dispatch(setObject('profileStep', 'description'));
  }

  const handleChange = (e, prevProfilePicture) => {
    if (e && e.target.id === 'profileButton' && e.target.files[0]) {
      if (PPMissing) {
        setPPMissing('');
      }
      const formData = new FormData();
      formData.append("file", e.target.files[0], e.target.files[0].name);
      dispatch(profilePictureUpload(formData));
      if (prevProfilePicture && prevProfilePicture != ppIcon)
        dispatch(deletePicture({url_picture: prevProfilePicture}, 'profilePicture'));
    } else if (e && e.target.files[0]) {
      const formData = new FormData();
      formData.append("file", e.target.files[0], e.target.files[0].name);
      dispatch(pictureUpload(formData));
    }
  }

  const handleRemove = (src) => {
      dispatch(deletePicture({url_picture: src}, 'pictures'));
  }

  const PictureBoxes = () => {
    const items = [];
    for (let [key, value] of Object.entries(pictures)) {
      if (value) {
        items.push(
          <Grid key={ `${key}` }  item xs={6} className={classes.flexItem} >
          <Box {...defaultProps}>
            <img alt={ `${key}` } src={`${value}`} width="100%" />
          </Box>
            <IconButton onClick={ () => handleRemove(value) }>
              <CancelRoundedIcon fontSize='large' color='secondary' />
            </IconButton>
        </Grid>
        );
      }
    }
    return (
      <>
        {items}
      </>
    );
  }

  return (
    <Grid container spacing={1} justify="center">
       <Grid item xs={12} >
        <Card id="ImageUploadCard">
          <Grid container justify="center" alignContent="center" alignItems="center">
            <Grid item xs={12} className={classes.flexItem} >
              <Box {...defaultProps} borderRadius="50%">
                <img id="profilePicture" src={profilePicture} alt="profile" width="100%" />
              </Box>
              <input accept="image/*" className={classes.input} id="profileButton" type="file" 
                style={{ display: 'none' }} onChange={e => handleChange(e, profilePicture)} />
              <label htmlFor="profileButton">
                <IconButton component="span" >
                  <AddCircleRoundedIcon fontSize='large'/>
                </IconButton>
              </label>
              <Typography  color="secondary">{PPMissing}</Typography>
            </Grid>
            <PictureBoxes />
            <Grid item className={classes.flexItem} xs={12}>
              <input accept="image/*" className={classes.input} type="file" id="uploadButton"
                style={{ display: 'none' }} onChange={(e) => handleChange(e)} disabled={isDisabled}/>
              <label htmlFor="uploadButton" style={{ justifySelf: "flex-end" }} >
                <Button component="span" disabled={isDisabled} variant="contained" color="secondary" >
                  Add pictures {imgCounter} / 4
                </Button>
              </label>
            </Grid>
            <Grid item xs={12} className={classes.flexItem}>
              <IconButton name="submit" onClick={() => handleSubmit()}>
                <ChevronRightSharpIcon color="secondary" />
              </IconButton>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export default PictureUpload;