import socketIOClient from 'socket.io-client';

// const socket = socketIOClient('http://localhost:8080');

export const connectSocket = () => {
  try {
    // socket = io(window.location.host, {
      // query: { token: Cookies.get('auth') }
    // })
    socket.on('connect', () => {
      // init(socket)
      // dispatch(updateObject('auth', { socketIsConnected: true }))
    })
  } catch (err) {
    console.error('Error connecting to socket !')
}