/*
    Ruta: '/api/usuarios'

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {getOcupaciones,crearOcupaciones,actualizarOcupaciones,borrarOcupaciones } = require('../controllers/ocupacion-controller');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get('/', validarJWT, getOcupaciones);

router.post('/', [
    validarCampos,
    validarJWT
], crearOcupaciones);

router.put('/:id', [
    validarJWT,
    validarCampos,

], actualizarOcupaciones);

router.delete('/:id',
    validarJWT,
    borrarOcupaciones

);

module.exports = router;