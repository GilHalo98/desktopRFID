function guardarConfiguracion(evento) {
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
            bitPermiso: evento.target[9].value
        }
    };

    window.ipc.send('guardar_configuracion_IoT', datos);
};

export {
    guardarConfiguracion
}