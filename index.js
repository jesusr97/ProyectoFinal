require('dotenv').config();

const express=require('express');
const cors=require('cors');

const{ dbConnection } =require('./src/backend/BD/config.js');

//Crear el servidor de express
const app=express();

//Configurar cors
app.use(cors());

//Base de datos
dbConnection();


//Rutas
//cadena Conex URI compass 
//mongodb+srv://JesusRueda:Goku9037%40@cluster0.ebxmw4w.mongodb.net/ProyectoFinalDAW
app.get('/',(req,res)=>{

    res.json({
        ok:true,
        msg: "HOLA Mundo"
    });

});

app.listen(process.env.PORT, ()=>{

    console.log('Servidor corriendo en puerto' + process.env.PORT);
});