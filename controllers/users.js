const config = require('../config')
const jwt = require('../services/jwt');
const jwtDecode = require('jwt-simple')
const email = require('emailjs')
const User = require('../models/user');
const moment = require('moment')
const bcrypt = require('bcrypt-nodejs')
const smtp = email.server.connect({
    user: "christianmota07@gmail.com",
    password: "458217821782",
    host: "smtp.gmail.com",
    ssl: true,
    port: 465
})

function login(req, res) {
    let params = req.body
    let email = params.email
    let password = params.password

    if (!req.body.email || !req.body.password) {
        return res.status(403).send({ message: 'Favor rellenar todos los campos' })
    }


    User.findOne({ email: email }, (err, user) => {
        if (err) return res.status(500).send({ message: 'error en la peticion' })

        if (user) {
            bcrypt.compare(password, user.password, (err, check) => {
                if (check) {
                    if (!user.activo) return res.status(401).send({ message: 'favor revisa tu correo para activar tu cuenta' })
                    user.password = undefined
                    return res.status(200).send({
                        user,
                        token: jwt.createToken(user)
                    })
                } else {
                    return res.status(500).send({ message: 'el usuario no se ha podido identificar' })
                }
            })
        } else {
            return res.status(500).send({ message: 'el usuario no existe, Favor registrate' })
        }
    })
}


function createUser(req, res) {

    const email = req.body.email


    if (req.body.name && req.body.email && req.body.password) {
        User.find({ email: email.toLowerCase() }, (err, users) => {
            if (err) return res.status(500).send({ message: `error al buscar el email en la DB ${err}` })

            if (users && users.length >= 1) {
                users.map(user => {
                    return res.status(401).send({ message: `ya existe este usuario favor de iniciar sesion como ${user.email}` })
                })
            } else {
                const user = new User()
                user.name = req.body.name;
                user.email = req.body.email;

                bcrypt.hash(req.body.password, null, null, (err, hash) => {
                    user.password = hash

                    user.save((err, userStored) => {
                        if (err) return res.status(500).send({ message: `error al guardar el usuario ${err}` })
                        if (userStored) {
                            userStored.password = undefined
                            smtp.send({
                                from: "christianmota07@gmail.com",
                                to: req.body.email,
                                subject: 'Link de Activacion',
                                text: 'activa tu cuenta para ser un super usuario',
                                attachment: [
                                    { data: "<html><h1>Hola " + req.body.name + "!</h1><p>Has click <a href='http://localhost:3000/verify/" + jwt.createToken(userStored) + "'>Aqui</a> Para activar tu cuenta</p></html>", alternative: true }
                                ]
                            });
                            return res.status(200).send({ userStored })
                        } else {
                            return res.status(403).send({ message: 'el usuario no se guardo' })
                        }
                    })
                })
            }
        })
    } else {
        return res.status(500).send({ message: 'Favor rellenar todos los campos' })
    }
}




function verifyToken(req, res) {
    let token = req.params.token;

    let payload = jwtDecode.decode(token, config.secret)
    let userId = payload.sub
    let body = {
        activo: true
    }
    User.findByIdAndUpdate(userId, body, { new: true }, (err, userUpdate) => {
        if (err) return res.status(500).send({ message: `error ${err}` });
        return res.status(200).send({ userUpdate })
    })

}


function changePassword(req, res) {
    let userId = req.user.sub;
    User.findById(userId, (err, user) => {
        if (err) return res.status(500).send({ message: `error ${err}` });
        bcrypt.hash(req.body.password, null, null, (err, hash) => {
            if (err) return res.status(500).send({ message: `error ${err} ` });
            user.password = hash;
            user.save((err, userUpdate) => {
                if (err) return res.status(500).send({ message: `error ${err} ` });
                return res.status(200).send({ message: 'password actualizado' })
            })
        })
    })

}


module.exports = {
    createUser,
    verifyToken,
    login,
    changePassword
}