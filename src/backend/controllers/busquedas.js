const { response } = require("express");
const Usuario = require('../models/model-usuario')
const Ocupacion = require('../models/ocupacion')
const Servicios = require('../models/model-servicios')

const getTodo = async(req , res = response) => {

    const busqueda = req.params.busqueda;
    const regularExpresion = new RegExp(busqueda,'i');

    const [usuarios /*,ocupaciones,servicios*/] = await Promise.all([
        Usuario.find({ nombre: regularExpresion }),
        // await Ocupacion.find({ ponderacion: regularExpresion }),
        // await Servicios.find({ total_horas: regularExpresion }) 
    ]);

    res.json({
        ok: true,
        usuarios,
        // ocupaciones,
        // servicios,
        // busqueda
    });
}

const getDocumentosCollection = async (req , res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regularExpresion = new RegExp(busqueda,'i');
    const regularExpresionNumber = new RegExp(busqueda,'d');
    let data = [];

    switch (tabla) {
        case 'ocupacion':
            data = await Ocupacion.find({ nombre: regularExpresionNumber })
            .populate('usuario','nombre img');

            break;
        case 'servicios':
            data = await Servicios.find({ nombre: regularExpresionNumber })
            .populate('usuario','nombre img')
            .populate('ocupacion','ponderacion');

            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regularExpresion });

            break;
    
        default: 
        return res.status(404).json({
            ok:false,
            msg: 'La tabla tiene que ser ocupacion/servios/usuarios'
        })

    }
    
    // const [usuarios /*,ocupaciones,servicios*/] = await Promise.all([
    //     Usuario.find({ nombre: regularExpresion }),
    //     // await Ocupacion.find({ ponderacion: regularExpresion }),
    //     // await Servicios.find({ total_horas: regularExpresion }) 
    // ]);

    res.json({
        ok:true,
        resultados: data
    })
}


const getUsuarioID = async(req , res = response) => {

    const busqueda = req.params.busqueda;
    const regularExpresion = busqueda;
    console.log(regularExpresion);

    Usuario.findById
    const [usuarios /*,ocupaciones,servicios*/] = await Promise.all([
        Usuario.findById(regularExpresion),

    ]);

    res.json({
        ok: true,
        usuarios,

    });
}


module.exports = {
    getTodo,
    getDocumentosCollection,
    getUsuarioID
}