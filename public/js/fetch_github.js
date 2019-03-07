const socket = require('socket.io')

const io = socket.io()

io.on('issue', (data) => {
  console.log(data)
})
