import React from 'react';
import { Card, Avatar, Grid, Typography, CardActions, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ChatIcon from '@material-ui/icons/Chat';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

const useStyles = makeStyles(theme =>({
  grow: {
    flexGrow: 1
  },
  avatar: {
    transform: "scale(3)",
    margin: theme.spacing(3)
  },
  icons: {
    transform: "scale(1.3)"
  }
}));

const MatchListBox = ({match}) => {

  const classes = useStyles();

  return (
    <Card>
      <Grid container spacing={3} align="center">
        <Grid item xs={12}>
          <Avatar  alt={match.firstname} src={"./photos/" + match.pictures.profilePicture} className={classes.avatar}/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">{match.firstname} - {match.age}</Typography>
        </Grid>
      </Grid>
      <CardActions>
        <IconButton>
          <CloseRoundedIcon className={classes.icons} />
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