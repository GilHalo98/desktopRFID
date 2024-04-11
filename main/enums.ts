export enum FLAGS_DISPOSITIVO {
    /*
    * Banderas del estado del dispositivo y las operaciones de este.
    */

    // Error detectado.
    ERROR_CON_DISPOSITIVO = 0b00000000,

    // Inicialización terminada.
    INICIALIZACION_TERMINADA = 0b00000001,

    // Indica cuando una configuracion se guardo exitosamente.
    ESCRITURA_TERMINADA = 0b00000010,

    // Banderas libres.
    FLAG_3 = 0b00000100,
    FLAG_4 = 0b00001000,
    FLAG_5 = 0b00010000,
    FLAG_6 = 0b00100000,

    // Operación terminada.
    OPERACION_TERMINADA = 0b01000000,

    // Conexión cerrada.
    CONEXION_CERRADA = 0b10000000
}

export enum EVENTOS_GUARDADO_DATOS_TARJETA {
    /*
    * Eventos que se pasan por medio de Serial.
    * */

    // Inicia el grabado de datos.
    INICIAR_GUARDADO_DATOS = '0\r',

    // Envia el dato del id del empleado.
    ID_ENVIADO = '1\r',

    // Envia el dato de los permisos del empleado.
    AUTORIZACION_ENVIADO = '2\r',

    // Envia el dato del rol  del empleado.
    ROL_ENVIADO = '3\r',

    // Termina el grabado de datos.
    TERMINAR_GUARDADO_DATOS = '4\r',
};

export enum EVENTOS_GUARDADO_CONFIGURACION_LECTOR {
    /*
    * Eventos que se pasan por medio de Serial.
    * */

    // Evento de verificacion de configuracion.
    INICIAR_CONFIGURACION = '1\r',

    // Cambia el bit de permiso pedido por el dispositivo.
    CAMBIAR_PERMISO_PEDIDO = '2\r',

    // Evento para cambiar el SSID de la red.
    CAMBIAR_SSID = '3\r',

    // Cambia la password del SSID.
    CAMBIAR_PASSWORD = '4\r',

    // Cambia el puerto del servidor API.
    CAMBIAR_PUERTO_API = '5\r',

    // Cambia la ip del servidor API.
    CAMBIAR_IP_API = '6\r',

    // Cambia el url de la version del API a usar.
    CAMBIAR_VERSION_API = '7\r',

    // Cambia el access token del dispositvo.
    CAMBIAR_ACCESS_TOKEN = '8\r',

    // Cambia la accion opcional realizada por el dispositivo.
    CAMBIAR_ACCION_OPCIONAL = '9\r',

    // Evento de finalizacion de configuracion
    FINALIZAR_CONFIGURACIO = '10\r'
};

export enum EVENTOS_GUARDADO_CONFIGURACION_CHECADOR {
    /*
    * Eventos que se pasan por medio de Serial.
    * */

    // Evento de verificacion de configuracion.
    INICIAR_CONFIGURACION = '1\r',

    // Evento para cambiar el SSID de la red.
    CAMBIAR_SSID = '2\r',

    // Cambia la password del SSID.
    CAMBIAR_PASSWORD = '3\r',

    // Cambia el puerto del servidor API.
    CAMBIAR_PUERTO_API = '4\r',

    // Cambia la ip del servidor API.
    CAMBIAR_IP_API = '5\r',

    // Cambia el url de la version del API a usar.
    CAMBIAR_VERSION_API = '6\r',

    // Cambia el access token del dispositvo.
    CAMBIAR_ACCESS_TOKEN = '7\r',

    // Evento de finalizacion de configuracion
    FINALIZAR_CONFIGURACIO = '8\r'
};

export enum EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR {
    /*
    * Eventos que se pasan por medio de Serial.
    * */

    // Evento de verificacion de configuracion.
    INICIAR_CONFIGURACION = '1\r',

    // Evento para cambiar el SSID de la red.
    CAMBIAR_ROL_PEDIDO = '2\r',

    // Evento para cambiar el SSID de la red.
    CAMBIAR_SSID = '3\r',

    // Cambia la password del SSID.
    CAMBIAR_PASSWORD = '4\r',

    // Cambia el puerto del servidor API.
    CAMBIAR_PUERTO_API = '5\r',

    // Cambia la ip del servidor API.
    CAMBIAR_IP_API = '6\r',

    // Cambia el url de la version del API a usar.
    CAMBIAR_VERSION_API = '7\r',

    // Cambia el access token del dispositvo.
    CAMBIAR_ACCESS_TOKEN = '8\r',

    // Evento de finalizacion de configuracion
    FINALIZAR_CONFIGURACIO = '9\r'
};

export enum EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA {
    /*
    * Eventos que se pasan por medio de Serial.
    * */

    // Evento de verificacion de configuracion.
    INICIAR_CONFIGURACION = '1\r',

    // Evento para cambiar el SSID de la red.
    CAMBIAR_SSID = '2\r',

    // Cambia la password del SSID.
    CAMBIAR_PASSWORD = '3\r',

    // Cambia el puerto del servidor API.
    CAMBIAR_PUERTO_API = '4\r',

    // Cambia la ip del servidor API.
    CAMBIAR_IP_API = '5\r',

    // Cambia el access token del dispositvo.
    CAMBIAR_ACCESS_TOKEN = '6\r',

    // Evento de finalizacion de configuracion
    FINALIZAR_CONFIGURACIO = '7\r'
};