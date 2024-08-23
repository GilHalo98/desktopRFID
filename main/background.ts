import path from 'path'
import { app, ipcMain, ipcRenderer } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'

// Manipulacion de archivos.
import { readFileSync } from 'fs';

// Manipulación de puerto serial
import {
    ByteLengthParser,
    ReadlineParser,
    SerialPort
} from 'serialport';

// Para la conexion al servidor socket.
import { io } from 'socket.io-client';

// Controladores de IPC.
import {
    explorarPuertos,
    guardarConfiguracionDispositivoChecador,
    guardarConfiguracionDispositivoControlador,
    guardarConfiguracionDispositivoControladorPuerta,
    guardarConfiguracionDispositivoLector,
    guardarDatosTarjeta
} from './controladores/controladorSerial';

const isProd = process.env.NODE_ENV === 'production'

let clienteSocket = undefined;

let socket = undefined;

let listaClientes = [];

let estatusDispositivo = 0;

if (isProd) {
    serve({ directory: 'app' });
} else {
    app.setPath('userData', `${app.getPath('userData')} (development)`);
}

;(async () => {
    await app.whenReady();

    const mainWindow = createWindow('main', {
        width: 1000,
        height: 600,
        webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        },
    });

    if (isProd) {
        await mainWindow.loadURL('app://./');
    } else {
        const port = process.argv[2];
        await mainWindow.loadURL(`http://localhost:${port}/`);
    }
})()

app.on('window-all-closed', () => {
    app.quit();
});

// Exploramos los puertos seriales disponibles.
ipcMain.on(
    'explorar_puertos_serial',
    explorarPuertos
);

ipcMain.on(
    'guardar_datos_tarjeta',
    guardarDatosTarjeta
);

ipcMain.on(
    'guardar_configuracion_lector',
    guardarConfiguracionDispositivoLector
);

ipcMain.on(
    'guardar_configuracion_checador',
    guardarConfiguracionDispositivoChecador
);

ipcMain.on(
    'guardar_configuracion_controlador',
    guardarConfiguracionDispositivoControlador
);

ipcMain.on(
    'guardar_configuracion_controlador_puerta',
    guardarConfiguracionDispositivoControladorPuerta
);

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

    socket.on('estatus_dispositivo', (estatus) => {
        // Guardamos el estatus del dispositivo.
        estatusDispositivo = estatus;
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

ipcMain.on('estatus_dispositivo', (
    evento,
    args
) => {
    evento.returnValue = estatusDispositivo;
    estatusDispositivo = 0;
});

/**
 * Manipulacion de archivos locales.
*/
ipcMain.on('cargar_imagen', async (evento, args) => {
    const imagenB64 = readFileSync(
        args.path,
        {
            encoding: 'base64'
        }
    );

    evento.returnValue = imagenB64;
});
