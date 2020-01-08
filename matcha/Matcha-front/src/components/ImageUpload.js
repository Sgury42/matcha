import React, { useState, useEffect, setState } from 'react';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
import { Card, makeStyles, Grid, Typography, Box, Button, IconButton } from '@material-ui/core';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
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

const ImageUpload = () => {
  const classes = useStyles();
  const history = useHistory();


  const [profilePicture, setProfilePicture] = useState({
    preview: "https://i0.wp.com/www.industrialontologies.org/wp-content/uploads/2018/10/cropped-blank-profile-picture-973460_640.png?ssl=1",
  })

  const [pictures, setPictures] = useState({});
  const [imgCounter, setImgCounter] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [counter, setCounter] = useState(0);
  const [PPMissing, setPPMissing] = useState('');

  useEffect(() => {
    console.log(pictures);
  }, [pictures]);
  useEffect(() => {
    console.log("img counter = " + imgCounter);
    if (imgCounter === 4) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [imgCounter]);

  const submitPictures = async () => {
    if (!profilePicture.id) {
      setPPMissing("Profile Picture is missing !");
      return false;
    }
    const toUpload = []
    for (let [key, value] of Object.entries(pictures)) {
      if (value) {
        toUpload.push(`${value.raw}`);
      }
    }
    console.log(toUpload);
  //   const result = await fetch(`localhost:8080/api/accounts/pictures`, {
  //     method: 'post',
  //     body: JSON.stringify({ profilePicture: profilePicture.raw, img1: toUpload[0], img2: toUpload[1], img3: toUpload[2], img4: toUpload[3] }),
  //     headers: { 'Content-Type': 'application/json' }
  // });

  //   const body = await result.json();
  //   if (result.ok) {
  //     history.push('');
  //   }
  }

  const handleChange = (e) => {
    if (e && e.target.id === 'profileButton') {
      if (PPMissing) {
        setPPMissing('');
      }
      setProfilePicture({
        id: e.target.files[0].name,
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    } else if (e) {
      setImgCounter(imgCounter + 1); 
      setCounter(counter + 1);
      let imgId = "img" + counter +imgCounter ;
      setPictures({...pictures,
        [imgId]: {
          id: e.target.files[0].name,
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0]
        }
      });
    }
  }

  const handleRemove = (imgId) => {
    setPictures({ ...pictures, [imgId]: undefined });
      setImgCounter(imgCounter - 1);
  }

  const PictureBoxes = () => {
    const items = [];
    for (let [key, value] of Object.entries(pictures)) {
      if (value) {
        items.push(
          <Grid key={ `${key}` }  item xs={6} className={classes.flexItem} >
          <Box {...defaultProps}>
            <img alt={ `${key}` } src={`${value.preview}`} width="100%" />
          </Box>
            <IconButton onClick={ () => handleRemove(key) }>
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
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Card id="ImageUploadCard">
          {/* <Typography className={classes.formTitle} variant="h2" align="center" > */}
              {/* My pictures : */}
          {/* </Typography> */}
          <Grid container justify="center" alignContent="center" alignItems="center">
            <Grid item xs={12} className={classes.flexItem} >
              <Box {...defaultProps} borderRadius="50%">
                <img src={profilePicture.preview} width="100%" height="" />
              </Box>
              <input accept="image/*" className={classes.input} id="profileButton" type="file" 
                style={{ display: 'none' }} onChange={handleChange} />
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
              <IconButton name="submit" onClick={() => submitPictures()}>
                <ChevronRightSharpIcon color="secondary" />
              </IconButton>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ImageUpload;