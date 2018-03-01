const express = require('express')
app = express();

http = require('http').Server(app);
io = require('socket.io')(http);

bodyParser = require('body-parser')
i18n = require('i18n');
path = require('path')
userRoutes = require('./routes/users')
publicsRoutes = require('./routes/publications')
cors = require('cors')
morgan = require('morgan')
session = require('express-session')

// middlewares settings
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
    secret: 'geek',
    resave: false,
    saveUninitialized: true
}))


// SOCKET SETTINGS

io.on('connection', (socket) => {
    console.log('socket conectado');
})




i18n.configure({
    locales: ['en', 'es'],
    directory: path.join(__dirname, '/public/lang'),
    updateFiles: true,
    defaultLocale: 'es'
})

app.use(i18n.init);

app.use(function(req, res, next) {
    res.locals.__ = req.__ = function() {
        return i18n.__.apply(req, arguments)
    }
    next()
})

app.use('/api', userRoutes)
app.use('/api', publicsRoutes)


app.use(express.static(path.join(__dirname, 'public')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})


module.exports = http