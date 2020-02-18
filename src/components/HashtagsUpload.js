import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setObject } from '../redux/objects/actions';
import { hashtags } from '../redux/requests';
import { Card, makeStyles, Grid, Typography, IconButton, TextField, Chip, Button} from '@material-ui/core';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
import red from '@material-ui/core/colors/red';


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
  hashtagsCards: {
    maxLength: '500px',
  },
  addButton: {
    margin: theme.spacing(1),
  }
}));

const HashtagsUpload = (props) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [usrHashtags, setUsrHashtags] = useState({
    hashtags: props.usrHashtags ? props.usrHashtags : [],
  });
  const [listHashtags, setListHashtags] = useState(["catperson", "coffee", "travel", "vegan", "netflixandchill", "lol", "book", "gymrat", "dance", "lover", "geek", "42", "outdoors", "no-gym", "dogperson"]);

  const redShades = [red[200], red[300], red[400], red[500], red[600], red[700], red[800], red[900] ];
  const [hashtagInput, setHashtagInput] = useState('');

  useEffect(() => {
    var index;
    let tmpArray = [...listHashtags];
    tmpArray.map(hashtag => {
      if ((index = usrHashtags.hashtags.indexOf(hashtag)) > -1) {
        index = tmpArray.indexOf(hashtag);
        tmpArray.splice(index, 1);
      }
    })
    setListHashtags(tmpArray);
  }, [usrHashtags.hashtags])

  const handleAddNew = () => {
    if (usrHashtags.hashtags.indexOf(hashtagInput, 1) === parseInt(-1) && hashtagInput) {
      // if (listHashtags.indexOf(hashtagInput, 1) === parseInt(-1)) {
        ////////////ADD NEW HASHTAG TO LIST OF ALL HASHTAGS IN DB
      // }
      handleAdd(hashtagInput);
    }
    setHashtagInput('');
  }

  const handleAdd = (hashtag) => {
    var index;
    let tmpArray = [...listHashtags];
    if ((index = tmpArray.indexOf(hashtag)) > -1) {
      tmpArray.splice(index, 1);
      setListHashtags(tmpArray);
    }
    tmpArray = usrHashtags.hashtags;
    tmpArray.push(hashtag);
    setUsrHashtags({ ...usrHashtags, [hashtags]: tmpArray });
    //ADD NEW LIST OF USER HASHTAGS INTO DB
    dispatch(hashtags(usrHashtags));
}

  const handleInputChange = (e) => {
    const { length } = e.target.value;
    if (length <= 15) {
      setHashtagInput(e.target.value);
    }
  }

  const UsrHashtagDisplay = () => {

    const handleDelete = (hashtag) => {
      var index;
      let tmpArray = usrHashtags.hashtags;
      if ((index = tmpArray.indexOf(hashtag)) > -1) {
        tmpArray.splice(index, 1);
        setUsrHashtags({ ...usrHashtags, [hashtags]: tmpArray });
      //DELETE FROM DB
        dispatch(hashtags(usrHashtags));
      }
    }
    return (
      usrHashtags.hashtags.map((hashtag, key) =>
        <Grid item key={key}>
          <Chip id={hashtag} style={{ backgroundColor: `${redShades[Math.floor(Math.random()*redShades.length)]}`, color: 'white'}}
          // {/* <Chip id={hashtag} style={{ backgrountColor: 'secondary', color: 'white'}} */}
          onDelete={() => handleDelete(hashtag)}
          label={
            <p>#{hashtag}</p>
          }>
          </Chip>
        </Grid>
      )
    );
  }

  const ListHashtagsDisplay = () => {

    return (
      listHashtags.map((hashtag, key) =>
        <Grid item key={key}>
          <Chip clickable={true} onClick={() => handleAdd(hashtag)}
          label={
            <p>#{hashtag}</p>
          }>
          </Chip>
        </Grid>      
      )
    );
  }

  const handleSubmit = () => {
    if (props.createProfile) {
      dispatch(setObject('profileStep', 'orientationAndpreferences'));
    }
  }

  return (
    <Grid container spacing={1} justify="center">
    <Grid item xs={12} >
      <Card id="ImageUploadCard" >
          <Typography className={classes.formTitle} variant="h2" align="center" >
            #matcha
          </Typography>
        <Grid container spacing={1} align="center">
          <Grid item xs={12} md={8}>
            <Card variant="outlined" className={classes.hashtagsCards} >
              <Grid container spacing={1}>
                <UsrHashtagDisplay />
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined" className={classes.hashtagsCards} >
            <Grid container spacing={2} justify="flex-end" >
              <TextField variant="outlined" type="text" fullWidth={true} margin="dense" value={hashtagInput}
                InputProps={{startAdornment: <p>#</p>}} onChange={handleInputChange} />
              <Button name='submitHashtag' variant="contained" color="secondary" size="small" className={classes.addButton} onClick={handleAddNew}>ADD</Button>
                <Grid container spacing={1}>
                  <ListHashtagsDisplay />
                </Grid>
            </Grid>
            </Card>
          </Grid>
          { props.createProfile ? 
          <Grid item xs={12} className={classes.flexItem}>
            <IconButton name="submit" className={classes.submitButton} onClick={handleSubmit} >
              <ChevronRightSharpIcon color="secondary" />
            </IconButton>
          </Grid>
          :
          <></>
          }
        </Grid>
      </Card>
    </Grid>
  </Grid>
  );
};

export default HashtagsUpload;