import path from 'path'
import { app, ipcMain, ipcRenderer } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'

// Manipulación de puerto serial
import { ByteLengthParser, ReadlineParser, SerialPort } from 'serialport';

// Para la conexion al servidor socket.
import { io } from 'socket.io-client';

// Enumeradores.
import {
    FLAGS_DISPOSITIVO,
    EVENTOS_GUARDADO_DATOS_TARJETA,
    EVENTOS_GUARDADO_CONFIGURACION_IOT
} from './enums';

const isProd = process.env.NODE_ENV === 'production'

const colaOperaciones = [];

let clienteSocket = undefined;

let socket = undefined;

let listaClientes = [];

if (isProd) {
    serve({ directory: 'app' })
} else {
    app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
    await app.whenReady()

    const mainWindow = createWindow('main', {
        width: 1000,
        height: 600,
        webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        },
    })

    if (isProd) {
        await mainWindow.loadURL('app://./')
    } else {
        const port = process.argv[2]
        await mainWindow.loadURL(`http://localhost:${port}/`)
    }
})()

app.on('window-all-closed', () => {
    app.quit()
})

// Exploramos los puertos seriales disponibles.
ipcMain.on('explorar_puertos_serial', async (
    evento,
    mostrarTodosLosPuertos
) => {
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
});

ipcMain.on('guardar_datos_tarjeta', async (
    evento,
    args
) => {
    console.log(args.datosDispositivo);
    console.log(args.registro);

    // Se maneja por contexto
    const puerto = new SerialPort(args.datosDispositivo, (callback) => {
        console.log('Conexión a puerto establecido');

        console.log(callback);
    });
    
    const parser = puerto.pipe(new ReadlineParser({ delimiter: '\r\n' }));

    // Esperamos por el evento del puerto abierto.
    puerto.on("open", () => {
        console.log("-- Connection opened --");
    });

    // Si recivimos datos, los mostramos.
    parser.on('data', (respuesta) => { 
        console.log(respuesta);

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
            puerto.close();
        }
    });

    parser.once('iniciar_envio_datos', () => {
        puerto.write(
            EVENTOS_GUARDADO_DATOS_TARJETA.INICIAR_GUARDADO_DATOS,
            'ascii'
        );
        puerto.drain((error) => {    
            colaOperaciones.push('enviar_id');
        });
    });

    parser.once('enviar_id', () => {
        puerto.write(
            EVENTOS_GUARDADO_DATOS_TARJETA.ID_ENVIADO,
            'ascii'
        );
        puerto.write(
            args.registro.id.toString(), 
            'ascii'
        );
        puerto.drain((error) => {
            colaOperaciones.push('enviar_autorizacion');
        });
    });

    parser.once('enviar_autorizacion', () => {
        puerto.write(
            EVENTOS_GUARDADO_DATOS_TARJETA.AUTORIZACION_ENVIADO,
            'ascii'
        );
        puerto.write(
            args.registro.rol.permiso.autorizacion.toString(),
            'ascii'
        );
        puerto.drain((error) => {
            colaOperaciones.push('terminar_envio_datos');
        });
    });

    parser.once('terminar_envio_datos', () => {
        puerto.write(
            EVENTOS_GUARDADO_DATOS_TARJETA.TERMINAR_GUARDADO_DATOS,
            'ascii'
        );

        puerto.end();
        puerto.drain();
    });

    parser.on("close", () => {
        console.log('puerto cerrado');
    });
});

