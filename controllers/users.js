const config = require('../config')

const conexion = config.dbConnection()

const email = require('emailjs')

const bcrypt = require('bcrypt')
const md5 = require('md5')
const smtp = email.server.connect({
    user: "christianmota07@gmail.com",
    password: "458217821782",
    host: "smtp.gmail.com",
    ssl: true,
    port: 465
})



function login(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    conexion.query("SELECT * FROM usuarios WHERE correo = ? AND activo = 1", [ email ], (err, user, fields) => {
        if (err) {
            console.log(err)
        } 
        if(!user) {
            return res.status(401).send({message: 'Aceso Denegado'})
        } else {
            bcrypt.compare(password, user.password, (err, ok)=>{
                if(ok) {
                    return res.status(200).send()
                } else {
                    return res.status(401).send({message: 'Acceso Denegado'})
                }
            })
        }

    })
}


function createUser(req, res) {
    console.log(req.body);
    
    bcrypt.hash(req.body.password, 10, (err, hash)=>{
    if(err) return res.status(500).send({message: `error al registrar`})
    if(!req.body.name || !req.body.email || !req.body.password) {
        return res.status(401).send({message: 'tienes que enviar todos los campos correctamente'})
    }

    conexion.query("INSERT INTO usuarios (nombre, correo, token, password) VALUES(?,?,?,?)", [req.body.name, req.body.email, md5(req.body.email), hash], function(err, user, fields) {
        if(err) return res.status(500).send({message: `error al crear el usuario ${err}`})


        smtp.send({
            from: "christianmota07@gmail.com",
            to: req.body.email,
            subject: 'link de activacion',
            text: 'activa tu cuenta para ser un super usuario',
            attachment: [
                { data: '<html><h1>Hola! '+req.body.name+'</h1><p>Haga click aqui <a hre="http://localhost:3000/api/activation/'+md5(req.body.email)+'">Aqui para activar</a></p></html>' }
            ]
        })

    })

})
}


function getUsers(req, res) {
    conexion.query('SELECT * FROM grupos', (err, users) => {
        if (err) return res.status(200).send({ message: `error al buscar los usuarios ${err}` })

        if (!users) return res.status(404).send({ message: `no se encontraron usuarios ${users}` })
        return res.status(200).send({ users })
    })
}

function verifyToken(req, res) {
    let token = req.params.token;

    conexion.query('UPDATE users SET activo = 1 WHERE token = ?', [token], function(err, user, fields){
        if(err) return res.status(500).send({message: `error al activar el usuario ${err}`})


    conexion.query('SELECT name FROM users WHERE token = ?', [token], function(err, userUpdate, fields){
        if(err) return res.status(500).send({message: `error al activar el usuario ${err}`})
        if(!userUpdate) return res.status(401).send({message: 'usuario no existe'})
        return res.status(200).send({userUpdate})
    })  
})
}


module.exports = {
    createUser,
    getUsers,
    verifyToken
}