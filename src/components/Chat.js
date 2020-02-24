import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';

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

// const getMessage = (currentUser) => {

//     // const formData = {
//     //     from_id: currentUser.id,
//     //     to_id: 496
//     // }
//     axios.get('http://localhost:8080/chats', {
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//         "token": Cookies.get('token'),
//         "to_id": 496
//       }
//     })
//     .then(function (response) {
//         console.log(response)
//         response.map(el => {
//             return <h1></h1>
//         })
//         // response.map( msg => )
//     })
//     .catch(function (error) {
//       console.log(error.response);
//     })
// }

const Chat = () => {
    const classes = useStyles();
    const currentUser = useSelector(state => state.objects.currentUser);

    // state = {msg: []}
    const [msg, setMsg] = useState([]);

    axios.get('http://localhost:8080/chats', {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "token": Cookies.get('token'),
        "to_id": 496
      }
    })
    .then(function (response) {
        // this.setState({data: response})
        console.log(response);
    })
    .catch(function (error) {
      console.log(error.response);
    })
    // console.log(this.state.data)
    return <div style={styles.container}>
        <div style={styles.channelList}>{}</div>
        <form className={classes.root} noValidate autoComplete="off" >
            <TextField id="multiline" variant="filled" style={styles.input} />
            <Button variant="contained" style={styles.btn}>Envoyer</Button>
        </form>
    </div>
}

export default Chat;