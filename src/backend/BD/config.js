const mongoose = require('mongoose');
const { async, throwError } = require('rxjs');


const dbConnection = async()=>{

    try {
        await mongoose.connect(process.env.DB_CONECT,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Base de datos Online');
    } 
    
    catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD');
    }

 

}

module.exports={
    dbConnection
}