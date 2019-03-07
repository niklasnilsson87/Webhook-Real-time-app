const express = require('express')
const path = require('path')
const hbs = require('express-hbs')
const helmet = require('helmet')
const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(helmet())

io.on('connection', () => {
  io.on('connect')
})
server.listen(3000, () => console.log('server running on port 3000'))

app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/homeRouter'))

// Error handler
app.use((req, res, next) => {
  res.status(404)
  res.sendFile(path.join(__dirname, 'public', '404.html'))
})

app.use((err, req, res, next) => {
  if (err.message === '403') {
    res.status(403)
    res.sendFile(path.join(__dirname, 'public', '403.html'))
  } else {
    res.status(err.status || 500)
    res.send(err.message || 'internal Server Error')
  }
})

// Start listening.
// app.listen(3000, () => console.log('listening on port 3000....'))
