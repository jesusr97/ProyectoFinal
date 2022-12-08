const fs = require('fs');
const Ocupacion = require('../models/ocupacion');
const Servicios = require('../models/model-servicios');
const Usuario = require('../models/model-usuario');

const actualizarImagen = async (tipo, id, nombreArchivo ) => {

    switch (tipo) {

        case 'usuarios':
            const usuario = await Usuario.findById(id);
           if(!usuario){
            console.log('No es un usuario por id');
            return false;

           }

            const pathViejo = `./src/backend/uploads/usuarios/${ usuario.img }`;

            borraImagen(pathViejo);

            usuario.img= nombreArchivo;
            await usuario.save();

           return true;
    
        // case 'servicios':
        //    const servicio = await Servicios.findById(id);
        //    if(!servicio){
        //     console.log('No es un servicio por id');
        //     return false;

        //    }
        //    const pathViejo = `./src/backend/uploads/servicios/${ servicio.img }`;
        //    if(fs.existsSync(pathViejo)){
        //     //borramos la imagen anterior (para que no haya duplicados)
        //     fs.unlinkSync(pathViejo);
        //    }

        //    servicio.img= nombreArchivo;
        //    await servicio.save();

        //    return true;

        // case 'ocupacion':
            
        // break;
    }

}

const borraImagen = (path) =>{
          
    if(fs.existsSync(path)){
     //borramos la imagen anterior (para que no haya duplicados)
     fs.unlinkSync(path);
    }
}

module.exports = {
    actualizarImagen
}
