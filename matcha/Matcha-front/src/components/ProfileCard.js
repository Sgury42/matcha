import React from 'react';
import { Card, Grid, Box, Avatar, makeStyles, Chip, IconButton, } from '@material-ui/core';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import { red } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  // root: {
    // flexGrow: 1,
  // },
  grow: {
    flexGrow: 1,
  },
  flexItem: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  avatar: {
    width: '40%',
    height: 'auto',
    margin: '50px auto',
    // position: 'relative'
  },
  hashtags: {
    position: 'absolute',
    width: '100%',
    height: '100%'
    
    // margin: '10px'
  },
  card: {
    position: "relative",
    height: '300px',
    // display: 'flex',
    // justifyContent: 'center'
  }
}));

const ProfileCard = () => {
 
  //////////////////////TEST

  const possibleMatches = [
    {
    _id: 'id01',
    name: 'Gury',
    firstname: 'Sandra',
    mail: 'sandra.gury@gmail.com',
    passwd: '',
    dateBirth: '05-14-1993',
    age: '26',
    gender: 'woman',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim sed faucibus turpis in eu mi bibendum.',
    hashtags: ['42', 'photo', 'code', 'travels', 'cooking', 'punkrockmusic', '42', 'photo', 'code', 'travels', 'cooking', 'punkrockmusic'],
    pictures: {
        profilePicture: "https://i0.wp.com/www.industrialontologies.org/wp-content/uploads/2018/10/cropped-blank-profile-picture-973460_640.png?ssl=1",
        others: []
    },
    researchParameters: {
        hastags: {type: Array, "default" : []},
        localisation: {
            myLatitude: Number,
            myLongitude: Number,
            perimeter: {type: Number, "default": 20}
        },
        age: {
            min: Number,
            max: Number
        },
        gender: String
    },
    meta: {
        online: true,
        blocked: {
            status: {type: false, "default": false},
            Reason: ''
        },
        dateCreated: '01-01-2020',
        dateUpdate: Date
    },
    token: {type: String, "default": null}
},
{
  _id: 'id02',
  name: 'test',
  firstname: 'Test',
  mail: 'test@gmail.com',
  passwd: '',
  dateBirth: '02-14-1989',
  age: '30',
  gender: 'woman',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim sed faucibus turpis in eu mi bibendum.',
  hashtags: ['42', 'photo', 'code', 'travels', 'cooking', 'punkrockmusic', '42', 'photo', 'code', 'travels', 'cooking', 'punkrockmusic'],
  pictures: {
      profilePicture: "https://i0.wp.com/www.industrialontologies.org/wp-content/uploads/2018/10/cropped-blank-profile-picture-973460_640.png?ssl=1",
      others: []
  },
  researchParameters: {
      hastags: {type: Array, "default" : []},
      localisation: {
          myLatitude: Number,
          myLongitude: Number,
          perimeter: {type: Number, "default": 20}
      },
      age: {
          min: Number,
          max: Number
      },
      gender: String
  },
  meta: {
      online: true,
      blocked: {
          status: {type: false, "default": false},
          Reason: ''
      },
      dateCreated: '01-01-2020',
      dateUpdate: Date
  },
  token: {type: String, "default": null}
}
]

  //////////////////////////
  const classes = useStyles();

  
  const redShades = [red[200], red[300], red[400], red[500], red[600], red[700], red[800], red[900] ];
  const DisplayHastags = (hashtags) => {
  let hashtagArray = [];
  for (const hashtag in hashtags) {
    hashtagArray.push(
      <Grid item>
        <Chip id={hashtag}
          style={{ backgroundColor: `${redShades[Math.floor(Math.random()*redShades.length)]}`, color: 'white', margin: `${Math.floor(Math.random() * Math.floor(40))}` + 'px' }}
          label={
            <p>#{hashtags[hashtag]}</p>
          }>
        </Chip>
      </Grid>
    );
  }
  return(hashtagArray);
}

  return (
    possibleMatches.map((possibleMatch, key) =>
    <Grid container align="center" key={key}>
      <Grid item xs={12} sm={6} md={5} lg={4}>
        <Card className={classes.card}>
          <Grid container spacing={2} align='center'>
            <Grid item xs={12}>
              <Grid container className={classes.hashtags}>
                <DisplayHastags {...possibleMatch.hashtags}/>
              </Grid>
              <Avatar alt={possibleMatch.firstname} src={possibleMatch.pictures.profilePicture} className={classes.avatar}/>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <IconButton name="submit" className={classes.submitButton} variant="outlined">
              <ExpandMoreRoundedIcon color="secondary" />
            </IconButton>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  )
  );
}

export default ProfileCard;