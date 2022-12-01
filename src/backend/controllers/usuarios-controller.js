const Usuario = require('../models/model-usuario');
const { validationResult } = require('express-validator');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({}, 'nombre apellidos email fecha_nac rol');  //Con esto pillamos solo el nombre del get usuarios

    res.json({
        ok: true,
        usuarios
    });

}

const crearUsuario = async (req, res = response) => {

    const { email, password, nombre } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });
        const existeUsuario = await Usuario.findOne({ nombre });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'EL correo introducido ya está registrado'
            });
        } else if (existeUsuario) {
            return res.status(400).json({
                ok: false,
                msg: 'EL usuario introducido ya está registrado'
            });
        }
        const usuario = new Usuario(req.body);
        
        //Encriptar contraseña<
        const randomNum = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, randomNum);

        //Guardar usuario 
        await usuario.save();
        //Generar el TOKEN - JWT

        const token = await generarJWT( usuario.id );
        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }


}

const actualizarUsuario = async (req, res = response) => {
    const user_id = req.params.id
    try {

        const usuarioDB = await Usuario.findById(user_id);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe usuario por ese id"
            });
        }
        //Actualizaciones

        const {password, google, email, ...campos} = req.body;
        console.log(req.body);
        console.log('campos');
        console.log(campos);
        if(usuarioDB.email !== email){

            const existeEmail =await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe un usuario con ese correo"
                });
            }
        }

        campos.email = email;
        // Actualizar en la BD 
  
        // delete campos.password;
        delete campos.google;
    
        console.log(req.body.password)
        const usuarioActualizado = await Usuario.findByIdAndUpdate(user_id, campos, {new: true})
        console.log(campos)
        res.json({
            ok: true,
            usuario: usuarioActualizado
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }
}

const borrarUsuario = async(req, res = response ) => {

    const user_id = req.params.id

    try {

        const usuarioDB = await Usuario.findById( user_id );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete( user_id );

        
        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}