/*
    Ruta: '/api/servicios'

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getServicios, crearServicios, actualizarServicios, borrarServicios } = require('../controllers/servicios-controller');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

// let hora_fin = new Date();
// hora_fin.getTime();

router.get('/', validarJWT, getServicios);

router.post('/', [
    validarJWT,
    check('confirma_usuarios').not().isEmpty(),
    check('dia_inicio').isDate().not().isEmpty(),
    check('dia_fin').isDate().not().isEmpty(),
    check('hora_inicio').isDate().not().isEmpty(),
    check('hora_fin').isDate().not().isEmpty(),
    check('total_horas').not().isEmpty(),
    check('usuario','El id del usuario debe de ser valido').isMongoId(),

    validarCampos,
], crearServicios);

router.put('/:id', [
    validarJWT,
    check('confirma_usuarios').not().isEmpty(),
    check('dia_inicio').isDate().not().isEmpty(),
    check('dia_fin').isDate().not().isEmpty(),
    check('hora_inicio').isDate().not().isEmpty(),
    check('hora_fin').isDate().not().isEmpty(),
    check('total_horas').not().isEmpty(),
    check('usuario','El id del usuario debe de ser valido').isMongoId(),
    validarCampos

], actualizarServicios);

router.delete('/:id',
    validarJWT,
    borrarServicios

);

module.exports = router;