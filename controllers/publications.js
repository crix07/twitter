const config = require('../config')

const conexion = config.dbConnection()



function getPublics(req, res) {
    req.session.dato = "this works"
    conexion.query("SELECT posts ")
}

function deletePublic(req, res) {
    let publicId = req.params.id;

}


function updatePublic(req, res) {

}


function createPublic(req, res) {



    conexion.query("INSERT INTO posts (idUser, post) VALUES(?,?)", [req.body.id, req.body.text], function(err, rows, fields) {
        if (err) return res.status(500).send({ message: `error al publicar ${err}` })

        if (rows && rows.length > 0) {
            let post = rows[0];
            console.log(post);
        }

    })

}

module.exports = {
    createPublic,
    getPublics,
    deletePublic,
    updatePublic
}