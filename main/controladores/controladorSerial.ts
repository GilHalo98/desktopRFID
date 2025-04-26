// Librerias de electron.
import { IpcMainEvent } from "electron";

// Manejo de serial port.
import {
    ReadlineParser,
    SerialPort,
} from 'serialport';

// Controladores de eventos serial.
import {
    alRecivirDatos,
    conexionAbierta,
    conexionCerrada,
    enviarDato,
    iniciarEnvioDatos,
    terminarGuardado
} from "./controladorEventosSerial";

// Enumeradores.
import {
    EVENTOS_GUARDADO_CONFIGURACION_CHECADOR,
    EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR,
    EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA,
    EVENTOS_GUARDADO_CONFIGURACION_LECTOR,
    EVENTOS_GUARDADO_DATOS_TARJETA
} from "../enums";

// Modelos.
import {
    Empleado
} from "../../renderer/utils/API/modelos/empleado";

import {
    Rol
} from "../../renderer/utils/API/modelos/rol";

import {
    Permiso
} from "../../renderer/utils/API/modelos/permiso";

// Instancia del puerto serial.
let puertoSerial: SerialPort = null;

// Cola de operaciones serial.
let colaOperaciones = [];
let colaDatos = [];

// Registra un reporte de actividad finalizada.
export const explorarPuertos = async (
    evento: IpcMainEvent,
    mostrarTodosLosPuertos: boolean
) => {
    try {
        // Listamos los puertos seriales.
        const puertos = await SerialPort.list();

        // Lista de puertos filtrados.
        const puertosFiltrados = [];

        // Si se pasa el parametro de filtrado de puertos.
        if(!mostrarTodosLosPuertos) {
            // Filtramos los puertos.
            puertos.map((puerto) => {
                if(!puerto.path.includes('ttyS')) {
                    puertosFiltrados.push(puerto);
                }
            });

            // Retornamos los puertos filtrados
            evento.reply('puertos_seriales_encontrados', puertosFiltrados);

        } else {
            // Retornamos los puertos encontrados.
            evento.reply('puertos_seriales_encontrados', puertos);
        }
    } catch(excepcion) {
        // Imprimimos la excepcion.
        console.log("Ocurrio una excepcion");
        console.log(excepcion);

        // Al ocurrir una excepcion retornamos nulo.
        evento.reply('puertos_seriales_encontrados', null);
    }
};

// Conectamos el dispositivo quemador y guardamos los datos en
// la tarjeta.
export const guardarDatosTarjeta = async (
    evento: IpcMainEvent,
    args: {
        registro: Empleado,
        registrosVinculados: {
            rol: Rol,
            permiso: Permiso
        },
        datosDispositivo: {
            path: string,
            baudRate: number
        }
    }
) => {
    console.log(args);

    try {
        // Si el puerto serial esta iniciado.
        if(puertoSerial) {
            // Lo terminamos.
            puertoSerial.close();

            // Vaciamos la cola de operaciones.
            colaOperaciones = [];

            // Vaciamos la cola de datos.
            colaDatos = [];
        }

        // Descomponemos los datos que se guardaran en la tarjeta.
        colaDatos = [[
                EVENTOS_GUARDADO_DATOS_TARJETA.ID_ENVIADO,
                args.registro.id.toString()
            ], [
                EVENTOS_GUARDADO_DATOS_TARJETA.AUTORIZACION_ENVIADO,
                args.registrosVinculados.permiso.autorizacion.toString()
            ], [
                EVENTOS_GUARDADO_DATOS_TARJETA.ROL_ENVIADO,
                args.registrosVinculados.rol.bitRol.toString()
        ]]

        // Inicaliamos el puerto serial.
        puertoSerial = new SerialPort(args.datosDispositivo, (callback) => {
            console.log('Conexión a puerto establecido');
            console.log(callback);
            puertoSerial.set({
                rts: false,
                dtr: false
            });
        });

        // Inicializamos un parser para mandar y leer datos del serial.
        const parser = puertoSerial.pipe(new ReadlineParser({
            delimiter: '\r\n'
        }));

        // Esperamos por el evento del puerto abierto.
        puertoSerial.on("open", conexionAbierta);

        // Si recivimos datos, los mostramos.
        parser.on('data', (respuesta: any) => {
            console.log(respuesta);
            alRecivirDatos(
                respuesta,
                parser,
                colaOperaciones,
                puertoSerial
            );
        });

        parser.once('iniciar_envio_datos', () => {
            iniciarEnvioDatos(
                puertoSerial,
                colaOperaciones,
                EVENTOS_GUARDADO_DATOS_TARJETA.INICIAR_GUARDADO_DATOS
            );
        });

        parser.on('enviar_datos', () => {
            enviarDato(
                colaDatos.shift(),
                puertoSerial,
                colaOperaciones,
                colaDatos.length > 0 ? "enviar_datos" : "terminar_envio_datos"
            );
        });

        parser.once('terminar_envio_datos', () => {
            terminarGuardado(
                puertoSerial,
                EVENTOS_GUARDADO_DATOS_TARJETA.TERMINAR_GUARDADO_DATOS
            );
        });

        parser.on("close", conexionCerrada);

    } catch(excepcion) {
        // Imprimimos la excepcion.
        console.log("Ocurrio una excepcion");
        console.log(excepcion);
    }
};

