import React from 'react';
import { Grid, Card, makeStyles, GridListTile, GridList, Avatar, Typography, IconButton, Chip, CardMedia, CardContent, CardActions } from '@material-ui/core';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
// import { mergeClasses } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
  iconButton: {
    transform: "scale(1.8)",
    margin: "25px"
  },
  likeButton: {
    marginLeft: 'auto',
    transform: "scale(1.8)",
    margin: "25px"
  },
  avatar: {
    height: "100px",
    width: "100px"
  },
  hashtagBox: {
    maxHeight: "150px",
    overflow: "scroll"
  }
}));

const SwipeBox = () => {
  const classes = useStyles();

//example datas 
  const userInfos = {
    name: "gury",
    firstname: "sandra",
    mail: "sandra.gury@gmail.com",
    passwd: "xxx",
    dateBirth: "May 14 1993",
    age: "26",
    gender: "woman",
    description: "Hi! I'm new on Matcha but already love it!",
    pictures: {
        profilePicture: "sandrapp.jpeg",
        others: ["sandrap1.jpeg", "sandrap2.jpeg", "sandrap3.jpeg", "sandrap4.jpeg"]
    },
    researchParameters: {
      hastags: ["geek", "norminet", "love", "42", "student", "matchacouple", "react", "node", "norminet", "love", "matchacouple", "geek", "42", "student", "geek", "42", "student", "react", "node", "norminet", "love", "matchacouple", "react", "node",  "42", "student", "geek", "42", "student", "react", "node", "norminet", "love", "matchacouple", "react", "node"]
    }
  }
/////////////////

    return (
        <Grid container spacing={1} justify="center">
          <Grid item lg={6} md ={8} sm={10} xs={12} >
            <Card id="swipeBox">
              <CardMedia>
                <GridList cellHeight={250} cols={2}>
                  {userInfos.pictures.others.map(tile =>(
                    <GridListTile key={tile} cols={1}>
                      <img src={"./photos/" + tile} alt={tile} />
                    </GridListTile>
                  ))}
                </GridList>
              </CardMedia>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item>
                    <Avatar alt={userInfos.firstname} src={"./photos/" + userInfos.pictures.profilePicture} className={classes.avatar}/>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4">{userInfos.firstname}</Typography>
                    <Typography variant="caption">{userInfos.description}</Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.hashtagBox}>
                  {userInfos.researchParameters.hastags.map((hashtag, key) =>(
                    <Grid item key={key}>
                      <Chip color="secondary"
                        label={ <p>#{hashtag}</p> }>
                      </Chip>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
              <CardActions>
                <IconButton aria-label="dislike" edge="start" className={classes.iconButton}>
                  <NotInterestedIcon />
                </IconButton>
                <IconButton aria-label="like" color="secondary" className={classes.likeButton}>
                  <FavoriteTwoToneIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
    )
}

export default SwipeBox;