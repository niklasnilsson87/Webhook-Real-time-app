/**
 * The starting point of the application.
 *
 * @author Niklas Nilsson
 * @version 1.0
 */

const express = require('express')
const path = require('path')
const hbs = require('express-hbs')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const app = express()

app.use(helmet())

// middleware for bodyparser.
app.use(bodyParser.raw({
  type: 'application/json'
}))

// Content Security Policy, set up a white-list to allow sources from the list.
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    imgSrc: ["'self'", 'avatars3.githubusercontent.com'],
    styleSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com'],
    scriptSrc: ["'self'", 'use.fontawesome.com', 'cdnjs.cloudflare.com']
  }
}))

// connection to websocket.
const server = require('http').createServer(app)
server.listen(3000, () => console.log('server running on port 3000'))
const io = require('socket.io')(server)

io.on('connection', (socket) => {
  console.log('Client ' + socket.id + ' connected')
})

// set socket so i can use it in another file.
app.set('socket.io', io)

// Configure rendering engine, with change extension to .hbs.
app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}))

// Setup view engine.
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// Serves the static files.
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/homeRouter'))
app.use('/webhook', require('./routes/webhookRouter'))

// Error handler
app.use((req, res, next) => {
  res.status(404)
  res.sendFile(path.join(__dirname, 'public', '404.html'))
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message || 'internal Server Error')
})
