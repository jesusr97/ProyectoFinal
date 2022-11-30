const { response } = require('express');
const { validationResult } = require('express-validator');
const Servicios = require('../models/model-servicios');
const { generarJWT } = require('../helpers/jwt');
const { getOcupaciones } = require('./ocupacion-controller');

const getServicios = (req, res = response) =>{

    res.json({
        ok:true,
        msg:'getServicios'
    });

}
const crearServicios = async (req, res = response) =>{

    const user_id= req.user_id;
    const servicio= new Servicios({
        usuario:user_id,
       ...req.body
    });


    try {
        const serviciosDB= await servicio.save();
        res.json({
            ok:true,
            servicio: serviciosDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }


}
const actualizarServicios = (req, res = response) =>{

    res.json({
        ok:true,
        msg:'actualizarServicios'
    });

}
const borrarServicios = (req, res = response) =>{

    res.json({
        ok:true,
        msg:'borrarServicios'
    });

}


module.exports = {
    getServicios,
    crearServicios,
    actualizarServicios,
    borrarServicios

}