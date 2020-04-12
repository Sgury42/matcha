import React, { useEffect,useState } from 'react';
import { useDispatch, } from 'react-redux';
import { Grid, Card, makeStyles, GridListTile, GridList, Avatar, Typography, IconButton, Chip, CardMedia, CardContent, CardActions } from '@material-ui/core';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import ReportIcon from '@material-ui/icons/Report';
import { usrInteraction } from '../redux/requests';
import { setObject, removeLiked } from '../redux/objects/actions';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  halfGrow: {
    flexGrow: 0.35
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
  },
  textInfos: {
    fontSize: 20,
  },
  botMarg: {
    marginBottom: theme.spacing(3)
  }
}));

const SwipeBox = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const { userInfos } = props;
  const [lastConnection, setLastConnection] = useState(userInfos.lastConnection);
  const [address, setAddress] = useState('');
  const cibleLocation = props.userInfos.location;

  useEffect(() => {
    const date = new Date(lastConnection);
    setLastConnection(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit' }).format(date));
    getAddress(cibleLocation.latitude, cibleLocation.longitude);
  }, []);

  const handleLike = () => {
     dispatch(usrInteraction('/likes', {to_id: props.usrId, from_id: props.currentUser.id, like_id: '0'}, props.index));
     dispatch(removeLiked('cibles', props.index ));
  }

  const handleDislike = () => {
    dispatch(setObject('index', props.index + 1));
  }

  const handleReport = () => {
    dispatch(usrInteraction('/accounts/report', {to_id: props.usrId, message: 'report'}));
    dispatch(setObject('index', props.index + 1));
  }

  const getAddress = (lat, lng) => {
    fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng +"&key=" + KEY)
    .then(response => {
      response.json()
      .then(datas => {
        if (datas.results[6]) {
          const address = datas.results[6].formatted_address;
          setAddress(address);
        } else {
          setAddress('');
        }
      })
    })
    .catch(err => console.log(err));
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
                <Grid container spacing={1} >
                  <Grid item>
                    <Avatar alt={userInfos.firstname} src={userInfos.profilePicture} className={classes.avatar}/>
                  </Grid>
                  <Grid item>
                    <Grid container >
                    <Typography variant="h4">{userInfos.login}</Typography>
                    {userInfos.online ?
                    <FiberManualRecordIcon fontSize="small"  style={{color: "#8bc34a"}}/>
                    :
                    <Typography variant="body2" style={{color: "#757575"}}>last connection {lastConnection}</Typography>
                    }
                    </Grid>
                    </Grid>

                    <Grid container spacing={5} className={classes.botMarg}>
                    <div className={classes.halfGrow} />
                      <Grid item>
                        <Typography variant="body1" className={classes.textInfos}>{userInfos.firstname} - {userInfos.name}</Typography>
                        <Typography variant="body1" className={classes.textInfos}>{userInfos.age} years old</Typography>
                      </Grid>
                      <div className={classes.halfGrow} />
                      <Grid item>
                        <Typography variant="body1" className={classes.textInfos}>{address}</Typography>
                        <Typography variant="body1" className={classes.textInfos}>{userInfos.distance} meter away</Typography>
                      </Grid>
                    </Grid>

                    <Grid container justify="center">
                      <Typography variant="subtitle2" >compatibility {parseInt(userInfos.score)}% </Typography>
                    </Grid>
                    <Typography variant="body1">{userInfos.description}</Typography>
                  <div className={classes.grow} />
                  <Grid item>
                    <IconButton onClick={handleReport}>
                      <ReportIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.hashtagBox}>
                  {userInfos.hashtags.map((hashtag, key) =>(
                    <Grid item key={key}>
                      <Chip color="secondary"
                        label={ <p>#{hashtag}</p> }>
                      </Chip>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
              <CardActions>
                <IconButton aria-label="dislike" edge="start" className={classes.iconButton} onClick={handleDislike} >
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