const { Router } = require('express');
const { check } = require('express-validator');
const validate = require('../middlewares/validateAttributes');
const recepcionController = require('../controllers/recepcion.controller');
const router = Router();

router.get('/', (req, res) => {
    res.status(200).json(
        {
            message: 'Hola recepcion'
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
], recepcionController.register);

router.get('/reserva', recepcionController.findReservas);

router.post('/aprobar', recepcionController.aprobar);


module.exports = router;