function guardarConfiguracionLector(evento) {
    /**
     * Creamos un nuevo registro y lo guardamos en la base de datos.
     */

    let accionOpcional = "0";

    if(evento.target[11].checked) {
        accionOpcional = "1";
    } else if (evento.target[12].checked) {
        accionOpcional = "2";
    }

    const datos = {
        datosDispositivo: {
            path: evento.target[0].value,
            baudRate: parseInt(evento.target[2].value),
        },

        configuracion: {
            ssid: evento.target[3].value,
            password: evento.target[4].value,
            puertoApi: evento.target[5].value,
            ipApi: evento.target[6].value,
            versionApi: evento.target[7].value,
            apiKey: evento.target[8].value,
            bitPermiso: evento.target[9].value,
            accionOpcional: accionOpcional
        }
    };

    window.ipc.send('guardar_configuracion_lector', datos);
};

function guardarConfiguracionChecador(evento) {
    /**
     * Creamos un nuevo registro y lo guardamos en la base de datos.
     */
    const datos = {
        datosDispositivo: {
            path: evento.target[0].value,
            baudRate: parseInt(evento.target[2].value),
        },

        configuracion: {
            ssid: evento.target[3].value,
            password: evento.target[4].value,
            puertoApi: evento.target[5].value,
            ipApi: evento.target[6].value,
            versionApi: evento.target[7].value,
            apiKey: evento.target[8].value
        }
    };

    window.ipc.send('guardar_configuracion_checador', datos);
};

function guardarConfiguracionControlador(evento) {
    /**
     * Creamos un nuevo registro y lo guardamos en la base de datos.
     */
    const datos = {
        datosDispositivo: {
            path: evento.target[0].value,
            baudRate: parseInt(evento.target[2].value),
        },

        configuracion: {
            ssid: evento.target[3].value,
            password: evento.target[4].value,
            puertoApi: evento.target[5].value,
            ipApi: evento.target[6].value,
            versionApi: evento.target[7].value,
            apiKey: evento.target[8].value,
            bitRol: evento.target[9].value
        }
        
    };

    window.ipc.send('guardar_configuracion_controlador', datos);
};

function guardarConfiguracionControladorPuerta(evento) {
    /**
     * Creamos un nuevo registro y lo guardamos en la base de datos.
     */
    const datos = {
        datosDispositivo: {
            path: evento.target[0].value,
            baudRate: parseInt(evento.target[2].value),
        },

        configuracion: {
            ssid: evento.target[3].value,
            password: evento.target[4].value,
            puertoApi: evento.target[5].value,
            ipApi: evento.target[6].value,
            apiKey: evento.target[7].value
        }
        
    };

    window.ipc.send('guardar_configuracion_controlador_puerta', datos);
};

export {
    guardarConfiguracionLector,
    guardarConfiguracionChecador,
    guardarConfiguracionControlador,
    guardarConfiguracionControladorPuerta
};