export const guardarConfiguracionDispositivoLector = async (
    evento: IpcMainEvent,
    args: {
        configuracion: {
            bitPermiso: string,
            ssid: string,
            password: string,
            puertoApi: string,
            ipApi: string,
            versionApi: string,
            apiKey: string,
            accionOpcional: string,
            registrarSalida: string
        },
        datosDispositivo: {
            path: string,
            baudRate: number
        }
    }
) => {
    try {
        // Si el puerto serial esta iniciado.
        if(puertoSerial) {
            if(puertoSerial.isOpen) {
                // Lo terminamos.
                puertoSerial.close();
            }
        }

        // Vaciamos la cola de operaciones.
        colaOperaciones = [];

        // Vaciamos la cola de datos.
        colaDatos = [];

        console.clear();

        // Descomponemos los datos que se guardaran en la tarjeta.
        colaDatos = [[
            EVENTOS_GUARDADO_CONFIGURACION_LECTOR.CAMBIAR_PERMISO_PEDIDO,
            args.configuracion.bitPermiso.toString()
        ], [
            EVENTOS_GUARDADO_CONFIGURACION_LECTOR.CAMBIAR_SSID,
            args.configuracion.ssid.toString()
        ], [
            EVENTOS_GUARDADO_CONFIGURACION_LECTOR.CAMBIAR_PASSWORD,
            args.configuracion.password.toString()
        ], [
            EVENTOS_GUARDADO_CONFIGURACION_LECTOR.CAMBIAR_PUERTO_API,
            args.configuracion.puertoApi.toString()
        ], [
            EVENTOS_GUARDADO_CONFIGURACION_LECTOR.CAMBIAR_IP_API,
            args.configuracion.ipApi.toString()
        ], [
            EVENTOS_GUARDADO_CONFIGURACION_LECTOR.CAMBIAR_VERSION_API,
            args.configuracion.versionApi.toString()
        ], [
            EVENTOS_GUARDADO_CONFIGURACION_LECTOR.CAMBIAR_ACCESS_TOKEN,
            args.configuracion.apiKey.toString()
        ], [
            EVENTOS_GUARDADO_CONFIGURACION_LECTOR.CAMBIAR_ACCION_OPCIONAL,
            args.configuracion.accionOpcional.toString()
        ], [
            EVENTOS_GUARDADO_CONFIGURACION_LECTOR.CAMBIAR_REGISTRAR_REPORTE_SALIDA,
            args.configuracion.registrarSalida.toString()
        ]];

        // Inicalizamos el puerto serial.
        puertoSerial = new SerialPort(args.datosDispositivo, (callback) => {
            console.log('Conexión a puerto establecido');
            console.log(callback);
            puertoSerial.set({
                rts: false,
                dtr: false
            });
        });

        // Inicializamos un parser para mandar y leer datos del serial.
        const parser = puertoSerial.pipe(new ReadlineParser({
            delimiter: '\r\n'
        }));

        // Esperamos por el evento del puerto abierto.
        puertoSerial.on("open", () => {
            conexionAbierta();
        });

        // Si recivimos datos, los mostramos.
        parser.on("data", (respuesta: any) => {
            console.log(respuesta);
            alRecivirDatos(
                respuesta,
                parser,
                colaOperaciones,
                puertoSerial
            );
        });

        parser.once("iniciar_envio_datos", () => {
            iniciarEnvioDatos(
                puertoSerial,
                colaOperaciones,
                EVENTOS_GUARDADO_CONFIGURACION_LECTOR.INICIAR_CONFIGURACION
            );
        });

        parser.on("enviar_datos", () => {
            enviarDato(
                colaDatos.shift(),
                puertoSerial,
                colaOperaciones,
                colaDatos.length > 0 ? "enviar_datos" : "terminar_envio_datos"
            );
        });

        parser.once("terminar_envio_datos", () => {
            terminarGuardado(
                puertoSerial,
                EVENTOS_GUARDADO_CONFIGURACION_LECTOR.FINALIZAR_CONFIGURACIO
            );
        });

        parser.on("close", conexionCerrada);
    } catch(excepcion) {
        // Imprimimos la excepcion.
        console.log("Ocurrio una excepcion");
        console.log(excepcion);
    }
};

