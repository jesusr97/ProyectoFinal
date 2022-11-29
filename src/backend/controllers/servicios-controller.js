const { response } = require('express');
const { validationResult } = require('express-validator');
const Ocupacion = require('../models/ocupacion');
const { generarJWT } = require('../helpers/jwt');


const getServicios = (req, res = response) =>{

    res.json({
        ok:true,
        msg:'getServicios'
    });

}
const crearServicios = async (req, res = response) =>{

    res.json({
        ok:true,
        msg:'crearServicios'
    });

    // const user_id = req.user_id;
    // const ocupacion = new Ocupacion({
    //     usuario: user_id,
    //     ...req.body
    // });

    // try {
    // const ocupacionDB= await ocupacion.save();

    //     await ocupacion.save();
        
    //     res.json({
    //         ok:true,
    //         ocupacion: ocupacionDB
    //     });
    // } catch (error) {
    //     res.status(500).json({
    //         ok:false,
    //         msg: 'Hable con el administrador'
    //     })
    // }



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