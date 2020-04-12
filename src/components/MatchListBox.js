import React from 'react';
import { Card, Avatar, Grid, Typography, CardActions, IconButton, Tooltip } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { usrInteraction } from '../redux/requests';
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
        dispatch(usrInteraction('/accounts/block', {to_id: props.match.id}));
        window.location.reload();
        break ;
      case 'report':
        dispatch(usrInteraction('/accounts/report', {to_id: props.match.id, message: 'report'}));
        break ;
      case 'visitProfile':
        history.push('/matchProfile/' + props.match.id, {userInfos: props.match, usrId: props.match.id, currentUserId: props.currentUserId});
        break ;
      case 'dislike':
        dispatch(usrInteraction('/unmatch', {to_id: props.match.id}));
        window.location.reload();
        break ;
      case 'chat':
        history.push('/chat/' + props.match.id + '/' + props.currentUserId);
        break ;
      default:
        break ;
    }
  }

  return (
    <Card>
    <Grid container>
    <div className={ classes.grow } />
    <Tooltip title="block" arrow>
      <IconButton onClick={e => handleClick(e, 'block')}>
        <BlockOutlinedIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="report" arrow>
      <IconButton onClick={e => handleClick(e, 'report')}>
        <ReportOutlinedIcon />
      </IconButton>
    </Tooltip>
    </Grid>
      <Grid container spacing={1} align="center">
        <Grid item xs={12}>
          <Avatar  alt={props.match.firstname} src={props.match.profilePicture} className={classes.avatar} onClick={e => handleClick(e, 'visitProfile')} />
        </Grid>
        <Grid container justify="center">
          <Typography variant="h4">{props.match.login}</Typography>
          {props.match.online ?
          <FiberManualRecordIcon fontSize="small"  style={{color: "#8bc34a"}}/>
          :
          <Typography variant="body2" style={{color: "#757575"}}>last connection {props.match.lastConnection}</Typography>
          }
        </Grid>
      </Grid>
      <CardActions>
    <Tooltip title="unmatch" arrow>
      <IconButton onClick={e => handleClick(e, 'dislike')}>
        <FavoriteTwoToneIcon className={classes.icons} color="secondary" />
      </IconButton>
    </Tooltip>
      <div className={classes.grow} />
        <IconButton onClick={e => handleClick(e, 'chat')}>
          <ChatIcon className={classes.icons} color="secondary"/>
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default MatchListBox;