ipcMain.on('guardar_configuracion_IoT', async (
    evento,
    args
) => {
    console.log(args.datosDispositivo);
    console.log(args.configuracion);

    // Se maneja por contexto
    const puerto = new SerialPort(args.datosDispositivo, (callback) => {
        console.log('Conexión a puerto establecido');

        console.log(callback);
    });

    const parser = puerto.pipe(new ReadlineParser({ delimiter: '\r\n' }));

    // Esperamos por el evento del puerto abierto.
    puerto.on("open", () => {
        console.log("Conexion establecida, porfavor reinicie el dispositivo para almacenar la configuracion de este.");
    });

    // Si recivimos datos, los mostramos.
    parser.on('data', (respuesta) => {
        puerto.flush();
        console.log(respuesta);

        if(respuesta == FLAGS_DISPOSITIVO.INICIALIZACION_TERMINADA) {
            console.log('inicializacion del dispositivo terminada');
            parser.emit('iniciar_envio_configuracion');
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
            puerto.close();
        }
    });

    parser.once('iniciar_envio_configuracion', () => {
        puerto.write(
            EVENTOS_GUARDADO_CONFIGURACION_IOT.INICIAR_GUARDADO_DATOS,
            'ascii'
        );
        puerto.drain((error) => {    
            colaOperaciones.push('enviar_permiso');
        });
    });

    parser.once('enviar_permiso', () => {
        puerto.write(
            EVENTOS_GUARDADO_CONFIGURACION_IOT.CAMBIAR_PERMISO_PEDIDO,
            'ascii'
        );
        puerto.write(args.configuracion.bitPermiso, 'ascii');

        puerto.drain((error) => {
            colaOperaciones.push('enviar_ssid');
        });
    });

    parser.once('enviar_ssid', () => {
        puerto.write(
            EVENTOS_GUARDADO_CONFIGURACION_IOT.CAMBIAR_SSID,
            'ascii'
        );
        puerto.write(args.configuracion.ssid, 'ascii');

        puerto.drain((error) => {
            colaOperaciones.push('enviar_password');
        });
    });

    parser.once('enviar_password', () => {
        puerto.write(
            EVENTOS_GUARDADO_CONFIGURACION_IOT.CAMBIAR_PASSWORD,
            'ascii'
        );
        puerto.write(args.configuracion.password, 'ascii');

        puerto.drain((error) => {
            colaOperaciones.push('enviar_puerto_api');
        });
    });

    parser.once('enviar_puerto_api', () => {
        puerto.write(
            EVENTOS_GUARDADO_CONFIGURACION_IOT.CAMBIAR_PUERTO_API,
            'ascii'
        );
        puerto.write(args.configuracion.puertoApi, 'ascii');

        puerto.drain((error) => {
            colaOperaciones.push('enviar_ip_api');
        });
    });

    parser.once('enviar_ip_api', () => {
        puerto.write(
            EVENTOS_GUARDADO_CONFIGURACION_IOT.CAMBIAR_IP_API,
            'ascii'
        );
        puerto.write(args.configuracion.ipApi, 'ascii');

        puerto.drain((error) => {
            colaOperaciones.push('enviar_version_api');
        });
    });

    parser.once('enviar_version_api', () => {
        puerto.write(
            EVENTOS_GUARDADO_CONFIGURACION_IOT.CAMBIAR_VERSION_API,
            'ascii'
        );
        puerto.write(args.configuracion.versionApi, 'ascii');

        puerto.drain((error) => {
            colaOperaciones.push('enviar_access_token');
        });
    });

    parser.on('enviar_access_token', () => {
        puerto.write(
            EVENTOS_GUARDADO_CONFIGURACION_IOT.CAMBIAR_ACCESS_TOKEN,
            'ascii'
        );
        puerto.write(args.configuracion.apiKey, 'ascii');

        puerto.drain((error) => {
            colaOperaciones.push('terminar_configuracion');
        });
    });

    parser.once('terminar_configuracion', () => {
        parser.removeListener('enviar_access_token', () => {});

        puerto.write(
            EVENTOS_GUARDADO_CONFIGURACION_IOT.TERMINAR_GUARDADO_DATOS,
            'ascii'
        );

        puerto.end();
        puerto.drain();
    });

    parser.on("close", () => {
        console.log('puerto cerrado');
    });
});

ipcMain.on('sesion_iniciada', async (
    evento,
    params
) => {
    const ipServer = params.ipServer;
    const token = params.token;

    // Iniciamos conexion con el token server.
    clienteSocket = io(ipServer, {
        extraHeaders: {
            authorization: token
        }
    });
    socket = clienteSocket.connect();

    /* Procesamiento de eventos recivdos por sockets */
    socket.on('cambio_estatus', () => {
        // Guardamos la lista de los clientes conectados.
        socket.emit('listar_clientes');
    });

    socket.on('lista_clientes', (lista) => {
        // Guardamos la lista de los clientes conectados.
        listaClientes = lista;
    });

    socket.on('cliente_terminado', () => {
        // Actualizamos la lista de los cleintes conectados.
        socket.emit('listar_clientes');
    });

    socket.on('cliente_conectado', () => {
        // Actualizamos la lista de los cleintes conectados.
        socket.emit('listar_clientes');
    });    
});

ipcMain.on('sesion_terminada', async (
    evento,
    args
) => {
    // Terminamos la conexion con el socketServer.
    socket.disconnect();
});

ipcMain.on('emitir_evento_socket', async (evento, args) => {
    // Emitimos un evento por medio de sockets.
    socket.emit(args.evento, args.parametros);
});

ipcMain.on('listar_clientes', (
    evento,
    args
) => {
    evento.returnValue = listaClientes;
});