import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteAccount } from '../redux/requests';
import { makeStyles, Card, Button, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

// const useStyles = makeStyles(theme => ({
//   deletePanelHeader: {
//     backgroundColor: theme.palette.secondary.main,
//     color: "white"
//   }
// }));

const DeleteAccount = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  // const classes = useStyles();

  // const [expanded, setExpanded] = useState('false');

  // const handleChange = (panel) => (event, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false);
  // }

  const handleDelete = () => {
    dispatch(deleteAccount());
    history.push('/');
  }

  return (
    <Card>
      <Button color="secondary" fullWidth onClick={() => setOpen(true)}>DELETE</Button>
      <Snackbar open={open}>
        <Alert color="error" action={
          <>
          <Button color="inherit" size="small" onClick={() => setOpen(false)}>CANCEL</Button>
          <Button color="inherit" size="small" onClick={handleDelete}>DELETE</Button>
          </>
          }
        >
          Are you sure you want to delete your account ? 
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default DeleteAccount;