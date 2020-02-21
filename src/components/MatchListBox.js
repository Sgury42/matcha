import React from 'react';
import { Card, Avatar, Grid, Typography, CardActions, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import ChatIcon from '@material-ui/icons/Chat';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';

const useStyles = makeStyles(theme =>({
  grow: {
    flexGrow: 1
  },
  avatar: {
    transform: "scale(3)",
    margin: theme.spacing(4)
  },
  icons: {
    transform: "scale(1.3)"
  }
}));

const MatchListBox = (props) => {

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();


  const handleClick = (e, action) => {
    switch (action) {
      case 'block':
        // dispatch(usrInterac('path', {fromUser: props.currentUserId, toUser: props.match.id}));
        break ;
      case 'report':
        // dispatch(usrInterac('path', {fromUser: props.currentUserId, toUser: props.match.id}));
        break ;
      case 'visitProfile':
        history.push('/' + props.match.id);
        break ;
      case 'dislike':
        // dispatch(usrInterac('path', {fromUser: props.currentUserId, toUser: props.match.id}));
        break ;
      case 'chat':
        history.push('/chat/' + props.match.id);
        break ;
    }
  }

  return (
    <Card>
    <Grid container>
    <div className={ classes.grow } />
    <IconButton onClick={e => handleClick(e, 'block')}>
      <BlockOutlinedIcon />
    </IconButton>
    <IconButton onClick={e => handleClick(e, 'report')}>
      <ReportOutlinedIcon />
    </IconButton>
    </Grid>
      <Grid container spacing={1} align="center">
        <Grid item xs={12}>
          <Avatar  alt={props.match.firstname} src={"./photos/" + props.match.pictures.profilePicture} className={classes.avatar} onClick={e => handleClick(e, 'visitProfile')} />
        </Grid>
        <Grid container justify="center">
          <Typography variant="h4">{props.match.login}</Typography>
          {props.match.connected ?
          <FiberManualRecordIcon fontSize="small"  style={{color: "#8bc34a"}}/>
          :
          <FiberManualRecordIcon fontSize="small" color="disabled"/>
          }
        </Grid>
        <Grid container justify="center">
          <Typography variant="subtitle1">compatibility: {props.match.popularite}%</Typography>
        </Grid>
      </Grid>
      <CardActions>
      <IconButton onClick={e => handleClick(e, 'dislike')}>
        <FavoriteTwoToneIcon className={classes.icons} color="secondary" />
      </IconButton>
      <div className={classes.grow} />
        <IconButton onClick={e => handleClick(e, 'chat')}>
          <ChatIcon className={classes.icons} color="secondary"/>
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default MatchListBox;