const { insertOne, findReservationsByUser } = require('../config/db.mongo');
const { findAll } = require('../config/db.mongo');
const { findOne, find } = require('../config/db.mongo');
const { uploadFile2 } = require('../config/bucket');
const { deleteById } = require('../config/db.mongo');
const bcrypt = require('bcrypt');



const viajeCompleto = [] // Esta la llenare con el viaje + auto ya que llenare los dos en distintas petciones pero 
// al mismo tiempo, para que al final juntarlas en una sola respuesta y guardarlas en la base de datos

const register = async (req, res) => {

    //Recibir los datos del usuario
    const { path, imagen, nombre, usuario, correo, contrasena, confirmar_contraseña, tipo } = req.body;



    const ruta_aws = `https://mia202004071.s3.amazonaws.com/${path}`;


    console.log('Ruta de la imagen:', ruta_aws);

    await uploadFile2(path, imagen);

    //Manipular los datos
    if (contrasena !== confirmar_contraseña) {
        return res.status(400).json({
            status: false,
            msg: 'Las contraseñas no coinciden'
        });
    }

    //Encriptar la contraseña
    const salt = await bcrypt.genSalt(10); //Generar un salt
    // un salt es una cadena aleatoria que se añade al hash para hacerlo único y el 10 indica 
    //el número de veces que se aplica el algoritmo de encriptación
    const encryptedPassword = await bcrypt.hash(contrasena, salt);

    //Guardar los datos en la base de datos 
    const result = await insertOne('Usuarios', {
        imagen: ruta_aws,
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


    //Enviar respuesta
    res.status(200).json({
        status: true,
        msg: `Usuario ${nombre} registrado correctamente`,
        data: result,
        imagen: ruta_aws    // Enviar la ruta de la imagen para que el front la pueda mostrar
    });

}

const findViajes = async (req, res) => {
    console.log('Buscando viajes');
    const result = await findAll('viajes');
    console.log('Viajes:', result);
    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al obtener los viajes'
        });
    }
    res.status(200).json({
        status: true,
        data: result
    });
}

const findAutos = async (req, res) => {
    console.log('Buscando autos');
    const result = await findAll('autos');
    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al obtener los autos'
        });
    }
    res.status(200).json({
        status: true,
        data: result
    });
}

const seleccionarViaje = async (req, res) => {
    // Aca solo me va a caer los datos del viaje
    console.log('Seleccionando viaje');
    const { agencia, origen, destino, dias, precio } = req.body;


    // Guardar los datos del viaje en el array 
    viajeCompleto.push(agencia, origen, destino, dias, precio);

    console.log('Agencia: ', viajeCompleto[0]);
    console.log('Origen: ', viajeCompleto[1]);
    console.log('Destino: ', viajeCompleto[2]);
    console.log('Dias: ', viajeCompleto[3]);
    console.log('Precio: ', viajeCompleto[4]);


    res.status(200).json({
        status: true,
        msg: `Viaje seleccionado correctamente`
    });
}

const noSeleccionarAuto = async (req, res) => {
    //Aca solo me va a caer los datos del viaje ya que no hay auto asi que no se guardara nada MAS en el array
    console.log('No seleccionando auto');
    // no se recibe nada mas que el nombre del usuario
    const { usuario } = req.body;

    // Guardar el nombre del usuario en el array
    viajeCompleto[5] = usuario;

    const result = await insertOne('Reserva', {
        agencia: viajeCompleto[0],
        origen: viajeCompleto[1],
        destino: viajeCompleto[2],
        dias: viajeCompleto[3],
        precio: viajeCompleto[4],
        usuario: viajeCompleto[5]
    });// como es mongo no tengo que añadir null en los parametros que no se van a usar
    // asi las consultas se hacen mas rapidas

    // limpia el array para que no se acumulen los datos
    viajeCompleto.length = 0;
    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al registrar la reserva'
        });
    }

    res.status(200).json({
        status: true,
        msg: `Reserva registrada correctamente`,
        data: result
    });

}


const seleccionarAuto = async (req, res) => {
    // Este es opcional asi que tenerlo en cuenta
    const { agencia, marca, placa, modelo, precio, ciudad, usuario } = req.body;

    // Guardar los datos del auto en el array
    viajeCompleto.push(agencia, marca, placa, modelo, precio, ciudad, usuario);

    console.log('Viaje completo: ', viajeCompleto);

    const result = await insertOne('Reserva', {
        agencia: viajeCompleto[0],
        origen: viajeCompleto[1],
        destino: viajeCompleto[2],
        dias: viajeCompleto[3],
        precio: viajeCompleto[4],
        agencia_auto: viajeCompleto[5],
        marca: viajeCompleto[6],
        placa: viajeCompleto[7],
        modelo: viajeCompleto[8],
        precio_auto: viajeCompleto[9],
        ciudad_auto: viajeCompleto[10],
        usuario: viajeCompleto[11]
    });


    // limpia el array para que no se acumulen los datos
    viajeCompleto.length = 0;

    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al registrar la reserva'
        });
    }

    res.status(200).json({
        status: true,
        msg: `Reserva registrada correctamente`,
        data: result
    });
    // Siempre poner el status en el return para que no se siga ejecutando el codigo
    // y asi pueda ver que si llego a ese punto


}

const login = async (req, res) => {
    //Recibir los datos del usuario
    const { usuario, contrasena } = req.body;

    //Administrador temporal
    if (usuario === 'admin' && contrasena === 'admin') {
        return res.status(200).json({
            status: true,
            msg: 'Administrador autenticado correctamente',
            data: {
                nombre: 'Administrador',
                usuario: 'admin',
                tipo: 'Administrador'
            }
        });
    }

    //Buscar al usuario en la base de datos
    const result = await findOne('Usuarios', { usuario });

    if (result === null) {
        // Usuario no encontrado
        return res.status(200).json({
            status: false,
            msg: 'Usuario no encontrado'
        });
    }

    //Verificar la contraseña
    const match = await bcrypt.compare(contrasena, result.contrasena);

    if (!match) {
        return res.status(200).json({
            status: false,
            msg: 'Contraseña incorrecta'
        });
    }

    //Enviar respuesta
    res.status(200).json({
        status: true,
        msg: 'Usuario autenticado correctamente',
        data: result
    });
};


const findUserViajes = async (req, res) => {
    //a diferencia de findViajes este es un post que solo busca los viajes de un usuario
    const { usuario } = req.body;

    try {
        // Usar la función find para buscar todas las reservas del usuario
        const result = await findReservationsByUser(usuario);

        console.log('Viajes del usuario', usuario, ':', result);

        if (result instanceof Error) {
            return res.status(500).json({
                status: false,
                msg: 'Error al obtener los viajes del usuario'
            });
        }

        res.status(200).json({
            status: true,
            msg: 'Viajes del usuario obtenidos correctamente',
            data: result
        });
    } catch (error) {
        console.error('Error en findUserViajes:', error);
        res.status(500).json({
            status: false,
            msg: 'Error interno del servidor al buscar los viajes del usuario'
        });
    }
}

const cancelarViaje = async (req, res) => {
    const { id } = req.body;

    const result = await deleteById('Reserva', id);

    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al cancelar el viaje'
        });
    }

    res.status(200).json({
        status: true,
        msg: 'Viaje cancelado correctamente'
    });
}


module.exports = {
    register,
    findViajes,
    findAutos,
    seleccionarViaje,
    seleccionarAuto,
    login,
    noSeleccionarAuto,
    findUserViajes,
    cancelarViaje
};
