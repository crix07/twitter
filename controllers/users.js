var mysql = require('mysql');

var conexion = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'twitter'
});

conexion.connect()

function createUser(req, res) {
   
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