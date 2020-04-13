
export const connectSocket = (socket, usrId, dispatch, fetchDatas) => {

  socket.on('connect', () => {
      socket.emit('join', 'USR' + usrId);
    })
  socket.on('notification', (msg) => {
    console.log(msg);
    dispatch(fetchDatas('/notifications'));
  })
  socket.on('disconnect', () => {
    console.log('socket disconnected');
  })
}