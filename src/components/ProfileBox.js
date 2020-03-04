import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Card, makeStyles, GridListTile, GridList, Avatar, Typography, IconButton, Chip, CardMedia, CardContent, CardActions, Box, Tooltip } from '@material-ui/core';
import { sizing } from '@material-ui/system';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
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
                    <Typography variant="h4">{datas.userInfos.login}</Typography>
                    {datas.userInfos.online ?
                    <FiberManualRecordIcon fontSize="small"  style={{color: "#8bc34a"}}/>
                    :
                    <Typography variant="body2" style={{color: "#757575"}}>xx xx xxxx</Typography>
                    }
                    </Grid>
                    </Grid>


                    <Grid container spacing={5} className={classes.botMarg}>
                    <div className={classes.halfGrow} />
                      <Grid item>
                        <Typography variant="body1" className={classes.textInfos}>{datas.userInfos.firstname} - {datas.userInfos.name}</Typography>
                        <Typography variant="body1" className={classes.textInfos}>{datas.userInfos.age} years old</Typography>
                      </Grid>
                      <div className={classes.halfGrow} />
                      <Grid item>
                        <Typography variant="body1" className={classes.textInfos}>75017 test City</Typography>
                        <Typography variant="body1" className={classes.textInfos}>20km away</Typography>
                      </Grid>
                    </Grid>

                    
                    <Grid container justify="center">
                      <Typography variant="subtitle2" >compatibility {parseInt(datas.userInfos.score)}% </Typography>
                    </Grid>
                    <Typography variant="body1">{datas.userInfos.description}</Typography>
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
        <span>test</span>
      }
      </>
    )
}

export default ProfileBox;