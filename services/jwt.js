'use strict'


const jwt = require('jwt-simple')
const moment = require('moment');
const config = require('../config')

exports.createToken = function(user) {
    let payload = {
        sub: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        iat: moment().format("DD/MM/YYYY"),
        exp: moment().add(3, 'days').calendar()
    }

    return jwt.encode(payload, config.secret)
}