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
import { EVENTOS_GUARDADO_DATOS_TARJETA } from "../enums";

// Modelos.
import { RespuestaConsultaEmpleado } from "../../renderer/utils/API/respuestas/consultaEmpleado";

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
        registro: RespuestaConsultaEmpleado,
        datosDispositivo: {
            path: string,
            baudRate: number
        }
    }
) => {
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
                args.registro.rol.permiso.autorizacion.toString()
            ], [
                EVENTOS_GUARDADO_DATOS_TARJETA.ROL_ENVIADO,
                args.registro.rol.bitRol.toString()
        ]]

        // Inicaliamos el puerto serial.
        puertoSerial = new SerialPort(args.datosDispositivo, (callback) => {
            console.log('Conexión a puerto establecido');
            console.log(callback);
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
            iniciarEnvioDatos(puertoSerial, colaOperaciones);
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
            terminarGuardado(puertoSerial);
        });

        parser.on("close", conexionCerrada);

    } catch(excepcion) {
        // Imprimimos la excepcion.
        console.log("Ocurrio una excepcion");
        console.log(excepcion);
    }
};

export const guardarConfiguracionDispositivo = async (
) => {
    try {
    } catch(excepcion) {
    }
};