const { response } = require('express');
// const { validationResult } = require('express-validator');
const Ocupacion = require('../models/ocupacion');
const Servicios = require('../models/model-servicios');
const Trabajos = require('../models/trabajos');
const { generarJWT } = require('../helpers/jwt');
const { async } = require('rxjs');
// const {UsuarioSchema} = require('../models/model-usuario');

const getTrabajos = async (req, res = response) =>{

    const trabajos= await Trabajos.find().populate('usuario','nombre img')
    .populate// ({ path: 'servicios', model: Servicios })
    ('servicios',
     'confirma_usuarios dia_inicio dia_fin hora_inicio hora_fin total_horas valoraciones comentarios'
    , Servicios)
    .populate('ocupacion', 'puntuacion');

    res.json({
        ok:true,
        trabajos
    });

}
const crearTrabajo = async (req, res = response) =>{

    
    const user_id = req.user_id;
    const trabajos = new Trabajos({
        usuario: user_id,
        ...req.body
    });
    try {
    const TrabajosDB= await trabajos.save();

        await trabajos.save();
        
        res.json({
            ok:true,
            trabajos: TrabajosDB
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }



}
const actualizarTrabajos = async (req, res = response) =>{

    const id = req.params.id;
    const user_id = req.user_id;
    try {
       
        const TrabajosDB = await Trabajos.findById(id);

        if(!TrabajosDB){
            return res.status(404).json({
                ok: false,
                msg: "Trabajo no encontrado por id"
            })
        }

        const cambiosTrabajos = {
            ...req.body,
            usuario: user_id
        }
  
        const trabajoActualizado = await Trabajos.findByIdAndUpdate(id, cambiosTrabajos, {new: true});
        
        res.json({
            ok: true,
            trabajos: trabajoActualizado
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }

}
const borrarTrabajos = async (req, res = response) =>{

    const id = req.params.id;
    try {
       
        const TrabajosDB = await Trabajos.findById(id);

        if(!TrabajosDB){
            return res.status(404).json({
                ok: false,
                msg: "Trabajo no encontrado por id"
            })
        }

        await Trabajos.findByIdAndDelete(id);
        
        res.json({
            ok: true,
            msg: "Trabajo Eliminado"
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }

}



module.exports = {
    getTrabajos,
    crearTrabajo,
    actualizarTrabajos,
    borrarTrabajos

}