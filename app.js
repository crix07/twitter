const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const i18n = require('i18n');
const path = require('path')
const index = require('./routes/users')


// middlewares settings
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: false }))

i18n.configure({
    locales: ['en', 'es'],
    directory: path.join(__dirname, '/public/lang'),
    updateFiles: true,
    defaultLocale: 'es'
})

app.use(i18n.init);

app.use(function(req, res, next){
    res.locals.__ = req.__ = function() {
        return i18n.__.apply(req, arguments)
    }
    next()
})


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use('/', index)


app.use(express.static(path.join(__dirname, 'public')))


module.exports = app