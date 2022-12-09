const { response } = require('express');
// const { validationResult } = require('express-validator');
const Ocupacion = require('../models/ocupacion');
const Servicios = require('../models/model-servicios');
const { generarJWT } = require('../helpers/jwt');
const { async } = require('rxjs');
// const {UsuarioSchema} = require('../models/model-usuario');

const getOcupaciones = async (req, res = response) =>{

    const ocupacion= await Ocupacion.find().populate('usuario','nombre img')
    .populate// ({ path: 'servicios', model: Servicios })
    ('servicios',
     'confirma_usuarios dia_inicio dia_fin hora_inicio hora_fin total_horas valoraciones comentarios'
    , Servicios)
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
const actualizarOcupaciones = async (req, res = response) =>{

    const id = req.params.id;
    const user_id = req.user_id;
    try {
       
        const ocupacionDB = await Ocupacion.findById(id);

        if(!ocupacionDB){
            return res.status(404).json({
                ok: false,
                msg: "Ocupacion no encontrada por id"
            })
        }

        const cambiosOcupacion = {
            ...req.body,
            usuario: user_id
        }
  
        const ocupacionActualizada = await Ocupacion.findByIdAndUpdate(id, cambiosOcupacion, {new: true});
        
        res.json({
            ok: true,
            ocupacion: ocupacionActualizada
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }

}
const borrarOcupaciones = async (req, res = response) =>{

    const id = req.params.id;
    try {
       
        const ocupacionDB = await Ocupacion.findById(id);

        if(!ocupacionDB){
            return res.status(404).json({
                ok: false,
                msg: "Ocupacion no encontrada por id"
            })
        }

        await Ocupacion.findByIdAndDelete(id);
        
        res.json({
            ok: true,
            msg: "Ocupacion Eliminada"
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }

}



module.exports = {
    getOcupaciones,
    crearOcupaciones,
    actualizarOcupaciones,
    borrarOcupaciones

}