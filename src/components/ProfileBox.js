import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Card, makeStyles, GridListTile, GridList, Avatar, Typography, IconButton, Chip, CardMedia, CardContent, CardActions, Box} from '@material-ui/core';
import { sizing } from '@material-ui/system';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import ReportIcon from '@material-ui/icons/Report';
// import { mergeClasses } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
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
    overflowY: "scroll"
  }
}));

const SwipeBox = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const usrId = props.usrId ? props.usrId : props.match.params.usrId;
  // const userInfos = useSelector(state => state.objects.usrToDisplay);

  useEffect(() => {
    // dispatch(fetchUser('path', usrId));
  }, []);

//example datas 
  const userInfos = {
    login: "sgury",
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
    },
    popularité: "67",
    online: true,
  }
/////////////////

    return (
        <Grid container spacing={1} justify="center">
          <Grid item lg={6} md ={8} sm={10} xs={12} >
            <Card id="swipeBox" height="auto">
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
                    <Typography variant="h4">{userInfos.login} - {userInfos.age}</Typography>
                    <Typography variant="body1">{userInfos.description}</Typography>
                  </Grid>
                  <div className={classes.grow} />
                  <Grid item>
                    <IconButton>
                      <ReportIcon />
                    </IconButton>
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
                <div className={classes.grow}/>
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