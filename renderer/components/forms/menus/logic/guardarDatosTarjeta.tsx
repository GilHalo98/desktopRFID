import { RespuestaConsultaEmpleado } from "../../../../utils/API/respuestas/consultaEmpleado";

function guardarDatos(evento, registro: RespuestaConsultaEmpleado) {
    /**
     * Creamos un nuevo registro y lo guardamos en la base de datos.
     */

    const datos = {
        datosDispositivo: {
            path: evento.target[0].value,
            baudRate: parseInt(evento.target[2].value),
        },
        registro: registro
    };

    window.ipc.send('guardar_datos_tarjeta', datos);
};

export {
    guardarDatos
};