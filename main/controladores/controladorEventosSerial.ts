// Flags del dispositivo.
import {
    EVENTOS_GUARDADO_DATOS_TARJETA,
    FLAGS_DISPOSITIVO
} from "../enums";

// Manejo de serial port.
import {
    ReadlineParser,
    SerialPort
} from "serialport";

export const conexionAbierta = async () => {
    try {
        console.log("Conexion iniciada");

    } catch(excepcion) {
        // Imprimimos la excepcion.
        console.log("Ocurrio una excepcion");
        console.log(excepcion);
    }
};

export const alRecivirDatos = async (
    respuesta: any,
    parser: ReadlineParser,
    colaOperaciones: any[],
    puertoSerial: SerialPort
) => {
    try {
        if(respuesta == FLAGS_DISPOSITIVO.INICIALIZACION_TERMINADA) {
            console.log('inicializacion del dispositivo terminada');
            parser.emit('iniciar_envio_datos');
        }

        if(respuesta == FLAGS_DISPOSITIVO.ESCRITURA_TERMINADA) {
            console.log('escritura de datos terminada');
            /**
             * En este caso se mandara el evento a la cola de
             * operaciones desde el handler del evento se extraera de la
             * cola y se llamara al handler.
             */
            const operacion = colaOperaciones.shift();
            parser.emit(operacion);
        }

        if(respuesta == FLAGS_DISPOSITIVO.OPERACION_TERMINADA) {
            console.log('puerto cerrado');
            puertoSerial.close();
        }

    } catch(excepcion) {
        // Imprimimos la excepcion.
        console.log("Ocurrio una excepcion");
        console.log(excepcion);
    }
};

export const iniciarEnvioDatos = async (
    puertoSerial: SerialPort,
    colaOperaciones: any[],
    evento: string
) => {
    try {
        console.log("iniciando envio de datos");

        puertoSerial.write(
            evento,
            'ascii'
        );

        puertoSerial.drain((error) => {    
            colaOperaciones.push('enviar_datos');
        });

    } catch(excepcion) {
        // Imprimimos la excepcion.
        console.log("Ocurrio una excepcion");
        console.log(excepcion);
    }
};

export const enviarDato = async (
    datoAGuardar: any[],
    puertoSerial: SerialPort,
    colaOperaciones: any[],
    siguienteEvento: string,
) => {
    try {
        const evento = datoAGuardar[0];
        const dato = datoAGuardar[1];

        console.log("enviando dato: " + dato.toString());

        puertoSerial.write(
            evento,
            'ascii'
        );
        puertoSerial.write(
            dato,
            'ascii'
        );
        puertoSerial.drain((error) => {
            colaOperaciones.push(siguienteEvento);
        });

    } catch(excepcion) {
        // Imprimimos la excepcion.
        console.log("Ocurrio una excepcion");
        console.log(excepcion);
    }
};

export const terminarGuardado = (
    puertoSerial: SerialPort,
    evento: string
) => {
    try {
        console.log("Envio de datos finalizado");

        puertoSerial.write(
            evento,
            'ascii'
        );

        puertoSerial.end();
        puertoSerial.drain();
    } catch(excepcion) {
        // Imprimimos la excepcion.
        console.log("Ocurrio una excepcion");
        console.log(excepcion);
    }
}

export const conexionCerrada = (
) => {
    try {
        console.log("Conexion cerrada");

    } catch (excepcion) {
        // Imprimimos la excepcion.
        console.log("Ocurrio una excepcion");
        console.log(excepcion);
    }
};
