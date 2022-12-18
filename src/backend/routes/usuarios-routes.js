/*
    Ruta: '/api/ocupacion'

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario, getUsuario } = require('../controllers/usuarios-controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getUsuarioID } = require('../controllers/busquedas');


const router = Router();


router.get('/', validarJWT, getUsuarios);

router.get('/:id', getUsuarioID);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'Introduce el nombre completo (apellidos)').not().isEmpty(),
    check('fecha_nac', 'Introduce una fecha de nacimiento').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos,

], crearUsuario);

router.put('/:id', [
    validarJWT,
    // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    // check('email', 'El correo es obligatorio').isEmail(),
    // check('rol', 'El rol es obligatorio').not().isEmpty(),
    // check('password', 'El rol es obligatorio').not().isEmpty(),
    validarCampos,

], actualizarUsuario);

router.delete('/:id',
    validarJWT,
    borrarUsuario

);

module.exports = router;