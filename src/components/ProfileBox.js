import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Card, makeStyles, GridListTile, GridList, Avatar, Typography, IconButton, Chip, CardMedia, CardContent, CardActions, Tooltip } from '@material-ui/core';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import ReportIcon from '@material-ui/icons/Report';
import { usrInteraction } from '../redux/requests';
import { setObject } from '../redux/objects/actions';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';



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
    maxHeight: "200px",
    overflow: "auto"
  },
  textInfos: {
    fontSize: 20,
  },
  botMarg: {
    marginBottom: theme.spacing(3)
  }
}));

const ProfileBox = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [datas, setDatas] = useState({
    lastConnection: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).format(new Date(props.location.state ? props.location.state.userInfos.lastConnection : null)),
    location: ''
  });


  useEffect(() => {
    if (!props.location.state) {
      history.push('/');
    }
  });

  
  useEffect(() => {
    const getAddress = (lat, lng) => {
      fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng +"&key=" + process.env.REACT_APP_GOOGLE_API_KEY)
      .then(response => {
        response.json()
        .then(data => {
          if (data.results[6]) {
            setDatas({...datas, 'location': data.results[6].formatted_address});
          } else {
            return '';
          }
        })
      })
      .catch(err => console.log(err));
    }
    if (props.location.state)
      getAddress(props.location.state.userInfos.location.latitude, props.location.state.userInfos.location.longitude);
  }, [props.location.state, datas])

  const handleLike = () => {
     dispatch(usrInteraction('/likes', {to_id: props.usrId}, props.index));
  }

  const handleReport = () => {
    dispatch(usrInteraction('/accounts/report', {to_id: datas.usrId, message: 'report'}));
    dispatch(setObject('index', props.index + 1));
  }

    return (
      <>
      {props.location.state ?
        <Grid container spacing={1} justify="center">
          <Grid item lg={6} md ={8} sm={10} xs={12} >
            <Card id="swipeBox" height="auto">
              <CardMedia>
                <GridList cellHeight={250} cols={2}>
                  {props.location.state.userInfos.pictures.map(tile =>(
                    <GridListTile key={tile} cols={1}>
                      <img src={tile} alt={tile} />
                    </GridListTile>
                  ))}
                </GridList>
              </CardMedia>
              <CardContent>
                <Grid container spacing={1} >
                  <Grid item>
                    <Avatar alt={props.location.state.userInfos.firstname} src={props.location.state.userInfos.profilePicture} className={classes.avatar}/>
                  </Grid>
                  <Grid item>
                    <Grid container >
                    <Typography variant="h4">{props.location.state.userInfos.login}</Typography>
                    {props.location.state.userInfos.online ?
                    <FiberManualRecordIcon fontSize="small"  style={{color: "#8bc34a"}}/>
                    :
                    <Typography variant="body2" style={{color: "#757575"}}>last connection {datas.lastConnection}</Typography>
                    }
                    </Grid>
                    </Grid>


                    <Grid container spacing={5} className={classes.botMarg}>
                    <div className={classes.halfGrow} />
                      <Grid item>
                        <Typography variant="body1" className={classes.textInfos}>{props.location.state.userInfos.firstname} - {props.location.state.userInfos.name}</Typography>
                        <Typography variant="body1" className={classes.textInfos}>{props.location.state.userInfos.age} years old</Typography>
                      </Grid>
                      <div className={classes.halfGrow} />
                      <Grid item>
                        <Typography variant="body1" className={classes.textInfos}>{datas.location}</Typography>
                      </Grid>
                    </Grid>
                    <Typography variant="body1">{props.location.state.userInfos.description}</Typography>
                  <div className={classes.grow} />
                  <Grid item>
                    <Tooltip title="block" arrow>
                      <IconButton>
                        <BlockOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="report" arrow>
                      <IconButton onClick={handleReport}>
                        <ReportIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.hashtagBox}>
                  {props.location.state.userInfos.hashtags.map((hashtag, key) =>(
                    <Grid item key={key}>
                      <Chip color="secondary"
                        label={ <p>#{hashtag}</p> }>
                      </Chip>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
              <CardActions>
                <div className={classes.grow}/>
                <Tooltip title="unmatch" arrow>
                  <IconButton aria-label="like" color="secondary" className={classes.likeButton} onClick={handleLike}>
                    <FavoriteTwoToneIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        :
        null
        }
        </>
    )
}

export default ProfileBox;