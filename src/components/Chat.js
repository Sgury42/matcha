import React, { Component } from "react";
import { TextField, Button } from '@material-ui/core';
import Cookies from 'js-cookie';
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            newMessage: "",
            to_id: props.match.params.to_id,
            from_id: props.match.params.from_id,
        }

        this.styles = {
            channelList: {
                display: "flex",
                flex: 1,
                flexDirection: "column",
                maxHeight: "80%",
                width: "105%",
                overflowY: "scroll",
                overflowX: "hidden",
                bottom: 0,
                position: 'absolute',
                marginBottom: "130px"
            },
            container: {
                height: "80%",
                marginLeft: '20%',
                marginRight: '20%',
                position: 'absolute',
                width: '60%',
                float: 'left'
            },
            input: {
                width: '80%',
                float: 'left',
                position: 'absolute',
                bottom: 0,
                marginBottom: '40px',
            },
            btn: {
                backgroundColor: '#ff3c58',
                color: 'white',
                bottom: 0,
                right: 0,
                width: '15%',
                marginBottom: '40px',
                position: 'absolute',
                height: '60px'
            },
            talkbubble: {
                margin: '10px',
                display: 'inline-block',
                position: 'relative',
                width: '200px',
                height: 'auto',
                backgroundColor: "#e8e8e8",
                borderRadius: "10px",
            },
            talktext: {
                padding: '1em',
                textAlign: 'left',
                lineHeight: '1.5em',
            },
            loginmsg: {
                marginLeft: "10px",
                marginTop: "10px",
                fontWeight: "bold"
            }
        }
        this.getMessages()
    }

    reqMessages = async () => {
        await axios.get('http://localhost:8080/chats', {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "token": Cookies.get('token'),
                "to_id": this.state.to_id
            }
        }).then(async function (response) {
            var messages = response.data
            var tmp = []
            for (const index in messages) {
                tmp.push(messages[index])
            }
            return tmp
        }).then((tmp) => {
            if (tmp.length !== this.state.messages.length){
                window.location.reload(false);
            }
        }).catch(function (error) {
            console.log(error.response);
        })
    }

    getMessages = async () => {
        const messages = []
        await axios.get('http://localhost:8080/chats', {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "token": Cookies.get('token'),
                "to_id": this.state.to_id
            }
        }).then(async function (response) {
            messages.push(response.data)
        }).catch(function (error) {
            console.log(error.response);
        })
        for (const index in messages[0]) {
            const copie = this.state.messages.slice()
            copie.push(messages[0][index])
            this.setState({ messages: copie })
        }
    }

    getStyle = (from) => {
        if (from === this.state.from_id) {  //changed == for === because of warning 
            return {
                margin: '10px',
                display: 'inline-block',
                position: 'relative',
                width: '200px',
                height: 'auto',
                backgroundColor: "rgb(137, 190, 255)",
                borderRadius: "10px",
                marginLeft: "auto"
            }
        }
        else {
            return {
                margin: '10px',
                display: 'inline-block',
                position: 'relative',
                width: '200px',
                height: 'auto',
                borderRadius: "10px",
                backgroundColor: "#e8e8e8",
            }
        }
    }

    handleChangeInput = (event) => {
        const value = event.currentTarget.value;
        this.setState({ newMessage: value });
    }

    handleSubmit = async () => {
        this.setState({ newMessage: '' })
        await axios.post('http://localhost:8080/chats', {
            from_id: this.state.from_id,
            to_id: this.state.to_id,
            message: this.state.newMessage
        }, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "token": Cookies.get('token')
            }
        }).then(() => {
            window.location.reload(false);
            axios.post('http://localhost:8080/notifications/chat', {
              from_id: this.state.from_id,
              to_id: this.state.to_id,
              chat_id: '0'
            }, {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "token": Cookies.get('token')
              }
            }).then(() => {console.log('notification sent')})

        }).catch(function (error) {
            console.log(error.response);
        })
    }


    myInterval = setInterval(this.reqMessages, 2000);


    // componentWillUnmount() {
    //   clearInterval(this.myInterval)
    // }


    render() {

      


        return <div style={this.styles.container}>
            <div style={this.styles.channelList} id="box_message">{this.state.messages.map(el => (
                <div key={el.id} className="talk-bubble" style={this.getStyle(el.from_id)}>
                    <div style={this.styles.loginmsg}>{el.login}</div>
                    <div className="talktext" style={this.styles.talktext} >
                        <p>{el.message}</p>
                    </div>
                </div>
            ))}</div>
            <form onSubmit={this.handleSubmit} noValidate autoComplete="off" >
                <TextField id="multiline" variant="filled" onChange={this.handleChangeInput} value={this.state.newMessage} style={this.styles.input} />
                <Button variant="contained" onClick="submit" style={this.styles.btn}>Envoyer</Button>
            </form>
        </div>
    }
}

export default App;