import React, { useState } from 'react';
import { Card, makeStyles, Grid, Typography, IconButton, TextField, useTheme, Chip, Button} from '@material-ui/core';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
import red from '@material-ui/core/colors/red';
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
  flexItem: {
    // display: 'flex',
    // alignItems: 'center',
    // flexDirection: 'column'
  },
  submitButton: {
    margin: theme.spacing(1),
  },
  hashtagsCards: {
    maxLength: '500px',
  }
}));
const redShades = [red[200], red[300], red[400], red[500], red[600], red[700], red[800], red[900] ];


const UsrHashtagDisplay = ({ hashtags }) => {

  return (
    hashtags.map((hashtag, key) =>
      <Grid item key={key}>
        <Chip style={{ backgroundColor: `${redShades[Math.floor(Math.random()*redShades.length)]}`, color: 'white'}}
        label={
          <p>#{hashtag}</p>
        }>
        </Chip>
      </Grid>
    )
  );
}

const HashtagsUpload = () => {

//////////////////////    TEST
  const [usrHashtags, setUsrHashtags] = useState(["lover", "geek", "42", "outdoors", "no-gym", "dogperson"]);
  const [listHashtags, setListHashtags] = useState(["catperson", "coffee", "travel", "vegan", "netflixandchill", "lol", "book", "gymrat", "dance"]);
/////////////////////

const [hashtagInput, setHashtagInput] = useState('');

  const classes = useStyles();
  const history = useHistory();
  // const UsrHashtagDisplay = UsrHashtagDisplay();

  const handleInputChange = (e) => {
    const { length } = e.target.value;
    if (length <= 15) {
      setHashtagInput(e.target.value);
    }
  }



  const ListHashtagsDisplay = () => {
    return (
      listHashtags.map((hashtag, key) =>
        <Grid item key={key}>
          <Chip
          label={
            <p>#{hashtag}</p>
          }>
          </Chip>
        </Grid>      
      )
    );
  }

  return (
    <Grid container spacing={1} justify="center">
    <Grid item xs={12} sm={10} md={8} lg={6}>
      <Card id="ImageUploadCard" >
          <Typography className={classes.formTitle} variant="h2" align="center" >
            #matcha
          </Typography>
        <Grid container spacing={1} align="center">
          <Grid item xs={8} >
            <Card variant="outlined" className={classes.hashtagsCards} >
              <Grid container spacing={1}>
                <UsrHashtagDisplay hashtags={usrHashtags} />
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card variant="outlined" className={classes.hashtagsCards} >
            <TextField variant="outlined" type="text" fullWidth={true} margin="dense" value={hashtagInput}
              InputProps={{startAdornment: <p>#</p>}} onChange={(e) => handleInputChange(e)}
            />
            <Button name='submitHashtag' align="right">ADD</Button>
              <Grid container spacing={1}>
                <ListHashtagsDisplay />
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} className={classes.flexItem}>
            <IconButton name="submit" className={classes.submitButton} >
              <ChevronRightSharpIcon color="secondary" />
            </IconButton>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  </Grid>
  );
};

export default HashtagsUpload;