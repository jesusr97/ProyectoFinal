const { response } = require('express');
// const { validationResult } = require('express-validator');
const Ocupacion = require('../models/ocupacion');
const { generarJWT } = require('../helpers/jwt');
const { async } = require('rxjs');
// const {UsuarioSchema} = require('../models/model-usuario');


const getOcupaciones = async (req, res = response) =>{

    const ocupacion= await Ocupacion.find().populate('usuario','nombre img')
    .populate('servicios','dia_inicio');

    res.json({
        ok:true,
        ocupacion
    });

}
const crearOcupaciones = async (req, res = response) =>{

    
    const user_id = req.user_id;
    const ocupacion = new Ocupacion({
        usuario: user_id,
        ...req.body
    });

    try {
    const ocupacionDB= await ocupacion.save();

        await ocupacion.save();
        
        res.json({
            ok:true,
            ocupacion: ocupacionDB
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }



}
const actualizarOcupaciones = (req, res = response) =>{

    res.json({
        ok:true,
        msg:'actualizarOcupaciones'
    });

}
const borrarOcupaciones = (req, res = response) =>{

    res.json({
        ok:true,
        msg:'borrarOcupaciones'
    });

}



module.exports = {
    getOcupaciones,
    crearOcupaciones,
    actualizarOcupaciones,
    borrarOcupaciones

}