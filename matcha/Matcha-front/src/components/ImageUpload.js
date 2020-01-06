import React, { useState, useEffect, setState } from 'react';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
import { Card, makeStyles, Grid, Input, Typography, Box, Button } from '@material-ui/core';

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
}));

const ImageUpload = () => {
  const classes = useStyles();

  const [profilePicture, setProfilePicture] = useState({
    id: null,
    preview: "https://i0.wp.com/www.industrialontologies.org/wp-content/uploads/2018/10/cropped-blank-profile-picture-973460_640.png?ssl=1",
    raw: null,
  });

  const handleChange = (e) => {
    // var files = e.target.Files || (e.dataTransfer && e.dataTransfer.files);
    console.log(e.target.files[0]);
    setProfilePicture({
      id: e.target.files[0].name,
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0]
    });

    // this.setState({
        // pictures: this.state.pictures.concat(picture),
    // });
  }

  // useEffect(() => {
    // var picturesArray = Object.keys(pictures);
  // }, [pictures])

  // const Preview = () => {
  //   var picturesArray = pictures.preview;
  //   console.log(picturesArray);
  //   return (
  //     <p>test</p>
        // picturesArray.map((picture, key) => (
            // <p key={picture.toString()}>{ pictures[picture]} </p>
          // )
      // )
    // );
  // }



  return (
    <Grid container spacing={1} justify="center">
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Card id="ImageUploadCard" className={classes.card}>
          <Typography className={classes.formTitle} variant="h2" align="center" >
              My pictures :
          </Typography>
          <Box id="profilePicture">
            <img src={profilePicture.preview} />
            {/* <input id="myInput" type="file" ref={(ref) => this.upload = ref} style={{ display: 'none' }} /> */}
            <input accept="image/*" className={classes.input} id="contained-button-file" multiple type="file" 
            style={{ display: 'none' }} onChange={handleChange} />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
          </Box>
          <form>
            {/* <Input type="file" inputProps={ {accept:"image/*"} } onChange={handleChange} /> */}
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ImageUpload;