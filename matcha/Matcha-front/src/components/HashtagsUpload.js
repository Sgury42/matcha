import React, { useState } from 'react';
import { Card, makeStyles, Grid, Typography, IconButton, TextField, Chip, Button} from '@material-ui/core';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
import red from '@material-ui/core/colors/red';
// import { useHistory } from "react-router-dom";


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
  },
  addButton: {
    margin: theme.spacing(1),
  }
}));





const HashtagsUpload = () => {

  //////////////////////    TEST
  const [usrHashtags, setUsrHashtags] = useState(["lover", "geek", "42", "outdoors", "no-gym", "dogperson"]);
  const [listHashtags, setListHashtags] = useState(["catperson", "coffee", "travel", "vegan", "netflixandchill", "lol", "book", "gymrat", "dance"]);

  const redShades = [red[200], red[300], red[400], red[500], red[600], red[700], red[800], red[900] ];
  const [hashtagInput, setHashtagInput] = useState('');

  const classes = useStyles();
  // const history = useHistory();
  // const UsrHashtagDisplay = UsrHashtagDisplay();

  const handleAddNew = () => {
    // console.log(usrHashtags.indexOf(hashtagInput, 1) === -1);
    if (usrHashtags.indexOf(hashtagInput, 1) === parseInt(-1) && hashtagInput) {
      if (listHashtags.indexOf(hashtagInput, 1) === parseInt(-1)) {
        ////////////ADD NEW HASHTAG TO LIST OF ALL HASHTAGS IN DB
    //   const result = await fetch(`localhost:8080/api/accounts/addHashtag`, {
  //     method: 'post',
  //     body: JSON.stringify({ props.hashtags }),
  //     headers: { 'Content-Type': 'application/json' }
    // });
   
    //   const body = await result.json();
    //   if (result.ok) {
          // handleAdd(hashtagInput);
      // }
      }
          handleAdd(hashtagInput);
    }
    setHashtagInput('');
  }

  const handleAdd = (hashtag) => {
    //   const result = await fetch(`localhost:8080/api/accounts/addHashtag`, {
    //     method: 'post',
    //     body: JSON.stringify({ props.hashtags }),
    //     headers: { 'Content-Type': 'application/json' }
    // });
  
    //   const body = await result.json();
    //   if (result.ok) {
        // history.push('');

          var index;
          let tmpArray = [...listHashtags];
          if ((index = tmpArray.indexOf(hashtag)) > -1) {
            tmpArray.splice(index, 1);
            setListHashtags(tmpArray);
          }
          tmpArray = usrHashtags;
          tmpArray.push(hashtag);
          setUsrHashtags(tmpArray);
// }
}

  const handleInputChange = (e) => {
    const { length } = e.target.value;
    if (length <= 15) {
      setHashtagInput(e.target.value);
    }
  }

  const UsrHashtagDisplay = () => {

    const handleDelete = async (hashtag) => {
        // console.log(e);
        //   const result = await fetch(`localhost:8080/api/accounts/removeHashtag`, {
        //     method: 'post',
        //     body: JSON.stringify({ hashtag }),
        //     headers: { 'Content-Type': 'application/json' }
        // });
      
        //   const body = await result.json();
        //   if (result.ok) {
            // history.push('');
  
            ///////// WHY ELEMENT RELOAD ONLY WHEN INPUT??????
            var index;
            let tmpArray = [...usrHashtags];
            if ((index = tmpArray.indexOf(hashtag)) > -1) {
              tmpArray.splice(index, 1);
              console.log(tmpArray)
              setUsrHashtags(tmpArray);
              // console.log(usrHashtags);
            }
            
  
  
        //   }
    }
    
    return (
      usrHashtags.map((hashtag, key) =>
        <Grid item key={key}>
          <Chip id={hashtag} style={{ backgroundColor: `${redShades[Math.floor(Math.random()*redShades.length)]}`, color: 'white'}}
          onDelete={() => handleDelete(hashtag)}
          //  {...(props.optDelete ? {onDelete: () => handleDelete(hashtag)} : {})}
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