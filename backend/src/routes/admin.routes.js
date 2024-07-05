const { Router } = require('express');
const { check } = require('express-validator');
const validate = require('../middlewares/validateAttributes');
const adminController = require('../controllers/admin.controller');
const router = Router();

router.get('/', (req, res) => {
    res.status(200).json(
        {
            message: 'Hola admin'
        }
    );
});

// en el control del admin estara
// crear usuarios, para lo cual solo se le redirigira a la ruta de usuario
// crear recepciones, para lo cual solo se le redirigira a la ruta de recepcion
// registrar autos, ese lo hara desde la ruta de admin
// registrar viajes, ese lo hara desde la ruta de admin

router.post('/registerauto', [
    check('agencia', 'La agencia es obligatoria').not().isEmpty(),
    check('marca', 'La marca es obligatoria').not().isEmpty(),
    check('placa', 'La placa es obligatoria').not().isEmpty(),
    check('modelo', 'El modelo es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('ciudad', 'La ciudad es obligatoria').not().isEmpty(),
    validate
], adminController.registerAuto);

router.post('/registerviaje', [
    check('agencia', 'La agencia es obligatoria').not().isEmpty(),
    check('origen', 'La ciudad de origen es obligatoria').not().isEmpty(),
    check('destino', 'La ciudad de destino es obligatoria').not().isEmpty(),
    check('dias', 'Los dias son obligatorios').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    validate
], adminController.registerViaje);

router.get('/getTouristQuantity', adminController.getTouristQ);
router.get('/getAutoQuantity', adminController.getAutoQ);
router.get('/getTripsQuantity', adminController.getTripsQ);

router.get('/listausuarios', adminController.listUsers);

router.get('/listaviajes', adminController.listTrips);

router.get('/listareservas', adminController.listReservations);

router.post('/eliminarusuario', [
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    validate
], adminController.deleteUser);

router.get('/totalusers', adminController.getTotalUsers);

router.get('/totaladmins', adminController.getTotalAdmins);

router.get('/totalrecs', adminController.getTotalRecs);

router.get('/getautos', adminController.getAutos);

router.post('/eliminarauto', [
    check('placa', 'La placa es obligatoria').not().isEmpty(),
    validate
], adminController.deleteAuto);

router.post('/eliminarviaje', [
    //se eliminara el viaje por el _id: ObjectId de mongo
    check('_id', 'El id del viaje es obligatorio').not().isEmpty(),
    validate
], adminController.deleteTrip);

router.post('/eliminarreserva', [
    //se eliminara la reserva por el _id: ObjectId de mongo
    check('_id', 'El id de la reserva es obligatorio').not().isEmpty(),
    validate

], adminController.deleteReservation);

module.exports = router;