export const guardarConfiguracionDispositivoChecador = async (
    evento: IpcMainEvent,
    args: {
        configuracion: {
            ssid: string,
            password: string,
            puertoApi: string,
            ipApi: string,
            versionApi: string,
            apiKey: string
        },
        datosDispositivo: {
            path: string,
            baudRate: number
        }
    }
) => {
    try {
        // Si el puerto serial esta iniciado.
        if(puertoSerial) {
            if(puertoSerial.isOpen) {
                // Lo terminamos.
                puertoSerial.close();
            }
        }

        // Vaciamos la cola de operaciones.
        colaOperaciones = [];

        // Vaciamos la cola de datos.
        colaDatos = [];

        // Descomponemos los datos que se guardaran en la tarjeta.
        colaDatos = [[
            EVENTOS_GUARDADO_CONFIGURACION_CHECADOR.CAMBIAR_SSID,
            args.configuracion.ssid.toString()
        ], [
            EVENTOS_GUARDADO_CONFIGURACION_CHECADOR.CAMBIAR_PASSWORD,
            args.configuracion.password.toString()
        ], [
            EVENTOS_GUARDADO_CONFIGURACION_CHECADOR.CAMBIAR_PUERTO_API,
            args.configuracion.puertoApi.toString()
        ], [
            EVENTOS_GUARDADO_CONFIGURACION_CHECADOR.CAMBIAR_IP_API,
            args.configuracion.ipApi.toString()
        ], [
            EVENTOS_GUARDADO_CONFIGURACION_CHECADOR.CAMBIAR_VERSION_API,
            args.configuracion.versionApi.toString()
        ], [
            EVENTOS_GUARDADO_CONFIGURACION_CHECADOR.CAMBIAR_ACCESS_TOKEN,
            args.configuracion.apiKey.toString()
        ]];

        // Inicaliamos el puerto serial.
        puertoSerial = new SerialPort(args.datosDispositivo, (callback) => {
            console.log('Conexión a puerto establecido');
            console.log(callback);
            puertoSerial.set({
                rts: false,
                dtr: false
            });
        });

        // Inicializamos un parser para mandar y leer datos del serial.
        const parser = puertoSerial.pipe(new ReadlineParser({
            delimiter: '\r\n'
        }));

        // Esperamos por el evento del puerto abierto.
        puertoSerial.on("open", conexionAbierta);

        // Si recivimos datos, los mostramos.
        parser.on('data', (respuesta: any) => {
            console.log(respuesta);
            alRecivirDatos(
                respuesta,
                parser,
                colaOperaciones,
                puertoSerial
            );
        });

        parser.once('iniciar_envio_datos', () => {
            iniciarEnvioDatos(
                puertoSerial,
                colaOperaciones,
                EVENTOS_GUARDADO_CONFIGURACION_CHECADOR.INICIAR_CONFIGURACION
            );
        });

        parser.on('enviar_datos', () => {
            enviarDato(
                colaDatos.shift(),
                puertoSerial,
                colaOperaciones,
                colaDatos.length > 0 ? "enviar_datos" : "terminar_envio_datos"
            );
        });

        parser.once('terminar_envio_datos', () => {
            terminarGuardado(
                puertoSerial,
                EVENTOS_GUARDADO_CONFIGURACION_CHECADOR.FINALIZAR_CONFIGURACIO
            );
        });

        parser.on("close", conexionCerrada);

    } catch(excepcion) {
        // Imprimimos la excepcion.
        console.log("Ocurrio una excepcion");
        console.log(excepcion);
    }
};

