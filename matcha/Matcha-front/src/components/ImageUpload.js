import React, { useState, useEffect, setState } from 'react';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
import { Card, makeStyles, Grid, Input, Typography, Box, Button, Badge, Hidden, IconButton, ListItemSecondaryAction} from '@material-ui/core';
import { borders } from '@material-ui/system';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

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

  const [profilePicture, setProfilePicture] = useState({
    preview: "https://i0.wp.com/www.industrialontologies.org/wp-content/uploads/2018/10/cropped-blank-profile-picture-973460_640.png?ssl=1",
  })

  const [pictures, setPictures] = useState({});
  const [imgCounter, setImgCounter] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [counter, setCounter] = useState(0);
  // let counter;

  // for (let [key, value] of Object.entries(pictures)) {
  //   // console.log(`${key}: ${value}`);
  //   console.log(`${value.preview}`);
  // }



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


  const handleChange = (e) => {
    // var files = e.target.Files || (e.dataTransfer && e.dataTransfer.files);
    // console.log(e.target.files[0]);
    // console.log(e.target.id);
    if (e && e.target.id === 'profileButton') {
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
            </Grid>
            <PictureBoxes />
            <Grid item xs={12}>
            <input accept="image/*" className={classes.input} type="file" id="uploadButton"
          style={{ display: 'none' }} onChange={(e) => handleChange(e)} disabled={isDisabled}/>
        <label htmlFor="uploadButton">
          <Button component="span" disabled={isDisabled} >
            Add picture
          </Button>
        </label>
            </Grid>
            <Grid item xs={12} className={classes.flexItem}>
              <IconButton name="submit" >
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