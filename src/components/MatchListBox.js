import React from 'react';
import { Card, Avatar, Grid, Typography, CardActions, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useDispatch } from 'react-redux';
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
  const dispatch = useDispatch();

  const handleBlock = () => {
    console.log(props.currentUserId);
    console.log(props.match.id);
    // dispatch(block({fromUser: }))
  }

  return (
    <Card>
    <Grid container>
    <div className={ classes.grow } />
    <IconButton onClick={handleBlock}>
      <BlockOutlinedIcon />
    </IconButton>
    <IconButton>
      <ReportOutlinedIcon />
    </IconButton>
    </Grid>
      <Grid container spacing={1} align="center">
        <Grid item xs={12}>
          <Avatar  alt={props.match.firstname} src={"./photos/" + props.match.pictures.profilePicture} className={classes.avatar}/>
        </Grid>
        <Grid container justify="center">
          <Typography variant="h4">{props.match.login}</Typography>
          {props.match.connected ?
          <FiberManualRecordIcon fontSize="small"  style={{color: "#8bc34a"}}/>
          :
          <FiberManualRecordIcon fontSize="small" color="disabled"/>
          }
        </Grid>
      </Grid>
      <CardActions>
      <IconButton>
        <FavoriteTwoToneIcon className={classes.icons} color="secondary" />
      </IconButton>
      <div className={classes.grow} />
        <IconButton>
          <ChatIcon className={classes.icons} color="secondary" />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default MatchListBox;