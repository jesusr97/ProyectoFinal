require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./src/backend/BD/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();


// Rutas
app.use( '/api/usuarios', require('./src/backend/routes/usuarios-routes') );
app.use( '/api/login', require('./src/backend/routes/auth') );
app.use( '/api/ocupacion', require('./src/backend/routes/ocupacion-routes') );
app.use( '/api/servicios', require('./src/backend/routes/servicios-routes') );
app.use( '/api/todo', require('./src/backend/routes/busquedas') );



app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});

