const { Router } = require('express');
const { check } = require('express-validator');
const validate = require('../middlewares/validateAttributes');
const userController = require('../controllers/usuario.controller');
const router = Router();

router.get('/', (req, res) => {
    res.status(200).json(
        {
            message: 'Hola usuario'
        }
    );
});

router.post('/register', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contrasena', 'La contraseña es obligatoria').not().isEmpty(),
    check('confirmar_contraseña', 'La confirmación de la contraseña es obligatoria').not().isEmpty(),
    check('tipo', 'El tipo de usuario es obligatorio').not().isEmpty(),
    validate
], userController.register);

router.get('/viajes', userController.findViajes);

router.get('/autos', userController.findAutos);

router.post('/seleccionar-viaje', userController.seleccionarViaje);

router.post('/seleccionar-auto', userController.seleccionarAuto);

router.post('/no-reservar-auto', userController.noSeleccionarAuto);

router.post('/login', [
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('contrasena', 'La contraseña es obligatoria').not().isEmpty(),
    validate
], userController.login);

router.post('/consultar-viajes', userController.findUserViajes);

router.post('/cancelar-viaje', userController.cancelarViaje);



module.exports = router;