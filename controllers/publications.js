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
    
}



module.exports = {
    createPublic,
    getPublics,
    deletePublic,
    updatePublic
}