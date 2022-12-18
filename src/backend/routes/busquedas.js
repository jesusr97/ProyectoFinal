/*
    ruta: api/todo/:busqueda
*/
const { Router } = require('express');
const { getTodo , getDocumentosCollection, getUsuarioID} = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router =Router();


router.get('/:busqueda', validarJWT, getTodo);

router.get('/usuario/:busqueda', getUsuarioID);

router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosCollection);

module.exports = router;