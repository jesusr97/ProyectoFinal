/*
    Ruta: '/api/servicios'

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getServicios, crearServicios, actualizarServicios, borrarServicios } = require('../controllers/servicios-controller');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get('/', validarJWT, getServicios);

router.post('/', [
    validarCampos,
    validarJWT
], crearServicios);

router.put('/:id', [
    validarJWT,
    validarCampos,

], actualizarServicios);

router.delete('/:id',
    validarJWT,
    borrarServicios

);

module.exports = router;