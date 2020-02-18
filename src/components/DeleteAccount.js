import React, { useState } from 'react';
import { makeStyles, Card, Button } from '@material-ui/core';

// const useStyles = makeStyles(theme => ({
//   deletePanelHeader: {
//     backgroundColor: theme.palette.secondary.main,
//     color: "white"
//   }
// }));

const DeleteAccount = () => {

  // const classes = useStyles();

  // const [expanded, setExpanded] = useState('false');

  // const handleChange = (panel) => (event, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false);
  // }
  return (
    <Card>
      <Button color="secondary" fullWidth>DELETE</Button>
    </Card>
  );
}

export default DeleteAccount;