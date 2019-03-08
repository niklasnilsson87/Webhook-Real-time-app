const express = require('express')
const path = require('path')
const hbs = require('express-hbs')
const helmet = require('helmet')
const app = express()

const fetchIssues = require('./lib/fetchIssue')

app.use(helmet())

app.use(express.urlencoded({ extended: false }))
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com'],
    scriptSrc: ["'self'", "'unsafe-inline'", 'use.fontawesome.com', 'cdnjs.cloudflare.com']
  }
}))

const server = require('http').createServer(app)
server.listen(3000, () => console.log('server running on port 3000'))
const io = require('socket.io')(server)

io.on('connection', async socket => {
  let result = await fetchIssues('https://api.github.com/repos/1dv023/nn222ia-examination-3/issues')
  io.emit('issue', { issue: result })
})

app.set('socket.io', io)

app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/homeRouter'))
app.use('/webhook', require('./routes/webhookRouter'))

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
