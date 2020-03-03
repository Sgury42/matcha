import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Card, makeStyles, GridListTile, GridList, Avatar, Typography, IconButton, Chip, CardMedia, CardContent, CardActions, Box} from '@material-ui/core';
import { sizing } from '@material-ui/system';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import ReportIcon from '@material-ui/icons/Report';
import { usrInteraction } from '../redux/requests';
import { setObject } from '../redux/objects/actions';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


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

const ProfileBox = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [datas, setDatas] = useState({});


  useEffect(() => {
    console.log(props);
    if (!props.location.state) {
      history.push('/');
    } else if (props.location.state.userInfos) {
      setDatas({
        userInfos: props.location.state.userInfos,
        usrId: props.location.state.usrId,
        currentUserId: props.location.state.currentUserId
      })
    }
  }, []);

  useEffect(() => {
    console.log(datas);
  }, [datas]);

  const handleLike = () => {
    console.log('usrId = ' + datas.usrId);
    console.log('currentId = ' + datas.currentUserId);
     dispatch(usrInteraction('/likes', {to_id: props.usrId}, props.index));
  }

  const handleDislike = () => {
    dispatch(setObject('index', props.index + 1));
  }

  const handleReport = () => {
    dispatch(usrInteraction('/accounts/report', {to_id: datas.usrId, message: 'report'}));
    dispatch(setObject('index', props.index + 1));
  }

    return (
      <>
      {datas.userInfos ?
        <Grid container spacing={1} justify="center">
          <Grid item lg={6} md ={8} sm={10} xs={12} >
            <Card id="swipeBox" height="auto">
              <CardMedia>
                <GridList cellHeight={250} cols={2}>
                  {datas.userInfos.pictures.map(tile =>(
                    <GridListTile key={tile} cols={1}>
                      <img src={tile} alt={tile} />
                    </GridListTile>
                  ))}
                </GridList>
              </CardMedia>
              <CardContent>
                <Grid container spacing={1} >
                  <Grid item>
                    <Avatar alt={datas.userInfos.firstname} src={datas.userInfos.profilePicture} className={classes.avatar}/>
                  </Grid>
                  <Grid item>
                    <Grid container >
                    <Typography variant="h4">{datas.userInfos.login} - {datas.userInfos.age} ans</Typography>
                    {datas.userInfos.online ?
                    <FiberManualRecordIcon fontSize="small"  style={{color: "#8bc34a"}}/>
                    :
                    <FiberManualRecordIcon fontSize="small" color="disabled"/>
                    }
                    </Grid>
                    </Grid>
                    <Grid container justify="center">
                      <Typography variant="subtitle2" >compatibility {parseInt(datas.userInfos.score)}% </Typography>
                    </Grid>
                    <Typography variant="body1">{datas.userInfos.description}</Typography>
                  <div className={classes.grow} />
                  <Grid item>
                    <IconButton onClick={handleReport}>
                      <ReportIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.hashtagBox}>
                  {datas.userInfos.hashtags.map((hashtag, key) =>(
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
        :
        <span>test</span>
      }
      </>
    )
}

export default ProfileBox;