export const guardarConfiguracionDispositivoControlador = async (
    evento: IpcMainEvent,
    args: {
        configuracion: {
            bitRol: string,
            ssid: string,
            password: string,
            puertoApi: string,
            ipApi: string,
            versionApi: string,
            apiKey: string
        },
        datosDispositivo: {
            path: string,
            baudRate: number
        }
    }
) => {
    try {
        // Si el puerto serial esta iniciado.
        if(puertoSerial) {
            if(puertoSerial.isOpen) {
                // Lo terminamos.
                puertoSerial.close();
            }
        }

        // Vaciamos la cola de operaciones.
        colaOperaciones = [];

        // Vaciamos la cola de datos.
        colaDatos = [];

        console.log(args.configuracion);

        // Descomponemos los datos que se guardaran en la tarjeta.
        colaDatos = [[
            EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR.CAMBIAR_ROL_PEDIDO,
            args.configuracion.bitRol.toString()
        ], [
            EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR.CAMBIAR_SSID,
            args.configuracion.ssid.toString()
        ], [
            EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR.CAMBIAR_PASSWORD,
            args.configuracion.password.toString()
        ], [
            EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR.CAMBIAR_PUERTO_API,
            args.configuracion.puertoApi.toString()
        ], [
            EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR.CAMBIAR_IP_API,
            args.configuracion.ipApi.toString()
        ], [
            EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR.CAMBIAR_VERSION_API,
            args.configuracion.versionApi.toString()
        ], [
            EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR.CAMBIAR_ACCESS_TOKEN,
            args.configuracion.apiKey.toString()
        ]];

        // Inicaliamos el puerto serial.
        puertoSerial = new SerialPort(args.datosDispositivo, (callback) => {
            console.log('Conexión a puerto establecido');
            console.log(callback);
            puertoSerial.set({
                rts: false,
                dtr: false
            });
        });

        // Inicializamos un parser para mandar y leer datos del serial.
        const parser = puertoSerial.pipe(new ReadlineParser({
            delimiter: '\r\n'
        }));

        // Esperamos por el evento del puerto abierto.
        puertoSerial.on("open", conexionAbierta);

        // Si recivimos datos, los mostramos.
        parser.on('data', (respuesta: any) => {
            console.log(respuesta);
            alRecivirDatos(
                respuesta,
                parser,
                colaOperaciones,
                puertoSerial
            );
        });

        parser.once('iniciar_envio_datos', () => {
            iniciarEnvioDatos(
                puertoSerial,
                colaOperaciones,
                EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR.INICIAR_CONFIGURACION
            );
        });

        parser.on('enviar_datos', () => {
            enviarDato(
                colaDatos.shift(),
                puertoSerial,
                colaOperaciones,
                colaDatos.length > 0 ? "enviar_datos" : "terminar_envio_datos"
            );
        });

        parser.once('terminar_envio_datos', () => {
            terminarGuardado(
                puertoSerial,
                EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR.FINALIZAR_CONFIGURACIO
            );
        });

        parser.on("close", conexionCerrada);

    } catch(excepcion) {
        // Imprimimos la excepcion.
        console.log("Ocurrio una excepcion");
        console.log(excepcion);
    }
};

export const guardarConfiguracionDispositivoControladorPuerta = async (
    evento: IpcMainEvent,
    args: {
        configuracion: {
            ssid: string,
            password: string,
            puertoApi: string,
            ipApi: string,
            apiKey: string
        },
        datosDispositivo: {
            path: string,
            baudRate: number
        }
    }
) => {

    console.log(args.configuracion);

    try {
        // Si el puerto serial esta iniciado.
        if(puertoSerial) {
            if(puertoSerial.isOpen) {
                // Lo terminamos.
                puertoSerial.close();
            }
        }

        // Vaciamos la cola de operaciones.
        colaOperaciones = [];

        // Vaciamos la cola de datos.
        colaDatos = [];

        console.clear();

        // Descomponemos los datos que se guardaran en la tarjeta.
        colaDatos = [[
            EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA.CAMBIAR_SSID,
            args.configuracion.ssid.toString()
        ], [
            EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA.CAMBIAR_PASSWORD,
            args.configuracion.password.toString()
        ], [
            EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA.CAMBIAR_PUERTO_API,
            args.configuracion.puertoApi.toString()
        ], [
            EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA.CAMBIAR_IP_API,
            args.configuracion.ipApi.toString()
        ], [
            EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA.CAMBIAR_ACCESS_TOKEN,
            args.configuracion.apiKey.toString()
        ]];

        // Inicaliamos el puerto serial.
        puertoSerial = new SerialPort(args.datosDispositivo, (callback) => {
            console.log('Conexión a puerto establecido');
            console.log(callback);
            puertoSerial.set({
                rts: false,
                dtr: false
            });
        });

        // Inicializamos un parser para mandar y leer datos del serial.
        const parser = puertoSerial.pipe(new ReadlineParser({
            delimiter: '\r\n'
        }));

        // Esperamos por el evento del puerto abierto.
        puertoSerial.on("open", conexionAbierta);

        // Si recivimos datos, los mostramos.
        parser.on('data', (respuesta: any) => {
            console.log(respuesta);
            alRecivirDatos(
                respuesta,
                parser,
                colaOperaciones,
                puertoSerial
            );
        });

        parser.once('iniciar_envio_datos', () => {
            iniciarEnvioDatos(
                puertoSerial,
                colaOperaciones,
                EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA.INICIAR_CONFIGURACION
            );
        });

        parser.on('enviar_datos', () => {
            enviarDato(
                colaDatos.shift(),
                puertoSerial,
                colaOperaciones,
                colaDatos.length > 0 ? "enviar_datos" : "terminar_envio_datos"
            );
        });

        parser.once('terminar_envio_datos', () => {
            terminarGuardado(
                puertoSerial,
                EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA.FINALIZAR_CONFIGURACIO
            );
        });

        parser.on("close", conexionCerrada);

    } catch(excepcion) {
        // Imprimimos la excepcion.
        console.log("Ocurrio una excepcion");
        console.log(excepcion);
    }
};
