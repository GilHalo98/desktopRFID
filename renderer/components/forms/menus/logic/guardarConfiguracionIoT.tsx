function guardarConfiguracionLector(evento) {
    /**
     * Creamos un nuevo registro y lo guardamos en la base de datos.
     */

    let accionOpcional = "0";

    if(evento.target[2].checked) {
        accionOpcional = "1";

    } else if (evento.target[3].checked) {
        accionOpcional = "2";
    }

    const registrarSalida = evento.target[4].checked?
        '1' : '0';

    console.log(evento.target[4].checked);

    const datos = {
        datosDispositivo: {
            path: evento.target[5].value,
            baudRate: parseInt(evento.target[7].value),
        },

        configuracion: {
            ssid: evento.target[8].value,
            password: evento.target[9].value,
            puertoApi: evento.target[11].value,
            ipApi: evento.target[12].value,
            versionApi: evento.target[13].value,
            apiKey: evento.target[14].value,
            bitPermiso: evento.target[0].value,
            registrarSalida: registrarSalida,
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
            puertoApi: evento.target[6].value,
            ipApi: evento.target[7].value,
            versionApi: evento.target[8].value,
            apiKey: evento.target[9].value
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
            path: evento.target[1].value,
            baudRate: parseInt(evento.target[3].value),
        },

        configuracion: {
            ssid: evento.target[4].value,
            password: evento.target[5].value,
            puertoApi: evento.target[7].value,
            ipApi: evento.target[8].value,
            versionApi: evento.target[9].value,
            apiKey: evento.target[10].value,
            bitRol: evento.target[0].value
        }
        
    };

    console.log(datos);

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
            puertoApi: evento.target[6].value,
            ipApi: evento.target[7].value,
            apiKey: evento.target[8].value
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