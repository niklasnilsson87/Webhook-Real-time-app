const express = require('express')
const path = require('path')
const hbs = require('express-hbs')
const helmet = require('helmet')
const app = express()
const GithubWebbHook = require('express-github-webhook')
const bodyParser = require('body-parser')

const github = GithubWebbHook({ path: '/', secret: process.env.ACCESS_TOKEN })

app.use(bodyParser.urlencoded({ extended: true }))

app.use(github)

const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(helmet())

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com'],
    scriptSrc: ["'self'", "'unsafe-inline'", 'use.fontawesome.com', 'cdnjs.cloudflare.com']
  }
}))

app.set('github', github)
app.use(github)
app.set('socket.io', io)

io.on('connection', (socket) => {
  console.log('before issue: ', socket)
  github.on('issues', (repo, data) => {
    console.log('socket: ', socket)
    socket.emit('issue', () => console.log('data: ' + data, 'repo: ' + repo))
  })
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
