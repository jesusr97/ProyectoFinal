const { response } = require('express');
const { validationResult } = require('express-validator');
const Servicios = require('../models/model-servicios');
const { generarJWT } = require('../helpers/jwt');
const { getOcupaciones } = require('./ocupacion-controller');

const getServicios = async (req, res = response) =>{

    const servicios= await Servicios.find().populate('usuario','nombre')
    .populate('ocupacion','ponderacion');
    res.json({
        ok:true,
        servicios
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
const actualizarServicios = async (req, res = response) =>{

    const id = req.params.id;
    const user_id = req.user_id;
    try {
       
        const servicioBD = await Servicios.findById(id);

        if(!servicioBD){
            return res.status(404).json({
                ok: false,
                msg: "El servicio no se encuentra por ese id"
            })
        }

        const cambiosServicios = {
            ...req.body,
            usuario: user_id
        }
  
        const servicioActualizado = await Servicios.findByIdAndUpdate(id, cambiosServicios, {new: true});
        
        res.json({
            ok: true,
            servicio: servicioActualizado
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }

}
const borrarServicios = async (req, res = response) =>{

    const id = req.params.id;
    try {
       
        const servicioBD = await Servicios.findById(id);

        if(!servicioBD){
            return res.status(404).json({
                ok: false,
                msg: "El servicio no se encuentra por ese id"
            })
        }

      await Servicios.findByIdAndDelete(id);
        
        res.json({
            ok: true,
            msg: "Servicio eliminado"
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }

}


module.exports = {
    getServicios,
    crearServicios,
    actualizarServicios,
    borrarServicios

}