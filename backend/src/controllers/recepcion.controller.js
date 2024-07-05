const { insertOne, findAll, addAprobadoToReserva } = require('../config/db.mongo');
const bcrypt = require('bcrypt');

const register = async (req, res) => {

    const { nombre, usuario, correo, contrasena, confirmar_contraseña, tipo } = req.body;

    if (contrasena !== confirmar_contraseña) {
        return res.status(400).json({
            status: false,
            msg: 'Las contraseñas no coinciden'
        });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(contrasena, salt);

    const result = await insertOne('Usuarios', {
        nombre,
        usuario,
        correo,
        contrasena: encryptedPassword,
        tipo
    });

    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al registrar el usuario'
        });
    }

    res.status(200).json({
        status: true,
        msg : `Usuario ${nombre} registrado correctamente`,
        data : result
    });

}

const solicitudes = async (req, res) => {
    const result = await findAll('Solicitudes');
    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al obtener las solicitudes'
        });
    }
    res.status(200).json({
        status: true,
        data: result
    });
}

const findReservas = async (req, res) => {
    console.log('Buscando reservas');
    const result = await findAll('Reserva');
    console.log('Reservas:', result);
    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al obtener las reservas'
        });
    }
    res.status(200).json({
        status: true,
        data: result
    });
}

const aprobar = async (req, res) => {
    const { id } = req.body;
    //este es el id unico de la reserva en mongo entonces se mandara y mongo se encargara de buscarlo
    const result = await addAprobadoToReserva(id);
    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al aprobar la reserva'
        });
    }
    res.status(200).json({
        status: true,
        msg: `Reserva ${id} aprobada correctamente`
    });
}

module.exports = {
    register,
    findReservas,
    aprobar
};