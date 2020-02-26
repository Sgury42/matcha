import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Card, makeStyles, GridListTile, GridList, Avatar, Typography, IconButton, Chip, CardMedia, CardContent, CardActions, Box} from '@material-ui/core';
import { sizing } from '@material-ui/system';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import ReportIcon from '@material-ui/icons/Report';
import { usrInteraction } from '../redux/requests';
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
  const { userInfos } = props;

  // const usrId = props.usrId ? props.usrId : props.match.params.usrId;
  // const userInfos = useSelector(state => state.objects.usrToDisplay);

  useEffect(() => {
    // dispatch(fetchUser('path', usrId));
    console.log(userInfos);
  }, []);

  const handleLike = () => {
    console.log('usrId = ' + props.usrId);
    console.log('currentId = ' + props.currentUserId);
     dispatch(usrInteraction('/likes', {to_id: props.usrId}, props.index));
  }

    return (
        <Grid container spacing={1} justify="center">
          <Grid item lg={6} md ={8} sm={10} xs={12} >
            <Card id="swipeBox" height="auto">
              <CardMedia>
                <GridList cellHeight={250} cols={2}>
                  {userInfos.pictures.map(tile =>(
                    <GridListTile key={tile} cols={1}>
                      <img src={tile} alt={tile} />
                    </GridListTile>
                  ))}
                </GridList>
              </CardMedia>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item>
                    <Avatar alt={userInfos.firstname} src={userInfos.profilePicture} className={classes.avatar}/>
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
                  {/* {userInfos.hashtags.map((hashtag, key) =>(
                    <Grid item key={key}>
                      <Chip color="secondary"
                        label={ <p>#{hashtag}</p> }>
                      </Chip>
                    </Grid>
                  ))} */}
                </Grid>
              </CardContent>
              <CardActions>
                <IconButton aria-label="dislike" edge="start" className={classes.iconButton}>
                  <NotInterestedIcon />
                </IconButton>
                <div className={classes.grow}/>
                <IconButton aria-label="like" color="secondary" className={classes.likeButton} onClick={handleLike}>
                  <FavoriteTwoToneIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
    )
}

export default SwipeBox;