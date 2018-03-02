const app = require('./app');
config = require('./config');
mongoose = require('mongoose');

mongoose.connect(config.db)
    .then(() => {
        console.log('conexion establecida exitosamente');
        app.listen(config.port, () => {
            console.log(`server is listening on port ${config.port}`);
        })

    })
    .catch(err => console.log(`error al conectar a la db ${err}`))