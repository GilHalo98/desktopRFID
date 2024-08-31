// Evento majenado.
import { SyntheticEvent } from "react";

// Modelos de datos.
import {
    Empleado
} from "../../../../utils/API/modelos/empleado";

import {
    Permiso
} from "../../../../utils/API/modelos/permiso";

import {
    Rol
} from "../../../../utils/API/modelos/rol";

function guardarDatos(
    evento: SyntheticEvent,
    registro: Empleado,
    registrosVinculados: {
        rol: Rol,
        permiso: Permiso
    }
) {
    /**
     * Creamos un nuevo registro y lo guardamos en la base de datos.
     */

    const datos = {
        datosDispositivo: {
            path: evento.target[0].value,
            baudRate: parseInt(evento.target[2].value),
        },
        registro: registro,
        registrosVinculados: registrosVinculados
    };

    window.ipc.send('guardar_datos_tarjeta', datos);
};

export {
    guardarDatos
};
