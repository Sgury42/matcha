import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: "60%",
            bottom: 0,
            position: 'absolute',
            'margin-bottom': '40px',
        },
    },
}));

const styles = {
    channelList: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        flex: 1,
        display: "flex",
        flexDirection: "row",
        height: "80%",
    },
    container: {
        height: "80%",
        "margin-left": '20%',
        "margin-right": '20%',
        position: 'absolute',
        width: '60%',
        float: 'left'
    },
    input: {
        width: '80%',
        float: 'left'
    },
    btn: {
        'background-color': '#ff3c58',
        color: 'white',
        bottom: 0,
        right: 0,
        width: '15%',
        'margin-bottom': '40px',
        position: 'absolute',
        height: '60px'
    }
}

// const getMessage = () => {
//     const currentUser = useSelector(state => state.objects.currentUser);

//     return <div>
//         {props}
//         <h1>OK</h1>
//     </div>
// }

const Chat = () => {
    const classes = useStyles();
    const currentUser = useSelector(state => state.objects.currentUser);

    return <div style={styles.container}>
        <div style={styles.channelList}>{currentUser.name}</div>
        <form className={classes.root} noValidate autoComplete="off" >
            <TextField id="multiline" variant="filled" style={styles.input} />
            <Button variant="contained" style={styles.btn}>Envoyer</Button>
        </form>
    </div>
}

export default Chat;