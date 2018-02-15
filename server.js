const app = require('./app')
const config = require('./config')
var mysql = require('mysql');

var conexion = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'twitter'
});
 
conexion.connect((err)=>{
    if(err) {
        console.log(`error al conectar a la base de datos ${err.stack}`);
        return;
    } 
    
    if(!err) {
        console.log('conexion establecida exitosamente');
        app.listen(config.port, ()=>{
            console.log(`server is listening on port ${config.port}`);       
        })
    }
});

