const { response } = require("express");

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
    

    res.json({
        ok: true,
        msg: 'fileUpload'
    })

}

module.exports={
    fileUpload
}