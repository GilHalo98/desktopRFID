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

export enum EVENTOS_GUARDADO_CONFIGURACION_IOT {
    /*
    * Eventos que se pasan por medio de Serial.
    * */

    // Inicia el grabado de datos.
    INICIAR_GUARDADO_DATOS = '1\r',

    // Cambia el permiso pedido por el dispositivo.
    CAMBIAR_PERMISO_PEDIDO = '2\r',
    
    // Cambia el SSID de la red.
    CAMBIAR_SSID = '3\r',
    
    // Cambia el password de la red.
    CAMBIAR_PASSWORD = '4\r',
    
    // Cambia el puerto del server API.
    CAMBIAR_PUERTO_API = '5\r',

    // Cambia el IP del server API.
    CAMBIAR_IP_API = '6\r',
    
    // Cambia la version del server API.
    CAMBIAR_VERSION_API = '7\r',
    
    // Cambia el access token del dispositivo.
    CAMBIAR_ACCESS_TOKEN = '8\r',

    // Termina el grabado de datos.
    TERMINAR_GUARDADO_DATOS = '9\r',
};