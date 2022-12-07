const { response } = require("express");
const { v4: uuidv4 } = require('uuid');

const fileUpload = (req,res = response) =>{

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos =['usuarios','servicios','ocupacion'];

    if(!tiposValidos.includes(tipo)){

        return res.status(400).json({
            ok:false,
            msg: "No es un usuario/servicio/ocupacion"
        });
    }

    //Validamos que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
      }
    
    // Procesar la imagen 
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length -1];
    const extensionesValidas = ['png','jpg','jpeg','gif'];

    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    //Path para guardar la imagen

    const path = `./src/backend/uploads/${ tipo }/${ nombreArchivo }`;

    // Mover la Imagen
    file.mv(path, (err) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // Actualizar la bae de dats (introducir las imagenes en la BD)
        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });

    });


}

module.exports={
    fileUpload
}