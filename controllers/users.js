var mysql = require('mysql');
const conexion =  require('../server')


function createUser(req, res) {
    console.log(req.body);
    
   conexion.query("INSERT INTO usuarios (nombre, correo, password) VALUES(?,?,?)",
        [req.body.nombre, req.body.correo, req.body.pass], function(err, user){

        })
}


function getUsers(req, res) {
    conexion.query('SELECT * FROM grupos', (err, users)=>{
        if(err) return res.status(200).send({message: `error al buscar los usuarios ${err}`})

        if(!users) return res.status(404).send({message: `no se encontraron usuarios ${users}`})
        return res.status(200).send({users})
    })
}


module.exports = {
    createUser,
    getUsers
}