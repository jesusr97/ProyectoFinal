/*
    Ruta: '/api/usuarios'

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getTrabajos, crearTrabajo, actualizarTrabajos, borrarTrabajos } = require('../controllers/trabajos-controller');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get('/', validarJWT, getTrabajos);

router.post('/', [
    validarJWT,
    // check('ponderacion','El usuario debe tener una ponderacion').not().isEmpty(),
    validarCampos,
], crearTrabajo);

router.put('/:id', [
    validarJWT,
    // check('ponderacion','El usuario debe tener una ponderacion').not().isEmpty(),
    validarCampos,

], actualizarTrabajos);

router.delete('/:id',
    validarJWT,
    borrarTrabajos

);

module.exports = router;