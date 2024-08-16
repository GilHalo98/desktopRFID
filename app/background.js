(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("electron-serve"), require("electron-store"), require("socket.io-client"), require("serialport"));
	else if(typeof define === 'function' && define.amd)
		define(["electron-serve", "electron-store", "socket.io-client", "serialport"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("electron-serve"), require("electron-store"), require("socket.io-client"), require("serialport")) : factory(root["electron-serve"], root["electron-store"], root["socket.io-client"], root["serialport"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, (__WEBPACK_EXTERNAL_MODULE_electron_serve__, __WEBPACK_EXTERNAL_MODULE_electron_store__, __WEBPACK_EXTERNAL_MODULE_socket_io_client__, __WEBPACK_EXTERNAL_MODULE_serialport__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./main/controladores/controladorEventosSerial.ts":
/*!********************************************************!*\
  !*** ./main/controladores/controladorEventosSerial.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   alRecivirDatos: () => (/* binding */ alRecivirDatos),
/* harmony export */   conexionAbierta: () => (/* binding */ conexionAbierta),
/* harmony export */   conexionCerrada: () => (/* binding */ conexionCerrada),
/* harmony export */   enviarDato: () => (/* binding */ enviarDato),
/* harmony export */   iniciarEnvioDatos: () => (/* binding */ iniciarEnvioDatos),
/* harmony export */   terminarGuardado: () => (/* binding */ terminarGuardado)
/* harmony export */ });
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums */ "./main/enums.ts");
// Flags del dispositivo.


// Manejo de serial port.

const conexionAbierta = async () => {
  try {
    console.log("Conexion iniciada");
  } catch (excepcion) {
    // Imprimimos la excepcion.
    console.log("Ocurrio una excepcion");
    console.log(excepcion);
  }
};
const alRecivirDatos = async (respuesta, parser, colaOperaciones, puertoSerial) => {
  try {
    if (respuesta == _enums__WEBPACK_IMPORTED_MODULE_0__.FLAGS_DISPOSITIVO.INICIALIZACION_TERMINADA) {
      console.log('inicializacion del dispositivo terminada');
      parser.emit('iniciar_envio_datos');
    }
    if (respuesta == _enums__WEBPACK_IMPORTED_MODULE_0__.FLAGS_DISPOSITIVO.ESCRITURA_TERMINADA) {
      console.log('escritura de datos terminada');
      /**
       * En este caso se mandara el evento a la cola de
       * operaciones desde el handler del evento se extraera de la
       * cola y se llamara al handler.
       */
      const operacion = colaOperaciones.shift();
      parser.emit(operacion);
    }
    if (respuesta == _enums__WEBPACK_IMPORTED_MODULE_0__.FLAGS_DISPOSITIVO.OPERACION_TERMINADA) {
      console.log('puerto cerrado');
      puertoSerial.close();
    }
  } catch (excepcion) {
    // Imprimimos la excepcion.
    console.log("Ocurrio una excepcion");
    console.log(excepcion);
  }
};
const iniciarEnvioDatos = async (puertoSerial, colaOperaciones, evento) => {
  try {
    console.log("iniciando envio de datos");
    puertoSerial.write(evento, 'ascii');
    puertoSerial.drain(error => {
      colaOperaciones.push('enviar_datos');
    });
  } catch (excepcion) {
    // Imprimimos la excepcion.
    console.log("Ocurrio una excepcion");
    console.log(excepcion);
  }
};
const enviarDato = async (datoAGuardar, puertoSerial, colaOperaciones, siguienteEvento) => {
  try {
    const evento = datoAGuardar[0];
    const dato = datoAGuardar[1];
    console.log("enviando dato: " + dato.toString());
    puertoSerial.write(evento, 'ascii');
    puertoSerial.write(dato, 'ascii');
    puertoSerial.drain(error => {
      colaOperaciones.push(siguienteEvento);
    });
  } catch (excepcion) {
    // Imprimimos la excepcion.
    console.log("Ocurrio una excepcion");
    console.log(excepcion);
  }
};
const terminarGuardado = (puertoSerial, evento) => {
  try {
    console.log("Envio de datos finalizado");
    puertoSerial.write(evento, 'ascii');
    puertoSerial.end();
    puertoSerial.drain();
  } catch (excepcion) {
    // Imprimimos la excepcion.
    console.log("Ocurrio una excepcion");
    console.log(excepcion);
  }
};
const conexionCerrada = puertoSerial => {
  try {
    console.log("Conexion cerrada");
    puertoSerial.close();
    puertoSerial = null;
  } catch (excepcion) {
    // Imprimimos la excepcion.
    console.log("Ocurrio una excepcion");
    console.log(excepcion);
  }
};

/***/ }),

/***/ "./main/controladores/controladorSerial.ts":
/*!*************************************************!*\
  !*** ./main/controladores/controladorSerial.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   explorarPuertos: () => (/* binding */ explorarPuertos),
/* harmony export */   guardarConfiguracionDispositivoChecador: () => (/* binding */ guardarConfiguracionDispositivoChecador),
/* harmony export */   guardarConfiguracionDispositivoControlador: () => (/* binding */ guardarConfiguracionDispositivoControlador),
/* harmony export */   guardarConfiguracionDispositivoControladorPuerta: () => (/* binding */ guardarConfiguracionDispositivoControladorPuerta),
/* harmony export */   guardarConfiguracionDispositivoLector: () => (/* binding */ guardarConfiguracionDispositivoLector),
/* harmony export */   guardarDatosTarjeta: () => (/* binding */ guardarDatosTarjeta)
/* harmony export */ });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/map */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/map.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_includes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/includes */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/includes.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_includes__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_includes__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var serialport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! serialport */ "serialport");
/* harmony import */ var serialport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(serialport__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controladorEventosSerial */ "./main/controladores/controladorEventosSerial.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../enums */ "./main/enums.ts");


// Librerias de electron.

// Manejo de serial port.


// Controladores de eventos serial.


// Enumeradores.


// Modelos.

// Instancia del puerto serial.
let puertoSerial = null;

// Cola de operaciones serial.
let colaOperaciones = [];
let colaDatos = [];

// Registra un reporte de actividad finalizada.
const explorarPuertos = async (evento, mostrarTodosLosPuertos) => {
  try {
    // Listamos los puertos seriales.
    const puertos = await serialport__WEBPACK_IMPORTED_MODULE_2__.SerialPort.list();

    // Lista de puertos filtrados.
    const puertosFiltrados = [];

    // Si se pasa el parametro de filtrado de puertos.
    if (!mostrarTodosLosPuertos) {
      // Filtramos los puertos.
      _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_0___default()(puertos).call(puertos, puerto => {
        var _context;
        if (!_babel_runtime_corejs3_core_js_stable_instance_includes__WEBPACK_IMPORTED_MODULE_1___default()(_context = puerto.path).call(_context, 'ttyS')) {
          puertosFiltrados.push(puerto);
        }
      });

      // Retornamos los puertos filtrados
      evento.reply('puertos_seriales_encontrados', puertosFiltrados);
    } else {
      // Retornamos los puertos encontrados.
      evento.reply('puertos_seriales_encontrados', puertos);
    }
  } catch (excepcion) {
    // Imprimimos la excepcion.
    console.log("Ocurrio una excepcion");
    console.log(excepcion);

    // Al ocurrir una excepcion retornamos nulo.
    evento.reply('puertos_seriales_encontrados', null);
  }
};

// Conectamos el dispositivo quemador y guardamos los datos en
// la tarjeta.
const guardarDatosTarjeta = async (evento, args) => {
  console.log(args);
  try {
    // Si el puerto serial esta iniciado.
    if (puertoSerial) {
      // Lo terminamos.
      puertoSerial.close();

      // Vaciamos la cola de operaciones.
      colaOperaciones = [];

      // Vaciamos la cola de datos.
      colaDatos = [];
    }

    // Descomponemos los datos que se guardaran en la tarjeta.
    colaDatos = [[_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_DATOS_TARJETA.ID_ENVIADO, args.registro.id.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_DATOS_TARJETA.AUTORIZACION_ENVIADO, args.registrosVinculados.permiso.autorizacion.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_DATOS_TARJETA.ROL_ENVIADO, args.registrosVinculados.rol.bitRol.toString()]];

    // Inicaliamos el puerto serial.
    puertoSerial = new serialport__WEBPACK_IMPORTED_MODULE_2__.SerialPort(args.datosDispositivo, callback => {
      console.log('Conexión a puerto establecido');
      console.log(callback);
      puertoSerial.set({
        rts: false,
        dtr: false
      });
    });

    // Inicializamos un parser para mandar y leer datos del serial.
    const parser = puertoSerial.pipe(new serialport__WEBPACK_IMPORTED_MODULE_2__.ReadlineParser({
      delimiter: '\r\n'
    }));

    // Esperamos por el evento del puerto abierto.
    puertoSerial.on("open", _controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.conexionAbierta);

    // Si recivimos datos, los mostramos.
    parser.on('data', respuesta => {
      console.log(respuesta);
      (0,_controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.alRecivirDatos)(respuesta, parser, colaOperaciones, puertoSerial);
    });
    parser.once('iniciar_envio_datos', () => {
      (0,_controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.iniciarEnvioDatos)(puertoSerial, colaOperaciones, _enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_DATOS_TARJETA.INICIAR_GUARDADO_DATOS);
    });
    parser.on('enviar_datos', () => {
      (0,_controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.enviarDato)(colaDatos.shift(), puertoSerial, colaOperaciones, colaDatos.length > 0 ? "enviar_datos" : "terminar_envio_datos");
    });
    parser.once('terminar_envio_datos', () => {
      (0,_controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.terminarGuardado)(puertoSerial, _enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_DATOS_TARJETA.TERMINAR_GUARDADO_DATOS);
    });
    parser.on("close", _controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.conexionCerrada);
  } catch (excepcion) {
    // Imprimimos la excepcion.
    console.log("Ocurrio una excepcion");
    console.log(excepcion);
  }
};
const guardarConfiguracionDispositivoLector = async (evento, args) => {
  try {
    // Si el puerto serial esta iniciado.
    if (puertoSerial) {
      if (puertoSerial.isOpen) {
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
    colaDatos = [[_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_LECTOR.CAMBIAR_PERMISO_PEDIDO, args.configuracion.bitPermiso.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_LECTOR.CAMBIAR_SSID, args.configuracion.ssid.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_LECTOR.CAMBIAR_PASSWORD, args.configuracion.password.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_LECTOR.CAMBIAR_PUERTO_API, args.configuracion.puertoApi.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_LECTOR.CAMBIAR_IP_API, args.configuracion.ipApi.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_LECTOR.CAMBIAR_VERSION_API, args.configuracion.versionApi.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_LECTOR.CAMBIAR_ACCESS_TOKEN, args.configuracion.apiKey.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_LECTOR.CAMBIAR_ACCION_OPCIONAL, args.configuracion.accionOpcional.toString()]];

    // Inicalizamos el puerto serial.
    puertoSerial = new serialport__WEBPACK_IMPORTED_MODULE_2__.SerialPort(args.datosDispositivo, callback => {
      console.log('Conexión a puerto establecido');
      console.log(callback);
      puertoSerial.set({
        rts: false,
        dtr: false
      });
    });

    // Inicializamos un parser para mandar y leer datos del serial.
    const parser = puertoSerial.pipe(new serialport__WEBPACK_IMPORTED_MODULE_2__.ReadlineParser({
      delimiter: '\r\n'
    }));

    // Esperamos por el evento del puerto abierto.
    puertoSerial.on("open", () => {
      (0,_controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.conexionAbierta)();
    });

    // Si recivimos datos, los mostramos.
    parser.on("data", respuesta => {
      console.log(respuesta);
      (0,_controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.alRecivirDatos)(respuesta, parser, colaOperaciones, puertoSerial);
    });
    parser.once("iniciar_envio_datos", () => {
      (0,_controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.iniciarEnvioDatos)(puertoSerial, colaOperaciones, _enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_LECTOR.INICIAR_CONFIGURACION);
    });
    parser.on("enviar_datos", () => {
      (0,_controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.enviarDato)(colaDatos.shift(), puertoSerial, colaOperaciones, colaDatos.length > 0 ? "enviar_datos" : "terminar_envio_datos");
    });
    parser.once("terminar_envio_datos", () => {
      (0,_controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.terminarGuardado)(puertoSerial, _enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_LECTOR.FINALIZAR_CONFIGURACIO);
    });
    parser.on("close", _controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.conexionCerrada);
  } catch (excepcion) {
    // Imprimimos la excepcion.
    console.log("Ocurrio una excepcion");
    console.log(excepcion);
  }
};
const guardarConfiguracionDispositivoChecador = async (evento, args) => {
  try {
    // Si el puerto serial esta iniciado.
    if (puertoSerial) {
      if (puertoSerial.isOpen) {
        // Lo terminamos.
        puertoSerial.close();
      }
    }

    // Vaciamos la cola de operaciones.
    colaOperaciones = [];

    // Vaciamos la cola de datos.
    colaDatos = [];

    // Descomponemos los datos que se guardaran en la tarjeta.
    colaDatos = [[_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CHECADOR.CAMBIAR_SSID, args.configuracion.ssid.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CHECADOR.CAMBIAR_PASSWORD, args.configuracion.password.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CHECADOR.CAMBIAR_PUERTO_API, args.configuracion.puertoApi.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CHECADOR.CAMBIAR_IP_API, args.configuracion.ipApi.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CHECADOR.CAMBIAR_VERSION_API, args.configuracion.versionApi.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CHECADOR.CAMBIAR_ACCESS_TOKEN, args.configuracion.apiKey.toString()]];

    // Inicaliamos el puerto serial.
    puertoSerial = new serialport__WEBPACK_IMPORTED_MODULE_2__.SerialPort(args.datosDispositivo, callback => {
      console.log('Conexión a puerto establecido');
      console.log(callback);
      puertoSerial.set({
        rts: false,
        dtr: false
      });
    });

    // Inicializamos un parser para mandar y leer datos del serial.
    const parser = puertoSerial.pipe(new serialport__WEBPACK_IMPORTED_MODULE_2__.ReadlineParser({
      delimiter: '\r\n'
    }));

    // Esperamos por el evento del puerto abierto.
    puertoSerial.on("open", _controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.conexionAbierta);

    // Si recivimos datos, los mostramos.
    parser.on('data', respuesta => {
      console.log(respuesta);
      (0,_controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.alRecivirDatos)(respuesta, parser, colaOperaciones, puertoSerial);
    });
    parser.once('iniciar_envio_datos', () => {
      (0,_controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.iniciarEnvioDatos)(puertoSerial, colaOperaciones, _enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CHECADOR.INICIAR_CONFIGURACION);
    });
    parser.on('enviar_datos', () => {
      (0,_controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.enviarDato)(colaDatos.shift(), puertoSerial, colaOperaciones, colaDatos.length > 0 ? "enviar_datos" : "terminar_envio_datos");
    });
    parser.once('terminar_envio_datos', () => {
      (0,_controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.terminarGuardado)(puertoSerial, _enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CHECADOR.FINALIZAR_CONFIGURACIO);
    });
    parser.on("close", _controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.conexionCerrada);
  } catch (excepcion) {
    // Imprimimos la excepcion.
    console.log("Ocurrio una excepcion");
    console.log(excepcion);
  }
};
const guardarConfiguracionDispositivoControlador = async (evento, args) => {
  try {
    // Si el puerto serial esta iniciado.
    if (puertoSerial) {
      if (puertoSerial.isOpen) {
        // Lo terminamos.
        puertoSerial.close();
      }
    }

    // Vaciamos la cola de operaciones.
    colaOperaciones = [];

    // Vaciamos la cola de datos.
    colaDatos = [];

    // Descomponemos los datos que se guardaran en la tarjeta.
    colaDatos = [[_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR.CAMBIAR_ROL_PEDIDO, args.configuracion.bitRol.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR.CAMBIAR_SSID, args.configuracion.ssid.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR.CAMBIAR_PASSWORD, args.configuracion.password.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR.CAMBIAR_PUERTO_API, args.configuracion.puertoApi.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR.CAMBIAR_IP_API, args.configuracion.ipApi.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR.CAMBIAR_VERSION_API, args.configuracion.versionApi.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR.CAMBIAR_ACCESS_TOKEN, args.configuracion.apiKey.toString()]];

    // Inicaliamos el puerto serial.
    puertoSerial = new serialport__WEBPACK_IMPORTED_MODULE_2__.SerialPort(args.datosDispositivo, callback => {
      console.log('Conexión a puerto establecido');
      console.log(callback);
      puertoSerial.set({
        rts: false,
        dtr: false
      });
    });

    // Inicializamos un parser para mandar y leer datos del serial.
    const parser = puertoSerial.pipe(new serialport__WEBPACK_IMPORTED_MODULE_2__.ReadlineParser({
      delimiter: '\r\n'
    }));

    // Esperamos por el evento del puerto abierto.
    puertoSerial.on("open", _controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.conexionAbierta);

    // Si recivimos datos, los mostramos.
    parser.on('data', respuesta => {
      console.log(respuesta);
      (0,_controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.alRecivirDatos)(respuesta, parser, colaOperaciones, puertoSerial);
    });
    parser.once('iniciar_envio_datos', () => {
      (0,_controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.iniciarEnvioDatos)(puertoSerial, colaOperaciones, _enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR.INICIAR_CONFIGURACION);
    });
    parser.on('enviar_datos', () => {
      (0,_controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.enviarDato)(colaDatos.shift(), puertoSerial, colaOperaciones, colaDatos.length > 0 ? "enviar_datos" : "terminar_envio_datos");
    });
    parser.once('terminar_envio_datos', () => {
      (0,_controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.terminarGuardado)(puertoSerial, _enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR.FINALIZAR_CONFIGURACIO);
    });
    parser.on("close", _controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.conexionCerrada);
  } catch (excepcion) {
    // Imprimimos la excepcion.
    console.log("Ocurrio una excepcion");
    console.log(excepcion);
  }
};
const guardarConfiguracionDispositivoControladorPuerta = async (evento, args) => {
  console.log(args.configuracion);
  try {
    // Si el puerto serial esta iniciado.
    if (puertoSerial) {
      if (puertoSerial.isOpen) {
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
    colaDatos = [[_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA.CAMBIAR_SSID, args.configuracion.ssid.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA.CAMBIAR_PASSWORD, args.configuracion.password.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA.CAMBIAR_PUERTO_API, args.configuracion.puertoApi.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA.CAMBIAR_IP_API, args.configuracion.ipApi.toString()], [_enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA.CAMBIAR_ACCESS_TOKEN, args.configuracion.apiKey.toString()]];

    // Inicaliamos el puerto serial.
    puertoSerial = new serialport__WEBPACK_IMPORTED_MODULE_2__.SerialPort(args.datosDispositivo, callback => {
      console.log('Conexión a puerto establecido');
      console.log(callback);
      puertoSerial.set({
        rts: false,
        dtr: false
      });
    });

    // Inicializamos un parser para mandar y leer datos del serial.
    const parser = puertoSerial.pipe(new serialport__WEBPACK_IMPORTED_MODULE_2__.ReadlineParser({
      delimiter: '\r\n'
    }));

    // Esperamos por el evento del puerto abierto.
    puertoSerial.on("open", _controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.conexionAbierta);

    // Si recivimos datos, los mostramos.
    parser.on('data', respuesta => {
      console.log(respuesta);
      (0,_controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.alRecivirDatos)(respuesta, parser, colaOperaciones, puertoSerial);
    });
    parser.once('iniciar_envio_datos', () => {
      (0,_controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.iniciarEnvioDatos)(puertoSerial, colaOperaciones, _enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA.INICIAR_CONFIGURACION);
    });
    parser.on('enviar_datos', () => {
      (0,_controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.enviarDato)(colaDatos.shift(), puertoSerial, colaOperaciones, colaDatos.length > 0 ? "enviar_datos" : "terminar_envio_datos");
    });
    parser.once('terminar_envio_datos', () => {
      (0,_controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.terminarGuardado)(puertoSerial, _enums__WEBPACK_IMPORTED_MODULE_4__.EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA.FINALIZAR_CONFIGURACIO);
    });
    parser.on("close", _controladorEventosSerial__WEBPACK_IMPORTED_MODULE_3__.conexionCerrada);
  } catch (excepcion) {
    // Imprimimos la excepcion.
    console.log("Ocurrio una excepcion");
    console.log(excepcion);
  }
};

/***/ }),

/***/ "./main/enums.ts":
/*!***********************!*\
  !*** ./main/enums.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EVENTOS_GUARDADO_CONFIGURACION_CHECADOR: () => (/* binding */ EVENTOS_GUARDADO_CONFIGURACION_CHECADOR),
/* harmony export */   EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR: () => (/* binding */ EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR),
/* harmony export */   EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA: () => (/* binding */ EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA),
/* harmony export */   EVENTOS_GUARDADO_CONFIGURACION_LECTOR: () => (/* binding */ EVENTOS_GUARDADO_CONFIGURACION_LECTOR),
/* harmony export */   EVENTOS_GUARDADO_DATOS_TARJETA: () => (/* binding */ EVENTOS_GUARDADO_DATOS_TARJETA),
/* harmony export */   FLAGS_DISPOSITIVO: () => (/* binding */ FLAGS_DISPOSITIVO)
/* harmony export */ });
let FLAGS_DISPOSITIVO = /*#__PURE__*/function (FLAGS_DISPOSITIVO) {
  FLAGS_DISPOSITIVO[FLAGS_DISPOSITIVO["ERROR_CON_DISPOSITIVO"] = 0] = "ERROR_CON_DISPOSITIVO";
  FLAGS_DISPOSITIVO[FLAGS_DISPOSITIVO["INICIALIZACION_TERMINADA"] = 1] = "INICIALIZACION_TERMINADA";
  FLAGS_DISPOSITIVO[FLAGS_DISPOSITIVO["ESCRITURA_TERMINADA"] = 2] = "ESCRITURA_TERMINADA";
  FLAGS_DISPOSITIVO[FLAGS_DISPOSITIVO["FLAG_3"] = 4] = "FLAG_3";
  FLAGS_DISPOSITIVO[FLAGS_DISPOSITIVO["FLAG_4"] = 8] = "FLAG_4";
  FLAGS_DISPOSITIVO[FLAGS_DISPOSITIVO["FLAG_5"] = 16] = "FLAG_5";
  FLAGS_DISPOSITIVO[FLAGS_DISPOSITIVO["FLAG_6"] = 32] = "FLAG_6";
  FLAGS_DISPOSITIVO[FLAGS_DISPOSITIVO["OPERACION_TERMINADA"] = 64] = "OPERACION_TERMINADA";
  FLAGS_DISPOSITIVO[FLAGS_DISPOSITIVO["CONEXION_CERRADA"] = 128] = "CONEXION_CERRADA";
  return FLAGS_DISPOSITIVO;
}({});
let EVENTOS_GUARDADO_DATOS_TARJETA = /*#__PURE__*/function (EVENTOS_GUARDADO_DATOS_TARJETA) {
  EVENTOS_GUARDADO_DATOS_TARJETA["INICIAR_GUARDADO_DATOS"] = "0\r";
  EVENTOS_GUARDADO_DATOS_TARJETA["ID_ENVIADO"] = "1\r";
  EVENTOS_GUARDADO_DATOS_TARJETA["AUTORIZACION_ENVIADO"] = "2\r";
  EVENTOS_GUARDADO_DATOS_TARJETA["ROL_ENVIADO"] = "3\r";
  EVENTOS_GUARDADO_DATOS_TARJETA["TERMINAR_GUARDADO_DATOS"] = "4\r";
  return EVENTOS_GUARDADO_DATOS_TARJETA;
}({});
;
let EVENTOS_GUARDADO_CONFIGURACION_LECTOR = /*#__PURE__*/function (EVENTOS_GUARDADO_CONFIGURACION_LECTOR) {
  EVENTOS_GUARDADO_CONFIGURACION_LECTOR["INICIAR_CONFIGURACION"] = "1\r";
  EVENTOS_GUARDADO_CONFIGURACION_LECTOR["CAMBIAR_PERMISO_PEDIDO"] = "2\r";
  EVENTOS_GUARDADO_CONFIGURACION_LECTOR["CAMBIAR_SSID"] = "3\r";
  EVENTOS_GUARDADO_CONFIGURACION_LECTOR["CAMBIAR_PASSWORD"] = "4\r";
  EVENTOS_GUARDADO_CONFIGURACION_LECTOR["CAMBIAR_PUERTO_API"] = "5\r";
  EVENTOS_GUARDADO_CONFIGURACION_LECTOR["CAMBIAR_IP_API"] = "6\r";
  EVENTOS_GUARDADO_CONFIGURACION_LECTOR["CAMBIAR_VERSION_API"] = "7\r";
  EVENTOS_GUARDADO_CONFIGURACION_LECTOR["CAMBIAR_ACCESS_TOKEN"] = "8\r";
  EVENTOS_GUARDADO_CONFIGURACION_LECTOR["CAMBIAR_ACCION_OPCIONAL"] = "9\r";
  EVENTOS_GUARDADO_CONFIGURACION_LECTOR["FINALIZAR_CONFIGURACIO"] = "10\r";
  return EVENTOS_GUARDADO_CONFIGURACION_LECTOR;
}({});
;
let EVENTOS_GUARDADO_CONFIGURACION_CHECADOR = /*#__PURE__*/function (EVENTOS_GUARDADO_CONFIGURACION_CHECADOR) {
  EVENTOS_GUARDADO_CONFIGURACION_CHECADOR["INICIAR_CONFIGURACION"] = "1\r";
  EVENTOS_GUARDADO_CONFIGURACION_CHECADOR["CAMBIAR_SSID"] = "2\r";
  EVENTOS_GUARDADO_CONFIGURACION_CHECADOR["CAMBIAR_PASSWORD"] = "3\r";
  EVENTOS_GUARDADO_CONFIGURACION_CHECADOR["CAMBIAR_PUERTO_API"] = "4\r";
  EVENTOS_GUARDADO_CONFIGURACION_CHECADOR["CAMBIAR_IP_API"] = "5\r";
  EVENTOS_GUARDADO_CONFIGURACION_CHECADOR["CAMBIAR_VERSION_API"] = "6\r";
  EVENTOS_GUARDADO_CONFIGURACION_CHECADOR["CAMBIAR_ACCESS_TOKEN"] = "7\r";
  EVENTOS_GUARDADO_CONFIGURACION_CHECADOR["FINALIZAR_CONFIGURACIO"] = "8\r";
  return EVENTOS_GUARDADO_CONFIGURACION_CHECADOR;
}({});
;
let EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR = /*#__PURE__*/function (EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR) {
  EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR["INICIAR_CONFIGURACION"] = "1\r";
  EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR["CAMBIAR_ROL_PEDIDO"] = "2\r";
  EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR["CAMBIAR_SSID"] = "3\r";
  EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR["CAMBIAR_PASSWORD"] = "4\r";
  EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR["CAMBIAR_PUERTO_API"] = "5\r";
  EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR["CAMBIAR_IP_API"] = "6\r";
  EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR["CAMBIAR_VERSION_API"] = "7\r";
  EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR["CAMBIAR_ACCESS_TOKEN"] = "8\r";
  EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR["FINALIZAR_CONFIGURACIO"] = "9\r";
  return EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR;
}({});
;
let EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA = /*#__PURE__*/function (EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA) {
  EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA["INICIAR_CONFIGURACION"] = "1\r";
  EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA["CAMBIAR_SSID"] = "2\r";
  EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA["CAMBIAR_PASSWORD"] = "3\r";
  EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA["CAMBIAR_PUERTO_API"] = "4\r";
  EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA["CAMBIAR_IP_API"] = "5\r";
  EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA["CAMBIAR_ACCESS_TOKEN"] = "6\r";
  EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA["FINALIZAR_CONFIGURACIO"] = "7\r";
  return EVENTOS_GUARDADO_CONFIGURACION_CONTROLADOR_PUERTA;
}({});
;

/***/ }),

/***/ "./main/helpers/create-window.ts":
/*!***************************************!*\
  !*** ./main/helpers/create-window.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createWindow: () => (/* binding */ createWindow)
/* harmony export */ });
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs3/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/assign */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/assign.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_some__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/some */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/some.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_some__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_some__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/keys */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/keys.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/filter */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/filter.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/for-each */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/for-each.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/define-properties */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/define-properties.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/define-property */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/define-property.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var electron_store__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! electron-store */ "electron-store");
/* harmony import */ var electron_store__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(electron_store__WEBPACK_IMPORTED_MODULE_12__);

function ownKeys(e, r) { var t = _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_1___default()(e); if ((_babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_2___default())) { var o = _babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_2___default()(e); r && (o = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_3___default()(o).call(o, function (r) { return _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_4___default()(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context2, _context3; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_5___default()(_context2 = ownKeys(Object(t), !0)).call(_context2, function (r) { _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(e, r, t[r]); }) : (_babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_6___default()) ? _babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_7___default()(e, _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_6___default()(t)) : _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_5___default()(_context3 = ownKeys(Object(t))).call(_context3, function (r) { _babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_8___default()(e, r, _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_4___default()(t, r)); }); } return e; }












const createWindow = (windowName, options) => {
  const key = 'window-state';
  const name = `window-state-${windowName}`;
  const store = new (electron_store__WEBPACK_IMPORTED_MODULE_12___default())({
    name
  });
  const defaultSize = {
    width: options.width,
    height: options.height
  };
  let state = {};
  const restore = () => store.get(key, defaultSize);
  const getCurrentPosition = () => {
    const position = win.getPosition();
    const size = win.getSize();
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1]
    };
  };
  const windowWithinBounds = (windowState, bounds) => {
    return windowState.x >= bounds.x && windowState.y >= bounds.y && windowState.x + windowState.width <= bounds.x + bounds.width && windowState.y + windowState.height <= bounds.y + bounds.height;
  };
  const resetToDefaults = () => {
    const bounds = electron__WEBPACK_IMPORTED_MODULE_11__.screen.getPrimaryDisplay().bounds;
    return _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_9___default()({}, defaultSize, {
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2
    });
  };
  const ensureVisibleOnSomeDisplay = windowState => {
    var _context;
    const visible = _babel_runtime_corejs3_core_js_stable_instance_some__WEBPACK_IMPORTED_MODULE_10___default()(_context = electron__WEBPACK_IMPORTED_MODULE_11__.screen.getAllDisplays()).call(_context, display => {
      return windowWithinBounds(windowState, display.bounds);
    });
    if (!visible) {
      // Window is partially or fully not visible now.
      // Reset it to safe defaults.
      return resetToDefaults();
    }
    return windowState;
  };
  const saveState = () => {
    if (!win.isMinimized() && !win.isMaximized()) {
      _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_9___default()(state, getCurrentPosition());
    }
    store.set(key, state);
  };
  state = ensureVisibleOnSomeDisplay(restore());
  const win = new electron__WEBPACK_IMPORTED_MODULE_11__.BrowserWindow(_objectSpread(_objectSpread(_objectSpread({}, state), options), {}, {
    webPreferences: _objectSpread({
      nodeIntegration: false,
      contextIsolation: true
    }, options.webPreferences)
  }));
  win.on('close', saveState);
  return win;
};

/***/ }),

/***/ "./main/helpers/index.ts":
/*!*******************************!*\
  !*** ./main/helpers/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createWindow: () => (/* reexport safe */ _create_window__WEBPACK_IMPORTED_MODULE_0__.createWindow)
/* harmony export */ });
/* harmony import */ var _create_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-window */ "./main/helpers/create-window.ts");


/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("electron");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "electron-serve":
/*!*********************************!*\
  !*** external "electron-serve" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_electron_serve__;

/***/ }),

/***/ "electron-store":
/*!*********************************!*\
  !*** external "electron-store" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_electron_store__;

/***/ }),

/***/ "serialport":
/*!*****************************!*\
  !*** external "serialport" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_serialport__;

/***/ }),

/***/ "socket.io-client":
/*!***********************************!*\
  !*** external "socket.io-client" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_socket_io_client__;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/filter.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js-stable/instance/filter.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! core-js-pure/stable/instance/filter */ "./node_modules/core-js-pure/stable/instance/filter.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/for-each.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js-stable/instance/for-each.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! core-js-pure/stable/instance/for-each */ "./node_modules/core-js-pure/stable/instance/for-each.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/includes.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js-stable/instance/includes.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! core-js-pure/stable/instance/includes */ "./node_modules/core-js-pure/stable/instance/includes.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/map.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js-stable/instance/map.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! core-js-pure/stable/instance/map */ "./node_modules/core-js-pure/stable/instance/map.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/some.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js-stable/instance/some.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! core-js-pure/stable/instance/some */ "./node_modules/core-js-pure/stable/instance/some.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/assign.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js-stable/object/assign.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! core-js-pure/stable/object/assign */ "./node_modules/core-js-pure/stable/object/assign.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/define-properties.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js-stable/object/define-properties.js ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! core-js-pure/stable/object/define-properties */ "./node_modules/core-js-pure/stable/object/define-properties.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/define-property.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js-stable/object/define-property.js ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! core-js-pure/stable/object/define-property */ "./node_modules/core-js-pure/stable/object/define-property.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor.js ***!
  \**************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! core-js-pure/stable/object/get-own-property-descriptor */ "./node_modules/core-js-pure/stable/object/get-own-property-descriptor.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors.js ***!
  \***************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! core-js-pure/stable/object/get-own-property-descriptors */ "./node_modules/core-js-pure/stable/object/get-own-property-descriptors.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols.js ***!
  \***********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! core-js-pure/stable/object/get-own-property-symbols */ "./node_modules/core-js-pure/stable/object/get-own-property-symbols.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/keys.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js-stable/object/keys.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! core-js-pure/stable/object/keys */ "./node_modules/core-js-pure/stable/object/keys.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/defineProperty.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/defineProperty.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _Object$defineProperty = __webpack_require__(/*! core-js-pure/features/object/define-property.js */ "./node_modules/core-js-pure/features/object/define-property.js");
var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime-corejs3/helpers/toPropertyKey.js");
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    _Object$defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/toPrimitive.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/toPrimitive.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _Symbol$toPrimitive = __webpack_require__(/*! core-js-pure/features/symbol/to-primitive.js */ "./node_modules/core-js-pure/features/symbol/to-primitive.js");
var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime-corejs3/helpers/typeof.js")["default"]);
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[_Symbol$toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/toPropertyKey.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/toPropertyKey.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime-corejs3/helpers/typeof.js")["default"]);
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime-corejs3/helpers/toPrimitive.js");
function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/typeof.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/typeof.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _Symbol = __webpack_require__(/*! core-js-pure/features/symbol/index.js */ "./node_modules/core-js-pure/features/symbol/index.js");
var _Symbol$iterator = __webpack_require__(/*! core-js-pure/features/symbol/iterator.js */ "./node_modules/core-js-pure/features/symbol/iterator.js");
function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof _Symbol && "symbol" == typeof _Symbol$iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof _Symbol && o.constructor === _Symbol && o !== _Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/core-js-pure/actual/object/define-property.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/actual/object/define-property.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../stable/object/define-property */ "./node_modules/core-js-pure/stable/object/define-property.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/actual/symbol/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/actual/symbol/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../stable/symbol */ "./node_modules/core-js-pure/stable/symbol/index.js");

__webpack_require__(/*! ../../modules/esnext.function.metadata */ "./node_modules/core-js-pure/modules/esnext.function.metadata.js");
__webpack_require__(/*! ../../modules/esnext.symbol.async-dispose */ "./node_modules/core-js-pure/modules/esnext.symbol.async-dispose.js");
__webpack_require__(/*! ../../modules/esnext.symbol.dispose */ "./node_modules/core-js-pure/modules/esnext.symbol.dispose.js");
__webpack_require__(/*! ../../modules/esnext.symbol.metadata */ "./node_modules/core-js-pure/modules/esnext.symbol.metadata.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/actual/symbol/iterator.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/actual/symbol/iterator.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../stable/symbol/iterator */ "./node_modules/core-js-pure/stable/symbol/iterator.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/actual/symbol/to-primitive.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/actual/symbol/to-primitive.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../stable/symbol/to-primitive */ "./node_modules/core-js-pure/stable/symbol/to-primitive.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/es/array/virtual/filter.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/es/array/virtual/filter.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(/*! ../../../modules/es.array.filter */ "./node_modules/core-js-pure/modules/es.array.filter.js");
var getBuiltInPrototypeMethod = __webpack_require__(/*! ../../../internals/get-built-in-prototype-method */ "./node_modules/core-js-pure/internals/get-built-in-prototype-method.js");

module.exports = getBuiltInPrototypeMethod('Array', 'filter');


/***/ }),

/***/ "./node_modules/core-js-pure/es/array/virtual/for-each.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/es/array/virtual/for-each.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(/*! ../../../modules/es.array.for-each */ "./node_modules/core-js-pure/modules/es.array.for-each.js");
var getBuiltInPrototypeMethod = __webpack_require__(/*! ../../../internals/get-built-in-prototype-method */ "./node_modules/core-js-pure/internals/get-built-in-prototype-method.js");

module.exports = getBuiltInPrototypeMethod('Array', 'forEach');


/***/ }),

/***/ "./node_modules/core-js-pure/es/array/virtual/includes.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/es/array/virtual/includes.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(/*! ../../../modules/es.array.includes */ "./node_modules/core-js-pure/modules/es.array.includes.js");
var getBuiltInPrototypeMethod = __webpack_require__(/*! ../../../internals/get-built-in-prototype-method */ "./node_modules/core-js-pure/internals/get-built-in-prototype-method.js");

module.exports = getBuiltInPrototypeMethod('Array', 'includes');


/***/ }),

/***/ "./node_modules/core-js-pure/es/array/virtual/map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/es/array/virtual/map.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(/*! ../../../modules/es.array.map */ "./node_modules/core-js-pure/modules/es.array.map.js");
var getBuiltInPrototypeMethod = __webpack_require__(/*! ../../../internals/get-built-in-prototype-method */ "./node_modules/core-js-pure/internals/get-built-in-prototype-method.js");

module.exports = getBuiltInPrototypeMethod('Array', 'map');


/***/ }),

/***/ "./node_modules/core-js-pure/es/array/virtual/some.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/es/array/virtual/some.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(/*! ../../../modules/es.array.some */ "./node_modules/core-js-pure/modules/es.array.some.js");
var getBuiltInPrototypeMethod = __webpack_require__(/*! ../../../internals/get-built-in-prototype-method */ "./node_modules/core-js-pure/internals/get-built-in-prototype-method.js");

module.exports = getBuiltInPrototypeMethod('Array', 'some');


/***/ }),

/***/ "./node_modules/core-js-pure/es/instance/filter.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/es/instance/filter.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isPrototypeOf = __webpack_require__(/*! ../../internals/object-is-prototype-of */ "./node_modules/core-js-pure/internals/object-is-prototype-of.js");
var method = __webpack_require__(/*! ../array/virtual/filter */ "./node_modules/core-js-pure/es/array/virtual/filter.js");

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.filter;
  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.filter) ? method : own;
};


/***/ }),

/***/ "./node_modules/core-js-pure/es/instance/includes.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/es/instance/includes.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isPrototypeOf = __webpack_require__(/*! ../../internals/object-is-prototype-of */ "./node_modules/core-js-pure/internals/object-is-prototype-of.js");
var arrayMethod = __webpack_require__(/*! ../array/virtual/includes */ "./node_modules/core-js-pure/es/array/virtual/includes.js");
var stringMethod = __webpack_require__(/*! ../string/virtual/includes */ "./node_modules/core-js-pure/es/string/virtual/includes.js");

var ArrayPrototype = Array.prototype;
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.includes;
  if (it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.includes)) return arrayMethod;
  if (typeof it == 'string' || it === StringPrototype || (isPrototypeOf(StringPrototype, it) && own === StringPrototype.includes)) {
    return stringMethod;
  } return own;
};


/***/ }),

/***/ "./node_modules/core-js-pure/es/instance/map.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js-pure/es/instance/map.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isPrototypeOf = __webpack_require__(/*! ../../internals/object-is-prototype-of */ "./node_modules/core-js-pure/internals/object-is-prototype-of.js");
var method = __webpack_require__(/*! ../array/virtual/map */ "./node_modules/core-js-pure/es/array/virtual/map.js");

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.map;
  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.map) ? method : own;
};


/***/ }),

/***/ "./node_modules/core-js-pure/es/instance/some.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/es/instance/some.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isPrototypeOf = __webpack_require__(/*! ../../internals/object-is-prototype-of */ "./node_modules/core-js-pure/internals/object-is-prototype-of.js");
var method = __webpack_require__(/*! ../array/virtual/some */ "./node_modules/core-js-pure/es/array/virtual/some.js");

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.some;
  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.some) ? method : own;
};


/***/ }),

/***/ "./node_modules/core-js-pure/es/object/assign.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/es/object/assign.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(/*! ../../modules/es.object.assign */ "./node_modules/core-js-pure/modules/es.object.assign.js");
var path = __webpack_require__(/*! ../../internals/path */ "./node_modules/core-js-pure/internals/path.js");

module.exports = path.Object.assign;


/***/ }),

/***/ "./node_modules/core-js-pure/es/object/define-properties.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/es/object/define-properties.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(/*! ../../modules/es.object.define-properties */ "./node_modules/core-js-pure/modules/es.object.define-properties.js");
var path = __webpack_require__(/*! ../../internals/path */ "./node_modules/core-js-pure/internals/path.js");

var Object = path.Object;

var defineProperties = module.exports = function defineProperties(T, D) {
  return Object.defineProperties(T, D);
};

if (Object.defineProperties.sham) defineProperties.sham = true;


/***/ }),

/***/ "./node_modules/core-js-pure/es/object/define-property.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/es/object/define-property.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(/*! ../../modules/es.object.define-property */ "./node_modules/core-js-pure/modules/es.object.define-property.js");
var path = __webpack_require__(/*! ../../internals/path */ "./node_modules/core-js-pure/internals/path.js");

var Object = path.Object;

var defineProperty = module.exports = function defineProperty(it, key, desc) {
  return Object.defineProperty(it, key, desc);
};

if (Object.defineProperty.sham) defineProperty.sham = true;


/***/ }),

/***/ "./node_modules/core-js-pure/es/object/get-own-property-descriptor.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js-pure/es/object/get-own-property-descriptor.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(/*! ../../modules/es.object.get-own-property-descriptor */ "./node_modules/core-js-pure/modules/es.object.get-own-property-descriptor.js");
var path = __webpack_require__(/*! ../../internals/path */ "./node_modules/core-js-pure/internals/path.js");

var Object = path.Object;

var getOwnPropertyDescriptor = module.exports = function getOwnPropertyDescriptor(it, key) {
  return Object.getOwnPropertyDescriptor(it, key);
};

if (Object.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor.sham = true;


/***/ }),

/***/ "./node_modules/core-js-pure/es/object/get-own-property-descriptors.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js-pure/es/object/get-own-property-descriptors.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(/*! ../../modules/es.object.get-own-property-descriptors */ "./node_modules/core-js-pure/modules/es.object.get-own-property-descriptors.js");
var path = __webpack_require__(/*! ../../internals/path */ "./node_modules/core-js-pure/internals/path.js");

module.exports = path.Object.getOwnPropertyDescriptors;


/***/ }),

/***/ "./node_modules/core-js-pure/es/object/get-own-property-symbols.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/es/object/get-own-property-symbols.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(/*! ../../modules/es.symbol */ "./node_modules/core-js-pure/modules/es.symbol.js");
var path = __webpack_require__(/*! ../../internals/path */ "./node_modules/core-js-pure/internals/path.js");

module.exports = path.Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js-pure/es/object/keys.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js-pure/es/object/keys.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(/*! ../../modules/es.object.keys */ "./node_modules/core-js-pure/modules/es.object.keys.js");
var path = __webpack_require__(/*! ../../internals/path */ "./node_modules/core-js-pure/internals/path.js");

module.exports = path.Object.keys;


/***/ }),

/***/ "./node_modules/core-js-pure/es/string/virtual/includes.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/es/string/virtual/includes.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(/*! ../../../modules/es.string.includes */ "./node_modules/core-js-pure/modules/es.string.includes.js");
var getBuiltInPrototypeMethod = __webpack_require__(/*! ../../../internals/get-built-in-prototype-method */ "./node_modules/core-js-pure/internals/get-built-in-prototype-method.js");

module.exports = getBuiltInPrototypeMethod('String', 'includes');


/***/ }),

/***/ "./node_modules/core-js-pure/es/symbol/index.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js-pure/es/symbol/index.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(/*! ../../modules/es.array.concat */ "./node_modules/core-js-pure/modules/es.array.concat.js");
__webpack_require__(/*! ../../modules/es.object.to-string */ "./node_modules/core-js-pure/modules/es.object.to-string.js");
__webpack_require__(/*! ../../modules/es.symbol */ "./node_modules/core-js-pure/modules/es.symbol.js");
__webpack_require__(/*! ../../modules/es.symbol.async-iterator */ "./node_modules/core-js-pure/modules/es.symbol.async-iterator.js");
__webpack_require__(/*! ../../modules/es.symbol.description */ "./node_modules/core-js-pure/modules/es.symbol.description.js");
__webpack_require__(/*! ../../modules/es.symbol.has-instance */ "./node_modules/core-js-pure/modules/es.symbol.has-instance.js");
__webpack_require__(/*! ../../modules/es.symbol.is-concat-spreadable */ "./node_modules/core-js-pure/modules/es.symbol.is-concat-spreadable.js");
__webpack_require__(/*! ../../modules/es.symbol.iterator */ "./node_modules/core-js-pure/modules/es.symbol.iterator.js");
__webpack_require__(/*! ../../modules/es.symbol.match */ "./node_modules/core-js-pure/modules/es.symbol.match.js");
__webpack_require__(/*! ../../modules/es.symbol.match-all */ "./node_modules/core-js-pure/modules/es.symbol.match-all.js");
__webpack_require__(/*! ../../modules/es.symbol.replace */ "./node_modules/core-js-pure/modules/es.symbol.replace.js");
__webpack_require__(/*! ../../modules/es.symbol.search */ "./node_modules/core-js-pure/modules/es.symbol.search.js");
__webpack_require__(/*! ../../modules/es.symbol.species */ "./node_modules/core-js-pure/modules/es.symbol.species.js");
__webpack_require__(/*! ../../modules/es.symbol.split */ "./node_modules/core-js-pure/modules/es.symbol.split.js");
__webpack_require__(/*! ../../modules/es.symbol.to-primitive */ "./node_modules/core-js-pure/modules/es.symbol.to-primitive.js");
__webpack_require__(/*! ../../modules/es.symbol.to-string-tag */ "./node_modules/core-js-pure/modules/es.symbol.to-string-tag.js");
__webpack_require__(/*! ../../modules/es.symbol.unscopables */ "./node_modules/core-js-pure/modules/es.symbol.unscopables.js");
__webpack_require__(/*! ../../modules/es.json.to-string-tag */ "./node_modules/core-js-pure/modules/es.json.to-string-tag.js");
__webpack_require__(/*! ../../modules/es.math.to-string-tag */ "./node_modules/core-js-pure/modules/es.math.to-string-tag.js");
__webpack_require__(/*! ../../modules/es.reflect.to-string-tag */ "./node_modules/core-js-pure/modules/es.reflect.to-string-tag.js");
var path = __webpack_require__(/*! ../../internals/path */ "./node_modules/core-js-pure/internals/path.js");

module.exports = path.Symbol;


/***/ }),

/***/ "./node_modules/core-js-pure/es/symbol/iterator.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/es/symbol/iterator.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(/*! ../../modules/es.array.iterator */ "./node_modules/core-js-pure/modules/es.array.iterator.js");
__webpack_require__(/*! ../../modules/es.object.to-string */ "./node_modules/core-js-pure/modules/es.object.to-string.js");
__webpack_require__(/*! ../../modules/es.string.iterator */ "./node_modules/core-js-pure/modules/es.string.iterator.js");
__webpack_require__(/*! ../../modules/es.symbol.iterator */ "./node_modules/core-js-pure/modules/es.symbol.iterator.js");
var WrappedWellKnownSymbolModule = __webpack_require__(/*! ../../internals/well-known-symbol-wrapped */ "./node_modules/core-js-pure/internals/well-known-symbol-wrapped.js");

module.exports = WrappedWellKnownSymbolModule.f('iterator');


/***/ }),

/***/ "./node_modules/core-js-pure/es/symbol/to-primitive.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/es/symbol/to-primitive.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(/*! ../../modules/es.date.to-primitive */ "./node_modules/core-js-pure/modules/es.date.to-primitive.js");
__webpack_require__(/*! ../../modules/es.symbol.to-primitive */ "./node_modules/core-js-pure/modules/es.symbol.to-primitive.js");
var WrappedWellKnownSymbolModule = __webpack_require__(/*! ../../internals/well-known-symbol-wrapped */ "./node_modules/core-js-pure/internals/well-known-symbol-wrapped.js");

module.exports = WrappedWellKnownSymbolModule.f('toPrimitive');


/***/ }),

/***/ "./node_modules/core-js-pure/features/object/define-property.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js-pure/features/object/define-property.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = __webpack_require__(/*! ../../full/object/define-property */ "./node_modules/core-js-pure/full/object/define-property.js");


/***/ }),

/***/ "./node_modules/core-js-pure/features/symbol/index.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/features/symbol/index.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = __webpack_require__(/*! ../../full/symbol */ "./node_modules/core-js-pure/full/symbol/index.js");


/***/ }),

/***/ "./node_modules/core-js-pure/features/symbol/iterator.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/features/symbol/iterator.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = __webpack_require__(/*! ../../full/symbol/iterator */ "./node_modules/core-js-pure/full/symbol/iterator.js");


/***/ }),

/***/ "./node_modules/core-js-pure/features/symbol/to-primitive.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js-pure/features/symbol/to-primitive.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = __webpack_require__(/*! ../../full/symbol/to-primitive */ "./node_modules/core-js-pure/full/symbol/to-primitive.js");


/***/ }),

/***/ "./node_modules/core-js-pure/full/object/define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/full/object/define-property.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../actual/object/define-property */ "./node_modules/core-js-pure/actual/object/define-property.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/full/symbol/index.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/full/symbol/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../actual/symbol */ "./node_modules/core-js-pure/actual/symbol/index.js");
__webpack_require__(/*! ../../modules/esnext.symbol.is-registered-symbol */ "./node_modules/core-js-pure/modules/esnext.symbol.is-registered-symbol.js");
__webpack_require__(/*! ../../modules/esnext.symbol.is-well-known-symbol */ "./node_modules/core-js-pure/modules/esnext.symbol.is-well-known-symbol.js");
__webpack_require__(/*! ../../modules/esnext.symbol.matcher */ "./node_modules/core-js-pure/modules/esnext.symbol.matcher.js");
__webpack_require__(/*! ../../modules/esnext.symbol.observable */ "./node_modules/core-js-pure/modules/esnext.symbol.observable.js");
// TODO: Remove from `core-js@4`
__webpack_require__(/*! ../../modules/esnext.symbol.is-registered */ "./node_modules/core-js-pure/modules/esnext.symbol.is-registered.js");
__webpack_require__(/*! ../../modules/esnext.symbol.is-well-known */ "./node_modules/core-js-pure/modules/esnext.symbol.is-well-known.js");
__webpack_require__(/*! ../../modules/esnext.symbol.metadata-key */ "./node_modules/core-js-pure/modules/esnext.symbol.metadata-key.js");
__webpack_require__(/*! ../../modules/esnext.symbol.pattern-match */ "./node_modules/core-js-pure/modules/esnext.symbol.pattern-match.js");
__webpack_require__(/*! ../../modules/esnext.symbol.replace-all */ "./node_modules/core-js-pure/modules/esnext.symbol.replace-all.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/full/symbol/iterator.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/full/symbol/iterator.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../actual/symbol/iterator */ "./node_modules/core-js-pure/actual/symbol/iterator.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/full/symbol/to-primitive.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/full/symbol/to-primitive.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../actual/symbol/to-primitive */ "./node_modules/core-js-pure/actual/symbol/to-primitive.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/a-callable.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/a-callable.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ "./node_modules/core-js-pure/internals/try-to-string.js");

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/a-possible-prototype.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/a-possible-prototype.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw new $TypeError("Can't set " + $String(argument) + ' as a prototype');
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/add-to-unscopables.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/add-to-unscopables.js ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";

module.exports = function () { /* empty */ };


/***/ }),

/***/ "./node_modules/core-js-pure/internals/an-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/an-object.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js-pure/internals/is-object.js");

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-for-each.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-for-each.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $forEach = (__webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js-pure/internals/array-iteration.js").forEach);
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js-pure/internals/array-method-is-strict.js");

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-includes.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-includes.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js-pure/internals/to-indexed-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js-pure/internals/to-absolute-index.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js-pure/internals/length-of-array-like.js");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-iteration.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-iteration.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js-pure/internals/function-bind-context.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js-pure/internals/indexed-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js-pure/internals/to-object.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js-pure/internals/length-of-array-like.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js-pure/internals/array-species-create.js");

var push = uncurryThis([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE === 1;
  var IS_FILTER = TYPE === 2;
  var IS_SOME = TYPE === 3;
  var IS_EVERY = TYPE === 4;
  var IS_FIND_INDEX = TYPE === 6;
  var IS_FILTER_REJECT = TYPE === 7;
  var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that);
    var length = lengthOfArrayLike(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-method-has-species-support.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-method-has-species-support.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js-pure/internals/engine-v8-version.js");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-method-is-strict.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-method-is-strict.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-slice-simple.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-slice-simple.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js-pure/internals/to-absolute-index.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js-pure/internals/length-of-array-like.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js-pure/internals/create-property.js");

var $Array = Array;
var max = Math.max;

module.exports = function (O, start, end) {
  var length = lengthOfArrayLike(O);
  var k = toAbsoluteIndex(start, length);
  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
  var result = $Array(max(fin - k, 0));
  var n = 0;
  for (; k < fin; k++, n++) createProperty(result, n, O[k]);
  result.length = n;
  return result;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-slice.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-slice.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");

module.exports = uncurryThis([].slice);


/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-species-constructor.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-species-constructor.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js-pure/internals/is-array.js");
var isConstructor = __webpack_require__(/*! ../internals/is-constructor */ "./node_modules/core-js-pure/internals/is-constructor.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js-pure/internals/is-object.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');
var $Array = Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? $Array : C;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-species-create.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-species-create.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var arraySpeciesConstructor = __webpack_require__(/*! ../internals/array-species-constructor */ "./node_modules/core-js-pure/internals/array-species-constructor.js");

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/classof-raw.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/classof-raw.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/classof.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/classof.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js-pure/internals/to-string-tag-support.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");
var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js-pure/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/correct-is-regexp-logic.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/correct-is-regexp-logic.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/correct-prototype-getter.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/correct-prototype-getter.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "./node_modules/core-js-pure/internals/create-iter-result-object.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/create-iter-result-object.js ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";

// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
module.exports = function (value, done) {
  return { value: value, done: done };
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/create-non-enumerable-property.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/create-non-enumerable-property.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js-pure/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js-pure/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/create-property-descriptor.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/create-property-descriptor.js ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/create-property.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/create-property.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "./node_modules/core-js-pure/internals/to-property-key.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js-pure/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js-pure/internals/create-property-descriptor.js");

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/define-built-in-accessor.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/define-built-in-accessor.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js-pure/internals/object-define-property.js");

module.exports = function (target, name, descriptor) {
  return defineProperty.f(target, name, descriptor);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/define-built-in.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/define-built-in.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js-pure/internals/create-non-enumerable-property.js");

module.exports = function (target, key, value, options) {
  if (options && options.enumerable) target[key] = value;
  else createNonEnumerableProperty(target, key, value);
  return target;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/define-global-property.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/define-global-property.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/descriptors.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/descriptors.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});


/***/ }),

/***/ "./node_modules/core-js-pure/internals/document-all.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/document-all.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";

var documentAll = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var IS_HTMLDDA = typeof documentAll == 'undefined' && documentAll !== undefined;

module.exports = {
  all: documentAll,
  IS_HTMLDDA: IS_HTMLDDA
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/document-create-element.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/document-create-element.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js-pure/internals/is-object.js");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/does-not-exceed-safe-integer.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/does-not-exceed-safe-integer.js ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";

var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/dom-iterables.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/dom-iterables.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/engine-user-agent.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/engine-user-agent.js ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";

module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';


/***/ }),

/***/ "./node_modules/core-js-pure/internals/engine-v8-version.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/engine-v8-version.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js-pure/internals/engine-user-agent.js");

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/enum-bug-keys.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/enum-bug-keys.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "./node_modules/core-js-pure/internals/export.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/internals/export.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var apply = __webpack_require__(/*! ../internals/function-apply */ "./node_modules/core-js-pure/internals/function-apply.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ "./node_modules/core-js-pure/internals/function-uncurry-this-clause.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");
var getOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js-pure/internals/object-get-own-property-descriptor.js").f);
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js-pure/internals/is-forced.js");
var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js-pure/internals/path.js");
var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js-pure/internals/function-bind-context.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js-pure/internals/create-non-enumerable-property.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js-pure/internals/has-own-property.js");

var wrapConstructor = function (NativeConstructor) {
  var Wrapper = function (a, b, c) {
    if (this instanceof Wrapper) {
      switch (arguments.length) {
        case 0: return new NativeConstructor();
        case 1: return new NativeConstructor(a);
        case 2: return new NativeConstructor(a, b);
      } return new NativeConstructor(a, b, c);
    } return apply(NativeConstructor, this, arguments);
  };
  Wrapper.prototype = NativeConstructor.prototype;
  return Wrapper;
};

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var PROTO = options.proto;

  var nativeSource = GLOBAL ? global : STATIC ? global[TARGET] : (global[TARGET] || {}).prototype;

  var target = GLOBAL ? path : path[TARGET] || createNonEnumerableProperty(path, TARGET, {})[TARGET];
  var targetPrototype = target.prototype;

  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

  for (key in source) {
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contains in native
    USE_NATIVE = !FORCED && nativeSource && hasOwn(nativeSource, key);

    targetProperty = target[key];

    if (USE_NATIVE) if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(nativeSource, key);
      nativeProperty = descriptor && descriptor.value;
    } else nativeProperty = nativeSource[key];

    // export native or implementation
    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

    if (USE_NATIVE && typeof targetProperty == typeof sourceProperty) continue;

    // bind methods to global for calling from export context
    if (options.bind && USE_NATIVE) resultProperty = bind(sourceProperty, global);
    // wrap global constructors for prevent changes in this version
    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
    // make static versions for prototype methods
    else if (PROTO && isCallable(sourceProperty)) resultProperty = uncurryThis(sourceProperty);
    // default case
    else resultProperty = sourceProperty;

    // add a flag to not completely full polyfills
    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(resultProperty, 'sham', true);
    }

    createNonEnumerableProperty(target, key, resultProperty);

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
      if (!hasOwn(path, VIRTUAL_PROTOTYPE)) {
        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
      }
      // export virtual prototype methods
      createNonEnumerableProperty(path[VIRTUAL_PROTOTYPE], key, sourceProperty);
      // export real prototype methods
      if (options.real && targetPrototype && (FORCED || !targetPrototype[key])) {
        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
      }
    }
  }
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/fails.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js-pure/internals/fails.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-apply.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-apply.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "./node_modules/core-js-pure/internals/function-bind-native.js");

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-bind-context.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-bind-context.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ "./node_modules/core-js-pure/internals/function-uncurry-this-clause.js");
var aCallable = __webpack_require__(/*! ../internals/a-callable */ "./node_modules/core-js-pure/internals/a-callable.js");
var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "./node_modules/core-js-pure/internals/function-bind-native.js");

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-bind-native.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-bind-native.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-call.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-call.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "./node_modules/core-js-pure/internals/function-bind-native.js");

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-name.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-name.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js-pure/internals/has-own-property.js");

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-uncurry-this-accessor.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-uncurry-this-accessor.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var aCallable = __webpack_require__(/*! ../internals/a-callable */ "./node_modules/core-js-pure/internals/a-callable.js");

module.exports = function (object, key, method) {
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) { /* empty */ }
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-uncurry-this-clause.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-uncurry-this-clause.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js-pure/internals/classof-raw.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-uncurry-this.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-uncurry-this.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "./node_modules/core-js-pure/internals/function-bind-native.js");

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/get-built-in-prototype-method.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/get-built-in-prototype-method.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js-pure/internals/path.js");

module.exports = function (CONSTRUCTOR, METHOD) {
  var Namespace = path[CONSTRUCTOR + 'Prototype'];
  var pureMethod = Namespace && Namespace[METHOD];
  if (pureMethod) return pureMethod;
  var NativeConstructor = global[CONSTRUCTOR];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  return NativePrototype && NativePrototype[METHOD];
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/get-built-in.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/get-built-in.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js-pure/internals/path.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");

var aFunction = function (variable) {
  return isCallable(variable) ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/get-json-replacer-function.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/get-json-replacer-function.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js-pure/internals/is-array.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js-pure/internals/classof-raw.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js-pure/internals/to-string.js");

var push = uncurryThis([].push);

module.exports = function (replacer) {
  if (isCallable(replacer)) return replacer;
  if (!isArray(replacer)) return;
  var rawLength = replacer.length;
  var keys = [];
  for (var i = 0; i < rawLength; i++) {
    var element = replacer[i];
    if (typeof element == 'string') push(keys, element);
    else if (typeof element == 'number' || classof(element) === 'Number' || classof(element) === 'String') push(keys, toString(element));
  }
  var keysLength = keys.length;
  var root = true;
  return function (key, value) {
    if (root) {
      root = false;
      return value;
    }
    if (isArray(this)) return value;
    for (var j = 0; j < keysLength; j++) if (keys[j] === key) return value;
  };
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/get-method.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/get-method.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var aCallable = __webpack_require__(/*! ../internals/a-callable */ "./node_modules/core-js-pure/internals/a-callable.js");
var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "./node_modules/core-js-pure/internals/is-null-or-undefined.js");

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/global.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/internals/global.js ***!
  \*******************************************************/
/***/ (function(module) {

"use strict";

var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || this || Function('return this')();


/***/ }),

/***/ "./node_modules/core-js-pure/internals/has-own-property.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/has-own-property.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js-pure/internals/to-object.js");

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/hidden-keys.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/hidden-keys.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/html.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js-pure/internals/html.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js-pure/internals/get-built-in.js");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "./node_modules/core-js-pure/internals/ie8-dom-define.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/ie8-dom-define.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js-pure/internals/document-create-element.js");

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});


/***/ }),

/***/ "./node_modules/core-js-pure/internals/indexed-object.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/indexed-object.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js-pure/internals/classof-raw.js");

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/inspect-source.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/inspect-source.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js-pure/internals/shared-store.js");

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/internal-state.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/internal-state.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/weak-map-basic-detection */ "./node_modules/core-js-pure/internals/weak-map-basic-detection.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js-pure/internals/is-object.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js-pure/internals/create-non-enumerable-property.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js-pure/internals/has-own-property.js");
var shared = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js-pure/internals/shared-store.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js-pure/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js-pure/internals/hidden-keys.js");

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-array.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-array.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js-pure/internals/classof-raw.js");

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) === 'Array';
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-callable.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-callable.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $documentAll = __webpack_require__(/*! ../internals/document-all */ "./node_modules/core-js-pure/internals/document-all.js");

var documentAll = $documentAll.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = $documentAll.IS_HTMLDDA ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-constructor.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-constructor.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");
var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js-pure/internals/classof.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js-pure/internals/get-built-in.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js-pure/internals/inspect-source.js");

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-forced.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-forced.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-null-or-undefined.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-null-or-undefined.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-object.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");
var $documentAll = __webpack_require__(/*! ../internals/document-all */ "./node_modules/core-js-pure/internals/document-all.js");

var documentAll = $documentAll.all;

module.exports = $documentAll.IS_HTMLDDA ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-pure.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-pure.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";

module.exports = true;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-regexp.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-regexp.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js-pure/internals/is-object.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js-pure/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) === 'RegExp');
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-symbol.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-symbol.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js-pure/internals/get-built-in.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "./node_modules/core-js-pure/internals/object-is-prototype-of.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js-pure/internals/use-symbol-as-uid.js");

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/iterator-create-constructor.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/iterator-create-constructor.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var IteratorPrototype = (__webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js-pure/internals/iterators-core.js").IteratorPrototype);
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js-pure/internals/object-create.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js-pure/internals/create-property-descriptor.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js-pure/internals/set-to-string-tag.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js-pure/internals/iterators.js");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/iterator-define.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/iterator-define.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js-pure/internals/function-call.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js-pure/internals/is-pure.js");
var FunctionName = __webpack_require__(/*! ../internals/function-name */ "./node_modules/core-js-pure/internals/function-name.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");
var createIteratorConstructor = __webpack_require__(/*! ../internals/iterator-create-constructor */ "./node_modules/core-js-pure/internals/iterator-create-constructor.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js-pure/internals/object-get-prototype-of.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js-pure/internals/object-set-prototype-of.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js-pure/internals/set-to-string-tag.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js-pure/internals/create-non-enumerable-property.js");
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "./node_modules/core-js-pure/internals/define-built-in.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js-pure/internals/iterators.js");
var IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js-pure/internals/iterators-core.js");

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];

    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    }

    return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/iterators-core.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/iterators-core.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js-pure/internals/is-object.js");
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js-pure/internals/object-create.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js-pure/internals/object-get-prototype-of.js");
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "./node_modules/core-js-pure/internals/define-built-in.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js-pure/internals/is-pure.js");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/iterators.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/iterators.js ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/length-of-array-like.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/length-of-array-like.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js-pure/internals/to-length.js");

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/math-trunc.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/math-trunc.js ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/not-a-regexp.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/not-a-regexp.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isRegExp = __webpack_require__(/*! ../internals/is-regexp */ "./node_modules/core-js-pure/internals/is-regexp.js");

var $TypeError = TypeError;

module.exports = function (it) {
  if (isRegExp(it)) {
    throw new $TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-assign.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-assign.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js-pure/internals/function-call.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js-pure/internals/object-keys.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js-pure/internals/object-get-own-property-symbols.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js-pure/internals/object-property-is-enumerable.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js-pure/internals/to-object.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js-pure/internals/indexed-object.js");

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;
var concat = uncurryThis([].concat);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
module.exports = !$assign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol('assign detection');
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] !== 7 || objectKeys($assign({}, B)).join('') !== alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-create.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-create.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js-pure/internals/an-object.js");
var definePropertiesModule = __webpack_require__(/*! ../internals/object-define-properties */ "./node_modules/core-js-pure/internals/object-define-properties.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js-pure/internals/enum-bug-keys.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js-pure/internals/hidden-keys.js");
var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js-pure/internals/html.js");
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js-pure/internals/document-create-element.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js-pure/internals/shared-key.js");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-define-properties.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-define-properties.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ "./node_modules/core-js-pure/internals/v8-prototype-define-bug.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js-pure/internals/object-define-property.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js-pure/internals/an-object.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js-pure/internals/to-indexed-object.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js-pure/internals/object-keys.js");

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-define-property.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-define-property.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js-pure/internals/ie8-dom-define.js");
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ "./node_modules/core-js-pure/internals/v8-prototype-define-bug.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js-pure/internals/an-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "./node_modules/core-js-pure/internals/to-property-key.js");

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-get-own-property-descriptor.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-get-own-property-descriptor.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js-pure/internals/function-call.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js-pure/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js-pure/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js-pure/internals/to-indexed-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "./node_modules/core-js-pure/internals/to-property-key.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js-pure/internals/has-own-property.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js-pure/internals/ie8-dom-define.js");

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-get-own-property-names-external.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-get-own-property-names-external.js ***!
  \***************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable es/no-object-getownpropertynames -- safe */
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js-pure/internals/classof-raw.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js-pure/internals/to-indexed-object.js");
var $getOwnPropertyNames = (__webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js-pure/internals/object-get-own-property-names.js").f);
var arraySlice = __webpack_require__(/*! ../internals/array-slice-simple */ "./node_modules/core-js-pure/internals/array-slice-simple.js");

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return arraySlice(windowNames);
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && classof(it) === 'Window'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-get-own-property-names.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-get-own-property-names.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js-pure/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js-pure/internals/enum-bug-keys.js");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-get-own-property-symbols.js":
/*!********************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-get-own-property-symbols.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-get-prototype-of.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-get-prototype-of.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js-pure/internals/has-own-property.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js-pure/internals/to-object.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js-pure/internals/shared-key.js");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "./node_modules/core-js-pure/internals/correct-prototype-getter.js");

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-is-prototype-of.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-is-prototype-of.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-keys-internal.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-keys-internal.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js-pure/internals/has-own-property.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js-pure/internals/to-indexed-object.js");
var indexOf = (__webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js-pure/internals/array-includes.js").indexOf);
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js-pure/internals/hidden-keys.js");

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-keys.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-keys.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js-pure/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js-pure/internals/enum-bug-keys.js");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-property-is-enumerable.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-property-is-enumerable.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-set-prototype-of.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-set-prototype-of.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable no-proto -- safe */
var uncurryThisAccessor = __webpack_require__(/*! ../internals/function-uncurry-this-accessor */ "./node_modules/core-js-pure/internals/function-uncurry-this-accessor.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js-pure/internals/an-object.js");
var aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ "./node_modules/core-js-pure/internals/a-possible-prototype.js");

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-to-string.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-to-string.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js-pure/internals/to-string-tag-support.js");
var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js-pure/internals/classof.js");

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/ordinary-to-primitive.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/ordinary-to-primitive.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js-pure/internals/function-call.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js-pure/internals/is-object.js");

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/own-keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/own-keys.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js-pure/internals/get-built-in.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js-pure/internals/object-get-own-property-names.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js-pure/internals/object-get-own-property-symbols.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js-pure/internals/an-object.js");

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/path.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js-pure/internals/path.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/require-object-coercible.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/require-object-coercible.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "./node_modules/core-js-pure/internals/is-null-or-undefined.js");

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/set-to-string-tag.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/set-to-string-tag.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js-pure/internals/to-string-tag-support.js");
var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js-pure/internals/object-define-property.js").f);
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js-pure/internals/create-non-enumerable-property.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js-pure/internals/has-own-property.js");
var toString = __webpack_require__(/*! ../internals/object-to-string */ "./node_modules/core-js-pure/internals/object-to-string.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC, SET_METHOD) {
  if (it) {
    var target = STATIC ? it : it.prototype;
    if (!hasOwn(target, TO_STRING_TAG)) {
      defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
    }
    if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
      createNonEnumerableProperty(target, 'toString', toString);
    }
  }
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/shared-key.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/shared-key.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js-pure/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js-pure/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/shared-store.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/shared-store.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ "./node_modules/core-js-pure/internals/define-global-property.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/shared.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/internals/shared.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js-pure/internals/is-pure.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js-pure/internals/shared-store.js");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.33.2',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.33.2/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ "./node_modules/core-js-pure/internals/string-multibyte.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/string-multibyte.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js-pure/internals/to-integer-or-infinity.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js-pure/internals/to-string.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js-pure/internals/require-object-coercible.js");

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/symbol-constructor-detection.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/symbol-constructor-detection.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js-pure/internals/engine-v8-version.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");

var $String = global.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ "./node_modules/core-js-pure/internals/symbol-define-to-primitive.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/symbol-define-to-primitive.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js-pure/internals/function-call.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js-pure/internals/get-built-in.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "./node_modules/core-js-pure/internals/define-built-in.js");

module.exports = function () {
  var Symbol = getBuiltIn('Symbol');
  var SymbolPrototype = Symbol && Symbol.prototype;
  var valueOf = SymbolPrototype && SymbolPrototype.valueOf;
  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

  if (SymbolPrototype && !SymbolPrototype[TO_PRIMITIVE]) {
    // `Symbol.prototype[@@toPrimitive]` method
    // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
    // eslint-disable-next-line no-unused-vars -- required for .length
    defineBuiltIn(SymbolPrototype, TO_PRIMITIVE, function (hint) {
      return call(valueOf, this);
    }, { arity: 1 });
  }
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/symbol-is-registered.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/symbol-is-registered.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js-pure/internals/get-built-in.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");

var Symbol = getBuiltIn('Symbol');
var keyFor = Symbol.keyFor;
var thisSymbolValue = uncurryThis(Symbol.prototype.valueOf);

// `Symbol.isRegisteredSymbol` method
// https://tc39.es/proposal-symbol-predicates/#sec-symbol-isregisteredsymbol
module.exports = Symbol.isRegisteredSymbol || function isRegisteredSymbol(value) {
  try {
    return keyFor(thisSymbolValue(value)) !== undefined;
  } catch (error) {
    return false;
  }
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/symbol-is-well-known.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/symbol-is-well-known.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js-pure/internals/shared.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js-pure/internals/get-built-in.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js-pure/internals/is-symbol.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");

var Symbol = getBuiltIn('Symbol');
var $isWellKnownSymbol = Symbol.isWellKnownSymbol;
var getOwnPropertyNames = getBuiltIn('Object', 'getOwnPropertyNames');
var thisSymbolValue = uncurryThis(Symbol.prototype.valueOf);
var WellKnownSymbolsStore = shared('wks');

for (var i = 0, symbolKeys = getOwnPropertyNames(Symbol), symbolKeysLength = symbolKeys.length; i < symbolKeysLength; i++) {
  // some old engines throws on access to some keys like `arguments` or `caller`
  try {
    var symbolKey = symbolKeys[i];
    if (isSymbol(Symbol[symbolKey])) wellKnownSymbol(symbolKey);
  } catch (error) { /* empty */ }
}

// `Symbol.isWellKnownSymbol` method
// https://tc39.es/proposal-symbol-predicates/#sec-symbol-iswellknownsymbol
// We should patch it for newly added well-known symbols. If it's not required, this module just will not be injected
module.exports = function isWellKnownSymbol(value) {
  if ($isWellKnownSymbol && $isWellKnownSymbol(value)) return true;
  try {
    var symbol = thisSymbolValue(value);
    for (var j = 0, keys = getOwnPropertyNames(WellKnownSymbolsStore), keysLength = keys.length; j < keysLength; j++) {
      // eslint-disable-next-line eqeqeq -- polyfilled symbols case
      if (WellKnownSymbolsStore[keys[j]] == symbol) return true;
    }
  } catch (error) { /* empty */ }
  return false;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/symbol-registry-detection.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/symbol-registry-detection.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ "./node_modules/core-js-pure/internals/symbol-constructor-detection.js");

/* eslint-disable es/no-symbol -- safe */
module.exports = NATIVE_SYMBOL && !!Symbol['for'] && !!Symbol.keyFor;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-absolute-index.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-absolute-index.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js-pure/internals/to-integer-or-infinity.js");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-indexed-object.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-indexed-object.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js-pure/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js-pure/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-integer-or-infinity.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-integer-or-infinity.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var trunc = __webpack_require__(/*! ../internals/math-trunc */ "./node_modules/core-js-pure/internals/math-trunc.js");

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-length.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-length.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js-pure/internals/to-integer-or-infinity.js");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-object.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js-pure/internals/require-object-coercible.js");

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-primitive.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-primitive.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js-pure/internals/function-call.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js-pure/internals/is-object.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js-pure/internals/is-symbol.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "./node_modules/core-js-pure/internals/get-method.js");
var ordinaryToPrimitive = __webpack_require__(/*! ../internals/ordinary-to-primitive */ "./node_modules/core-js-pure/internals/ordinary-to-primitive.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-property-key.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-property-key.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js-pure/internals/to-primitive.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js-pure/internals/is-symbol.js");

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-string-tag-support.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-string-tag-support.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-string.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-string.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js-pure/internals/classof.js");

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/try-to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/try-to-string.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/uid.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js-pure/internals/uid.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/use-symbol-as-uid.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/use-symbol-as-uid.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ "./node_modules/core-js-pure/internals/symbol-constructor-detection.js");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "./node_modules/core-js-pure/internals/v8-prototype-define-bug.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/v8-prototype-define-bug.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});


/***/ }),

/***/ "./node_modules/core-js-pure/internals/weak-map-basic-detection.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/weak-map-basic-detection.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ "./node_modules/core-js-pure/internals/well-known-symbol-define.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/well-known-symbol-define.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js-pure/internals/path.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js-pure/internals/has-own-property.js");
var wrappedWellKnownSymbolModule = __webpack_require__(/*! ../internals/well-known-symbol-wrapped */ "./node_modules/core-js-pure/internals/well-known-symbol-wrapped.js");
var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js-pure/internals/object-define-property.js").f);

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!hasOwn(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/well-known-symbol-wrapped.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/well-known-symbol-wrapped.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");

exports.f = wellKnownSymbol;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/well-known-symbol.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/well-known-symbol.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js-pure/internals/shared.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js-pure/internals/has-own-property.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js-pure/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ "./node_modules/core-js-pure/internals/symbol-constructor-detection.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js-pure/internals/use-symbol-as-uid.js");

var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.concat.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.concat.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js-pure/internals/is-array.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js-pure/internals/is-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js-pure/internals/to-object.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js-pure/internals/length-of-array-like.js");
var doesNotExceedSafeInteger = __webpack_require__(/*! ../internals/does-not-exceed-safe-integer */ "./node_modules/core-js-pure/internals/does-not-exceed-safe-integer.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js-pure/internals/create-property.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js-pure/internals/array-species-create.js");
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js-pure/internals/array-method-has-species-support.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js-pure/internals/engine-v8-version.js");

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport('concat');

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike(E);
        doesNotExceedSafeInteger(n + len);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        doesNotExceedSafeInteger(n + 1);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.filter.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.filter.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var $filter = (__webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js-pure/internals/array-iteration.js").filter);
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js-pure/internals/array-method-has-species-support.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.for-each.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.for-each.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var forEach = __webpack_require__(/*! ../internals/array-for-each */ "./node_modules/core-js-pure/internals/array-for-each.js");

// `Array.prototype.forEach` method
// https://tc39.es/ecma262/#sec-array.prototype.foreach
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
$({ target: 'Array', proto: true, forced: [].forEach !== forEach }, {
  forEach: forEach
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.includes.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.includes.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var $includes = (__webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js-pure/internals/array-includes.js").includes);
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js-pure/internals/add-to-unscopables.js");

// FF99+ bug
var BROKEN_ON_SPARSE = fails(function () {
  // eslint-disable-next-line es/no-array-prototype-includes -- detection
  return !Array(1).includes();
});

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.iterator.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.iterator.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js-pure/internals/to-indexed-object.js");
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js-pure/internals/add-to-unscopables.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js-pure/internals/iterators.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js-pure/internals/internal-state.js");
var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js-pure/internals/object-define-property.js").f);
var defineIterator = __webpack_require__(/*! ../internals/iterator-define */ "./node_modules/core-js-pure/internals/iterator-define.js");
var createIterResultObject = __webpack_require__(/*! ../internals/create-iter-result-object */ "./node_modules/core-js-pure/internals/create-iter-result-object.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js-pure/internals/is-pure.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return createIterResultObject(undefined, true);
  }
  switch (state.kind) {
    case 'keys': return createIterResultObject(index, false);
    case 'values': return createIterResultObject(target[index], false);
  } return createIterResultObject([index, target[index]], false);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// V8 ~ Chrome 45- bug
if (!IS_PURE && DESCRIPTORS && values.name !== 'values') try {
  defineProperty(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.map.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var $map = (__webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js-pure/internals/array-iteration.js").map);
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js-pure/internals/array-method-has-species-support.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.some.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.some.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var $some = (__webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js-pure/internals/array-iteration.js").some);
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js-pure/internals/array-method-is-strict.js");

var STRICT_METHOD = arrayMethodIsStrict('some');

// `Array.prototype.some` method
// https://tc39.es/ecma262/#sec-array.prototype.some
$({ target: 'Array', proto: true, forced: !STRICT_METHOD }, {
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.date.to-primitive.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.date.to-primitive.js ***!
  \*******************************************************************/
/***/ (() => {

// empty


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.json.stringify.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.json.stringify.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js-pure/internals/get-built-in.js");
var apply = __webpack_require__(/*! ../internals/function-apply */ "./node_modules/core-js-pure/internals/function-apply.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js-pure/internals/function-call.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js-pure/internals/is-symbol.js");
var arraySlice = __webpack_require__(/*! ../internals/array-slice */ "./node_modules/core-js-pure/internals/array-slice.js");
var getReplacerFunction = __webpack_require__(/*! ../internals/get-json-replacer-function */ "./node_modules/core-js-pure/internals/get-json-replacer-function.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ "./node_modules/core-js-pure/internals/symbol-constructor-detection.js");

var $String = String;
var $stringify = getBuiltIn('JSON', 'stringify');
var exec = uncurryThis(/./.exec);
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var replace = uncurryThis(''.replace);
var numberToString = uncurryThis(1.0.toString);

var tester = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL || fails(function () {
  var symbol = getBuiltIn('Symbol')('stringify detection');
  // MS Edge converts symbol values to JSON as {}
  return $stringify([symbol]) !== '[null]'
    // WebKit converts symbol values to JSON as null
    || $stringify({ a: symbol }) !== '{}'
    // V8 throws on boxed symbols
    || $stringify(Object(symbol)) !== '{}';
});

// https://github.com/tc39/proposal-well-formed-stringify
var ILL_FORMED_UNICODE = fails(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

var stringifyWithSymbolsFix = function (it, replacer) {
  var args = arraySlice(arguments);
  var $replacer = getReplacerFunction(replacer);
  if (!isCallable($replacer) && (it === undefined || isSymbol(it))) return; // IE8 returns string on undefined
  args[1] = function (key, value) {
    // some old implementations (like WebKit) could pass numbers as keys
    if (isCallable($replacer)) value = call($replacer, this, $String(key), value);
    if (!isSymbol(value)) return value;
  };
  return apply($stringify, null, args);
};

var fixIllFormed = function (match, offset, string) {
  var prev = charAt(string, offset - 1);
  var next = charAt(string, offset + 1);
  if ((exec(low, match) && !exec(hi, next)) || (exec(hi, match) && !exec(low, prev))) {
    return '\\u' + numberToString(charCodeAt(match, 0), 16);
  } return match;
};

if ($stringify) {
  // `JSON.stringify` method
  // https://tc39.es/ecma262/#sec-json.stringify
  $({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = arraySlice(arguments);
      var result = apply(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
      return ILL_FORMED_UNICODE && typeof result == 'string' ? replace(result, tester, fixIllFormed) : result;
    }
  });
}


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.json.to-string-tag.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.json.to-string-tag.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js-pure/internals/set-to-string-tag.js");

// JSON[@@toStringTag] property
// https://tc39.es/ecma262/#sec-json-@@tostringtag
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.math.to-string-tag.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.math.to-string-tag.js ***!
  \********************************************************************/
/***/ (() => {

// empty


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.object.assign.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.object.assign.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var assign = __webpack_require__(/*! ../internals/object-assign */ "./node_modules/core-js-pure/internals/object-assign.js");

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.object.define-properties.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.object.define-properties.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");
var defineProperties = (__webpack_require__(/*! ../internals/object-define-properties */ "./node_modules/core-js-pure/internals/object-define-properties.js").f);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
$({ target: 'Object', stat: true, forced: Object.defineProperties !== defineProperties, sham: !DESCRIPTORS }, {
  defineProperties: defineProperties
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.object.define-property.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.object.define-property.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");
var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js-pure/internals/object-define-property.js").f);

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
// eslint-disable-next-line es/no-object-defineproperty -- safe
$({ target: 'Object', stat: true, forced: Object.defineProperty !== defineProperty, sham: !DESCRIPTORS }, {
  defineProperty: defineProperty
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.object.get-own-property-descriptor.js":
/*!************************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.object.get-own-property-descriptor.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js-pure/internals/to-indexed-object.js");
var nativeGetOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js-pure/internals/object-get-own-property-descriptor.js").f);
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");

var FORCED = !DESCRIPTORS || fails(function () { nativeGetOwnPropertyDescriptor(1); });

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.object.get-own-property-descriptors.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.object.get-own-property-descriptors.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "./node_modules/core-js-pure/internals/own-keys.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js-pure/internals/to-indexed-object.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js-pure/internals/object-get-own-property-descriptor.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js-pure/internals/create-property.js");

// `Object.getOwnPropertyDescriptors` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.object.get-own-property-symbols.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.object.get-own-property-symbols.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ "./node_modules/core-js-pure/internals/symbol-constructor-detection.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js-pure/internals/object-get-own-property-symbols.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js-pure/internals/to-object.js");

// V8 ~ Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FORCED = !NATIVE_SYMBOL || fails(function () { getOwnPropertySymbolsModule.f(1); });

// `Object.getOwnPropertySymbols` method
// https://tc39.es/ecma262/#sec-object.getownpropertysymbols
$({ target: 'Object', stat: true, forced: FORCED }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    var $getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return $getOwnPropertySymbols ? $getOwnPropertySymbols(toObject(it)) : [];
  }
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.object.keys.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.object.keys.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js-pure/internals/to-object.js");
var nativeKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js-pure/internals/object-keys.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.object.to-string.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.object.to-string.js ***!
  \******************************************************************/
/***/ (() => {

// empty


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.reflect.to-string-tag.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.reflect.to-string-tag.js ***!
  \***********************************************************************/
/***/ (() => {

// empty


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.string.includes.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.string.includes.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var notARegExp = __webpack_require__(/*! ../internals/not-a-regexp */ "./node_modules/core-js-pure/internals/not-a-regexp.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js-pure/internals/require-object-coercible.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js-pure/internals/to-string.js");
var correctIsRegExpLogic = __webpack_require__(/*! ../internals/correct-is-regexp-logic */ "./node_modules/core-js-pure/internals/correct-is-regexp-logic.js");

var stringIndexOf = uncurryThis(''.indexOf);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~stringIndexOf(
      toString(requireObjectCoercible(this)),
      toString(notARegExp(searchString)),
      arguments.length > 1 ? arguments[1] : undefined
    );
  }
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.string.iterator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.string.iterator.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var charAt = (__webpack_require__(/*! ../internals/string-multibyte */ "./node_modules/core-js-pure/internals/string-multibyte.js").charAt);
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js-pure/internals/to-string.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js-pure/internals/internal-state.js");
var defineIterator = __webpack_require__(/*! ../internals/iterator-define */ "./node_modules/core-js-pure/internals/iterator-define.js");
var createIterResultObject = __webpack_require__(/*! ../internals/create-iter-result-object */ "./node_modules/core-js-pure/internals/create-iter-result-object.js");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return createIterResultObject(undefined, true);
  point = charAt(string, index);
  state.index += point.length;
  return createIterResultObject(point, false);
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.async-iterator.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.async-iterator.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js-pure/internals/well-known-symbol-define.js");

// `Symbol.asyncIterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.asynciterator
defineWellKnownSymbol('asyncIterator');


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.constructor.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.constructor.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js-pure/internals/function-call.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js-pure/internals/is-pure.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ "./node_modules/core-js-pure/internals/symbol-constructor-detection.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js-pure/internals/has-own-property.js");
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "./node_modules/core-js-pure/internals/object-is-prototype-of.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js-pure/internals/an-object.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js-pure/internals/to-indexed-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "./node_modules/core-js-pure/internals/to-property-key.js");
var $toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js-pure/internals/to-string.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js-pure/internals/create-property-descriptor.js");
var nativeObjectCreate = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js-pure/internals/object-create.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js-pure/internals/object-keys.js");
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js-pure/internals/object-get-own-property-names.js");
var getOwnPropertyNamesExternal = __webpack_require__(/*! ../internals/object-get-own-property-names-external */ "./node_modules/core-js-pure/internals/object-get-own-property-names-external.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js-pure/internals/object-get-own-property-symbols.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js-pure/internals/object-get-own-property-descriptor.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js-pure/internals/object-define-property.js");
var definePropertiesModule = __webpack_require__(/*! ../internals/object-define-properties */ "./node_modules/core-js-pure/internals/object-define-properties.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js-pure/internals/object-property-is-enumerable.js");
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "./node_modules/core-js-pure/internals/define-built-in.js");
var defineBuiltInAccessor = __webpack_require__(/*! ../internals/define-built-in-accessor */ "./node_modules/core-js-pure/internals/define-built-in-accessor.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js-pure/internals/shared.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js-pure/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js-pure/internals/hidden-keys.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js-pure/internals/uid.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");
var wrappedWellKnownSymbolModule = __webpack_require__(/*! ../internals/well-known-symbol-wrapped */ "./node_modules/core-js-pure/internals/well-known-symbol-wrapped.js");
var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js-pure/internals/well-known-symbol-define.js");
var defineSymbolToPrimitive = __webpack_require__(/*! ../internals/symbol-define-to-primitive */ "./node_modules/core-js-pure/internals/symbol-define-to-primitive.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js-pure/internals/set-to-string-tag.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js-pure/internals/internal-state.js");
var $forEach = (__webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js-pure/internals/array-iteration.js").forEach);

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';

var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);

var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
var RangeError = global.RangeError;
var TypeError = global.TypeError;
var QObject = global.QObject;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var push = uncurryThis([].push);

var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var WellKnownSymbolsStore = shared('wks');

// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var fallbackDefineProperty = function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
};

var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a !== 7;
}) ? fallbackDefineProperty : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPropertyKey(P);
  anObject(Attributes);
  if (hasOwn(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!hasOwn(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (hasOwn(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || call($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPropertyKey(V);
  var enumerable = call(nativePropertyIsEnumerable, this, P);
  if (this === ObjectPrototype && hasOwn(AllSymbols, P) && !hasOwn(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !hasOwn(this, P) || !hasOwn(AllSymbols, P) || hasOwn(this, HIDDEN) && this[HIDDEN][P]
    ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPropertyKey(P);
  if (it === ObjectPrototype && hasOwn(AllSymbols, key) && !hasOwn(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && hasOwn(AllSymbols, key) && !(hasOwn(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!hasOwn(AllSymbols, key) && !hasOwn(hiddenKeys, key)) push(result, key);
  });
  return result;
};

var $getOwnPropertySymbols = function (O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (hasOwn(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn(ObjectPrototype, key))) {
      push(result, AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (isPrototypeOf(SymbolPrototype, this)) throw new TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      var $this = this === undefined ? global : this;
      if ($this === ObjectPrototype) call(setter, ObjectPrototypeSymbols, value);
      if (hasOwn($this, HIDDEN) && hasOwn($this[HIDDEN], tag)) $this[HIDDEN][tag] = false;
      var descriptor = createPropertyDescriptor(1, value);
      try {
        setSymbolDescriptor($this, tag, descriptor);
      } catch (error) {
        if (!(error instanceof RangeError)) throw error;
        fallbackDefineProperty($this, tag, descriptor);
      }
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  SymbolPrototype = $Symbol[PROTOTYPE];

  defineBuiltIn(SymbolPrototype, 'toString', function toString() {
    return getInternalState(this).tag;
  });

  defineBuiltIn($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  definePropertiesModule.f = $defineProperties;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    defineBuiltInAccessor(SymbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      defineBuiltIn(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, constructor: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames
});

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
defineSymbolToPrimitive();

// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.description.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.description.js ***!
  \********************************************************************/
/***/ (() => {

// empty


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.for.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.for.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js-pure/internals/get-built-in.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js-pure/internals/has-own-property.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js-pure/internals/to-string.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js-pure/internals/shared.js");
var NATIVE_SYMBOL_REGISTRY = __webpack_require__(/*! ../internals/symbol-registry-detection */ "./node_modules/core-js-pure/internals/symbol-registry-detection.js");

var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');

// `Symbol.for` method
// https://tc39.es/ecma262/#sec-symbol.for
$({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
  'for': function (key) {
    var string = toString(key);
    if (hasOwn(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = getBuiltIn('Symbol')(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  }
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.has-instance.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.has-instance.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js-pure/internals/well-known-symbol-define.js");

// `Symbol.hasInstance` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.hasinstance
defineWellKnownSymbol('hasInstance');


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.is-concat-spreadable.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.is-concat-spreadable.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js-pure/internals/well-known-symbol-define.js");

// `Symbol.isConcatSpreadable` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.isconcatspreadable
defineWellKnownSymbol('isConcatSpreadable');


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.iterator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.iterator.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js-pure/internals/well-known-symbol-define.js");

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// TODO: Remove this module from `core-js@4` since it's split to modules listed below
__webpack_require__(/*! ../modules/es.symbol.constructor */ "./node_modules/core-js-pure/modules/es.symbol.constructor.js");
__webpack_require__(/*! ../modules/es.symbol.for */ "./node_modules/core-js-pure/modules/es.symbol.for.js");
__webpack_require__(/*! ../modules/es.symbol.key-for */ "./node_modules/core-js-pure/modules/es.symbol.key-for.js");
__webpack_require__(/*! ../modules/es.json.stringify */ "./node_modules/core-js-pure/modules/es.json.stringify.js");
__webpack_require__(/*! ../modules/es.object.get-own-property-symbols */ "./node_modules/core-js-pure/modules/es.object.get-own-property-symbols.js");


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.key-for.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.key-for.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js-pure/internals/has-own-property.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js-pure/internals/is-symbol.js");
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ "./node_modules/core-js-pure/internals/try-to-string.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js-pure/internals/shared.js");
var NATIVE_SYMBOL_REGISTRY = __webpack_require__(/*! ../internals/symbol-registry-detection */ "./node_modules/core-js-pure/internals/symbol-registry-detection.js");

var SymbolToStringRegistry = shared('symbol-to-string-registry');

// `Symbol.keyFor` method
// https://tc39.es/ecma262/#sec-symbol.keyfor
$({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw new TypeError(tryToString(sym) + ' is not a symbol');
    if (hasOwn(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  }
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.match-all.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.match-all.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js-pure/internals/well-known-symbol-define.js");

// `Symbol.matchAll` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.matchall
defineWellKnownSymbol('matchAll');


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.match.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.match.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js-pure/internals/well-known-symbol-define.js");

// `Symbol.match` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.match
defineWellKnownSymbol('match');


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.replace.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.replace.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js-pure/internals/well-known-symbol-define.js");

// `Symbol.replace` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.replace
defineWellKnownSymbol('replace');


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.search.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.search.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js-pure/internals/well-known-symbol-define.js");

// `Symbol.search` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.search
defineWellKnownSymbol('search');


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.species.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.species.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js-pure/internals/well-known-symbol-define.js");

// `Symbol.species` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.species
defineWellKnownSymbol('species');


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.split.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.split.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js-pure/internals/well-known-symbol-define.js");

// `Symbol.split` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.split
defineWellKnownSymbol('split');


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.to-primitive.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.to-primitive.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js-pure/internals/well-known-symbol-define.js");
var defineSymbolToPrimitive = __webpack_require__(/*! ../internals/symbol-define-to-primitive */ "./node_modules/core-js-pure/internals/symbol-define-to-primitive.js");

// `Symbol.toPrimitive` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.toprimitive
defineWellKnownSymbol('toPrimitive');

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
defineSymbolToPrimitive();


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.to-string-tag.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.to-string-tag.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js-pure/internals/get-built-in.js");
var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js-pure/internals/well-known-symbol-define.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js-pure/internals/set-to-string-tag.js");

// `Symbol.toStringTag` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.tostringtag
defineWellKnownSymbol('toStringTag');

// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag(getBuiltIn('Symbol'), 'Symbol');


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.unscopables.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.unscopables.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js-pure/internals/well-known-symbol-define.js");

// `Symbol.unscopables` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.unscopables
defineWellKnownSymbol('unscopables');


/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.function.metadata.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.function.metadata.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");
var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js-pure/internals/object-define-property.js").f);

var METADATA = wellKnownSymbol('metadata');
var FunctionPrototype = Function.prototype;

// Function.prototype[@@metadata]
// https://github.com/tc39/proposal-decorator-metadata
if (FunctionPrototype[METADATA] === undefined) {
  defineProperty(FunctionPrototype, METADATA, {
    value: null
  });
}


/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.async-dispose.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.async-dispose.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js-pure/internals/well-known-symbol-define.js");

// `Symbol.asyncDispose` well-known symbol
// https://github.com/tc39/proposal-async-explicit-resource-management
defineWellKnownSymbol('asyncDispose');


/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.dispose.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.dispose.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js-pure/internals/well-known-symbol-define.js");

// `Symbol.dispose` well-known symbol
// https://github.com/tc39/proposal-explicit-resource-management
defineWellKnownSymbol('dispose');


/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.is-registered-symbol.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.is-registered-symbol.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var isRegisteredSymbol = __webpack_require__(/*! ../internals/symbol-is-registered */ "./node_modules/core-js-pure/internals/symbol-is-registered.js");

// `Symbol.isRegisteredSymbol` method
// https://tc39.es/proposal-symbol-predicates/#sec-symbol-isregisteredsymbol
$({ target: 'Symbol', stat: true }, {
  isRegisteredSymbol: isRegisteredSymbol
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.is-registered.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.is-registered.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var isRegisteredSymbol = __webpack_require__(/*! ../internals/symbol-is-registered */ "./node_modules/core-js-pure/internals/symbol-is-registered.js");

// `Symbol.isRegistered` method
// obsolete version of https://tc39.es/proposal-symbol-predicates/#sec-symbol-isregisteredsymbol
$({ target: 'Symbol', stat: true, name: 'isRegisteredSymbol' }, {
  isRegistered: isRegisteredSymbol
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.is-well-known-symbol.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.is-well-known-symbol.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var isWellKnownSymbol = __webpack_require__(/*! ../internals/symbol-is-well-known */ "./node_modules/core-js-pure/internals/symbol-is-well-known.js");

// `Symbol.isWellKnownSymbol` method
// https://tc39.es/proposal-symbol-predicates/#sec-symbol-iswellknownsymbol
// We should patch it for newly added well-known symbols. If it's not required, this module just will not be injected
$({ target: 'Symbol', stat: true, forced: true }, {
  isWellKnownSymbol: isWellKnownSymbol
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.is-well-known.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.is-well-known.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var isWellKnownSymbol = __webpack_require__(/*! ../internals/symbol-is-well-known */ "./node_modules/core-js-pure/internals/symbol-is-well-known.js");

// `Symbol.isWellKnown` method
// obsolete version of https://tc39.es/proposal-symbol-predicates/#sec-symbol-iswellknownsymbol
// We should patch it for newly added well-known symbols. If it's not required, this module just will not be injected
$({ target: 'Symbol', stat: true, name: 'isWellKnownSymbol', forced: true }, {
  isWellKnown: isWellKnownSymbol
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.matcher.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.matcher.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js-pure/internals/well-known-symbol-define.js");

// `Symbol.matcher` well-known symbol
// https://github.com/tc39/proposal-pattern-matching
defineWellKnownSymbol('matcher');


/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.metadata-key.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.metadata-key.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// TODO: Remove from `core-js@4`
var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js-pure/internals/well-known-symbol-define.js");

// `Symbol.metadataKey` well-known symbol
// https://github.com/tc39/proposal-decorator-metadata
defineWellKnownSymbol('metadataKey');


/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.metadata.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.metadata.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js-pure/internals/well-known-symbol-define.js");

// `Symbol.metadata` well-known symbol
// https://github.com/tc39/proposal-decorators
defineWellKnownSymbol('metadata');


/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.observable.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.observable.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js-pure/internals/well-known-symbol-define.js");

// `Symbol.observable` well-known symbol
// https://github.com/tc39/proposal-observable
defineWellKnownSymbol('observable');


/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.pattern-match.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.pattern-match.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// TODO: remove from `core-js@4`
var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js-pure/internals/well-known-symbol-define.js");

// `Symbol.patternMatch` well-known symbol
// https://github.com/tc39/proposal-pattern-matching
defineWellKnownSymbol('patternMatch');


/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.replace-all.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.replace-all.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// TODO: remove from `core-js@4`
var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js-pure/internals/well-known-symbol-define.js");

defineWellKnownSymbol('replaceAll');


/***/ }),

/***/ "./node_modules/core-js-pure/modules/web.dom-collections.for-each.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/web.dom-collections.for-each.js ***!
  \***************************************************************************/
/***/ (() => {

// empty


/***/ }),

/***/ "./node_modules/core-js-pure/modules/web.dom-collections.iterator.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/web.dom-collections.iterator.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(/*! ../modules/es.array.iterator */ "./node_modules/core-js-pure/modules/es.array.iterator.js");
var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "./node_modules/core-js-pure/internals/dom-iterables.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js-pure/internals/classof.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js-pure/internals/create-non-enumerable-property.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js-pure/internals/iterators.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG) {
    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
  }
  Iterators[COLLECTION_NAME] = Iterators.Array;
}


/***/ }),

/***/ "./node_modules/core-js-pure/stable/array/virtual/for-each.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/array/virtual/for-each.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../../es/array/virtual/for-each */ "./node_modules/core-js-pure/es/array/virtual/for-each.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/stable/instance/filter.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/instance/filter.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../es/instance/filter */ "./node_modules/core-js-pure/es/instance/filter.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/stable/instance/for-each.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/instance/for-each.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classof = __webpack_require__(/*! ../../internals/classof */ "./node_modules/core-js-pure/internals/classof.js");
var hasOwn = __webpack_require__(/*! ../../internals/has-own-property */ "./node_modules/core-js-pure/internals/has-own-property.js");
var isPrototypeOf = __webpack_require__(/*! ../../internals/object-is-prototype-of */ "./node_modules/core-js-pure/internals/object-is-prototype-of.js");
var method = __webpack_require__(/*! ../array/virtual/for-each */ "./node_modules/core-js-pure/stable/array/virtual/for-each.js");
__webpack_require__(/*! ../../modules/web.dom-collections.for-each */ "./node_modules/core-js-pure/modules/web.dom-collections.for-each.js");

var ArrayPrototype = Array.prototype;

var DOMIterables = {
  DOMTokenList: true,
  NodeList: true
};

module.exports = function (it) {
  var own = it.forEach;
  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.forEach)
    || hasOwn(DOMIterables, classof(it)) ? method : own;
};


/***/ }),

/***/ "./node_modules/core-js-pure/stable/instance/includes.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/instance/includes.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../es/instance/includes */ "./node_modules/core-js-pure/es/instance/includes.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/stable/instance/map.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/stable/instance/map.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../es/instance/map */ "./node_modules/core-js-pure/es/instance/map.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/stable/instance/some.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/stable/instance/some.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../es/instance/some */ "./node_modules/core-js-pure/es/instance/some.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/stable/object/assign.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/stable/object/assign.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../es/object/assign */ "./node_modules/core-js-pure/es/object/assign.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/stable/object/define-properties.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/object/define-properties.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../es/object/define-properties */ "./node_modules/core-js-pure/es/object/define-properties.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/stable/object/define-property.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/object/define-property.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../es/object/define-property */ "./node_modules/core-js-pure/es/object/define-property.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/stable/object/get-own-property-descriptor.js":
/*!********************************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/object/get-own-property-descriptor.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../es/object/get-own-property-descriptor */ "./node_modules/core-js-pure/es/object/get-own-property-descriptor.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/stable/object/get-own-property-descriptors.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/object/get-own-property-descriptors.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../es/object/get-own-property-descriptors */ "./node_modules/core-js-pure/es/object/get-own-property-descriptors.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/stable/object/get-own-property-symbols.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/object/get-own-property-symbols.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../es/object/get-own-property-symbols */ "./node_modules/core-js-pure/es/object/get-own-property-symbols.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/stable/object/keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/stable/object/keys.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../es/object/keys */ "./node_modules/core-js-pure/es/object/keys.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/stable/symbol/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/stable/symbol/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../es/symbol */ "./node_modules/core-js-pure/es/symbol/index.js");
__webpack_require__(/*! ../../modules/web.dom-collections.iterator */ "./node_modules/core-js-pure/modules/web.dom-collections.iterator.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/stable/symbol/iterator.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/symbol/iterator.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../es/symbol/iterator */ "./node_modules/core-js-pure/es/symbol/iterator.js");
__webpack_require__(/*! ../../modules/web.dom-collections.iterator */ "./node_modules/core-js-pure/modules/web.dom-collections.iterator.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/stable/symbol/to-primitive.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/symbol/to-primitive.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../es/symbol/to-primitive */ "./node_modules/core-js-pure/es/symbol/to-primitive.js");

module.exports = parent;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!****************************!*\
  !*** ./main/background.ts ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var electron_serve__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron-serve */ "electron-serve");
/* harmony import */ var electron_serve__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron_serve__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers */ "./main/helpers/index.ts");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! socket.io-client */ "socket.io-client");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _controladores_controladorSerial__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controladores/controladorSerial */ "./main/controladores/controladorSerial.ts");





// Manipulación de puerto serial

// Para la conexion al servidor socket.


// Controladores de IPC.

const isProd = "development" === 'production';
let clienteSocket = undefined;
let socket = undefined;
let listaClientes = [];
let estatusDispositivo = 0;
if (isProd) {
  electron_serve__WEBPACK_IMPORTED_MODULE_2___default()({
    directory: 'app'
  });
} else {
  electron__WEBPACK_IMPORTED_MODULE_1__.app.setPath('userData', `${electron__WEBPACK_IMPORTED_MODULE_1__.app.getPath('userData')} (development)`);
}
;
(async () => {
  await electron__WEBPACK_IMPORTED_MODULE_1__.app.whenReady();
  const mainWindow = (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.createWindow)('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, 'preload.js')
    }
  });
  if (isProd) {
    await mainWindow.loadURL('app://./');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/`);
  }
})();
electron__WEBPACK_IMPORTED_MODULE_1__.app.on('window-all-closed', () => {
  electron__WEBPACK_IMPORTED_MODULE_1__.app.quit();
});

// Exploramos los puertos seriales disponibles.
electron__WEBPACK_IMPORTED_MODULE_1__.ipcMain.on('explorar_puertos_serial', _controladores_controladorSerial__WEBPACK_IMPORTED_MODULE_5__.explorarPuertos);
electron__WEBPACK_IMPORTED_MODULE_1__.ipcMain.on('guardar_datos_tarjeta', _controladores_controladorSerial__WEBPACK_IMPORTED_MODULE_5__.guardarDatosTarjeta);
electron__WEBPACK_IMPORTED_MODULE_1__.ipcMain.on('guardar_configuracion_lector', _controladores_controladorSerial__WEBPACK_IMPORTED_MODULE_5__.guardarConfiguracionDispositivoLector);
electron__WEBPACK_IMPORTED_MODULE_1__.ipcMain.on('guardar_configuracion_checador', _controladores_controladorSerial__WEBPACK_IMPORTED_MODULE_5__.guardarConfiguracionDispositivoChecador);
electron__WEBPACK_IMPORTED_MODULE_1__.ipcMain.on('guardar_configuracion_controlador', _controladores_controladorSerial__WEBPACK_IMPORTED_MODULE_5__.guardarConfiguracionDispositivoControlador);
electron__WEBPACK_IMPORTED_MODULE_1__.ipcMain.on('guardar_configuracion_controlador_puerta', _controladores_controladorSerial__WEBPACK_IMPORTED_MODULE_5__.guardarConfiguracionDispositivoControladorPuerta);
electron__WEBPACK_IMPORTED_MODULE_1__.ipcMain.on('sesion_iniciada', async (evento, params) => {
  const ipServer = params.ipServer;
  const token = params.token;

  // Iniciamos conexion con el token server.
  clienteSocket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_4__.io)(ipServer, {
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
  socket.on('lista_clientes', lista => {
    // Guardamos la lista de los clientes conectados.
    listaClientes = lista;
  });
  socket.on('estatus_dispositivo', estatus => {
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
electron__WEBPACK_IMPORTED_MODULE_1__.ipcMain.on('sesion_terminada', async (evento, args) => {
  // Terminamos la conexion con el socketServer.
  socket.disconnect();
});
electron__WEBPACK_IMPORTED_MODULE_1__.ipcMain.on('emitir_evento_socket', async (evento, args) => {
  // Emitimos un evento por medio de sockets.
  socket.emit(args.evento, args.parametros);
});
electron__WEBPACK_IMPORTED_MODULE_1__.ipcMain.on('listar_clientes', (evento, args) => {
  evento.returnValue = listaClientes;
});
electron__WEBPACK_IMPORTED_MODULE_1__.ipcMain.on('estatus_dispositivo', (evento, args) => {
  evento.returnValue = estatusDispositivo;
  estatusDispositivo = 0;
});
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFLE1BQU07SUFDakM7SUFDQWtGLE1BQU0sQ0FBQzdJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztFQUNsQyxDQUFDLENBQUM7RUFFRjZJLE1BQU0sQ0FBQ2xGLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNO0lBQ2pDO0lBQ0FrRixNQUFNLENBQUM3SSxJQUFJLENBQUMsaUJBQWlCLENBQUM7RUFDbEMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBRUZvSSw2Q0FBTyxDQUFDekUsRUFBRSxDQUFDLGtCQUFrQixFQUFFLE9BQzNCcEQsTUFBTSxFQUNOa0MsSUFBSSxLQUNIO0VBQ0Q7RUFDQW9HLE1BQU0sQ0FBQ3VCLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQztBQUVGaEMsNkNBQU8sQ0FBQ3pFLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxPQUFPcEQsTUFBTSxFQUFFa0MsSUFBSSxLQUFLO0VBQ3ZEO0VBQ0FvRyxNQUFNLENBQUM3SSxJQUFJLENBQUN5QyxJQUFJLENBQUNsQyxNQUFNLEVBQUVrQyxJQUFJLENBQUM0SCxVQUFVLENBQUM7QUFDN0MsQ0FBQyxDQUFDO0FBRUZqQyw2Q0FBTyxDQUFDekUsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQzFCcEQsTUFBTSxFQUNOa0MsSUFBSSxLQUNIO0VBQ0RsQyxNQUFNLENBQUMrSixXQUFXLEdBQUd4QixhQUFhO0FBQ3RDLENBQUMsQ0FBQztBQUVGViw2Q0FBTyxDQUFDekUsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQzlCcEQsTUFBTSxFQUNOa0MsSUFBSSxLQUNIO0VBQ0RsQyxNQUFNLENBQUMrSixXQUFXLEdBQUd2QixrQkFBa0I7RUFDdkNBLGtCQUFrQixHQUFHLENBQUM7QUFDMUIsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9tYWluL2NvbnRyb2xhZG9yZXMvY29udHJvbGFkb3JFdmVudG9zU2VyaWFsLnRzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbWFpbi9jb250cm9sYWRvcmVzL2NvbnRyb2xhZG9yU2VyaWFsLnRzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbWFpbi9lbnVtcy50cyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL21haW4vaGVscGVycy9jcmVhdGUtd2luZG93LnRzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbWFpbi9oZWxwZXJzL2luZGV4LnRzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJlbGVjdHJvblwiIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vZXh0ZXJuYWwgdW1kIFwiZWxlY3Ryb24tc2VydmVcIiIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi9leHRlcm5hbCB1bWQgXCJlbGVjdHJvbi1zdG9yZVwiIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uL2V4dGVybmFsIHVtZCBcInNlcmlhbHBvcnRcIiIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi9leHRlcm5hbCB1bWQgXCJzb2NrZXQuaW8tY2xpZW50XCIiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9pbnN0YW5jZS9maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9pbnN0YW5jZS9mb3ItZWFjaC5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL2luc3RhbmNlL2luY2x1ZGVzLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2UvbWFwLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2Uvc29tZS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9vYmplY3QvZGVmaW5lLXByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JzLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvb2JqZWN0L2dldC1vd24tcHJvcGVydHktc3ltYm9scy5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL29iamVjdC9rZXlzLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2hlbHBlcnMvdG9QcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9oZWxwZXJzL3RvUHJvcGVydHlLZXkuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9oZWxwZXJzL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvYWN0dWFsL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2FjdHVhbC9zeW1ib2wvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2FjdHVhbC9zeW1ib2wvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2FjdHVhbC9zeW1ib2wvdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9hcnJheS92aXJ0dWFsL2ZpbHRlci5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvYXJyYXkvdmlydHVhbC9mb3ItZWFjaC5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvYXJyYXkvdmlydHVhbC9pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvYXJyYXkvdmlydHVhbC9tYXAuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2FycmF5L3ZpcnR1YWwvc29tZS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvaW5zdGFuY2UvZmlsdGVyLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9pbnN0YW5jZS9pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvaW5zdGFuY2UvbWFwLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9pbnN0YW5jZS9zb21lLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9vYmplY3QvZGVmaW5lLXByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JzLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvc3RyaW5nL3ZpcnR1YWwvaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL3N5bWJvbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvc3ltYm9sL2l0ZXJhdG9yLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9zeW1ib2wvdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9mZWF0dXJlcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9mZWF0dXJlcy9zeW1ib2wvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ZlYXR1cmVzL3N5bWJvbC9pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZmVhdHVyZXMvc3ltYm9sL3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZnVsbC9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9mdWxsL3N5bWJvbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZnVsbC9zeW1ib2wvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2Z1bGwvc3ltYm9sL3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2EtY2FsbGFibGUuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hLXBvc3NpYmxlLXByb3RvdHlwZS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FkZC10by11bnNjb3BhYmxlcy5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LWZvci1lYWNoLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24uanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydC5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hcnJheS1zbGljZS1zaW1wbGUuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hcnJheS1zbGljZS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2NsYXNzb2YtcmF3LmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY2xhc3NvZi5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2NvcnJlY3QtaXMtcmVnZXhwLWxvZ2ljLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY29ycmVjdC1wcm90b3R5cGUtZ2V0dGVyLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY3JlYXRlLWl0ZXItcmVzdWx0LW9iamVjdC5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluLWFjY2Vzc29yLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZGVmaW5lLWdsb2JhbC1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZG9jdW1lbnQtYWxsLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9kb2VzLW5vdC1leGNlZWQtc2FmZS1pbnRlZ2VyLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZG9tLWl0ZXJhYmxlcy5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50LmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZXhwb3J0LmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZmFpbHMuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9mdW5jdGlvbi1hcHBseS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dC5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbC5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2Z1bmN0aW9uLW5hbWUuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMtYWNjZXNzb3IuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMtY2xhdXNlLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluLXByb3RvdHlwZS1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9nZXQtYnVpbHQtaW4uanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9nZXQtanNvbi1yZXBsYWNlci1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2dldC1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5LmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaGlkZGVuLWtleXMuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9odG1sLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pbmRleGVkLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pcy1hcnJheS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2lzLWNhbGxhYmxlLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaXMtY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pcy1mb3JjZWQuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2lzLXB1cmUuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pcy1yZWdleHAuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pcy1zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pdGVyYXRvci1jcmVhdGUtY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pdGVyYXRvci1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pdGVyYXRvcnMtY29yZS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2l0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2xlbmd0aC1vZi1hcnJheS1saWtlLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvbWF0aC10cnVuYy5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL25vdC1hLXJlZ2V4cC5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3QtY3JlYXRlLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy1leHRlcm5hbC5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scy5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWlzLXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LXRvLXN0cmluZy5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29yZGluYXJ5LXRvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL293bi1rZXlzLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvcGF0aC5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3NoYXJlZC1zdG9yZS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3NoYXJlZC5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zeW1ib2wtY29uc3RydWN0b3ItZGV0ZWN0aW9uLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvc3ltYm9sLWRlZmluZS10by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zeW1ib2wtaXMtcmVnaXN0ZXJlZC5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3N5bWJvbC1pcy13ZWxsLWtub3duLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvc3ltYm9sLXJlZ2lzdHJ5LWRldGVjdGlvbi5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4LmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90by1pbnRlZ2VyLW9yLWluZmluaXR5LmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8tbGVuZ3RoLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8tb2JqZWN0LmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8tcHJvcGVydHkta2V5LmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0LmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8tc3RyaW5nLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdHJ5LXRvLXN0cmluZy5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3VpZC5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdjgtcHJvdG90eXBlLWRlZmluZS1idWcuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy93ZWFrLW1hcC1iYXNpYy1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC13cmFwcGVkLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuYXJyYXkuY29uY2F0LmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmFycmF5LmZpbHRlci5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5hcnJheS5mb3ItZWFjaC5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5hcnJheS5pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5hcnJheS5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5hcnJheS5tYXAuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuYXJyYXkuc29tZS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5kYXRlLnRvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5qc29uLnN0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5qc29uLnRvLXN0cmluZy10YWcuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMubWF0aC50by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLm9iamVjdC5hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMub2JqZWN0LmRlZmluZS1wcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMub2JqZWN0LmdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9ycy5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLm9iamVjdC5rZXlzLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLm9iamVjdC50by1zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMucmVmbGVjdC50by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN0cmluZy5pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zdHJpbmcuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC5jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wuZGVzY3JpcHRpb24uanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLmZvci5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wuaGFzLWluc3RhbmNlLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC5pcy1jb25jYXQtc3ByZWFkYWJsZS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC5rZXktZm9yLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC5tYXRjaC1hbGwuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLm1hdGNoLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC5yZXBsYWNlLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC5zZWFyY2guanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLnNwZWNpZXMuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLnNwbGl0LmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC50by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLnRvLXN0cmluZy10YWcuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLnVuc2NvcGFibGVzLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzbmV4dC5mdW5jdGlvbi5tZXRhZGF0YS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lc25leHQuc3ltYm9sLmFzeW5jLWRpc3Bvc2UuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXNuZXh0LnN5bWJvbC5kaXNwb3NlLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzbmV4dC5zeW1ib2wuaXMtcmVnaXN0ZXJlZC1zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXNuZXh0LnN5bWJvbC5pcy1yZWdpc3RlcmVkLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzbmV4dC5zeW1ib2wuaXMtd2VsbC1rbm93bi1zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXNuZXh0LnN5bWJvbC5pcy13ZWxsLWtub3duLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzbmV4dC5zeW1ib2wubWF0Y2hlci5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lc25leHQuc3ltYm9sLm1ldGFkYXRhLWtleS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lc25leHQuc3ltYm9sLm1ldGFkYXRhLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzbmV4dC5zeW1ib2wub2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lc25leHQuc3ltYm9sLnBhdHRlcm4tbWF0Y2guanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXNuZXh0LnN5bWJvbC5yZXBsYWNlLWFsbC5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy93ZWIuZG9tLWNvbGxlY3Rpb25zLmZvci1lYWNoLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL3dlYi5kb20tY29sbGVjdGlvbnMuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9hcnJheS92aXJ0dWFsL2Zvci1lYWNoLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvZmlsdGVyLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvZm9yLWVhY2guanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL21hcC5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL3NvbWUuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvb2JqZWN0L2RlZmluZS1wcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9ycy5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL29iamVjdC9nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL3N5bWJvbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL3N5bWJvbC9pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL3N5bWJvbC90by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2FjLWF1dG9tYXRpemFjaW9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYWMtYXV0b21hdGl6YWNpb24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9hYy1hdXRvbWF0aXphY2lvbi8uL21haW4vYmFja2dyb3VuZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJlbGVjdHJvbi1zZXJ2ZVwiKSwgcmVxdWlyZShcImVsZWN0cm9uLXN0b3JlXCIpLCByZXF1aXJlKFwic29ja2V0LmlvLWNsaWVudFwiKSwgcmVxdWlyZShcInNlcmlhbHBvcnRcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiZWxlY3Ryb24tc2VydmVcIiwgXCJlbGVjdHJvbi1zdG9yZVwiLCBcInNvY2tldC5pby1jbGllbnRcIiwgXCJzZXJpYWxwb3J0XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJlbGVjdHJvbi1zZXJ2ZVwiKSwgcmVxdWlyZShcImVsZWN0cm9uLXN0b3JlXCIpLCByZXF1aXJlKFwic29ja2V0LmlvLWNsaWVudFwiKSwgcmVxdWlyZShcInNlcmlhbHBvcnRcIikpIDogZmFjdG9yeShyb290W1wiZWxlY3Ryb24tc2VydmVcIl0sIHJvb3RbXCJlbGVjdHJvbi1zdG9yZVwiXSwgcm9vdFtcInNvY2tldC5pby1jbGllbnRcIl0sIHJvb3RbXCJzZXJpYWxwb3J0XCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKGdsb2JhbCwgKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZWxlY3Ryb25fc2VydmVfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9lbGVjdHJvbl9zdG9yZV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3NvY2tldF9pb19jbGllbnRfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9zZXJpYWxwb3J0X18pID0+IHtcbnJldHVybiAiLCIvLyBGbGFncyBkZWwgZGlzcG9zaXRpdm8uXG5pbXBvcnQge1xuICAgIEVWRU5UT1NfR1VBUkRBRE9fREFUT1NfVEFSSkVUQSxcbiAgICBGTEFHU19ESVNQT1NJVElWT1xufSBmcm9tIFwiLi4vZW51bXNcIjtcblxuLy8gTWFuZWpvIGRlIHNlcmlhbCBwb3J0LlxuaW1wb3J0IHtcbiAgICBSZWFkbGluZVBhcnNlcixcbiAgICBTZXJpYWxQb3J0XG59IGZyb20gXCJzZXJpYWxwb3J0XCI7XG5cbmV4cG9ydCBjb25zdCBjb25leGlvbkFiaWVydGEgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJDb25leGlvbiBpbmljaWFkYVwiKTtcblxuICAgIH0gY2F0Y2goZXhjZXBjaW9uKSB7XG4gICAgICAgIC8vIEltcHJpbWltb3MgbGEgZXhjZXBjaW9uLlxuICAgICAgICBjb25zb2xlLmxvZyhcIk9jdXJyaW8gdW5hIGV4Y2VwY2lvblwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZXhjZXBjaW9uKTtcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgYWxSZWNpdmlyRGF0b3MgPSBhc3luYyAoXG4gICAgcmVzcHVlc3RhOiBhbnksXG4gICAgcGFyc2VyOiBSZWFkbGluZVBhcnNlcixcbiAgICBjb2xhT3BlcmFjaW9uZXM6IGFueVtdLFxuICAgIHB1ZXJ0b1NlcmlhbDogU2VyaWFsUG9ydFxuKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYocmVzcHVlc3RhID09IEZMQUdTX0RJU1BPU0lUSVZPLklOSUNJQUxJWkFDSU9OX1RFUk1JTkFEQSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2luaWNpYWxpemFjaW9uIGRlbCBkaXNwb3NpdGl2byB0ZXJtaW5hZGEnKTtcbiAgICAgICAgICAgIHBhcnNlci5lbWl0KCdpbmljaWFyX2VudmlvX2RhdG9zJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihyZXNwdWVzdGEgPT0gRkxBR1NfRElTUE9TSVRJVk8uRVNDUklUVVJBX1RFUk1JTkFEQSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2VzY3JpdHVyYSBkZSBkYXRvcyB0ZXJtaW5hZGEnKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRW4gZXN0ZSBjYXNvIHNlIG1hbmRhcmEgZWwgZXZlbnRvIGEgbGEgY29sYSBkZVxuICAgICAgICAgICAgICogb3BlcmFjaW9uZXMgZGVzZGUgZWwgaGFuZGxlciBkZWwgZXZlbnRvIHNlIGV4dHJhZXJhIGRlIGxhXG4gICAgICAgICAgICAgKiBjb2xhIHkgc2UgbGxhbWFyYSBhbCBoYW5kbGVyLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdCBvcGVyYWNpb24gPSBjb2xhT3BlcmFjaW9uZXMuc2hpZnQoKTtcbiAgICAgICAgICAgIHBhcnNlci5lbWl0KG9wZXJhY2lvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZihyZXNwdWVzdGEgPT0gRkxBR1NfRElTUE9TSVRJVk8uT1BFUkFDSU9OX1RFUk1JTkFEQSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3B1ZXJ0byBjZXJyYWRvJyk7XG4gICAgICAgICAgICBwdWVydG9TZXJpYWwuY2xvc2UoKTtcbiAgICAgICAgfVxuXG4gICAgfSBjYXRjaChleGNlcGNpb24pIHtcbiAgICAgICAgLy8gSW1wcmltaW1vcyBsYSBleGNlcGNpb24uXG4gICAgICAgIGNvbnNvbGUubG9nKFwiT2N1cnJpbyB1bmEgZXhjZXBjaW9uXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhleGNlcGNpb24pO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpbmljaWFyRW52aW9EYXRvcyA9IGFzeW5jIChcbiAgICBwdWVydG9TZXJpYWw6IFNlcmlhbFBvcnQsXG4gICAgY29sYU9wZXJhY2lvbmVzOiBhbnlbXSxcbiAgICBldmVudG86IHN0cmluZ1xuKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJpbmljaWFuZG8gZW52aW8gZGUgZGF0b3NcIik7XG5cbiAgICAgICAgcHVlcnRvU2VyaWFsLndyaXRlKFxuICAgICAgICAgICAgZXZlbnRvLFxuICAgICAgICAgICAgJ2FzY2lpJ1xuICAgICAgICApO1xuXG4gICAgICAgIHB1ZXJ0b1NlcmlhbC5kcmFpbigoZXJyb3IpID0+IHsgICAgXG4gICAgICAgICAgICBjb2xhT3BlcmFjaW9uZXMucHVzaCgnZW52aWFyX2RhdG9zJyk7XG4gICAgICAgIH0pO1xuXG4gICAgfSBjYXRjaChleGNlcGNpb24pIHtcbiAgICAgICAgLy8gSW1wcmltaW1vcyBsYSBleGNlcGNpb24uXG4gICAgICAgIGNvbnNvbGUubG9nKFwiT2N1cnJpbyB1bmEgZXhjZXBjaW9uXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhleGNlcGNpb24pO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBlbnZpYXJEYXRvID0gYXN5bmMgKFxuICAgIGRhdG9BR3VhcmRhcjogYW55W10sXG4gICAgcHVlcnRvU2VyaWFsOiBTZXJpYWxQb3J0LFxuICAgIGNvbGFPcGVyYWNpb25lczogYW55W10sXG4gICAgc2lndWllbnRlRXZlbnRvOiBzdHJpbmcsXG4pID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBldmVudG8gPSBkYXRvQUd1YXJkYXJbMF07XG4gICAgICAgIGNvbnN0IGRhdG8gPSBkYXRvQUd1YXJkYXJbMV07XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJlbnZpYW5kbyBkYXRvOiBcIiArIGRhdG8udG9TdHJpbmcoKSk7XG5cbiAgICAgICAgcHVlcnRvU2VyaWFsLndyaXRlKFxuICAgICAgICAgICAgZXZlbnRvLFxuICAgICAgICAgICAgJ2FzY2lpJ1xuICAgICAgICApO1xuICAgICAgICBwdWVydG9TZXJpYWwud3JpdGUoXG4gICAgICAgICAgICBkYXRvLFxuICAgICAgICAgICAgJ2FzY2lpJ1xuICAgICAgICApO1xuICAgICAgICBwdWVydG9TZXJpYWwuZHJhaW4oKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb2xhT3BlcmFjaW9uZXMucHVzaChzaWd1aWVudGVFdmVudG8pO1xuICAgICAgICB9KTtcblxuICAgIH0gY2F0Y2goZXhjZXBjaW9uKSB7XG4gICAgICAgIC8vIEltcHJpbWltb3MgbGEgZXhjZXBjaW9uLlxuICAgICAgICBjb25zb2xlLmxvZyhcIk9jdXJyaW8gdW5hIGV4Y2VwY2lvblwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZXhjZXBjaW9uKTtcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgdGVybWluYXJHdWFyZGFkbyA9IChcbiAgICBwdWVydG9TZXJpYWw6IFNlcmlhbFBvcnQsXG4gICAgZXZlbnRvOiBzdHJpbmdcbikgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRW52aW8gZGUgZGF0b3MgZmluYWxpemFkb1wiKTtcblxuICAgICAgICBwdWVydG9TZXJpYWwud3JpdGUoXG4gICAgICAgICAgICBldmVudG8sXG4gICAgICAgICAgICAnYXNjaWknXG4gICAgICAgICk7XG5cbiAgICAgICAgcHVlcnRvU2VyaWFsLmVuZCgpO1xuICAgICAgICBwdWVydG9TZXJpYWwuZHJhaW4oKTtcbiAgICB9IGNhdGNoKGV4Y2VwY2lvbikge1xuICAgICAgICAvLyBJbXByaW1pbW9zIGxhIGV4Y2VwY2lvbi5cbiAgICAgICAgY29uc29sZS5sb2coXCJPY3VycmlvIHVuYSBleGNlcGNpb25cIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGV4Y2VwY2lvbik7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgY29uZXhpb25DZXJyYWRhID0gKFxuICAgIHB1ZXJ0b1NlcmlhbDogU2VyaWFsUG9ydCxcbikgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29uZXhpb24gY2VycmFkYVwiKTtcbiAgICAgICAgcHVlcnRvU2VyaWFsLmNsb3NlKCk7XG4gICAgICAgIHB1ZXJ0b1NlcmlhbCA9IG51bGw7XG5cbiAgICB9IGNhdGNoIChleGNlcGNpb24pIHtcbiAgICAgICAgLy8gSW1wcmltaW1vcyBsYSBleGNlcGNpb24uXG4gICAgICAgIGNvbnNvbGUubG9nKFwiT2N1cnJpbyB1bmEgZXhjZXBjaW9uXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhleGNlcGNpb24pO1xuICAgIH1cbn07XG4iLCIvLyBMaWJyZXJpYXMgZGUgZWxlY3Ryb24uXG5pbXBvcnQgeyBJcGNNYWluRXZlbnQgfSBmcm9tIFwiZWxlY3Ryb25cIjtcblxuLy8gTWFuZWpvIGRlIHNlcmlhbCBwb3J0LlxuaW1wb3J0IHtcbiAgICBSZWFkbGluZVBhcnNlcixcbiAgICBTZXJpYWxQb3J0LFxufSBmcm9tICdzZXJpYWxwb3J0JztcblxuLy8gQ29udHJvbGFkb3JlcyBkZSBldmVudG9zIHNlcmlhbC5cbmltcG9ydCB7XG4gICAgYWxSZWNpdmlyRGF0b3MsXG4gICAgY29uZXhpb25BYmllcnRhLFxuICAgIGNvbmV4aW9uQ2VycmFkYSxcbiAgICBlbnZpYXJEYXRvLFxuICAgIGluaWNpYXJFbnZpb0RhdG9zLFxuICAgIHRlcm1pbmFyR3VhcmRhZG9cbn0gZnJvbSBcIi4vY29udHJvbGFkb3JFdmVudG9zU2VyaWFsXCI7XG5cbi8vIEVudW1lcmFkb3Jlcy5cbmltcG9ydCB7XG4gICAgRVZFTlRPU19HVUFSREFET19DT05GSUdVUkFDSU9OX0NIRUNBRE9SLFxuICAgIEVWRU5UT1NfR1VBUkRBRE9fQ09ORklHVVJBQ0lPTl9DT05UUk9MQURPUixcbiAgICBFVkVOVE9TX0dVQVJEQURPX0NPTkZJR1VSQUNJT05fQ09OVFJPTEFET1JfUFVFUlRBLFxuICAgIEVWRU5UT1NfR1VBUkRBRE9fQ09ORklHVVJBQ0lPTl9MRUNUT1IsXG4gICAgRVZFTlRPU19HVUFSREFET19EQVRPU19UQVJKRVRBXG59IGZyb20gXCIuLi9lbnVtc1wiO1xuXG4vLyBNb2RlbG9zLlxuaW1wb3J0IHtcbiAgICBFbXBsZWFkb1xufSBmcm9tIFwiLi4vLi4vcmVuZGVyZXIvdXRpbHMvQVBJL21vZGVsb3MvZW1wbGVhZG9cIjtcblxuaW1wb3J0IHtcbiAgICBSb2xcbn0gZnJvbSBcIi4uLy4uL3JlbmRlcmVyL3V0aWxzL0FQSS9tb2RlbG9zL3JvbFwiO1xuXG5pbXBvcnQge1xuICAgIFBlcm1pc29cbn0gZnJvbSBcIi4uLy4uL3JlbmRlcmVyL3V0aWxzL0FQSS9tb2RlbG9zL3Blcm1pc29cIjtcblxuLy8gSW5zdGFuY2lhIGRlbCBwdWVydG8gc2VyaWFsLlxubGV0IHB1ZXJ0b1NlcmlhbDogU2VyaWFsUG9ydCA9IG51bGw7XG5cbi8vIENvbGEgZGUgb3BlcmFjaW9uZXMgc2VyaWFsLlxubGV0IGNvbGFPcGVyYWNpb25lcyA9IFtdO1xubGV0IGNvbGFEYXRvcyA9IFtdO1xuXG4vLyBSZWdpc3RyYSB1biByZXBvcnRlIGRlIGFjdGl2aWRhZCBmaW5hbGl6YWRhLlxuZXhwb3J0IGNvbnN0IGV4cGxvcmFyUHVlcnRvcyA9IGFzeW5jIChcbiAgICBldmVudG86IElwY01haW5FdmVudCxcbiAgICBtb3N0cmFyVG9kb3NMb3NQdWVydG9zOiBib29sZWFuXG4pID0+IHtcbiAgICB0cnkge1xuICAgICAgICAvLyBMaXN0YW1vcyBsb3MgcHVlcnRvcyBzZXJpYWxlcy5cbiAgICAgICAgY29uc3QgcHVlcnRvcyA9IGF3YWl0IFNlcmlhbFBvcnQubGlzdCgpO1xuXG4gICAgICAgIC8vIExpc3RhIGRlIHB1ZXJ0b3MgZmlsdHJhZG9zLlxuICAgICAgICBjb25zdCBwdWVydG9zRmlsdHJhZG9zID0gW107XG5cbiAgICAgICAgLy8gU2kgc2UgcGFzYSBlbCBwYXJhbWV0cm8gZGUgZmlsdHJhZG8gZGUgcHVlcnRvcy5cbiAgICAgICAgaWYoIW1vc3RyYXJUb2Rvc0xvc1B1ZXJ0b3MpIHtcbiAgICAgICAgICAgIC8vIEZpbHRyYW1vcyBsb3MgcHVlcnRvcy5cbiAgICAgICAgICAgIHB1ZXJ0b3MubWFwKChwdWVydG8pID0+IHtcbiAgICAgICAgICAgICAgICBpZighcHVlcnRvLnBhdGguaW5jbHVkZXMoJ3R0eVMnKSkge1xuICAgICAgICAgICAgICAgICAgICBwdWVydG9zRmlsdHJhZG9zLnB1c2gocHVlcnRvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gUmV0b3JuYW1vcyBsb3MgcHVlcnRvcyBmaWx0cmFkb3NcbiAgICAgICAgICAgIGV2ZW50by5yZXBseSgncHVlcnRvc19zZXJpYWxlc19lbmNvbnRyYWRvcycsIHB1ZXJ0b3NGaWx0cmFkb3MpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBSZXRvcm5hbW9zIGxvcyBwdWVydG9zIGVuY29udHJhZG9zLlxuICAgICAgICAgICAgZXZlbnRvLnJlcGx5KCdwdWVydG9zX3NlcmlhbGVzX2VuY29udHJhZG9zJywgcHVlcnRvcyk7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoKGV4Y2VwY2lvbikge1xuICAgICAgICAvLyBJbXByaW1pbW9zIGxhIGV4Y2VwY2lvbi5cbiAgICAgICAgY29uc29sZS5sb2coXCJPY3VycmlvIHVuYSBleGNlcGNpb25cIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGV4Y2VwY2lvbik7XG5cbiAgICAgICAgLy8gQWwgb2N1cnJpciB1bmEgZXhjZXBjaW9uIHJldG9ybmFtb3MgbnVsby5cbiAgICAgICAgZXZlbnRvLnJlcGx5KCdwdWVydG9zX3NlcmlhbGVzX2VuY29udHJhZG9zJywgbnVsbCk7XG4gICAgfVxufTtcblxuLy8gQ29uZWN0YW1vcyBlbCBkaXNwb3NpdGl2byBxdWVtYWRvciB5IGd1YXJkYW1vcyBsb3MgZGF0b3MgZW5cbi8vIGxhIHRhcmpldGEuXG5leHBvcnQgY29uc3QgZ3VhcmRhckRhdG9zVGFyamV0YSA9IGFzeW5jIChcbiAgICBldmVudG86IElwY01haW5FdmVudCxcbiAgICBhcmdzOiB7XG4gICAgICAgIHJlZ2lzdHJvOiBFbXBsZWFkbyxcbiAgICAgICAgcmVnaXN0cm9zVmluY3VsYWRvczoge1xuICAgICAgICAgICAgcm9sOiBSb2wsXG4gICAgICAgICAgICBwZXJtaXNvOiBQZXJtaXNvXG4gICAgICAgIH0sXG4gICAgICAgIGRhdG9zRGlzcG9zaXRpdm86IHtcbiAgICAgICAgICAgIHBhdGg6IHN0cmluZyxcbiAgICAgICAgICAgIGJhdWRSYXRlOiBudW1iZXJcbiAgICAgICAgfVxuICAgIH1cbikgPT4ge1xuICAgIGNvbnNvbGUubG9nKGFyZ3MpO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgLy8gU2kgZWwgcHVlcnRvIHNlcmlhbCBlc3RhIGluaWNpYWRvLlxuICAgICAgICBpZihwdWVydG9TZXJpYWwpIHtcbiAgICAgICAgICAgIC8vIExvIHRlcm1pbmFtb3MuXG4gICAgICAgICAgICBwdWVydG9TZXJpYWwuY2xvc2UoKTtcblxuICAgICAgICAgICAgLy8gVmFjaWFtb3MgbGEgY29sYSBkZSBvcGVyYWNpb25lcy5cbiAgICAgICAgICAgIGNvbGFPcGVyYWNpb25lcyA9IFtdO1xuXG4gICAgICAgICAgICAvLyBWYWNpYW1vcyBsYSBjb2xhIGRlIGRhdG9zLlxuICAgICAgICAgICAgY29sYURhdG9zID0gW107XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZXNjb21wb25lbW9zIGxvcyBkYXRvcyBxdWUgc2UgZ3VhcmRhcmFuIGVuIGxhIHRhcmpldGEuXG4gICAgICAgIGNvbGFEYXRvcyA9IFtbXG4gICAgICAgICAgICAgICAgRVZFTlRPU19HVUFSREFET19EQVRPU19UQVJKRVRBLklEX0VOVklBRE8sXG4gICAgICAgICAgICAgICAgYXJncy5yZWdpc3Ryby5pZC50b1N0cmluZygpXG4gICAgICAgICAgICBdLCBbXG4gICAgICAgICAgICAgICAgRVZFTlRPU19HVUFSREFET19EQVRPU19UQVJKRVRBLkFVVE9SSVpBQ0lPTl9FTlZJQURPLFxuICAgICAgICAgICAgICAgIGFyZ3MucmVnaXN0cm9zVmluY3VsYWRvcy5wZXJtaXNvLmF1dG9yaXphY2lvbi50b1N0cmluZygpXG4gICAgICAgICAgICBdLCBbXG4gICAgICAgICAgICAgICAgRVZFTlRPU19HVUFSREFET19EQVRPU19UQVJKRVRBLlJPTF9FTlZJQURPLFxuICAgICAgICAgICAgICAgIGFyZ3MucmVnaXN0cm9zVmluY3VsYWRvcy5yb2wuYml0Um9sLnRvU3RyaW5nKClcbiAgICAgICAgXV1cblxuICAgICAgICAvLyBJbmljYWxpYW1vcyBlbCBwdWVydG8gc2VyaWFsLlxuICAgICAgICBwdWVydG9TZXJpYWwgPSBuZXcgU2VyaWFsUG9ydChhcmdzLmRhdG9zRGlzcG9zaXRpdm8sIChjYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NvbmV4acOzbiBhIHB1ZXJ0byBlc3RhYmxlY2lkbycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coY2FsbGJhY2spO1xuICAgICAgICAgICAgcHVlcnRvU2VyaWFsLnNldCh7XG4gICAgICAgICAgICAgICAgcnRzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBkdHI6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSW5pY2lhbGl6YW1vcyB1biBwYXJzZXIgcGFyYSBtYW5kYXIgeSBsZWVyIGRhdG9zIGRlbCBzZXJpYWwuXG4gICAgICAgIGNvbnN0IHBhcnNlciA9IHB1ZXJ0b1NlcmlhbC5waXBlKG5ldyBSZWFkbGluZVBhcnNlcih7XG4gICAgICAgICAgICBkZWxpbWl0ZXI6ICdcXHJcXG4nXG4gICAgICAgIH0pKTtcblxuICAgICAgICAvLyBFc3BlcmFtb3MgcG9yIGVsIGV2ZW50byBkZWwgcHVlcnRvIGFiaWVydG8uXG4gICAgICAgIHB1ZXJ0b1NlcmlhbC5vbihcIm9wZW5cIiwgY29uZXhpb25BYmllcnRhKTtcblxuICAgICAgICAvLyBTaSByZWNpdmltb3MgZGF0b3MsIGxvcyBtb3N0cmFtb3MuXG4gICAgICAgIHBhcnNlci5vbignZGF0YScsIChyZXNwdWVzdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcHVlc3RhKTtcbiAgICAgICAgICAgIGFsUmVjaXZpckRhdG9zKFxuICAgICAgICAgICAgICAgIHJlc3B1ZXN0YSxcbiAgICAgICAgICAgICAgICBwYXJzZXIsXG4gICAgICAgICAgICAgICAgY29sYU9wZXJhY2lvbmVzLFxuICAgICAgICAgICAgICAgIHB1ZXJ0b1NlcmlhbFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcGFyc2VyLm9uY2UoJ2luaWNpYXJfZW52aW9fZGF0b3MnLCAoKSA9PiB7XG4gICAgICAgICAgICBpbmljaWFyRW52aW9EYXRvcyhcbiAgICAgICAgICAgICAgICBwdWVydG9TZXJpYWwsXG4gICAgICAgICAgICAgICAgY29sYU9wZXJhY2lvbmVzLFxuICAgICAgICAgICAgICAgIEVWRU5UT1NfR1VBUkRBRE9fREFUT1NfVEFSSkVUQS5JTklDSUFSX0dVQVJEQURPX0RBVE9TXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBwYXJzZXIub24oJ2Vudmlhcl9kYXRvcycsICgpID0+IHtcbiAgICAgICAgICAgIGVudmlhckRhdG8oXG4gICAgICAgICAgICAgICAgY29sYURhdG9zLnNoaWZ0KCksXG4gICAgICAgICAgICAgICAgcHVlcnRvU2VyaWFsLFxuICAgICAgICAgICAgICAgIGNvbGFPcGVyYWNpb25lcyxcbiAgICAgICAgICAgICAgICBjb2xhRGF0b3MubGVuZ3RoID4gMCA/IFwiZW52aWFyX2RhdG9zXCIgOiBcInRlcm1pbmFyX2VudmlvX2RhdG9zXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBhcnNlci5vbmNlKCd0ZXJtaW5hcl9lbnZpb19kYXRvcycsICgpID0+IHtcbiAgICAgICAgICAgIHRlcm1pbmFyR3VhcmRhZG8oXG4gICAgICAgICAgICAgICAgcHVlcnRvU2VyaWFsLFxuICAgICAgICAgICAgICAgIEVWRU5UT1NfR1VBUkRBRE9fREFUT1NfVEFSSkVUQS5URVJNSU5BUl9HVUFSREFET19EQVRPU1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcGFyc2VyLm9uKFwiY2xvc2VcIiwgY29uZXhpb25DZXJyYWRhKTtcblxuICAgIH0gY2F0Y2goZXhjZXBjaW9uKSB7XG4gICAgICAgIC8vIEltcHJpbWltb3MgbGEgZXhjZXBjaW9uLlxuICAgICAgICBjb25zb2xlLmxvZyhcIk9jdXJyaW8gdW5hIGV4Y2VwY2lvblwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZXhjZXBjaW9uKTtcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ3VhcmRhckNvbmZpZ3VyYWNpb25EaXNwb3NpdGl2b0xlY3RvciA9IGFzeW5jIChcbiAgICBldmVudG86IElwY01haW5FdmVudCxcbiAgICBhcmdzOiB7XG4gICAgICAgIGNvbmZpZ3VyYWNpb246IHtcbiAgICAgICAgICAgIGJpdFBlcm1pc286IHN0cmluZyxcbiAgICAgICAgICAgIHNzaWQ6IHN0cmluZyxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBzdHJpbmcsXG4gICAgICAgICAgICBwdWVydG9BcGk6IHN0cmluZyxcbiAgICAgICAgICAgIGlwQXBpOiBzdHJpbmcsXG4gICAgICAgICAgICB2ZXJzaW9uQXBpOiBzdHJpbmcsXG4gICAgICAgICAgICBhcGlLZXk6IHN0cmluZyxcbiAgICAgICAgICAgIGFjY2lvbk9wY2lvbmFsOiBzdHJpbmdcbiAgICAgICAgfSxcbiAgICAgICAgZGF0b3NEaXNwb3NpdGl2bzoge1xuICAgICAgICAgICAgcGF0aDogc3RyaW5nLFxuICAgICAgICAgICAgYmF1ZFJhdGU6IG51bWJlclxuICAgICAgICB9XG4gICAgfVxuKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gU2kgZWwgcHVlcnRvIHNlcmlhbCBlc3RhIGluaWNpYWRvLlxuICAgICAgICBpZihwdWVydG9TZXJpYWwpIHtcbiAgICAgICAgICAgIGlmKHB1ZXJ0b1NlcmlhbC5pc09wZW4pIHtcbiAgICAgICAgICAgICAgICAvLyBMbyB0ZXJtaW5hbW9zLlxuICAgICAgICAgICAgICAgIHB1ZXJ0b1NlcmlhbC5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVmFjaWFtb3MgbGEgY29sYSBkZSBvcGVyYWNpb25lcy5cbiAgICAgICAgY29sYU9wZXJhY2lvbmVzID0gW107XG5cbiAgICAgICAgLy8gVmFjaWFtb3MgbGEgY29sYSBkZSBkYXRvcy5cbiAgICAgICAgY29sYURhdG9zID0gW107XG5cbiAgICAgICAgY29uc29sZS5jbGVhcigpO1xuXG4gICAgICAgIC8vIERlc2NvbXBvbmVtb3MgbG9zIGRhdG9zIHF1ZSBzZSBndWFyZGFyYW4gZW4gbGEgdGFyamV0YS5cbiAgICAgICAgY29sYURhdG9zID0gW1tcbiAgICAgICAgICAgIEVWRU5UT1NfR1VBUkRBRE9fQ09ORklHVVJBQ0lPTl9MRUNUT1IuQ0FNQklBUl9QRVJNSVNPX1BFRElETyxcbiAgICAgICAgICAgIGFyZ3MuY29uZmlndXJhY2lvbi5iaXRQZXJtaXNvLnRvU3RyaW5nKClcbiAgICAgICAgXSwgW1xuICAgICAgICAgICAgRVZFTlRPU19HVUFSREFET19DT05GSUdVUkFDSU9OX0xFQ1RPUi5DQU1CSUFSX1NTSUQsXG4gICAgICAgICAgICBhcmdzLmNvbmZpZ3VyYWNpb24uc3NpZC50b1N0cmluZygpXG4gICAgICAgIF0sIFtcbiAgICAgICAgICAgIEVWRU5UT1NfR1VBUkRBRE9fQ09ORklHVVJBQ0lPTl9MRUNUT1IuQ0FNQklBUl9QQVNTV09SRCxcbiAgICAgICAgICAgIGFyZ3MuY29uZmlndXJhY2lvbi5wYXNzd29yZC50b1N0cmluZygpXG4gICAgICAgIF0sIFtcbiAgICAgICAgICAgIEVWRU5UT1NfR1VBUkRBRE9fQ09ORklHVVJBQ0lPTl9MRUNUT1IuQ0FNQklBUl9QVUVSVE9fQVBJLFxuICAgICAgICAgICAgYXJncy5jb25maWd1cmFjaW9uLnB1ZXJ0b0FwaS50b1N0cmluZygpXG4gICAgICAgIF0sIFtcbiAgICAgICAgICAgIEVWRU5UT1NfR1VBUkRBRE9fQ09ORklHVVJBQ0lPTl9MRUNUT1IuQ0FNQklBUl9JUF9BUEksXG4gICAgICAgICAgICBhcmdzLmNvbmZpZ3VyYWNpb24uaXBBcGkudG9TdHJpbmcoKVxuICAgICAgICBdLCBbXG4gICAgICAgICAgICBFVkVOVE9TX0dVQVJEQURPX0NPTkZJR1VSQUNJT05fTEVDVE9SLkNBTUJJQVJfVkVSU0lPTl9BUEksXG4gICAgICAgICAgICBhcmdzLmNvbmZpZ3VyYWNpb24udmVyc2lvbkFwaS50b1N0cmluZygpXG4gICAgICAgIF0sIFtcbiAgICAgICAgICAgIEVWRU5UT1NfR1VBUkRBRE9fQ09ORklHVVJBQ0lPTl9MRUNUT1IuQ0FNQklBUl9BQ0NFU1NfVE9LRU4sXG4gICAgICAgICAgICBhcmdzLmNvbmZpZ3VyYWNpb24uYXBpS2V5LnRvU3RyaW5nKClcbiAgICAgICAgXSwgW1xuICAgICAgICAgICAgRVZFTlRPU19HVUFSREFET19DT05GSUdVUkFDSU9OX0xFQ1RPUi5DQU1CSUFSX0FDQ0lPTl9PUENJT05BTCxcbiAgICAgICAgICAgIGFyZ3MuY29uZmlndXJhY2lvbi5hY2Npb25PcGNpb25hbC50b1N0cmluZygpXG4gICAgICAgIF1dO1xuXG4gICAgICAgIC8vIEluaWNhbGl6YW1vcyBlbCBwdWVydG8gc2VyaWFsLlxuICAgICAgICBwdWVydG9TZXJpYWwgPSBuZXcgU2VyaWFsUG9ydChhcmdzLmRhdG9zRGlzcG9zaXRpdm8sIChjYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NvbmV4acOzbiBhIHB1ZXJ0byBlc3RhYmxlY2lkbycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coY2FsbGJhY2spO1xuICAgICAgICAgICAgcHVlcnRvU2VyaWFsLnNldCh7XG4gICAgICAgICAgICAgICAgcnRzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBkdHI6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSW5pY2lhbGl6YW1vcyB1biBwYXJzZXIgcGFyYSBtYW5kYXIgeSBsZWVyIGRhdG9zIGRlbCBzZXJpYWwuXG4gICAgICAgIGNvbnN0IHBhcnNlciA9IHB1ZXJ0b1NlcmlhbC5waXBlKG5ldyBSZWFkbGluZVBhcnNlcih7XG4gICAgICAgICAgICBkZWxpbWl0ZXI6ICdcXHJcXG4nXG4gICAgICAgIH0pKTtcblxuICAgICAgICAvLyBFc3BlcmFtb3MgcG9yIGVsIGV2ZW50byBkZWwgcHVlcnRvIGFiaWVydG8uXG4gICAgICAgIHB1ZXJ0b1NlcmlhbC5vbihcIm9wZW5cIiwgKCkgPT4ge1xuICAgICAgICAgICAgY29uZXhpb25BYmllcnRhKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFNpIHJlY2l2aW1vcyBkYXRvcywgbG9zIG1vc3RyYW1vcy5cbiAgICAgICAgcGFyc2VyLm9uKFwiZGF0YVwiLCAocmVzcHVlc3RhOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3B1ZXN0YSk7XG4gICAgICAgICAgICBhbFJlY2l2aXJEYXRvcyhcbiAgICAgICAgICAgICAgICByZXNwdWVzdGEsXG4gICAgICAgICAgICAgICAgcGFyc2VyLFxuICAgICAgICAgICAgICAgIGNvbGFPcGVyYWNpb25lcyxcbiAgICAgICAgICAgICAgICBwdWVydG9TZXJpYWxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBhcnNlci5vbmNlKFwiaW5pY2lhcl9lbnZpb19kYXRvc1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBpbmljaWFyRW52aW9EYXRvcyhcbiAgICAgICAgICAgICAgICBwdWVydG9TZXJpYWwsXG4gICAgICAgICAgICAgICAgY29sYU9wZXJhY2lvbmVzLFxuICAgICAgICAgICAgICAgIEVWRU5UT1NfR1VBUkRBRE9fQ09ORklHVVJBQ0lPTl9MRUNUT1IuSU5JQ0lBUl9DT05GSUdVUkFDSU9OXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBwYXJzZXIub24oXCJlbnZpYXJfZGF0b3NcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZW52aWFyRGF0byhcbiAgICAgICAgICAgICAgICBjb2xhRGF0b3Muc2hpZnQoKSxcbiAgICAgICAgICAgICAgICBwdWVydG9TZXJpYWwsXG4gICAgICAgICAgICAgICAgY29sYU9wZXJhY2lvbmVzLFxuICAgICAgICAgICAgICAgIGNvbGFEYXRvcy5sZW5ndGggPiAwID8gXCJlbnZpYXJfZGF0b3NcIiA6IFwidGVybWluYXJfZW52aW9fZGF0b3NcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcGFyc2VyLm9uY2UoXCJ0ZXJtaW5hcl9lbnZpb19kYXRvc1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB0ZXJtaW5hckd1YXJkYWRvKFxuICAgICAgICAgICAgICAgIHB1ZXJ0b1NlcmlhbCxcbiAgICAgICAgICAgICAgICBFVkVOVE9TX0dVQVJEQURPX0NPTkZJR1VSQUNJT05fTEVDVE9SLkZJTkFMSVpBUl9DT05GSUdVUkFDSU9cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBhcnNlci5vbihcImNsb3NlXCIsIGNvbmV4aW9uQ2VycmFkYSk7XG4gICAgfSBjYXRjaChleGNlcGNpb24pIHtcbiAgICAgICAgLy8gSW1wcmltaW1vcyBsYSBleGNlcGNpb24uXG4gICAgICAgIGNvbnNvbGUubG9nKFwiT2N1cnJpbyB1bmEgZXhjZXBjaW9uXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhleGNlcGNpb24pO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBndWFyZGFyQ29uZmlndXJhY2lvbkRpc3Bvc2l0aXZvQ2hlY2Fkb3IgPSBhc3luYyAoXG4gICAgZXZlbnRvOiBJcGNNYWluRXZlbnQsXG4gICAgYXJnczoge1xuICAgICAgICBjb25maWd1cmFjaW9uOiB7XG4gICAgICAgICAgICBzc2lkOiBzdHJpbmcsXG4gICAgICAgICAgICBwYXNzd29yZDogc3RyaW5nLFxuICAgICAgICAgICAgcHVlcnRvQXBpOiBzdHJpbmcsXG4gICAgICAgICAgICBpcEFwaTogc3RyaW5nLFxuICAgICAgICAgICAgdmVyc2lvbkFwaTogc3RyaW5nLFxuICAgICAgICAgICAgYXBpS2V5OiBzdHJpbmdcbiAgICAgICAgfSxcbiAgICAgICAgZGF0b3NEaXNwb3NpdGl2bzoge1xuICAgICAgICAgICAgcGF0aDogc3RyaW5nLFxuICAgICAgICAgICAgYmF1ZFJhdGU6IG51bWJlclxuICAgICAgICB9XG4gICAgfVxuKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gU2kgZWwgcHVlcnRvIHNlcmlhbCBlc3RhIGluaWNpYWRvLlxuICAgICAgICBpZihwdWVydG9TZXJpYWwpIHtcbiAgICAgICAgICAgIGlmKHB1ZXJ0b1NlcmlhbC5pc09wZW4pIHtcbiAgICAgICAgICAgICAgICAvLyBMbyB0ZXJtaW5hbW9zLlxuICAgICAgICAgICAgICAgIHB1ZXJ0b1NlcmlhbC5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVmFjaWFtb3MgbGEgY29sYSBkZSBvcGVyYWNpb25lcy5cbiAgICAgICAgY29sYU9wZXJhY2lvbmVzID0gW107XG5cbiAgICAgICAgLy8gVmFjaWFtb3MgbGEgY29sYSBkZSBkYXRvcy5cbiAgICAgICAgY29sYURhdG9zID0gW107XG5cbiAgICAgICAgLy8gRGVzY29tcG9uZW1vcyBsb3MgZGF0b3MgcXVlIHNlIGd1YXJkYXJhbiBlbiBsYSB0YXJqZXRhLlxuICAgICAgICBjb2xhRGF0b3MgPSBbW1xuICAgICAgICAgICAgRVZFTlRPU19HVUFSREFET19DT05GSUdVUkFDSU9OX0NIRUNBRE9SLkNBTUJJQVJfU1NJRCxcbiAgICAgICAgICAgIGFyZ3MuY29uZmlndXJhY2lvbi5zc2lkLnRvU3RyaW5nKClcbiAgICAgICAgXSwgW1xuICAgICAgICAgICAgRVZFTlRPU19HVUFSREFET19DT05GSUdVUkFDSU9OX0NIRUNBRE9SLkNBTUJJQVJfUEFTU1dPUkQsXG4gICAgICAgICAgICBhcmdzLmNvbmZpZ3VyYWNpb24ucGFzc3dvcmQudG9TdHJpbmcoKVxuICAgICAgICBdLCBbXG4gICAgICAgICAgICBFVkVOVE9TX0dVQVJEQURPX0NPTkZJR1VSQUNJT05fQ0hFQ0FET1IuQ0FNQklBUl9QVUVSVE9fQVBJLFxuICAgICAgICAgICAgYXJncy5jb25maWd1cmFjaW9uLnB1ZXJ0b0FwaS50b1N0cmluZygpXG4gICAgICAgIF0sIFtcbiAgICAgICAgICAgIEVWRU5UT1NfR1VBUkRBRE9fQ09ORklHVVJBQ0lPTl9DSEVDQURPUi5DQU1CSUFSX0lQX0FQSSxcbiAgICAgICAgICAgIGFyZ3MuY29uZmlndXJhY2lvbi5pcEFwaS50b1N0cmluZygpXG4gICAgICAgIF0sIFtcbiAgICAgICAgICAgIEVWRU5UT1NfR1VBUkRBRE9fQ09ORklHVVJBQ0lPTl9DSEVDQURPUi5DQU1CSUFSX1ZFUlNJT05fQVBJLFxuICAgICAgICAgICAgYXJncy5jb25maWd1cmFjaW9uLnZlcnNpb25BcGkudG9TdHJpbmcoKVxuICAgICAgICBdLCBbXG4gICAgICAgICAgICBFVkVOVE9TX0dVQVJEQURPX0NPTkZJR1VSQUNJT05fQ0hFQ0FET1IuQ0FNQklBUl9BQ0NFU1NfVE9LRU4sXG4gICAgICAgICAgICBhcmdzLmNvbmZpZ3VyYWNpb24uYXBpS2V5LnRvU3RyaW5nKClcbiAgICAgICAgXV07XG5cbiAgICAgICAgLy8gSW5pY2FsaWFtb3MgZWwgcHVlcnRvIHNlcmlhbC5cbiAgICAgICAgcHVlcnRvU2VyaWFsID0gbmV3IFNlcmlhbFBvcnQoYXJncy5kYXRvc0Rpc3Bvc2l0aXZvLCAoY2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb25leGnDs24gYSBwdWVydG8gZXN0YWJsZWNpZG8nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIHB1ZXJ0b1NlcmlhbC5zZXQoe1xuICAgICAgICAgICAgICAgIHJ0czogZmFsc2UsXG4gICAgICAgICAgICAgICAgZHRyOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEluaWNpYWxpemFtb3MgdW4gcGFyc2VyIHBhcmEgbWFuZGFyIHkgbGVlciBkYXRvcyBkZWwgc2VyaWFsLlxuICAgICAgICBjb25zdCBwYXJzZXIgPSBwdWVydG9TZXJpYWwucGlwZShuZXcgUmVhZGxpbmVQYXJzZXIoe1xuICAgICAgICAgICAgZGVsaW1pdGVyOiAnXFxyXFxuJ1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgLy8gRXNwZXJhbW9zIHBvciBlbCBldmVudG8gZGVsIHB1ZXJ0byBhYmllcnRvLlxuICAgICAgICBwdWVydG9TZXJpYWwub24oXCJvcGVuXCIsIGNvbmV4aW9uQWJpZXJ0YSk7XG5cbiAgICAgICAgLy8gU2kgcmVjaXZpbW9zIGRhdG9zLCBsb3MgbW9zdHJhbW9zLlxuICAgICAgICBwYXJzZXIub24oJ2RhdGEnLCAocmVzcHVlc3RhOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3B1ZXN0YSk7XG4gICAgICAgICAgICBhbFJlY2l2aXJEYXRvcyhcbiAgICAgICAgICAgICAgICByZXNwdWVzdGEsXG4gICAgICAgICAgICAgICAgcGFyc2VyLFxuICAgICAgICAgICAgICAgIGNvbGFPcGVyYWNpb25lcyxcbiAgICAgICAgICAgICAgICBwdWVydG9TZXJpYWxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBhcnNlci5vbmNlKCdpbmljaWFyX2VudmlvX2RhdG9zJywgKCkgPT4ge1xuICAgICAgICAgICAgaW5pY2lhckVudmlvRGF0b3MoXG4gICAgICAgICAgICAgICAgcHVlcnRvU2VyaWFsLFxuICAgICAgICAgICAgICAgIGNvbGFPcGVyYWNpb25lcyxcbiAgICAgICAgICAgICAgICBFVkVOVE9TX0dVQVJEQURPX0NPTkZJR1VSQUNJT05fQ0hFQ0FET1IuSU5JQ0lBUl9DT05GSUdVUkFDSU9OXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBwYXJzZXIub24oJ2Vudmlhcl9kYXRvcycsICgpID0+IHtcbiAgICAgICAgICAgIGVudmlhckRhdG8oXG4gICAgICAgICAgICAgICAgY29sYURhdG9zLnNoaWZ0KCksXG4gICAgICAgICAgICAgICAgcHVlcnRvU2VyaWFsLFxuICAgICAgICAgICAgICAgIGNvbGFPcGVyYWNpb25lcyxcbiAgICAgICAgICAgICAgICBjb2xhRGF0b3MubGVuZ3RoID4gMCA/IFwiZW52aWFyX2RhdG9zXCIgOiBcInRlcm1pbmFyX2VudmlvX2RhdG9zXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBhcnNlci5vbmNlKCd0ZXJtaW5hcl9lbnZpb19kYXRvcycsICgpID0+IHtcbiAgICAgICAgICAgIHRlcm1pbmFyR3VhcmRhZG8oXG4gICAgICAgICAgICAgICAgcHVlcnRvU2VyaWFsLFxuICAgICAgICAgICAgICAgIEVWRU5UT1NfR1VBUkRBRE9fQ09ORklHVVJBQ0lPTl9DSEVDQURPUi5GSU5BTElaQVJfQ09ORklHVVJBQ0lPXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBwYXJzZXIub24oXCJjbG9zZVwiLCBjb25leGlvbkNlcnJhZGEpO1xuXG4gICAgfSBjYXRjaChleGNlcGNpb24pIHtcbiAgICAgICAgLy8gSW1wcmltaW1vcyBsYSBleGNlcGNpb24uXG4gICAgICAgIGNvbnNvbGUubG9nKFwiT2N1cnJpbyB1bmEgZXhjZXBjaW9uXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhleGNlcGNpb24pO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBndWFyZGFyQ29uZmlndXJhY2lvbkRpc3Bvc2l0aXZvQ29udHJvbGFkb3IgPSBhc3luYyAoXG4gICAgZXZlbnRvOiBJcGNNYWluRXZlbnQsXG4gICAgYXJnczoge1xuICAgICAgICBjb25maWd1cmFjaW9uOiB7XG4gICAgICAgICAgICBiaXRSb2w6IHN0cmluZyxcbiAgICAgICAgICAgIHNzaWQ6IHN0cmluZyxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBzdHJpbmcsXG4gICAgICAgICAgICBwdWVydG9BcGk6IHN0cmluZyxcbiAgICAgICAgICAgIGlwQXBpOiBzdHJpbmcsXG4gICAgICAgICAgICB2ZXJzaW9uQXBpOiBzdHJpbmcsXG4gICAgICAgICAgICBhcGlLZXk6IHN0cmluZ1xuICAgICAgICB9LFxuICAgICAgICBkYXRvc0Rpc3Bvc2l0aXZvOiB7XG4gICAgICAgICAgICBwYXRoOiBzdHJpbmcsXG4gICAgICAgICAgICBiYXVkUmF0ZTogbnVtYmVyXG4gICAgICAgIH1cbiAgICB9XG4pID0+IHtcbiAgICB0cnkge1xuICAgICAgICAvLyBTaSBlbCBwdWVydG8gc2VyaWFsIGVzdGEgaW5pY2lhZG8uXG4gICAgICAgIGlmKHB1ZXJ0b1NlcmlhbCkge1xuICAgICAgICAgICAgaWYocHVlcnRvU2VyaWFsLmlzT3Blbikge1xuICAgICAgICAgICAgICAgIC8vIExvIHRlcm1pbmFtb3MuXG4gICAgICAgICAgICAgICAgcHVlcnRvU2VyaWFsLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBWYWNpYW1vcyBsYSBjb2xhIGRlIG9wZXJhY2lvbmVzLlxuICAgICAgICBjb2xhT3BlcmFjaW9uZXMgPSBbXTtcblxuICAgICAgICAvLyBWYWNpYW1vcyBsYSBjb2xhIGRlIGRhdG9zLlxuICAgICAgICBjb2xhRGF0b3MgPSBbXTtcblxuICAgICAgICAvLyBEZXNjb21wb25lbW9zIGxvcyBkYXRvcyBxdWUgc2UgZ3VhcmRhcmFuIGVuIGxhIHRhcmpldGEuXG4gICAgICAgIGNvbGFEYXRvcyA9IFtbXG4gICAgICAgICAgICBFVkVOVE9TX0dVQVJEQURPX0NPTkZJR1VSQUNJT05fQ09OVFJPTEFET1IuQ0FNQklBUl9ST0xfUEVESURPLFxuICAgICAgICAgICAgYXJncy5jb25maWd1cmFjaW9uLmJpdFJvbC50b1N0cmluZygpXG4gICAgICAgIF0sIFtcbiAgICAgICAgICAgIEVWRU5UT1NfR1VBUkRBRE9fQ09ORklHVVJBQ0lPTl9DT05UUk9MQURPUi5DQU1CSUFSX1NTSUQsXG4gICAgICAgICAgICBhcmdzLmNvbmZpZ3VyYWNpb24uc3NpZC50b1N0cmluZygpXG4gICAgICAgIF0sIFtcbiAgICAgICAgICAgIEVWRU5UT1NfR1VBUkRBRE9fQ09ORklHVVJBQ0lPTl9DT05UUk9MQURPUi5DQU1CSUFSX1BBU1NXT1JELFxuICAgICAgICAgICAgYXJncy5jb25maWd1cmFjaW9uLnBhc3N3b3JkLnRvU3RyaW5nKClcbiAgICAgICAgXSwgW1xuICAgICAgICAgICAgRVZFTlRPU19HVUFSREFET19DT05GSUdVUkFDSU9OX0NPTlRST0xBRE9SLkNBTUJJQVJfUFVFUlRPX0FQSSxcbiAgICAgICAgICAgIGFyZ3MuY29uZmlndXJhY2lvbi5wdWVydG9BcGkudG9TdHJpbmcoKVxuICAgICAgICBdLCBbXG4gICAgICAgICAgICBFVkVOVE9TX0dVQVJEQURPX0NPTkZJR1VSQUNJT05fQ09OVFJPTEFET1IuQ0FNQklBUl9JUF9BUEksXG4gICAgICAgICAgICBhcmdzLmNvbmZpZ3VyYWNpb24uaXBBcGkudG9TdHJpbmcoKVxuICAgICAgICBdLCBbXG4gICAgICAgICAgICBFVkVOVE9TX0dVQVJEQURPX0NPTkZJR1VSQUNJT05fQ09OVFJPTEFET1IuQ0FNQklBUl9WRVJTSU9OX0FQSSxcbiAgICAgICAgICAgIGFyZ3MuY29uZmlndXJhY2lvbi52ZXJzaW9uQXBpLnRvU3RyaW5nKClcbiAgICAgICAgXSwgW1xuICAgICAgICAgICAgRVZFTlRPU19HVUFSREFET19DT05GSUdVUkFDSU9OX0NPTlRST0xBRE9SLkNBTUJJQVJfQUNDRVNTX1RPS0VOLFxuICAgICAgICAgICAgYXJncy5jb25maWd1cmFjaW9uLmFwaUtleS50b1N0cmluZygpXG4gICAgICAgIF1dO1xuXG4gICAgICAgIC8vIEluaWNhbGlhbW9zIGVsIHB1ZXJ0byBzZXJpYWwuXG4gICAgICAgIHB1ZXJ0b1NlcmlhbCA9IG5ldyBTZXJpYWxQb3J0KGFyZ3MuZGF0b3NEaXNwb3NpdGl2bywgKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ29uZXhpw7NuIGEgcHVlcnRvIGVzdGFibGVjaWRvJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjYWxsYmFjayk7XG4gICAgICAgICAgICBwdWVydG9TZXJpYWwuc2V0KHtcbiAgICAgICAgICAgICAgICBydHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGR0cjogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBJbmljaWFsaXphbW9zIHVuIHBhcnNlciBwYXJhIG1hbmRhciB5IGxlZXIgZGF0b3MgZGVsIHNlcmlhbC5cbiAgICAgICAgY29uc3QgcGFyc2VyID0gcHVlcnRvU2VyaWFsLnBpcGUobmV3IFJlYWRsaW5lUGFyc2VyKHtcbiAgICAgICAgICAgIGRlbGltaXRlcjogJ1xcclxcbidcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIC8vIEVzcGVyYW1vcyBwb3IgZWwgZXZlbnRvIGRlbCBwdWVydG8gYWJpZXJ0by5cbiAgICAgICAgcHVlcnRvU2VyaWFsLm9uKFwib3BlblwiLCBjb25leGlvbkFiaWVydGEpO1xuXG4gICAgICAgIC8vIFNpIHJlY2l2aW1vcyBkYXRvcywgbG9zIG1vc3RyYW1vcy5cbiAgICAgICAgcGFyc2VyLm9uKCdkYXRhJywgKHJlc3B1ZXN0YTogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwdWVzdGEpO1xuICAgICAgICAgICAgYWxSZWNpdmlyRGF0b3MoXG4gICAgICAgICAgICAgICAgcmVzcHVlc3RhLFxuICAgICAgICAgICAgICAgIHBhcnNlcixcbiAgICAgICAgICAgICAgICBjb2xhT3BlcmFjaW9uZXMsXG4gICAgICAgICAgICAgICAgcHVlcnRvU2VyaWFsXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBwYXJzZXIub25jZSgnaW5pY2lhcl9lbnZpb19kYXRvcycsICgpID0+IHtcbiAgICAgICAgICAgIGluaWNpYXJFbnZpb0RhdG9zKFxuICAgICAgICAgICAgICAgIHB1ZXJ0b1NlcmlhbCxcbiAgICAgICAgICAgICAgICBjb2xhT3BlcmFjaW9uZXMsXG4gICAgICAgICAgICAgICAgRVZFTlRPU19HVUFSREFET19DT05GSUdVUkFDSU9OX0NPTlRST0xBRE9SLklOSUNJQVJfQ09ORklHVVJBQ0lPTlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcGFyc2VyLm9uKCdlbnZpYXJfZGF0b3MnLCAoKSA9PiB7XG4gICAgICAgICAgICBlbnZpYXJEYXRvKFxuICAgICAgICAgICAgICAgIGNvbGFEYXRvcy5zaGlmdCgpLFxuICAgICAgICAgICAgICAgIHB1ZXJ0b1NlcmlhbCxcbiAgICAgICAgICAgICAgICBjb2xhT3BlcmFjaW9uZXMsXG4gICAgICAgICAgICAgICAgY29sYURhdG9zLmxlbmd0aCA+IDAgPyBcImVudmlhcl9kYXRvc1wiIDogXCJ0ZXJtaW5hcl9lbnZpb19kYXRvc1wiXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBwYXJzZXIub25jZSgndGVybWluYXJfZW52aW9fZGF0b3MnLCAoKSA9PiB7XG4gICAgICAgICAgICB0ZXJtaW5hckd1YXJkYWRvKFxuICAgICAgICAgICAgICAgIHB1ZXJ0b1NlcmlhbCxcbiAgICAgICAgICAgICAgICBFVkVOVE9TX0dVQVJEQURPX0NPTkZJR1VSQUNJT05fQ09OVFJPTEFET1IuRklOQUxJWkFSX0NPTkZJR1VSQUNJT1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcGFyc2VyLm9uKFwiY2xvc2VcIiwgY29uZXhpb25DZXJyYWRhKTtcblxuICAgIH0gY2F0Y2goZXhjZXBjaW9uKSB7XG4gICAgICAgIC8vIEltcHJpbWltb3MgbGEgZXhjZXBjaW9uLlxuICAgICAgICBjb25zb2xlLmxvZyhcIk9jdXJyaW8gdW5hIGV4Y2VwY2lvblwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZXhjZXBjaW9uKTtcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ3VhcmRhckNvbmZpZ3VyYWNpb25EaXNwb3NpdGl2b0NvbnRyb2xhZG9yUHVlcnRhID0gYXN5bmMgKFxuICAgIGV2ZW50bzogSXBjTWFpbkV2ZW50LFxuICAgIGFyZ3M6IHtcbiAgICAgICAgY29uZmlndXJhY2lvbjoge1xuICAgICAgICAgICAgc3NpZDogc3RyaW5nLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHN0cmluZyxcbiAgICAgICAgICAgIHB1ZXJ0b0FwaTogc3RyaW5nLFxuICAgICAgICAgICAgaXBBcGk6IHN0cmluZyxcbiAgICAgICAgICAgIGFwaUtleTogc3RyaW5nXG4gICAgICAgIH0sXG4gICAgICAgIGRhdG9zRGlzcG9zaXRpdm86IHtcbiAgICAgICAgICAgIHBhdGg6IHN0cmluZyxcbiAgICAgICAgICAgIGJhdWRSYXRlOiBudW1iZXJcbiAgICAgICAgfVxuICAgIH1cbikgPT4ge1xuXG4gICAgY29uc29sZS5sb2coYXJncy5jb25maWd1cmFjaW9uKTtcblxuICAgIHRyeSB7XG4gICAgICAgIC8vIFNpIGVsIHB1ZXJ0byBzZXJpYWwgZXN0YSBpbmljaWFkby5cbiAgICAgICAgaWYocHVlcnRvU2VyaWFsKSB7XG4gICAgICAgICAgICBpZihwdWVydG9TZXJpYWwuaXNPcGVuKSB7XG4gICAgICAgICAgICAgICAgLy8gTG8gdGVybWluYW1vcy5cbiAgICAgICAgICAgICAgICBwdWVydG9TZXJpYWwuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFZhY2lhbW9zIGxhIGNvbGEgZGUgb3BlcmFjaW9uZXMuXG4gICAgICAgIGNvbGFPcGVyYWNpb25lcyA9IFtdO1xuXG4gICAgICAgIC8vIFZhY2lhbW9zIGxhIGNvbGEgZGUgZGF0b3MuXG4gICAgICAgIGNvbGFEYXRvcyA9IFtdO1xuXG4gICAgICAgIGNvbnNvbGUuY2xlYXIoKTtcblxuICAgICAgICAvLyBEZXNjb21wb25lbW9zIGxvcyBkYXRvcyBxdWUgc2UgZ3VhcmRhcmFuIGVuIGxhIHRhcmpldGEuXG4gICAgICAgIGNvbGFEYXRvcyA9IFtbXG4gICAgICAgICAgICBFVkVOVE9TX0dVQVJEQURPX0NPTkZJR1VSQUNJT05fQ09OVFJPTEFET1JfUFVFUlRBLkNBTUJJQVJfU1NJRCxcbiAgICAgICAgICAgIGFyZ3MuY29uZmlndXJhY2lvbi5zc2lkLnRvU3RyaW5nKClcbiAgICAgICAgXSwgW1xuICAgICAgICAgICAgRVZFTlRPU19HVUFSREFET19DT05GSUdVUkFDSU9OX0NPTlRST0xBRE9SX1BVRVJUQS5DQU1CSUFSX1BBU1NXT1JELFxuICAgICAgICAgICAgYXJncy5jb25maWd1cmFjaW9uLnBhc3N3b3JkLnRvU3RyaW5nKClcbiAgICAgICAgXSwgW1xuICAgICAgICAgICAgRVZFTlRPU19HVUFSREFET19DT05GSUdVUkFDSU9OX0NPTlRST0xBRE9SX1BVRVJUQS5DQU1CSUFSX1BVRVJUT19BUEksXG4gICAgICAgICAgICBhcmdzLmNvbmZpZ3VyYWNpb24ucHVlcnRvQXBpLnRvU3RyaW5nKClcbiAgICAgICAgXSwgW1xuICAgICAgICAgICAgRVZFTlRPU19HVUFSREFET19DT05GSUdVUkFDSU9OX0NPTlRST0xBRE9SX1BVRVJUQS5DQU1CSUFSX0lQX0FQSSxcbiAgICAgICAgICAgIGFyZ3MuY29uZmlndXJhY2lvbi5pcEFwaS50b1N0cmluZygpXG4gICAgICAgIF0sIFtcbiAgICAgICAgICAgIEVWRU5UT1NfR1VBUkRBRE9fQ09ORklHVVJBQ0lPTl9DT05UUk9MQURPUl9QVUVSVEEuQ0FNQklBUl9BQ0NFU1NfVE9LRU4sXG4gICAgICAgICAgICBhcmdzLmNvbmZpZ3VyYWNpb24uYXBpS2V5LnRvU3RyaW5nKClcbiAgICAgICAgXV07XG5cbiAgICAgICAgLy8gSW5pY2FsaWFtb3MgZWwgcHVlcnRvIHNlcmlhbC5cbiAgICAgICAgcHVlcnRvU2VyaWFsID0gbmV3IFNlcmlhbFBvcnQoYXJncy5kYXRvc0Rpc3Bvc2l0aXZvLCAoY2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb25leGnDs24gYSBwdWVydG8gZXN0YWJsZWNpZG8nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIHB1ZXJ0b1NlcmlhbC5zZXQoe1xuICAgICAgICAgICAgICAgIHJ0czogZmFsc2UsXG4gICAgICAgICAgICAgICAgZHRyOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEluaWNpYWxpemFtb3MgdW4gcGFyc2VyIHBhcmEgbWFuZGFyIHkgbGVlciBkYXRvcyBkZWwgc2VyaWFsLlxuICAgICAgICBjb25zdCBwYXJzZXIgPSBwdWVydG9TZXJpYWwucGlwZShuZXcgUmVhZGxpbmVQYXJzZXIoe1xuICAgICAgICAgICAgZGVsaW1pdGVyOiAnXFxyXFxuJ1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgLy8gRXNwZXJhbW9zIHBvciBlbCBldmVudG8gZGVsIHB1ZXJ0byBhYmllcnRvLlxuICAgICAgICBwdWVydG9TZXJpYWwub24oXCJvcGVuXCIsIGNvbmV4aW9uQWJpZXJ0YSk7XG5cbiAgICAgICAgLy8gU2kgcmVjaXZpbW9zIGRhdG9zLCBsb3MgbW9zdHJhbW9zLlxuICAgICAgICBwYXJzZXIub24oJ2RhdGEnLCAocmVzcHVlc3RhOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3B1ZXN0YSk7XG4gICAgICAgICAgICBhbFJlY2l2aXJEYXRvcyhcbiAgICAgICAgICAgICAgICByZXNwdWVzdGEsXG4gICAgICAgICAgICAgICAgcGFyc2VyLFxuICAgICAgICAgICAgICAgIGNvbGFPcGVyYWNpb25lcyxcbiAgICAgICAgICAgICAgICBwdWVydG9TZXJpYWxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBhcnNlci5vbmNlKCdpbmljaWFyX2VudmlvX2RhdG9zJywgKCkgPT4ge1xuICAgICAgICAgICAgaW5pY2lhckVudmlvRGF0b3MoXG4gICAgICAgICAgICAgICAgcHVlcnRvU2VyaWFsLFxuICAgICAgICAgICAgICAgIGNvbGFPcGVyYWNpb25lcyxcbiAgICAgICAgICAgICAgICBFVkVOVE9TX0dVQVJEQURPX0NPTkZJR1VSQUNJT05fQ09OVFJPTEFET1JfUFVFUlRBLklOSUNJQVJfQ09ORklHVVJBQ0lPTlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcGFyc2VyLm9uKCdlbnZpYXJfZGF0b3MnLCAoKSA9PiB7XG4gICAgICAgICAgICBlbnZpYXJEYXRvKFxuICAgICAgICAgICAgICAgIGNvbGFEYXRvcy5zaGlmdCgpLFxuICAgICAgICAgICAgICAgIHB1ZXJ0b1NlcmlhbCxcbiAgICAgICAgICAgICAgICBjb2xhT3BlcmFjaW9uZXMsXG4gICAgICAgICAgICAgICAgY29sYURhdG9zLmxlbmd0aCA+IDAgPyBcImVudmlhcl9kYXRvc1wiIDogXCJ0ZXJtaW5hcl9lbnZpb19kYXRvc1wiXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBwYXJzZXIub25jZSgndGVybWluYXJfZW52aW9fZGF0b3MnLCAoKSA9PiB7XG4gICAgICAgICAgICB0ZXJtaW5hckd1YXJkYWRvKFxuICAgICAgICAgICAgICAgIHB1ZXJ0b1NlcmlhbCxcbiAgICAgICAgICAgICAgICBFVkVOVE9TX0dVQVJEQURPX0NPTkZJR1VSQUNJT05fQ09OVFJPTEFET1JfUFVFUlRBLkZJTkFMSVpBUl9DT05GSUdVUkFDSU9cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBhcnNlci5vbihcImNsb3NlXCIsIGNvbmV4aW9uQ2VycmFkYSk7XG5cbiAgICB9IGNhdGNoKGV4Y2VwY2lvbikge1xuICAgICAgICAvLyBJbXByaW1pbW9zIGxhIGV4Y2VwY2lvbi5cbiAgICAgICAgY29uc29sZS5sb2coXCJPY3VycmlvIHVuYSBleGNlcGNpb25cIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGV4Y2VwY2lvbik7XG4gICAgfVxufTtcbiIsImV4cG9ydCBlbnVtIEZMQUdTX0RJU1BPU0lUSVZPIHtcbiAgICAvKlxuICAgICogQmFuZGVyYXMgZGVsIGVzdGFkbyBkZWwgZGlzcG9zaXRpdm8geSBsYXMgb3BlcmFjaW9uZXMgZGUgZXN0ZS5cbiAgICAqL1xuXG4gICAgLy8gRXJyb3IgZGV0ZWN0YWRvLlxuICAgIEVSUk9SX0NPTl9ESVNQT1NJVElWTyA9IDBiMDAwMDAwMDAsXG5cbiAgICAvLyBJbmljaWFsaXphY2nDs24gdGVybWluYWRhLlxuICAgIElOSUNJQUxJWkFDSU9OX1RFUk1JTkFEQSA9IDBiMDAwMDAwMDEsXG5cbiAgICAvLyBJbmRpY2EgY3VhbmRvIHVuYSBjb25maWd1cmFjaW9uIHNlIGd1YXJkbyBleGl0b3NhbWVudGUuXG4gICAgRVNDUklUVVJBX1RFUk1JTkFEQSA9IDBiMDAwMDAwMTAsXG5cbiAgICAvLyBCYW5kZXJhcyBsaWJyZXMuXG4gICAgRkxBR18zID0gMGIwMDAwMDEwMCxcbiAgICBGTEFHXzQgPSAwYjAwMDAxMDAwLFxuICAgIEZMQUdfNSA9IDBiMDAwMTAwMDAsXG4gICAgRkxBR182ID0gMGIwMDEwMDAwMCxcblxuICAgIC8vIE9wZXJhY2nDs24gdGVybWluYWRhLlxuICAgIE9QRVJBQ0lPTl9URVJNSU5BREEgPSAwYjAxMDAwMDAwLFxuXG4gICAgLy8gQ29uZXhpw7NuIGNlcnJhZGEuXG4gICAgQ09ORVhJT05fQ0VSUkFEQSA9IDBiMTAwMDAwMDBcbn1cblxuZXhwb3J0IGVudW0gRVZFTlRPU19HVUFSREFET19EQVRPU19UQVJKRVRBIHtcbiAgICAvKlxuICAgICogRXZlbnRvcyBxdWUgc2UgcGFzYW4gcG9yIG1lZGlvIGRlIFNlcmlhbC5cbiAgICAqICovXG5cbiAgICAvLyBJbmljaWEgZWwgZ3JhYmFkbyBkZSBkYXRvcy5cbiAgICBJTklDSUFSX0dVQVJEQURPX0RBVE9TID0gJzBcXHInLFxuXG4gICAgLy8gRW52aWEgZWwgZGF0byBkZWwgaWQgZGVsIGVtcGxlYWRvLlxuICAgIElEX0VOVklBRE8gPSAnMVxccicsXG5cbiAgICAvLyBFbnZpYSBlbCBkYXRvIGRlIGxvcyBwZXJtaXNvcyBkZWwgZW1wbGVhZG8uXG4gICAgQVVUT1JJWkFDSU9OX0VOVklBRE8gPSAnMlxccicsXG5cbiAgICAvLyBFbnZpYSBlbCBkYXRvIGRlbCByb2wgIGRlbCBlbXBsZWFkby5cbiAgICBST0xfRU5WSUFETyA9ICczXFxyJyxcblxuICAgIC8vIFRlcm1pbmEgZWwgZ3JhYmFkbyBkZSBkYXRvcy5cbiAgICBURVJNSU5BUl9HVUFSREFET19EQVRPUyA9ICc0XFxyJyxcbn07XG5cbmV4cG9ydCBlbnVtIEVWRU5UT1NfR1VBUkRBRE9fQ09ORklHVVJBQ0lPTl9MRUNUT1Ige1xuICAgIC8qXG4gICAgKiBFdmVudG9zIHF1ZSBzZSBwYXNhbiBwb3IgbWVkaW8gZGUgU2VyaWFsLlxuICAgICogKi9cblxuICAgIC8vIEV2ZW50byBkZSB2ZXJpZmljYWNpb24gZGUgY29uZmlndXJhY2lvbi5cbiAgICBJTklDSUFSX0NPTkZJR1VSQUNJT04gPSAnMVxccicsXG5cbiAgICAvLyBDYW1iaWEgZWwgYml0IGRlIHBlcm1pc28gcGVkaWRvIHBvciBlbCBkaXNwb3NpdGl2by5cbiAgICBDQU1CSUFSX1BFUk1JU09fUEVESURPID0gJzJcXHInLFxuXG4gICAgLy8gRXZlbnRvIHBhcmEgY2FtYmlhciBlbCBTU0lEIGRlIGxhIHJlZC5cbiAgICBDQU1CSUFSX1NTSUQgPSAnM1xccicsXG5cbiAgICAvLyBDYW1iaWEgbGEgcGFzc3dvcmQgZGVsIFNTSUQuXG4gICAgQ0FNQklBUl9QQVNTV09SRCA9ICc0XFxyJyxcblxuICAgIC8vIENhbWJpYSBlbCBwdWVydG8gZGVsIHNlcnZpZG9yIEFQSS5cbiAgICBDQU1CSUFSX1BVRVJUT19BUEkgPSAnNVxccicsXG5cbiAgICAvLyBDYW1iaWEgbGEgaXAgZGVsIHNlcnZpZG9yIEFQSS5cbiAgICBDQU1CSUFSX0lQX0FQSSA9ICc2XFxyJyxcblxuICAgIC8vIENhbWJpYSBlbCB1cmwgZGUgbGEgdmVyc2lvbiBkZWwgQVBJIGEgdXNhci5cbiAgICBDQU1CSUFSX1ZFUlNJT05fQVBJID0gJzdcXHInLFxuXG4gICAgLy8gQ2FtYmlhIGVsIGFjY2VzcyB0b2tlbiBkZWwgZGlzcG9zaXR2by5cbiAgICBDQU1CSUFSX0FDQ0VTU19UT0tFTiA9ICc4XFxyJyxcblxuICAgIC8vIENhbWJpYSBsYSBhY2Npb24gb3BjaW9uYWwgcmVhbGl6YWRhIHBvciBlbCBkaXNwb3NpdGl2by5cbiAgICBDQU1CSUFSX0FDQ0lPTl9PUENJT05BTCA9ICc5XFxyJyxcblxuICAgIC8vIEV2ZW50byBkZSBmaW5hbGl6YWNpb24gZGUgY29uZmlndXJhY2lvblxuICAgIEZJTkFMSVpBUl9DT05GSUdVUkFDSU8gPSAnMTBcXHInXG59O1xuXG5leHBvcnQgZW51bSBFVkVOVE9TX0dVQVJEQURPX0NPTkZJR1VSQUNJT05fQ0hFQ0FET1Ige1xuICAgIC8qXG4gICAgKiBFdmVudG9zIHF1ZSBzZSBwYXNhbiBwb3IgbWVkaW8gZGUgU2VyaWFsLlxuICAgICogKi9cblxuICAgIC8vIEV2ZW50byBkZSB2ZXJpZmljYWNpb24gZGUgY29uZmlndXJhY2lvbi5cbiAgICBJTklDSUFSX0NPTkZJR1VSQUNJT04gPSAnMVxccicsXG5cbiAgICAvLyBFdmVudG8gcGFyYSBjYW1iaWFyIGVsIFNTSUQgZGUgbGEgcmVkLlxuICAgIENBTUJJQVJfU1NJRCA9ICcyXFxyJyxcblxuICAgIC8vIENhbWJpYSBsYSBwYXNzd29yZCBkZWwgU1NJRC5cbiAgICBDQU1CSUFSX1BBU1NXT1JEID0gJzNcXHInLFxuXG4gICAgLy8gQ2FtYmlhIGVsIHB1ZXJ0byBkZWwgc2Vydmlkb3IgQVBJLlxuICAgIENBTUJJQVJfUFVFUlRPX0FQSSA9ICc0XFxyJyxcblxuICAgIC8vIENhbWJpYSBsYSBpcCBkZWwgc2Vydmlkb3IgQVBJLlxuICAgIENBTUJJQVJfSVBfQVBJID0gJzVcXHInLFxuXG4gICAgLy8gQ2FtYmlhIGVsIHVybCBkZSBsYSB2ZXJzaW9uIGRlbCBBUEkgYSB1c2FyLlxuICAgIENBTUJJQVJfVkVSU0lPTl9BUEkgPSAnNlxccicsXG5cbiAgICAvLyBDYW1iaWEgZWwgYWNjZXNzIHRva2VuIGRlbCBkaXNwb3NpdHZvLlxuICAgIENBTUJJQVJfQUNDRVNTX1RPS0VOID0gJzdcXHInLFxuXG4gICAgLy8gRXZlbnRvIGRlIGZpbmFsaXphY2lvbiBkZSBjb25maWd1cmFjaW9uXG4gICAgRklOQUxJWkFSX0NPTkZJR1VSQUNJTyA9ICc4XFxyJ1xufTtcblxuZXhwb3J0IGVudW0gRVZFTlRPU19HVUFSREFET19DT05GSUdVUkFDSU9OX0NPTlRST0xBRE9SIHtcbiAgICAvKlxuICAgICogRXZlbnRvcyBxdWUgc2UgcGFzYW4gcG9yIG1lZGlvIGRlIFNlcmlhbC5cbiAgICAqICovXG5cbiAgICAvLyBFdmVudG8gZGUgdmVyaWZpY2FjaW9uIGRlIGNvbmZpZ3VyYWNpb24uXG4gICAgSU5JQ0lBUl9DT05GSUdVUkFDSU9OID0gJzFcXHInLFxuXG4gICAgLy8gRXZlbnRvIHBhcmEgY2FtYmlhciBlbCBTU0lEIGRlIGxhIHJlZC5cbiAgICBDQU1CSUFSX1JPTF9QRURJRE8gPSAnMlxccicsXG5cbiAgICAvLyBFdmVudG8gcGFyYSBjYW1iaWFyIGVsIFNTSUQgZGUgbGEgcmVkLlxuICAgIENBTUJJQVJfU1NJRCA9ICczXFxyJyxcblxuICAgIC8vIENhbWJpYSBsYSBwYXNzd29yZCBkZWwgU1NJRC5cbiAgICBDQU1CSUFSX1BBU1NXT1JEID0gJzRcXHInLFxuXG4gICAgLy8gQ2FtYmlhIGVsIHB1ZXJ0byBkZWwgc2Vydmlkb3IgQVBJLlxuICAgIENBTUJJQVJfUFVFUlRPX0FQSSA9ICc1XFxyJyxcblxuICAgIC8vIENhbWJpYSBsYSBpcCBkZWwgc2Vydmlkb3IgQVBJLlxuICAgIENBTUJJQVJfSVBfQVBJID0gJzZcXHInLFxuXG4gICAgLy8gQ2FtYmlhIGVsIHVybCBkZSBsYSB2ZXJzaW9uIGRlbCBBUEkgYSB1c2FyLlxuICAgIENBTUJJQVJfVkVSU0lPTl9BUEkgPSAnN1xccicsXG5cbiAgICAvLyBDYW1iaWEgZWwgYWNjZXNzIHRva2VuIGRlbCBkaXNwb3NpdHZvLlxuICAgIENBTUJJQVJfQUNDRVNTX1RPS0VOID0gJzhcXHInLFxuXG4gICAgLy8gRXZlbnRvIGRlIGZpbmFsaXphY2lvbiBkZSBjb25maWd1cmFjaW9uXG4gICAgRklOQUxJWkFSX0NPTkZJR1VSQUNJTyA9ICc5XFxyJ1xufTtcblxuZXhwb3J0IGVudW0gRVZFTlRPU19HVUFSREFET19DT05GSUdVUkFDSU9OX0NPTlRST0xBRE9SX1BVRVJUQSB7XG4gICAgLypcbiAgICAqIEV2ZW50b3MgcXVlIHNlIHBhc2FuIHBvciBtZWRpbyBkZSBTZXJpYWwuXG4gICAgKiAqL1xuXG4gICAgLy8gRXZlbnRvIGRlIHZlcmlmaWNhY2lvbiBkZSBjb25maWd1cmFjaW9uLlxuICAgIElOSUNJQVJfQ09ORklHVVJBQ0lPTiA9ICcxXFxyJyxcblxuICAgIC8vIEV2ZW50byBwYXJhIGNhbWJpYXIgZWwgU1NJRCBkZSBsYSByZWQuXG4gICAgQ0FNQklBUl9TU0lEID0gJzJcXHInLFxuXG4gICAgLy8gQ2FtYmlhIGxhIHBhc3N3b3JkIGRlbCBTU0lELlxuICAgIENBTUJJQVJfUEFTU1dPUkQgPSAnM1xccicsXG5cbiAgICAvLyBDYW1iaWEgZWwgcHVlcnRvIGRlbCBzZXJ2aWRvciBBUEkuXG4gICAgQ0FNQklBUl9QVUVSVE9fQVBJID0gJzRcXHInLFxuXG4gICAgLy8gQ2FtYmlhIGxhIGlwIGRlbCBzZXJ2aWRvciBBUEkuXG4gICAgQ0FNQklBUl9JUF9BUEkgPSAnNVxccicsXG5cbiAgICAvLyBDYW1iaWEgZWwgYWNjZXNzIHRva2VuIGRlbCBkaXNwb3NpdHZvLlxuICAgIENBTUJJQVJfQUNDRVNTX1RPS0VOID0gJzZcXHInLFxuXG4gICAgLy8gRXZlbnRvIGRlIGZpbmFsaXphY2lvbiBkZSBjb25maWd1cmFjaW9uXG4gICAgRklOQUxJWkFSX0NPTkZJR1VSQUNJTyA9ICc3XFxyJ1xufTsiLCJpbXBvcnQge1xuICBzY3JlZW4sXG4gIEJyb3dzZXJXaW5kb3csXG4gIEJyb3dzZXJXaW5kb3dDb25zdHJ1Y3Rvck9wdGlvbnMsXG4gIFJlY3RhbmdsZSxcbn0gZnJvbSAnZWxlY3Ryb24nXG5pbXBvcnQgU3RvcmUgZnJvbSAnZWxlY3Ryb24tc3RvcmUnXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVXaW5kb3cgPSAoXG4gIHdpbmRvd05hbWU6IHN0cmluZyxcbiAgb3B0aW9uczogQnJvd3NlcldpbmRvd0NvbnN0cnVjdG9yT3B0aW9uc1xuKTogQnJvd3NlcldpbmRvdyA9PiB7XG4gIGNvbnN0IGtleSA9ICd3aW5kb3ctc3RhdGUnXG4gIGNvbnN0IG5hbWUgPSBgd2luZG93LXN0YXRlLSR7d2luZG93TmFtZX1gXG4gIGNvbnN0IHN0b3JlID0gbmV3IFN0b3JlPFJlY3RhbmdsZT4oeyBuYW1lIH0pXG4gIGNvbnN0IGRlZmF1bHRTaXplID0ge1xuICAgIHdpZHRoOiBvcHRpb25zLndpZHRoLFxuICAgIGhlaWdodDogb3B0aW9ucy5oZWlnaHQsXG4gIH1cbiAgbGV0IHN0YXRlID0ge31cblxuICBjb25zdCByZXN0b3JlID0gKCkgPT4gc3RvcmUuZ2V0KGtleSwgZGVmYXVsdFNpemUpXG5cbiAgY29uc3QgZ2V0Q3VycmVudFBvc2l0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gd2luLmdldFBvc2l0aW9uKClcbiAgICBjb25zdCBzaXplID0gd2luLmdldFNpemUoKVxuICAgIHJldHVybiB7XG4gICAgICB4OiBwb3NpdGlvblswXSxcbiAgICAgIHk6IHBvc2l0aW9uWzFdLFxuICAgICAgd2lkdGg6IHNpemVbMF0sXG4gICAgICBoZWlnaHQ6IHNpemVbMV0sXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgd2luZG93V2l0aGluQm91bmRzID0gKHdpbmRvd1N0YXRlLCBib3VuZHMpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgd2luZG93U3RhdGUueCA+PSBib3VuZHMueCAmJlxuICAgICAgd2luZG93U3RhdGUueSA+PSBib3VuZHMueSAmJlxuICAgICAgd2luZG93U3RhdGUueCArIHdpbmRvd1N0YXRlLndpZHRoIDw9IGJvdW5kcy54ICsgYm91bmRzLndpZHRoICYmXG4gICAgICB3aW5kb3dTdGF0ZS55ICsgd2luZG93U3RhdGUuaGVpZ2h0IDw9IGJvdW5kcy55ICsgYm91bmRzLmhlaWdodFxuICAgIClcbiAgfVxuXG4gIGNvbnN0IHJlc2V0VG9EZWZhdWx0cyA9ICgpID0+IHtcbiAgICBjb25zdCBib3VuZHMgPSBzY3JlZW4uZ2V0UHJpbWFyeURpc3BsYXkoKS5ib3VuZHNcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFNpemUsIHtcbiAgICAgIHg6IChib3VuZHMud2lkdGggLSBkZWZhdWx0U2l6ZS53aWR0aCkgLyAyLFxuICAgICAgeTogKGJvdW5kcy5oZWlnaHQgLSBkZWZhdWx0U2l6ZS5oZWlnaHQpIC8gMixcbiAgICB9KVxuICB9XG5cbiAgY29uc3QgZW5zdXJlVmlzaWJsZU9uU29tZURpc3BsYXkgPSAod2luZG93U3RhdGUpID0+IHtcbiAgICBjb25zdCB2aXNpYmxlID0gc2NyZWVuLmdldEFsbERpc3BsYXlzKCkuc29tZSgoZGlzcGxheSkgPT4ge1xuICAgICAgcmV0dXJuIHdpbmRvd1dpdGhpbkJvdW5kcyh3aW5kb3dTdGF0ZSwgZGlzcGxheS5ib3VuZHMpXG4gICAgfSlcbiAgICBpZiAoIXZpc2libGUpIHtcbiAgICAgIC8vIFdpbmRvdyBpcyBwYXJ0aWFsbHkgb3IgZnVsbHkgbm90IHZpc2libGUgbm93LlxuICAgICAgLy8gUmVzZXQgaXQgdG8gc2FmZSBkZWZhdWx0cy5cbiAgICAgIHJldHVybiByZXNldFRvRGVmYXVsdHMoKVxuICAgIH1cbiAgICByZXR1cm4gd2luZG93U3RhdGVcbiAgfVxuXG4gIGNvbnN0IHNhdmVTdGF0ZSA9ICgpID0+IHtcbiAgICBpZiAoIXdpbi5pc01pbmltaXplZCgpICYmICF3aW4uaXNNYXhpbWl6ZWQoKSkge1xuICAgICAgT2JqZWN0LmFzc2lnbihzdGF0ZSwgZ2V0Q3VycmVudFBvc2l0aW9uKCkpXG4gICAgfVxuICAgIHN0b3JlLnNldChrZXksIHN0YXRlKVxuICB9XG5cbiAgc3RhdGUgPSBlbnN1cmVWaXNpYmxlT25Tb21lRGlzcGxheShyZXN0b3JlKCkpXG5cbiAgY29uc3Qgd2luID0gbmV3IEJyb3dzZXJXaW5kb3coe1xuICAgIC4uLnN0YXRlLFxuICAgIC4uLm9wdGlvbnMsXG4gICAgd2ViUHJlZmVyZW5jZXM6IHtcbiAgICAgIG5vZGVJbnRlZ3JhdGlvbjogZmFsc2UsXG4gICAgICBjb250ZXh0SXNvbGF0aW9uOiB0cnVlLFxuICAgICAgLi4ub3B0aW9ucy53ZWJQcmVmZXJlbmNlcyxcbiAgICB9LFxuICB9KVxuXG4gIHdpbi5vbignY2xvc2UnLCBzYXZlU3RhdGUpXG5cbiAgcmV0dXJuIHdpblxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9jcmVhdGUtd2luZG93J1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZWxlY3Ryb25fc2VydmVfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZWxlY3Ryb25fc3RvcmVfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfc2VyaWFscG9ydF9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9zb2NrZXRfaW9fY2xpZW50X187IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9maWx0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9mb3ItZWFjaFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2luY2x1ZGVzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvbWFwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2Uvc29tZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL29iamVjdC9hc3NpZ25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9vYmplY3QvZGVmaW5lLXByb3BlcnRpZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvb2JqZWN0L2dldC1vd24tcHJvcGVydHktc3ltYm9sc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL29iamVjdC9rZXlzXCIpOyIsInZhciBfT2JqZWN0JGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9mZWF0dXJlcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXCIpO1xudmFyIHRvUHJvcGVydHlLZXkgPSByZXF1aXJlKFwiLi90b1Byb3BlcnR5S2V5LmpzXCIpO1xuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBrZXkgPSB0b1Byb3BlcnR5S2V5KGtleSk7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgX09iamVjdCRkZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHksIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJ2YXIgX1N5bWJvbCR0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvZmVhdHVyZXMvc3ltYm9sL3RvLXByaW1pdGl2ZS5qc1wiKTtcbnZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4vdHlwZW9mLmpzXCIpW1wiZGVmYXVsdFwiXTtcbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZShpbnB1dCwgaGludCkge1xuICBpZiAoX3R5cGVvZihpbnB1dCkgIT09IFwib2JqZWN0XCIgfHwgaW5wdXQgPT09IG51bGwpIHJldHVybiBpbnB1dDtcbiAgdmFyIHByaW0gPSBpbnB1dFtfU3ltYm9sJHRvUHJpbWl0aXZlXTtcbiAgaWYgKHByaW0gIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciByZXMgPSBwcmltLmNhbGwoaW5wdXQsIGhpbnQgfHwgXCJkZWZhdWx0XCIpO1xuICAgIGlmIChfdHlwZW9mKHJlcykgIT09IFwib2JqZWN0XCIpIHJldHVybiByZXM7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpO1xuICB9XG4gIHJldHVybiAoaGludCA9PT0gXCJzdHJpbmdcIiA/IFN0cmluZyA6IE51bWJlcikoaW5wdXQpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfdG9QcmltaXRpdmUsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJ2YXIgX3R5cGVvZiA9IHJlcXVpcmUoXCIuL3R5cGVvZi5qc1wiKVtcImRlZmF1bHRcIl07XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKFwiLi90b1ByaW1pdGl2ZS5qc1wiKTtcbmZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KGFyZykge1xuICB2YXIga2V5ID0gdG9QcmltaXRpdmUoYXJnLCBcInN0cmluZ1wiKTtcbiAgcmV0dXJuIF90eXBlb2Yoa2V5KSA9PT0gXCJzeW1ib2xcIiA/IGtleSA6IFN0cmluZyhrZXkpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfdG9Qcm9wZXJ0eUtleSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsInZhciBfU3ltYm9sID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9mZWF0dXJlcy9zeW1ib2wvaW5kZXguanNcIik7XG52YXIgX1N5bWJvbCRpdGVyYXRvciA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvZmVhdHVyZXMvc3ltYm9sL2l0ZXJhdG9yLmpzXCIpO1xuZnVuY3Rpb24gX3R5cGVvZihvKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICByZXR1cm4gKG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgX1N5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBfU3ltYm9sJGl0ZXJhdG9yID8gZnVuY3Rpb24gKG8pIHtcbiAgICByZXR1cm4gdHlwZW9mIG87XG4gIH0gOiBmdW5jdGlvbiAobykge1xuICAgIHJldHVybiBvICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgX1N5bWJvbCAmJiBvLmNvbnN0cnVjdG9yID09PSBfU3ltYm9sICYmIG8gIT09IF9TeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvO1xuICB9LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMpLCBfdHlwZW9mKG8pO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL3N0YWJsZS9vYmplY3QvZGVmaW5lLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL3N0YWJsZS9zeW1ib2wnKTtcblxucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lc25leHQuZnVuY3Rpb24ubWV0YWRhdGEnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXNuZXh0LnN5bWJvbC5hc3luYy1kaXNwb3NlJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzbmV4dC5zeW1ib2wuZGlzcG9zZScpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lc25leHQuc3ltYm9sLm1ldGFkYXRhJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL3N0YWJsZS9zeW1ib2wvaXRlcmF0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vc3RhYmxlL3N5bWJvbC90by1wcmltaXRpdmUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCIndXNlIHN0cmljdCc7XG5yZXF1aXJlKCcuLi8uLi8uLi9tb2R1bGVzL2VzLmFycmF5LmZpbHRlcicpO1xudmFyIGdldEJ1aWx0SW5Qcm90b3R5cGVNZXRob2QgPSByZXF1aXJlKCcuLi8uLi8uLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluLXByb3RvdHlwZS1tZXRob2QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluUHJvdG90eXBlTWV0aG9kKCdBcnJheScsICdmaWx0ZXInKTtcbiIsIid1c2Ugc3RyaWN0JztcbnJlcXVpcmUoJy4uLy4uLy4uL21vZHVsZXMvZXMuYXJyYXkuZm9yLWVhY2gnKTtcbnZhciBnZXRCdWlsdEluUHJvdG90eXBlTWV0aG9kID0gcmVxdWlyZSgnLi4vLi4vLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbi1wcm90b3R5cGUtbWV0aG9kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJblByb3RvdHlwZU1ldGhvZCgnQXJyYXknLCAnZm9yRWFjaCcpO1xuIiwiJ3VzZSBzdHJpY3QnO1xucmVxdWlyZSgnLi4vLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5pbmNsdWRlcycpO1xudmFyIGdldEJ1aWx0SW5Qcm90b3R5cGVNZXRob2QgPSByZXF1aXJlKCcuLi8uLi8uLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluLXByb3RvdHlwZS1tZXRob2QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluUHJvdG90eXBlTWV0aG9kKCdBcnJheScsICdpbmNsdWRlcycpO1xuIiwiJ3VzZSBzdHJpY3QnO1xucmVxdWlyZSgnLi4vLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5tYXAnKTtcbnZhciBnZXRCdWlsdEluUHJvdG90eXBlTWV0aG9kID0gcmVxdWlyZSgnLi4vLi4vLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbi1wcm90b3R5cGUtbWV0aG9kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJblByb3RvdHlwZU1ldGhvZCgnQXJyYXknLCAnbWFwJyk7XG4iLCIndXNlIHN0cmljdCc7XG5yZXF1aXJlKCcuLi8uLi8uLi9tb2R1bGVzL2VzLmFycmF5LnNvbWUnKTtcbnZhciBnZXRCdWlsdEluUHJvdG90eXBlTWV0aG9kID0gcmVxdWlyZSgnLi4vLi4vLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbi1wcm90b3R5cGUtbWV0aG9kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJblByb3RvdHlwZU1ldGhvZCgnQXJyYXknLCAnc29tZScpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzUHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvb2JqZWN0LWlzLXByb3RvdHlwZS1vZicpO1xudmFyIG1ldGhvZCA9IHJlcXVpcmUoJy4uL2FycmF5L3ZpcnR1YWwvZmlsdGVyJyk7XG5cbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIG93biA9IGl0LmZpbHRlcjtcbiAgcmV0dXJuIGl0ID09PSBBcnJheVByb3RvdHlwZSB8fCAoaXNQcm90b3R5cGVPZihBcnJheVByb3RvdHlwZSwgaXQpICYmIG93biA9PT0gQXJyYXlQcm90b3R5cGUuZmlsdGVyKSA/IG1ldGhvZCA6IG93bjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaXNQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uLy4uL2ludGVybmFscy9vYmplY3QtaXMtcHJvdG90eXBlLW9mJyk7XG52YXIgYXJyYXlNZXRob2QgPSByZXF1aXJlKCcuLi9hcnJheS92aXJ0dWFsL2luY2x1ZGVzJyk7XG52YXIgc3RyaW5nTWV0aG9kID0gcmVxdWlyZSgnLi4vc3RyaW5nL3ZpcnR1YWwvaW5jbHVkZXMnKTtcblxudmFyIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xudmFyIFN0cmluZ1Byb3RvdHlwZSA9IFN0cmluZy5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBvd24gPSBpdC5pbmNsdWRlcztcbiAgaWYgKGl0ID09PSBBcnJheVByb3RvdHlwZSB8fCAoaXNQcm90b3R5cGVPZihBcnJheVByb3RvdHlwZSwgaXQpICYmIG93biA9PT0gQXJyYXlQcm90b3R5cGUuaW5jbHVkZXMpKSByZXR1cm4gYXJyYXlNZXRob2Q7XG4gIGlmICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgfHwgaXQgPT09IFN0cmluZ1Byb3RvdHlwZSB8fCAoaXNQcm90b3R5cGVPZihTdHJpbmdQcm90b3R5cGUsIGl0KSAmJiBvd24gPT09IFN0cmluZ1Byb3RvdHlwZS5pbmNsdWRlcykpIHtcbiAgICByZXR1cm4gc3RyaW5nTWV0aG9kO1xuICB9IHJldHVybiBvd247XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzUHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvb2JqZWN0LWlzLXByb3RvdHlwZS1vZicpO1xudmFyIG1ldGhvZCA9IHJlcXVpcmUoJy4uL2FycmF5L3ZpcnR1YWwvbWFwJyk7XG5cbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIG93biA9IGl0Lm1hcDtcbiAgcmV0dXJuIGl0ID09PSBBcnJheVByb3RvdHlwZSB8fCAoaXNQcm90b3R5cGVPZihBcnJheVByb3RvdHlwZSwgaXQpICYmIG93biA9PT0gQXJyYXlQcm90b3R5cGUubWFwKSA/IG1ldGhvZCA6IG93bjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaXNQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uLy4uL2ludGVybmFscy9vYmplY3QtaXMtcHJvdG90eXBlLW9mJyk7XG52YXIgbWV0aG9kID0gcmVxdWlyZSgnLi4vYXJyYXkvdmlydHVhbC9zb21lJyk7XG5cbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIG93biA9IGl0LnNvbWU7XG4gIHJldHVybiBpdCA9PT0gQXJyYXlQcm90b3R5cGUgfHwgKGlzUHJvdG90eXBlT2YoQXJyYXlQcm90b3R5cGUsIGl0KSAmJiBvd24gPT09IEFycmF5UHJvdG90eXBlLnNvbWUpID8gbWV0aG9kIDogb3duO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMub2JqZWN0LmFzc2lnbicpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGguT2JqZWN0LmFzc2lnbjtcbiIsIid1c2Ugc3RyaWN0JztcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMub2JqZWN0LmRlZmluZS1wcm9wZXJ0aWVzJyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4uLy4uL2ludGVybmFscy9wYXRoJyk7XG5cbnZhciBPYmplY3QgPSBwYXRoLk9iamVjdDtcblxudmFyIGRlZmluZVByb3BlcnRpZXMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoVCwgRCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoVCwgRCk7XG59O1xuXG5pZiAoT2JqZWN0LmRlZmluZVByb3BlcnRpZXMuc2hhbSkgZGVmaW5lUHJvcGVydGllcy5zaGFtID0gdHJ1ZTtcbiIsIid1c2Ugc3RyaWN0JztcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG52YXIgT2JqZWN0ID0gcGF0aC5PYmplY3Q7XG5cbnZhciBkZWZpbmVQcm9wZXJ0eSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYykge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcblxuaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eS5zaGFtKSBkZWZpbmVQcm9wZXJ0eS5zaGFtID0gdHJ1ZTtcbiIsIid1c2Ugc3RyaWN0JztcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMub2JqZWN0LmdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG52YXIgT2JqZWN0ID0gcGF0aC5PYmplY3Q7XG5cbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KSB7XG4gIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpO1xufTtcblxuaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iuc2hhbSkgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLnNoYW0gPSB0cnVlO1xuIiwiJ3VzZSBzdHJpY3QnO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9ycycpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGguT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnM7XG4iLCIndXNlIHN0cmljdCc7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbCcpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGguT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiIsIid1c2Ugc3RyaWN0JztcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMub2JqZWN0LmtleXMnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXRoLk9iamVjdC5rZXlzO1xuIiwiJ3VzZSBzdHJpY3QnO1xucmVxdWlyZSgnLi4vLi4vLi4vbW9kdWxlcy9lcy5zdHJpbmcuaW5jbHVkZXMnKTtcbnZhciBnZXRCdWlsdEluUHJvdG90eXBlTWV0aG9kID0gcmVxdWlyZSgnLi4vLi4vLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbi1wcm90b3R5cGUtbWV0aG9kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJblByb3RvdHlwZU1ldGhvZCgnU3RyaW5nJywgJ2luY2x1ZGVzJyk7XG4iLCIndXNlIHN0cmljdCc7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLmFycmF5LmNvbmNhdCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wuYXN5bmMtaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuc3ltYm9sLmRlc2NyaXB0aW9uJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC5oYXMtaW5zdGFuY2UnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuc3ltYm9sLmlzLWNvbmNhdC1zcHJlYWRhYmxlJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wubWF0Y2gnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuc3ltYm9sLm1hdGNoLWFsbCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wucmVwbGFjZScpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wuc2VhcmNoJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC5zcGVjaWVzJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC5zcGxpdCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wudG8tcHJpbWl0aXZlJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC50by1zdHJpbmctdGFnJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC51bnNjb3BhYmxlcycpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5qc29uLnRvLXN0cmluZy10YWcnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMubWF0aC50by1zdHJpbmctdGFnJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnJlZmxlY3QudG8tc3RyaW5nLXRhZycpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGguU3ltYm9sO1xuIiwiJ3VzZSBzdHJpY3QnO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wuaXRlcmF0b3InKTtcbnZhciBXcmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLXdyYXBwZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBXcmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlLmYoJ2l0ZXJhdG9yJyk7XG4iLCIndXNlIHN0cmljdCc7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLmRhdGUudG8tcHJpbWl0aXZlJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC50by1wcmltaXRpdmUnKTtcbnZhciBXcmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLXdyYXBwZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBXcmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlLmYoJ3RvUHJpbWl0aXZlJyk7XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL2Z1bGwvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eScpO1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9mdWxsL3N5bWJvbCcpO1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9mdWxsL3N5bWJvbC9pdGVyYXRvcicpO1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9mdWxsL3N5bWJvbC90by1wcmltaXRpdmUnKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9hY3R1YWwvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9hY3R1YWwvc3ltYm9sJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzbmV4dC5zeW1ib2wuaXMtcmVnaXN0ZXJlZC1zeW1ib2wnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXNuZXh0LnN5bWJvbC5pcy13ZWxsLWtub3duLXN5bWJvbCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lc25leHQuc3ltYm9sLm1hdGNoZXInKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXNuZXh0LnN5bWJvbC5vYnNlcnZhYmxlJyk7XG4vLyBUT0RPOiBSZW1vdmUgZnJvbSBgY29yZS1qc0A0YFxucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lc25leHQuc3ltYm9sLmlzLXJlZ2lzdGVyZWQnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXNuZXh0LnN5bWJvbC5pcy13ZWxsLWtub3duJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzbmV4dC5zeW1ib2wubWV0YWRhdGEta2V5Jyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzbmV4dC5zeW1ib2wucGF0dGVybi1tYXRjaCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lc25leHQuc3ltYm9sLnJlcGxhY2UtYWxsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2FjdHVhbC9zeW1ib2wvaXRlcmF0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vYWN0dWFsL3N5bWJvbC90by1wcmltaXRpdmUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIHRyeVRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RyeS10by1zdHJpbmcnKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGBBc3NlcnQ6IElzQ2FsbGFibGUoYXJndW1lbnQpIGlzIHRydWVgXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICBpZiAoaXNDYWxsYWJsZShhcmd1bWVudCkpIHJldHVybiBhcmd1bWVudDtcbiAgdGhyb3cgbmV3ICRUeXBlRXJyb3IodHJ5VG9TdHJpbmcoYXJndW1lbnQpICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG5cbnZhciAkU3RyaW5nID0gU3RyaW5nO1xudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIGlmICh0eXBlb2YgYXJndW1lbnQgPT0gJ29iamVjdCcgfHwgaXNDYWxsYWJsZShhcmd1bWVudCkpIHJldHVybiBhcmd1bWVudDtcbiAgdGhyb3cgbmV3ICRUeXBlRXJyb3IoXCJDYW4ndCBzZXQgXCIgKyAkU3RyaW5nKGFyZ3VtZW50KSArICcgYXMgYSBwcm90b3R5cGUnKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyICRTdHJpbmcgPSBTdHJpbmc7XG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYEFzc2VydDogVHlwZShhcmd1bWVudCkgaXMgT2JqZWN0YFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgaWYgKGlzT2JqZWN0KGFyZ3VtZW50KSkgcmV0dXJuIGFyZ3VtZW50O1xuICB0aHJvdyBuZXcgJFR5cGVFcnJvcigkU3RyaW5nKGFyZ3VtZW50KSArICcgaXMgbm90IGFuIG9iamVjdCcpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5mb3JFYWNoO1xudmFyIGFycmF5TWV0aG9kSXNTdHJpY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdCcpO1xuXG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ2ZvckVhY2gnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbm1vZHVsZS5leHBvcnRzID0gIVNUUklDVF9NRVRIT0QgPyBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gIHJldHVybiAkZm9yRWFjaCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tYXJyYXktcHJvdG90eXBlLWZvcmVhY2ggLS0gc2FmZVxufSA6IFtdLmZvckVhY2g7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG52YXIgbGVuZ3RoT2ZBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbGVuZ3RoLW9mLWFycmF5LWxpa2UnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGluZGV4T2YsIGluY2x1ZGVzIH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gbGVuZ3RoT2ZBcnJheUxpa2UoTyk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmUgLS0gTmFOIGNoZWNrXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9PSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgICAgaWYgKHZhbHVlICE9PSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgaWYgKChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSAmJiBPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5jbHVkZXNcbiAgaW5jbHVkZXM6IGNyZWF0ZU1ldGhvZCh0cnVlKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5pbmRleE9mYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5kZXhvZlxuICBpbmRleE9mOiBjcmVhdGVNZXRob2QoZmFsc2UpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIGxlbmd0aE9mQXJyYXlMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2xlbmd0aC1vZi1hcnJheS1saWtlJyk7XG52YXIgYXJyYXlTcGVjaWVzQ3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG5cbnZhciBwdXNoID0gdW5jdXJyeVRoaXMoW10ucHVzaCk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUueyBmb3JFYWNoLCBtYXAsIGZpbHRlciwgc29tZSwgZXZlcnksIGZpbmQsIGZpbmRJbmRleCwgZmlsdGVyUmVqZWN0IH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoVFlQRSkge1xuICB2YXIgSVNfTUFQID0gVFlQRSA9PT0gMTtcbiAgdmFyIElTX0ZJTFRFUiA9IFRZUEUgPT09IDI7XG4gIHZhciBJU19TT01FID0gVFlQRSA9PT0gMztcbiAgdmFyIElTX0VWRVJZID0gVFlQRSA9PT0gNDtcbiAgdmFyIElTX0ZJTkRfSU5ERVggPSBUWVBFID09PSA2O1xuICB2YXIgSVNfRklMVEVSX1JFSkVDVCA9IFRZUEUgPT09IDc7XG4gIHZhciBOT19IT0xFUyA9IFRZUEUgPT09IDUgfHwgSVNfRklORF9JTkRFWDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgY2FsbGJhY2tmbiwgdGhhdCwgc3BlY2lmaWNDcmVhdGUpIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgc2VsZiA9IEluZGV4ZWRPYmplY3QoTyk7XG4gICAgdmFyIGJvdW5kRnVuY3Rpb24gPSBiaW5kKGNhbGxiYWNrZm4sIHRoYXQpO1xuICAgIHZhciBsZW5ndGggPSBsZW5ndGhPZkFycmF5TGlrZShzZWxmKTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBjcmVhdGUgPSBzcGVjaWZpY0NyZWF0ZSB8fCBhcnJheVNwZWNpZXNDcmVhdGU7XG4gICAgdmFyIHRhcmdldCA9IElTX01BUCA/IGNyZWF0ZSgkdGhpcywgbGVuZ3RoKSA6IElTX0ZJTFRFUiB8fCBJU19GSUxURVJfUkVKRUNUID8gY3JlYXRlKCR0aGlzLCAwKSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgdmFsdWUsIHJlc3VsdDtcbiAgICBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKE5PX0hPTEVTIHx8IGluZGV4IGluIHNlbGYpIHtcbiAgICAgIHZhbHVlID0gc2VsZltpbmRleF07XG4gICAgICByZXN1bHQgPSBib3VuZEZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgTyk7XG4gICAgICBpZiAoVFlQRSkge1xuICAgICAgICBpZiAoSVNfTUFQKSB0YXJnZXRbaW5kZXhdID0gcmVzdWx0OyAvLyBtYXBcbiAgICAgICAgZWxzZSBpZiAocmVzdWx0KSBzd2l0Y2ggKFRZUEUpIHtcbiAgICAgICAgICBjYXNlIDM6IHJldHVybiB0cnVlOyAgICAgICAgICAgICAgLy8gc29tZVxuICAgICAgICAgIGNhc2UgNTogcmV0dXJuIHZhbHVlOyAgICAgICAgICAgICAvLyBmaW5kXG4gICAgICAgICAgY2FzZSA2OiByZXR1cm4gaW5kZXg7ICAgICAgICAgICAgIC8vIGZpbmRJbmRleFxuICAgICAgICAgIGNhc2UgMjogcHVzaCh0YXJnZXQsIHZhbHVlKTsgICAgICAvLyBmaWx0ZXJcbiAgICAgICAgfSBlbHNlIHN3aXRjaCAoVFlQRSkge1xuICAgICAgICAgIGNhc2UgNDogcmV0dXJuIGZhbHNlOyAgICAgICAgICAgICAvLyBldmVyeVxuICAgICAgICAgIGNhc2UgNzogcHVzaCh0YXJnZXQsIHZhbHVlKTsgICAgICAvLyBmaWx0ZXJSZWplY3RcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gSVNfRklORF9JTkRFWCA/IC0xIDogSVNfU09NRSB8fCBJU19FVkVSWSA/IElTX0VWRVJZIDogdGFyZ2V0O1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbiAgZm9yRWFjaDogY3JlYXRlTWV0aG9kKDApLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLm1hcGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLm1hcFxuICBtYXA6IGNyZWF0ZU1ldGhvZCgxKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maWx0ZXJgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maWx0ZXJcbiAgZmlsdGVyOiBjcmVhdGVNZXRob2QoMiksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuc29tZWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnNvbWVcbiAgc29tZTogY3JlYXRlTWV0aG9kKDMpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmV2ZXJ5YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZXZlcnlcbiAgZXZlcnk6IGNyZWF0ZU1ldGhvZCg0KSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maW5kYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmluZFxuICBmaW5kOiBjcmVhdGVNZXRob2QoNSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmluZEluZGV4YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmluZEluZGV4XG4gIGZpbmRJbmRleDogY3JlYXRlTWV0aG9kKDYpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmZpbHRlclJlamVjdGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLWFycmF5LWZpbHRlcmluZ1xuICBmaWx0ZXJSZWplY3Q6IGNyZWF0ZU1ldGhvZCg3KVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIFY4X1ZFUlNJT04gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24nKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUpIHtcbiAgLy8gV2UgY2FuJ3QgdXNlIHRoaXMgZmVhdHVyZSBkZXRlY3Rpb24gaW4gVjggc2luY2UgaXQgY2F1c2VzXG4gIC8vIGRlb3B0aW1pemF0aW9uIGFuZCBzZXJpb3VzIHBlcmZvcm1hbmNlIGRlZ3JhZGF0aW9uXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy82NzdcbiAgcmV0dXJuIFY4X1ZFUlNJT04gPj0gNTEgfHwgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICB2YXIgY29uc3RydWN0b3IgPSBhcnJheS5jb25zdHJ1Y3RvciA9IHt9O1xuICAgIGNvbnN0cnVjdG9yW1NQRUNJRVNdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHsgZm9vOiAxIH07XG4gICAgfTtcbiAgICByZXR1cm4gYXJyYXlbTUVUSE9EX05BTUVdKEJvb2xlYW4pLmZvbyAhPT0gMTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE1FVEhPRF9OQU1FLCBhcmd1bWVudCkge1xuICB2YXIgbWV0aG9kID0gW11bTUVUSE9EX05BTUVdO1xuICByZXR1cm4gISFtZXRob2QgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWNhbGwgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgICBtZXRob2QuY2FsbChudWxsLCBhcmd1bWVudCB8fCBmdW5jdGlvbiAoKSB7IHJldHVybiAxOyB9LCAxKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xudmFyIGxlbmd0aE9mQXJyYXlMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2xlbmd0aC1vZi1hcnJheS1saWtlJyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5Jyk7XG5cbnZhciAkQXJyYXkgPSBBcnJheTtcbnZhciBtYXggPSBNYXRoLm1heDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuZ3RoID0gbGVuZ3RoT2ZBcnJheUxpa2UoTyk7XG4gIHZhciBrID0gdG9BYnNvbHV0ZUluZGV4KHN0YXJ0LCBsZW5ndGgpO1xuICB2YXIgZmluID0gdG9BYnNvbHV0ZUluZGV4KGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuZ3RoIDogZW5kLCBsZW5ndGgpO1xuICB2YXIgcmVzdWx0ID0gJEFycmF5KG1heChmaW4gLSBrLCAwKSk7XG4gIHZhciBuID0gMDtcbiAgZm9yICg7IGsgPCBmaW47IGsrKywgbisrKSBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIG4sIE9ba10pO1xuICByZXN1bHQubGVuZ3RoID0gbjtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdW5jdXJyeVRoaXMoW10uc2xpY2UpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciBpc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNvbnN0cnVjdG9yJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG52YXIgJEFycmF5ID0gQXJyYXk7XG5cbi8vIGEgcGFydCBvZiBgQXJyYXlTcGVjaWVzQ3JlYXRlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXlzcGVjaWVzY3JlYXRlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcmlnaW5hbEFycmF5KSB7XG4gIHZhciBDO1xuICBpZiAoaXNBcnJheShvcmlnaW5hbEFycmF5KSkge1xuICAgIEMgPSBvcmlnaW5hbEFycmF5LmNvbnN0cnVjdG9yO1xuICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgaWYgKGlzQ29uc3RydWN0b3IoQykgJiYgKEMgPT09ICRBcnJheSB8fCBpc0FycmF5KEMucHJvdG90eXBlKSkpIEMgPSB1bmRlZmluZWQ7XG4gICAgZWxzZSBpZiAoaXNPYmplY3QoQykpIHtcbiAgICAgIEMgPSBDW1NQRUNJRVNdO1xuICAgICAgaWYgKEMgPT09IG51bGwpIEMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9IHJldHVybiBDID09PSB1bmRlZmluZWQgPyAkQXJyYXkgOiBDO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhcnJheVNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG5cbi8vIGBBcnJheVNwZWNpZXNDcmVhdGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheXNwZWNpZXNjcmVhdGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9yaWdpbmFsQXJyYXksIGxlbmd0aCkge1xuICByZXR1cm4gbmV3IChhcnJheVNwZWNpZXNDb25zdHJ1Y3RvcihvcmlnaW5hbEFycmF5KSkobGVuZ3RoID09PSAwID8gMCA6IGxlbmd0aCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG52YXIgdG9TdHJpbmcgPSB1bmN1cnJ5VGhpcyh7fS50b1N0cmluZyk7XG52YXIgc3RyaW5nU2xpY2UgPSB1bmN1cnJ5VGhpcygnJy5zbGljZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBzdHJpbmdTbGljZSh0b1N0cmluZyhpdCksIDgsIC0xKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgVE9fU1RSSU5HX1RBR19TVVBQT1JUID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBjbGFzc29mUmF3ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xudmFyICRPYmplY3QgPSBPYmplY3Q7XG5cbi8vIEVTMyB3cm9uZyBoZXJlXG52YXIgQ09SUkVDVF9BUkdVTUVOVFMgPSBjbGFzc29mUmF3KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxufTtcblxuLy8gZ2V0dGluZyB0YWcgZnJvbSBFUzYrIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYFxubW9kdWxlLmV4cG9ydHMgPSBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPyBjbGFzc29mUmF3IDogZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPLCB0YWcsIHJlc3VsdDtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKHRhZyA9IHRyeUdldChPID0gJE9iamVjdChpdCksIFRPX1NUUklOR19UQUcpKSA9PSAnc3RyaW5nJyA/IHRhZ1xuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQ09SUkVDVF9BUkdVTUVOVFMgPyBjbGFzc29mUmF3KE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKHJlc3VsdCA9IGNsYXNzb2ZSYXcoTykpID09PSAnT2JqZWN0JyAmJiBpc0NhbGxhYmxlKE8uY2FsbGVlKSA/ICdBcmd1bWVudHMnIDogcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIE1BVENIID0gd2VsbEtub3duU3ltYm9sKCdtYXRjaCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSkge1xuICB2YXIgcmVnZXhwID0gLy4vO1xuICB0cnkge1xuICAgICcvLi8nW01FVEhPRF9OQU1FXShyZWdleHApO1xuICB9IGNhdGNoIChlcnJvcjEpIHtcbiAgICB0cnkge1xuICAgICAgcmVnZXhwW01BVENIXSA9IGZhbHNlO1xuICAgICAgcmV0dXJuICcvLi8nW01FVEhPRF9OQU1FXShyZWdleHApO1xuICAgIH0gY2F0Y2ggKGVycm9yMikgeyAvKiBlbXB0eSAqLyB9XG4gIH0gcmV0dXJuIGZhbHNlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEYoKSB7IC8qIGVtcHR5ICovIH1cbiAgRi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBudWxsO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldHByb3RvdHlwZW9mIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2YobmV3IEYoKSkgIT09IEYucHJvdG90eXBlO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBgQ3JlYXRlSXRlclJlc3VsdE9iamVjdGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWNyZWF0ZWl0ZXJyZXN1bHRvYmplY3Rcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlLCBkb25lKSB7XG4gIHJldHVybiB7IHZhbHVlOiB2YWx1ZSwgZG9uZTogZG9uZSB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5TW9kdWxlLmYob2JqZWN0LCBrZXksIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvUHJvcGVydHlLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJvcGVydHkta2V5Jyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgdmFyIHByb3BlcnR5S2V5ID0gdG9Qcm9wZXJ0eUtleShrZXkpO1xuICBpZiAocHJvcGVydHlLZXkgaW4gb2JqZWN0KSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKG9iamVjdCwgcHJvcGVydHlLZXksIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigwLCB2YWx1ZSkpO1xuICBlbHNlIG9iamVjdFtwcm9wZXJ0eUtleV0gPSB2YWx1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIG5hbWUsIGRlc2NyaXB0b3IpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5LmYodGFyZ2V0LCBuYW1lLCBkZXNjcmlwdG9yKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5lbnVtZXJhYmxlKSB0YXJnZXRba2V5XSA9IHZhbHVlO1xuICBlbHNlIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgdmFsdWUpO1xuICByZXR1cm4gdGFyZ2V0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gc2FmZVxudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgZGVmaW5lUHJvcGVydHkoZ2xvYmFsLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGdsb2JhbFtrZXldID0gdmFsdWU7XG4gIH0gcmV0dXJuIHZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBEZXRlY3QgSUU4J3MgaW5jb21wbGV0ZSBkZWZpbmVQcm9wZXJ0eSBpbXBsZW1lbnRhdGlvblxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sIDEsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pWzFdICE9PSA3O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZG9jdW1lbnRBbGwgPSB0eXBlb2YgZG9jdW1lbnQgPT0gJ29iamVjdCcgJiYgZG9jdW1lbnQuYWxsO1xuXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLUlzSFRNTEREQS1pbnRlcm5hbC1zbG90XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9uby10eXBlb2YtdW5kZWZpbmVkIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG52YXIgSVNfSFRNTEREQSA9IHR5cGVvZiBkb2N1bWVudEFsbCA9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudEFsbCAhPT0gdW5kZWZpbmVkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWxsOiBkb2N1bWVudEFsbCxcbiAgSVNfSFRNTEREQTogSVNfSFRNTEREQVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciBkb2N1bWVudCA9IGdsb2JhbC5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIEVYSVNUUyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEVYSVNUUyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDB4MUZGRkZGRkZGRkZGRkY7IC8vIDIgKiogNTMgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID4gTUFYX1NBRkVfSU5URUdFUikgdGhyb3cgJFR5cGVFcnJvcignTWF4aW11bSBhbGxvd2VkIGluZGV4IGV4Y2VlZGVkJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyBpdGVyYWJsZSBET00gY29sbGVjdGlvbnNcbi8vIGZsYWcgLSBgaXRlcmFibGVgIGludGVyZmFjZSAtICdlbnRyaWVzJywgJ2tleXMnLCAndmFsdWVzJywgJ2ZvckVhY2gnIG1ldGhvZHNcbm1vZHVsZS5leHBvcnRzID0ge1xuICBDU1NSdWxlTGlzdDogMCxcbiAgQ1NTU3R5bGVEZWNsYXJhdGlvbjogMCxcbiAgQ1NTVmFsdWVMaXN0OiAwLFxuICBDbGllbnRSZWN0TGlzdDogMCxcbiAgRE9NUmVjdExpc3Q6IDAsXG4gIERPTVN0cmluZ0xpc3Q6IDAsXG4gIERPTVRva2VuTGlzdDogMSxcbiAgRGF0YVRyYW5zZmVySXRlbUxpc3Q6IDAsXG4gIEZpbGVMaXN0OiAwLFxuICBIVE1MQWxsQ29sbGVjdGlvbjogMCxcbiAgSFRNTENvbGxlY3Rpb246IDAsXG4gIEhUTUxGb3JtRWxlbWVudDogMCxcbiAgSFRNTFNlbGVjdEVsZW1lbnQ6IDAsXG4gIE1lZGlhTGlzdDogMCxcbiAgTWltZVR5cGVBcnJheTogMCxcbiAgTmFtZWROb2RlTWFwOiAwLFxuICBOb2RlTGlzdDogMSxcbiAgUGFpbnRSZXF1ZXN0TGlzdDogMCxcbiAgUGx1Z2luOiAwLFxuICBQbHVnaW5BcnJheTogMCxcbiAgU1ZHTGVuZ3RoTGlzdDogMCxcbiAgU1ZHTnVtYmVyTGlzdDogMCxcbiAgU1ZHUGF0aFNlZ0xpc3Q6IDAsXG4gIFNWR1BvaW50TGlzdDogMCxcbiAgU1ZHU3RyaW5nTGlzdDogMCxcbiAgU1ZHVHJhbnNmb3JtTGlzdDogMCxcbiAgU291cmNlQnVmZmVyTGlzdDogMCxcbiAgU3R5bGVTaGVldExpc3Q6IDAsXG4gIFRleHRUcmFja0N1ZUxpc3Q6IDAsXG4gIFRleHRUcmFja0xpc3Q6IDAsXG4gIFRvdWNoTGlzdDogMFxufTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gdHlwZW9mIG5hdmlnYXRvciAhPSAndW5kZWZpbmVkJyAmJiBTdHJpbmcobmF2aWdhdG9yLnVzZXJBZ2VudCkgfHwgJyc7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIERlbm8gPSBnbG9iYWwuRGVubztcbnZhciB2ZXJzaW9ucyA9IHByb2Nlc3MgJiYgcHJvY2Vzcy52ZXJzaW9ucyB8fCBEZW5vICYmIERlbm8udmVyc2lvbjtcbnZhciB2OCA9IHZlcnNpb25zICYmIHZlcnNpb25zLnY4O1xudmFyIG1hdGNoLCB2ZXJzaW9uO1xuXG5pZiAodjgpIHtcbiAgbWF0Y2ggPSB2OC5zcGxpdCgnLicpO1xuICAvLyBpbiBvbGQgQ2hyb21lLCB2ZXJzaW9ucyBvZiBWOCBpc24ndCBWOCA9IENocm9tZSAvIDEwXG4gIC8vIGJ1dCB0aGVpciBjb3JyZWN0IHZlcnNpb25zIGFyZSBub3QgaW50ZXJlc3RpbmcgZm9yIHVzXG4gIHZlcnNpb24gPSBtYXRjaFswXSA+IDAgJiYgbWF0Y2hbMF0gPCA0ID8gMSA6ICsobWF0Y2hbMF0gKyBtYXRjaFsxXSk7XG59XG5cbi8vIEJyb3dzZXJGUyBOb2RlSlMgYHByb2Nlc3NgIHBvbHlmaWxsIGluY29ycmVjdGx5IHNldCBgLnY4YCB0byBgMC4wYFxuLy8gc28gY2hlY2sgYHVzZXJBZ2VudGAgZXZlbiBpZiBgLnY4YCBleGlzdHMsIGJ1dCAwXG5pZiAoIXZlcnNpb24gJiYgdXNlckFnZW50KSB7XG4gIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvKFxcZCspLyk7XG4gIGlmICghbWF0Y2ggfHwgbWF0Y2hbMV0gPj0gNzQpIHtcbiAgICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvQ2hyb21lXFwvKFxcZCspLyk7XG4gICAgaWYgKG1hdGNoKSB2ZXJzaW9uID0gK21hdGNoWzFdO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmVyc2lvbjtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIElFOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gICdjb25zdHJ1Y3RvcicsXG4gICdoYXNPd25Qcm9wZXJ0eScsXG4gICdpc1Byb3RvdHlwZU9mJyxcbiAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgJ3RvTG9jYWxlU3RyaW5nJyxcbiAgJ3RvU3RyaW5nJyxcbiAgJ3ZhbHVlT2YnXG5dO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBhcHBseSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1hcHBseScpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcy1jbGF1c2UnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIGlzRm9yY2VkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWZvcmNlZCcpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGF0aCcpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG5cbnZhciB3cmFwQ29uc3RydWN0b3IgPSBmdW5jdGlvbiAoTmF0aXZlQ29uc3RydWN0b3IpIHtcbiAgdmFyIFdyYXBwZXIgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgV3JhcHBlcikge1xuICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBOYXRpdmVDb25zdHJ1Y3RvcigpO1xuICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgTmF0aXZlQ29uc3RydWN0b3IoYSk7XG4gICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBOYXRpdmVDb25zdHJ1Y3RvcihhLCBiKTtcbiAgICAgIH0gcmV0dXJuIG5ldyBOYXRpdmVDb25zdHJ1Y3RvcihhLCBiLCBjKTtcbiAgICB9IHJldHVybiBhcHBseShOYXRpdmVDb25zdHJ1Y3RvciwgdGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbiAgV3JhcHBlci5wcm90b3R5cGUgPSBOYXRpdmVDb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIHJldHVybiBXcmFwcGVyO1xufTtcblxuLypcbiAgb3B0aW9ucy50YXJnZXQgICAgICAgICAtIG5hbWUgb2YgdGhlIHRhcmdldCBvYmplY3RcbiAgb3B0aW9ucy5nbG9iYWwgICAgICAgICAtIHRhcmdldCBpcyB0aGUgZ2xvYmFsIG9iamVjdFxuICBvcHRpb25zLnN0YXQgICAgICAgICAgIC0gZXhwb3J0IGFzIHN0YXRpYyBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnByb3RvICAgICAgICAgIC0gZXhwb3J0IGFzIHByb3RvdHlwZSBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnJlYWwgICAgICAgICAgIC0gcmVhbCBwcm90b3R5cGUgbWV0aG9kIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy5mb3JjZWQgICAgICAgICAtIGV4cG9ydCBldmVuIGlmIHRoZSBuYXRpdmUgZmVhdHVyZSBpcyBhdmFpbGFibGVcbiAgb3B0aW9ucy5iaW5kICAgICAgICAgICAtIGJpbmQgbWV0aG9kcyB0byB0aGUgdGFyZ2V0LCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMud3JhcCAgICAgICAgICAgLSB3cmFwIGNvbnN0cnVjdG9ycyB0byBwcmV2ZW50aW5nIGdsb2JhbCBwb2xsdXRpb24sIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy51bnNhZmUgICAgICAgICAtIHVzZSB0aGUgc2ltcGxlIGFzc2lnbm1lbnQgb2YgcHJvcGVydHkgaW5zdGVhZCBvZiBkZWxldGUgKyBkZWZpbmVQcm9wZXJ0eVxuICBvcHRpb25zLnNoYW0gICAgICAgICAgIC0gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICBvcHRpb25zLmVudW1lcmFibGUgICAgIC0gZXhwb3J0IGFzIGVudW1lcmFibGUgcHJvcGVydHlcbiAgb3B0aW9ucy5kb250Q2FsbEdldFNldCAtIHByZXZlbnQgY2FsbGluZyBhIGdldHRlciBvbiB0YXJnZXRcbiAgb3B0aW9ucy5uYW1lICAgICAgICAgICAtIHRoZSAubmFtZSBvZiB0aGUgZnVuY3Rpb24gaWYgaXQgZG9lcyBub3QgbWF0Y2ggdGhlIGtleVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdGlvbnMsIHNvdXJjZSkge1xuICB2YXIgVEFSR0VUID0gb3B0aW9ucy50YXJnZXQ7XG4gIHZhciBHTE9CQUwgPSBvcHRpb25zLmdsb2JhbDtcbiAgdmFyIFNUQVRJQyA9IG9wdGlvbnMuc3RhdDtcbiAgdmFyIFBST1RPID0gb3B0aW9ucy5wcm90bztcblxuICB2YXIgbmF0aXZlU291cmNlID0gR0xPQkFMID8gZ2xvYmFsIDogU1RBVElDID8gZ2xvYmFsW1RBUkdFVF0gOiAoZ2xvYmFsW1RBUkdFVF0gfHwge30pLnByb3RvdHlwZTtcblxuICB2YXIgdGFyZ2V0ID0gR0xPQkFMID8gcGF0aCA6IHBhdGhbVEFSR0VUXSB8fCBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkocGF0aCwgVEFSR0VULCB7fSlbVEFSR0VUXTtcbiAgdmFyIHRhcmdldFByb3RvdHlwZSA9IHRhcmdldC5wcm90b3R5cGU7XG5cbiAgdmFyIEZPUkNFRCwgVVNFX05BVElWRSwgVklSVFVBTF9QUk9UT1RZUEU7XG4gIHZhciBrZXksIHNvdXJjZVByb3BlcnR5LCB0YXJnZXRQcm9wZXJ0eSwgbmF0aXZlUHJvcGVydHksIHJlc3VsdFByb3BlcnR5LCBkZXNjcmlwdG9yO1xuXG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIEZPUkNFRCA9IGlzRm9yY2VkKEdMT0JBTCA/IGtleSA6IFRBUkdFVCArIChTVEFUSUMgPyAnLicgOiAnIycpICsga2V5LCBvcHRpb25zLmZvcmNlZCk7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgVVNFX05BVElWRSA9ICFGT1JDRUQgJiYgbmF0aXZlU291cmNlICYmIGhhc093bihuYXRpdmVTb3VyY2UsIGtleSk7XG5cbiAgICB0YXJnZXRQcm9wZXJ0eSA9IHRhcmdldFtrZXldO1xuXG4gICAgaWYgKFVTRV9OQVRJVkUpIGlmIChvcHRpb25zLmRvbnRDYWxsR2V0U2V0KSB7XG4gICAgICBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG5hdGl2ZVNvdXJjZSwga2V5KTtcbiAgICAgIG5hdGl2ZVByb3BlcnR5ID0gZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLnZhbHVlO1xuICAgIH0gZWxzZSBuYXRpdmVQcm9wZXJ0eSA9IG5hdGl2ZVNvdXJjZVtrZXldO1xuXG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBpbXBsZW1lbnRhdGlvblxuICAgIHNvdXJjZVByb3BlcnR5ID0gKFVTRV9OQVRJVkUgJiYgbmF0aXZlUHJvcGVydHkpID8gbmF0aXZlUHJvcGVydHkgOiBzb3VyY2Vba2V5XTtcblxuICAgIGlmIChVU0VfTkFUSVZFICYmIHR5cGVvZiB0YXJnZXRQcm9wZXJ0eSA9PSB0eXBlb2Ygc291cmNlUHJvcGVydHkpIGNvbnRpbnVlO1xuXG4gICAgLy8gYmluZCBtZXRob2RzIHRvIGdsb2JhbCBmb3IgY2FsbGluZyBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgaWYgKG9wdGlvbnMuYmluZCAmJiBVU0VfTkFUSVZFKSByZXN1bHRQcm9wZXJ0eSA9IGJpbmQoc291cmNlUHJvcGVydHksIGdsb2JhbCk7XG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZXMgaW4gdGhpcyB2ZXJzaW9uXG4gICAgZWxzZSBpZiAob3B0aW9ucy53cmFwICYmIFVTRV9OQVRJVkUpIHJlc3VsdFByb3BlcnR5ID0gd3JhcENvbnN0cnVjdG9yKHNvdXJjZVByb3BlcnR5KTtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICBlbHNlIGlmIChQUk9UTyAmJiBpc0NhbGxhYmxlKHNvdXJjZVByb3BlcnR5KSkgcmVzdWx0UHJvcGVydHkgPSB1bmN1cnJ5VGhpcyhzb3VyY2VQcm9wZXJ0eSk7XG4gICAgLy8gZGVmYXVsdCBjYXNlXG4gICAgZWxzZSByZXN1bHRQcm9wZXJ0eSA9IHNvdXJjZVByb3BlcnR5O1xuXG4gICAgLy8gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICAgIGlmIChvcHRpb25zLnNoYW0gfHwgKHNvdXJjZVByb3BlcnR5ICYmIHNvdXJjZVByb3BlcnR5LnNoYW0pIHx8ICh0YXJnZXRQcm9wZXJ0eSAmJiB0YXJnZXRQcm9wZXJ0eS5zaGFtKSkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHJlc3VsdFByb3BlcnR5LCAnc2hhbScsIHRydWUpO1xuICAgIH1cblxuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgcmVzdWx0UHJvcGVydHkpO1xuXG4gICAgaWYgKFBST1RPKSB7XG4gICAgICBWSVJUVUFMX1BST1RPVFlQRSA9IFRBUkdFVCArICdQcm90b3R5cGUnO1xuICAgICAgaWYgKCFoYXNPd24ocGF0aCwgVklSVFVBTF9QUk9UT1RZUEUpKSB7XG4gICAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShwYXRoLCBWSVJUVUFMX1BST1RPVFlQRSwge30pO1xuICAgICAgfVxuICAgICAgLy8gZXhwb3J0IHZpcnR1YWwgcHJvdG90eXBlIG1ldGhvZHNcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShwYXRoW1ZJUlRVQUxfUFJPVE9UWVBFXSwga2V5LCBzb3VyY2VQcm9wZXJ0eSk7XG4gICAgICAvLyBleHBvcnQgcmVhbCBwcm90b3R5cGUgbWV0aG9kc1xuICAgICAgaWYgKG9wdGlvbnMucmVhbCAmJiB0YXJnZXRQcm90b3R5cGUgJiYgKEZPUkNFRCB8fCAhdGFyZ2V0UHJvdG90eXBlW2tleV0pKSB7XG4gICAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSh0YXJnZXRQcm90b3R5cGUsIGtleSwgc291cmNlUHJvcGVydHkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgTkFUSVZFX0JJTkQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUnKTtcblxudmFyIEZ1bmN0aW9uUHJvdG90eXBlID0gRnVuY3Rpb24ucHJvdG90eXBlO1xudmFyIGFwcGx5ID0gRnVuY3Rpb25Qcm90b3R5cGUuYXBwbHk7XG52YXIgY2FsbCA9IEZ1bmN0aW9uUHJvdG90eXBlLmNhbGw7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1yZWZsZWN0IC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gdHlwZW9mIFJlZmxlY3QgPT0gJ29iamVjdCcgJiYgUmVmbGVjdC5hcHBseSB8fCAoTkFUSVZFX0JJTkQgPyBjYWxsLmJpbmQoYXBwbHkpIDogZnVuY3Rpb24gKCkge1xuICByZXR1cm4gY2FsbC5hcHBseShhcHBseSwgYXJndW1lbnRzKTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcy1jbGF1c2UnKTtcbnZhciBhQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1jYWxsYWJsZScpO1xudmFyIE5BVElWRV9CSU5EID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlJyk7XG5cbnZhciBiaW5kID0gdW5jdXJyeVRoaXModW5jdXJyeVRoaXMuYmluZCk7XG5cbi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQpIHtcbiAgYUNhbGxhYmxlKGZuKTtcbiAgcmV0dXJuIHRoYXQgPT09IHVuZGVmaW5lZCA/IGZuIDogTkFUSVZFX0JJTkQgPyBiaW5kKGZuLCB0aGF0KSA6IGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLWZ1bmN0aW9uLXByb3RvdHlwZS1iaW5kIC0tIHNhZmVcbiAgdmFyIHRlc3QgPSAoZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9KS5iaW5kKCk7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnMgLS0gc2FmZVxuICByZXR1cm4gdHlwZW9mIHRlc3QgIT0gJ2Z1bmN0aW9uJyB8fCB0ZXN0Lmhhc093blByb3BlcnR5KCdwcm90b3R5cGUnKTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIE5BVElWRV9CSU5EID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlJyk7XG5cbnZhciBjYWxsID0gRnVuY3Rpb24ucHJvdG90eXBlLmNhbGw7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX0JJTkQgPyBjYWxsLmJpbmQoY2FsbCkgOiBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBjYWxsLmFwcGx5KGNhbGwsIGFyZ3VtZW50cyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcblxudmFyIEZ1bmN0aW9uUHJvdG90eXBlID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyIGdldERlc2NyaXB0b3IgPSBERVNDUklQVE9SUyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG52YXIgRVhJU1RTID0gaGFzT3duKEZ1bmN0aW9uUHJvdG90eXBlLCAnbmFtZScpO1xuLy8gYWRkaXRpb25hbCBwcm90ZWN0aW9uIGZyb20gbWluaWZpZWQgLyBtYW5nbGVkIC8gZHJvcHBlZCBmdW5jdGlvbiBuYW1lc1xudmFyIFBST1BFUiA9IEVYSVNUUyAmJiAoZnVuY3Rpb24gc29tZXRoaW5nKCkgeyAvKiBlbXB0eSAqLyB9KS5uYW1lID09PSAnc29tZXRoaW5nJztcbnZhciBDT05GSUdVUkFCTEUgPSBFWElTVFMgJiYgKCFERVNDUklQVE9SUyB8fCAoREVTQ1JJUFRPUlMgJiYgZ2V0RGVzY3JpcHRvcihGdW5jdGlvblByb3RvdHlwZSwgJ25hbWUnKS5jb25maWd1cmFibGUpKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEVYSVNUUzogRVhJU1RTLFxuICBQUk9QRVI6IFBST1BFUixcbiAgQ09ORklHVVJBQkxFOiBDT05GSUdVUkFCTEVcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgYUNhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtY2FsbGFibGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBrZXksIG1ldGhvZCkge1xuICB0cnkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbiAgICByZXR1cm4gdW5jdXJyeVRoaXMoYUNhbGxhYmxlKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBrZXkpW21ldGhvZF0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjbGFzc29mUmF3ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuKSB7XG4gIC8vIE5hc2hvcm4gYnVnOlxuICAvLyAgIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xMTI4XG4gIC8vICAgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzExMzBcbiAgaWYgKGNsYXNzb2ZSYXcoZm4pID09PSAnRnVuY3Rpb24nKSByZXR1cm4gdW5jdXJyeVRoaXMoZm4pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBOQVRJVkVfQklORCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLW5hdGl2ZScpO1xuXG52YXIgRnVuY3Rpb25Qcm90b3R5cGUgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG52YXIgY2FsbCA9IEZ1bmN0aW9uUHJvdG90eXBlLmNhbGw7XG52YXIgdW5jdXJyeVRoaXNXaXRoQmluZCA9IE5BVElWRV9CSU5EICYmIEZ1bmN0aW9uUHJvdG90eXBlLmJpbmQuYmluZChjYWxsLCBjYWxsKTtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfQklORCA/IHVuY3VycnlUaGlzV2l0aEJpbmQgOiBmdW5jdGlvbiAoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gY2FsbC5hcHBseShmbiwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDT05TVFJVQ1RPUiwgTUVUSE9EKSB7XG4gIHZhciBOYW1lc3BhY2UgPSBwYXRoW0NPTlNUUlVDVE9SICsgJ1Byb3RvdHlwZSddO1xuICB2YXIgcHVyZU1ldGhvZCA9IE5hbWVzcGFjZSAmJiBOYW1lc3BhY2VbTUVUSE9EXTtcbiAgaWYgKHB1cmVNZXRob2QpIHJldHVybiBwdXJlTWV0aG9kO1xuICB2YXIgTmF0aXZlQ29uc3RydWN0b3IgPSBnbG9iYWxbQ09OU1RSVUNUT1JdO1xuICB2YXIgTmF0aXZlUHJvdG90eXBlID0gTmF0aXZlQ29uc3RydWN0b3IgJiYgTmF0aXZlQ29uc3RydWN0b3IucHJvdG90eXBlO1xuICByZXR1cm4gTmF0aXZlUHJvdG90eXBlICYmIE5hdGl2ZVByb3RvdHlwZVtNRVRIT0RdO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BhdGgnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xuXG52YXIgYUZ1bmN0aW9uID0gZnVuY3Rpb24gKHZhcmlhYmxlKSB7XG4gIHJldHVybiBpc0NhbGxhYmxlKHZhcmlhYmxlKSA/IHZhcmlhYmxlIDogdW5kZWZpbmVkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZXNwYWNlLCBtZXRob2QpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAyID8gYUZ1bmN0aW9uKHBhdGhbbmFtZXNwYWNlXSkgfHwgYUZ1bmN0aW9uKGdsb2JhbFtuYW1lc3BhY2VdKVxuICAgIDogcGF0aFtuYW1lc3BhY2VdICYmIHBhdGhbbmFtZXNwYWNlXVttZXRob2RdIHx8IGdsb2JhbFtuYW1lc3BhY2VdICYmIGdsb2JhbFtuYW1lc3BhY2VdW21ldGhvZF07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xuXG52YXIgcHVzaCA9IHVuY3VycnlUaGlzKFtdLnB1c2gpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChyZXBsYWNlcikge1xuICBpZiAoaXNDYWxsYWJsZShyZXBsYWNlcikpIHJldHVybiByZXBsYWNlcjtcbiAgaWYgKCFpc0FycmF5KHJlcGxhY2VyKSkgcmV0dXJuO1xuICB2YXIgcmF3TGVuZ3RoID0gcmVwbGFjZXIubGVuZ3RoO1xuICB2YXIga2V5cyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJhd0xlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGVsZW1lbnQgPSByZXBsYWNlcltpXTtcbiAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT0gJ3N0cmluZycpIHB1c2goa2V5cywgZWxlbWVudCk7XG4gICAgZWxzZSBpZiAodHlwZW9mIGVsZW1lbnQgPT0gJ251bWJlcicgfHwgY2xhc3NvZihlbGVtZW50KSA9PT0gJ051bWJlcicgfHwgY2xhc3NvZihlbGVtZW50KSA9PT0gJ1N0cmluZycpIHB1c2goa2V5cywgdG9TdHJpbmcoZWxlbWVudCkpO1xuICB9XG4gIHZhciBrZXlzTGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciByb290ID0gdHJ1ZTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgaWYgKHJvb3QpIHtcbiAgICAgIHJvb3QgPSBmYWxzZTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgaWYgKGlzQXJyYXkodGhpcykpIHJldHVybiB2YWx1ZTtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGtleXNMZW5ndGg7IGorKykgaWYgKGtleXNbal0gPT09IGtleSkgcmV0dXJuIHZhbHVlO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1jYWxsYWJsZScpO1xudmFyIGlzTnVsbE9yVW5kZWZpbmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW51bGwtb3ItdW5kZWZpbmVkJyk7XG5cbi8vIGBHZXRNZXRob2RgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1nZXRtZXRob2Rcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFYsIFApIHtcbiAgdmFyIGZ1bmMgPSBWW1BdO1xuICByZXR1cm4gaXNOdWxsT3JVbmRlZmluZWQoZnVuYykgPyB1bmRlZmluZWQgOiBhQ2FsbGFibGUoZnVuYyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNoZWNrID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAmJiBpdC5NYXRoID09PSBNYXRoICYmIGl0O1xufTtcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbm1vZHVsZS5leHBvcnRzID1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLWdsb2JhbC10aGlzIC0tIHNhZmVcbiAgY2hlY2sodHlwZW9mIGdsb2JhbFRoaXMgPT0gJ29iamVjdCcgJiYgZ2xvYmFsVGhpcykgfHxcbiAgY2hlY2sodHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cpIHx8XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLWdsb2JhbHMgLS0gc2FmZVxuICBjaGVjayh0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmKSB8fFxuICBjaGVjayh0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCkgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jIC0tIGZhbGxiYWNrXG4gIChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KSgpIHx8IHRoaXMgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcblxudmFyIGhhc093blByb3BlcnR5ID0gdW5jdXJyeVRoaXMoe30uaGFzT3duUHJvcGVydHkpO1xuXG4vLyBgSGFzT3duUHJvcGVydHlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1oYXNvd25wcm9wZXJ0eVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1oYXNvd24gLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuaGFzT3duIHx8IGZ1bmN0aW9uIGhhc093bihpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eSh0b09iamVjdChpdCksIGtleSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ2RvY3VtZW50JywgJ2RvY3VtZW50RWxlbWVudCcpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG5cbi8vIFRoYW5rcyB0byBJRTggZm9yIGl0cyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGNyZWF0ZUVsZW1lbnQoJ2RpdicpLCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH1cbiAgfSkuYSAhPT0gNztcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xuXG52YXIgJE9iamVjdCA9IE9iamVjdDtcbnZhciBzcGxpdCA9IHVuY3VycnlUaGlzKCcnLnNwbGl0KTtcblxuLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3Ncbm1vZHVsZS5leHBvcnRzID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyB0aHJvd3MgYW4gZXJyb3IgaW4gcmhpbm8sIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9yaGluby9pc3N1ZXMvMzQ2XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnMgLS0gc2FmZVxuICByZXR1cm4gISRPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKTtcbn0pID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjbGFzc29mKGl0KSA9PT0gJ1N0cmluZycgPyBzcGxpdChpdCwgJycpIDogJE9iamVjdChpdCk7XG59IDogJE9iamVjdDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbnZhciBmdW5jdGlvblRvU3RyaW5nID0gdW5jdXJyeVRoaXMoRnVuY3Rpb24udG9TdHJpbmcpO1xuXG4vLyB0aGlzIGhlbHBlciBicm9rZW4gaW4gYGNvcmUtanNAMy40LjEtMy40LjRgLCBzbyB3ZSBjYW4ndCB1c2UgYHNoYXJlZGAgaGVscGVyXG5pZiAoIWlzQ2FsbGFibGUoc3RvcmUuaW5zcGVjdFNvdXJjZSkpIHtcbiAgc3RvcmUuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBmdW5jdGlvblRvU3RyaW5nKGl0KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdG9yZS5pbnNwZWN0U291cmNlO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIE5BVElWRV9XRUFLX01BUCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWFrLW1hcC1iYXNpYy1kZXRlY3Rpb24nKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG52YXIgT0JKRUNUX0FMUkVBRFlfSU5JVElBTElaRUQgPSAnT2JqZWN0IGFscmVhZHkgaW5pdGlhbGl6ZWQnO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xudmFyIHNldCwgZ2V0LCBoYXM7XG5cbnZhciBlbmZvcmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBoYXMoaXQpID8gZ2V0KGl0KSA6IHNldChpdCwge30pO1xufTtcblxudmFyIGdldHRlckZvciA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaXQpIHtcbiAgICB2YXIgc3RhdGU7XG4gICAgaWYgKCFpc09iamVjdChpdCkgfHwgKHN0YXRlID0gZ2V0KGl0KSkudHlwZSAhPT0gVFlQRSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW5jb21wYXRpYmxlIHJlY2VpdmVyLCAnICsgVFlQRSArICcgcmVxdWlyZWQnKTtcbiAgICB9IHJldHVybiBzdGF0ZTtcbiAgfTtcbn07XG5cbmlmIChOQVRJVkVfV0VBS19NQVAgfHwgc2hhcmVkLnN0YXRlKSB7XG4gIHZhciBzdG9yZSA9IHNoYXJlZC5zdGF0ZSB8fCAoc2hhcmVkLnN0YXRlID0gbmV3IFdlYWtNYXAoKSk7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXNlbGYtYXNzaWduIC0tIHByb3RvdHlwZSBtZXRob2RzIHByb3RlY3Rpb24gKi9cbiAgc3RvcmUuZ2V0ID0gc3RvcmUuZ2V0O1xuICBzdG9yZS5oYXMgPSBzdG9yZS5oYXM7XG4gIHN0b3JlLnNldCA9IHN0b3JlLnNldDtcbiAgLyogZXNsaW50LWVuYWJsZSBuby1zZWxmLWFzc2lnbiAtLSBwcm90b3R5cGUgbWV0aG9kcyBwcm90ZWN0aW9uICovXG4gIHNldCA9IGZ1bmN0aW9uIChpdCwgbWV0YWRhdGEpIHtcbiAgICBpZiAoc3RvcmUuaGFzKGl0KSkgdGhyb3cgbmV3IFR5cGVFcnJvcihPQkpFQ1RfQUxSRUFEWV9JTklUSUFMSVpFRCk7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgc3RvcmUuc2V0KGl0LCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gc3RvcmUuZ2V0KGl0KSB8fCB7fTtcbiAgfTtcbiAgaGFzID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIHN0b3JlLmhhcyhpdCk7XG4gIH07XG59IGVsc2Uge1xuICB2YXIgU1RBVEUgPSBzaGFyZWRLZXkoJ3N0YXRlJyk7XG4gIGhpZGRlbktleXNbU1RBVEVdID0gdHJ1ZTtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIGlmIChoYXNPd24oaXQsIFNUQVRFKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihPQkpFQ1RfQUxSRUFEWV9JTklUSUFMSVpFRCk7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KGl0LCBTVEFURSwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGhhc093bihpdCwgU1RBVEUpID8gaXRbU1RBVEVdIDoge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBoYXNPd24oaXQsIFNUQVRFKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0LFxuICBnZXQ6IGdldCxcbiAgaGFzOiBoYXMsXG4gIGVuZm9yY2U6IGVuZm9yY2UsXG4gIGdldHRlckZvcjogZ2V0dGVyRm9yXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxuLy8gYElzQXJyYXlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pc2FycmF5XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tYXJyYXktaXNhcnJheSAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheShhcmd1bWVudCkge1xuICByZXR1cm4gY2xhc3NvZihhcmd1bWVudCkgPT09ICdBcnJheSc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkb2N1bWVudEFsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1hbGwnKTtcblxudmFyIGRvY3VtZW50QWxsID0gJGRvY3VtZW50QWxsLmFsbDtcblxuLy8gYElzQ2FsbGFibGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pc2NhbGxhYmxlXG5tb2R1bGUuZXhwb3J0cyA9ICRkb2N1bWVudEFsbC5JU19IVE1MRERBID8gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiB0eXBlb2YgYXJndW1lbnQgPT0gJ2Z1bmN0aW9uJyB8fCBhcmd1bWVudCA9PT0gZG9jdW1lbnRBbGw7XG59IDogZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiB0eXBlb2YgYXJndW1lbnQgPT0gJ2Z1bmN0aW9uJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBpbnNwZWN0U291cmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlJyk7XG5cbnZhciBub29wID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIGVtcHR5ID0gW107XG52YXIgY29uc3RydWN0ID0gZ2V0QnVpbHRJbignUmVmbGVjdCcsICdjb25zdHJ1Y3QnKTtcbnZhciBjb25zdHJ1Y3RvclJlZ0V4cCA9IC9eXFxzKig/OmNsYXNzfGZ1bmN0aW9uKVxcYi87XG52YXIgZXhlYyA9IHVuY3VycnlUaGlzKGNvbnN0cnVjdG9yUmVnRXhwLmV4ZWMpO1xudmFyIElOQ09SUkVDVF9UT19TVFJJTkcgPSAhY29uc3RydWN0b3JSZWdFeHAudGVzdChub29wKTtcblxudmFyIGlzQ29uc3RydWN0b3JNb2Rlcm4gPSBmdW5jdGlvbiBpc0NvbnN0cnVjdG9yKGFyZ3VtZW50KSB7XG4gIGlmICghaXNDYWxsYWJsZShhcmd1bWVudCkpIHJldHVybiBmYWxzZTtcbiAgdHJ5IHtcbiAgICBjb25zdHJ1Y3Qobm9vcCwgZW1wdHksIGFyZ3VtZW50KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbnZhciBpc0NvbnN0cnVjdG9yTGVnYWN5ID0gZnVuY3Rpb24gaXNDb25zdHJ1Y3Rvcihhcmd1bWVudCkge1xuICBpZiAoIWlzQ2FsbGFibGUoYXJndW1lbnQpKSByZXR1cm4gZmFsc2U7XG4gIHN3aXRjaCAoY2xhc3NvZihhcmd1bWVudCkpIHtcbiAgICBjYXNlICdBc3luY0Z1bmN0aW9uJzpcbiAgICBjYXNlICdHZW5lcmF0b3JGdW5jdGlvbic6XG4gICAgY2FzZSAnQXN5bmNHZW5lcmF0b3JGdW5jdGlvbic6IHJldHVybiBmYWxzZTtcbiAgfVxuICB0cnkge1xuICAgIC8vIHdlIGNhbid0IGNoZWNrIC5wcm90b3R5cGUgc2luY2UgY29uc3RydWN0b3JzIHByb2R1Y2VkIGJ5IC5iaW5kIGhhdmVuJ3QgaXRcbiAgICAvLyBgRnVuY3Rpb24jdG9TdHJpbmdgIHRocm93cyBvbiBzb21lIGJ1aWx0LWl0IGZ1bmN0aW9uIGluIHNvbWUgbGVnYWN5IGVuZ2luZXNcbiAgICAvLyAoZm9yIGV4YW1wbGUsIGBET01RdWFkYCBhbmQgc2ltaWxhciBpbiBGRjQxLSlcbiAgICByZXR1cm4gSU5DT1JSRUNUX1RPX1NUUklORyB8fCAhIWV4ZWMoY29uc3RydWN0b3JSZWdFeHAsIGluc3BlY3RTb3VyY2UoYXJndW1lbnQpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuaXNDb25zdHJ1Y3RvckxlZ2FjeS5zaGFtID0gdHJ1ZTtcblxuLy8gYElzQ29uc3RydWN0b3JgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pc2NvbnN0cnVjdG9yXG5tb2R1bGUuZXhwb3J0cyA9ICFjb25zdHJ1Y3QgfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgY2FsbGVkO1xuICByZXR1cm4gaXNDb25zdHJ1Y3Rvck1vZGVybihpc0NvbnN0cnVjdG9yTW9kZXJuLmNhbGwpXG4gICAgfHwgIWlzQ29uc3RydWN0b3JNb2Rlcm4oT2JqZWN0KVxuICAgIHx8ICFpc0NvbnN0cnVjdG9yTW9kZXJuKGZ1bmN0aW9uICgpIHsgY2FsbGVkID0gdHJ1ZTsgfSlcbiAgICB8fCBjYWxsZWQ7XG59KSA/IGlzQ29uc3RydWN0b3JMZWdhY3kgOiBpc0NvbnN0cnVjdG9yTW9kZXJuO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xuXG52YXIgcmVwbGFjZW1lbnQgPSAvI3xcXC5wcm90b3R5cGVcXC4vO1xuXG52YXIgaXNGb3JjZWQgPSBmdW5jdGlvbiAoZmVhdHVyZSwgZGV0ZWN0aW9uKSB7XG4gIHZhciB2YWx1ZSA9IGRhdGFbbm9ybWFsaXplKGZlYXR1cmUpXTtcbiAgcmV0dXJuIHZhbHVlID09PSBQT0xZRklMTCA/IHRydWVcbiAgICA6IHZhbHVlID09PSBOQVRJVkUgPyBmYWxzZVxuICAgIDogaXNDYWxsYWJsZShkZXRlY3Rpb24pID8gZmFpbHMoZGV0ZWN0aW9uKVxuICAgIDogISFkZXRlY3Rpb247XG59O1xuXG52YXIgbm9ybWFsaXplID0gaXNGb3JjZWQubm9ybWFsaXplID0gZnVuY3Rpb24gKHN0cmluZykge1xuICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZShyZXBsYWNlbWVudCwgJy4nKS50b0xvd2VyQ2FzZSgpO1xufTtcblxudmFyIGRhdGEgPSBpc0ZvcmNlZC5kYXRhID0ge307XG52YXIgTkFUSVZFID0gaXNGb3JjZWQuTkFUSVZFID0gJ04nO1xudmFyIFBPTFlGSUxMID0gaXNGb3JjZWQuUE9MWUZJTEwgPSAnUCc7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGb3JjZWQ7XG4iLCIndXNlIHN0cmljdCc7XG4vLyB3ZSBjYW4ndCB1c2UganVzdCBgaXQgPT0gbnVsbGAgc2luY2Ugb2YgYGRvY3VtZW50LmFsbGAgc3BlY2lhbCBjYXNlXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLUlzSFRNTEREQS1pbnRlcm5hbC1zbG90LWFlY1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID09PSBudWxsIHx8IGl0ID09PSB1bmRlZmluZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciAkZG9jdW1lbnRBbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtYWxsJyk7XG5cbnZhciBkb2N1bWVudEFsbCA9ICRkb2N1bWVudEFsbC5hbGw7XG5cbm1vZHVsZS5leHBvcnRzID0gJGRvY3VtZW50QWxsLklTX0hUTUxEREEgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogaXNDYWxsYWJsZShpdCkgfHwgaXQgPT09IGRvY3VtZW50QWxsO1xufSA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiBpc0NhbGxhYmxlKGl0KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IHRydWU7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgTUFUQ0ggPSB3ZWxsS25vd25TeW1ib2woJ21hdGNoJyk7XG5cbi8vIGBJc1JlZ0V4cGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWlzcmVnZXhwXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgaXNSZWdFeHA7XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgKChpc1JlZ0V4cCA9IGl0W01BVENIXSkgIT09IHVuZGVmaW5lZCA/ICEhaXNSZWdFeHAgOiBjbGFzc29mKGl0KSA9PT0gJ1JlZ0V4cCcpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBpc1Byb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1pcy1wcm90b3R5cGUtb2YnKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xuXG52YXIgJE9iamVjdCA9IE9iamVjdDtcblxubW9kdWxlLmV4cG9ydHMgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgJFN5bWJvbCA9IGdldEJ1aWx0SW4oJ1N5bWJvbCcpO1xuICByZXR1cm4gaXNDYWxsYWJsZSgkU3ltYm9sKSAmJiBpc1Byb3RvdHlwZU9mKCRTeW1ib2wucHJvdG90eXBlLCAkT2JqZWN0KGl0KSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycy1jb3JlJykuSXRlcmF0b3JQcm90b3R5cGU7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJdGVyYXRvckNvbnN0cnVjdG9yLCBOQU1FLCBuZXh0LCBFTlVNRVJBQkxFX05FWFQpIHtcbiAgdmFyIFRPX1NUUklOR19UQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIEl0ZXJhdG9yQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7IG5leHQ6IGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigrIUVOVU1FUkFCTEVfTkVYVCwgbmV4dCkgfSk7XG4gIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yQ29uc3RydWN0b3IsIFRPX1NUUklOR19UQUcsIGZhbHNlLCB0cnVlKTtcbiAgSXRlcmF0b3JzW1RPX1NUUklOR19UQUddID0gcmV0dXJuVGhpcztcbiAgcmV0dXJuIEl0ZXJhdG9yQ29uc3RydWN0b3I7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgRnVuY3Rpb25OYW1lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLW5hbWUnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgY3JlYXRlSXRlcmF0b3JDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvci1jcmVhdGUtY29uc3RydWN0b3InKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZicpO1xudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgZGVmaW5lQnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4nKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG52YXIgSXRlcmF0b3JzQ29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMtY29yZScpO1xuXG52YXIgUFJPUEVSX0ZVTkNUSU9OX05BTUUgPSBGdW5jdGlvbk5hbWUuUFJPUEVSO1xudmFyIENPTkZJR1VSQUJMRV9GVU5DVElPTl9OQU1FID0gRnVuY3Rpb25OYW1lLkNPTkZJR1VSQUJMRTtcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IEl0ZXJhdG9yc0NvcmUuSXRlcmF0b3JQcm90b3R5cGU7XG52YXIgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IEl0ZXJhdG9yc0NvcmUuQlVHR1lfU0FGQVJJX0lURVJBVE9SUztcbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBLRVlTID0gJ2tleXMnO1xudmFyIFZBTFVFUyA9ICd2YWx1ZXMnO1xudmFyIEVOVFJJRVMgPSAnZW50cmllcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSXRlcmFibGUsIE5BTUUsIEl0ZXJhdG9yQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKSB7XG4gIGNyZWF0ZUl0ZXJhdG9yQ29uc3RydWN0b3IoSXRlcmF0b3JDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG5cbiAgdmFyIGdldEl0ZXJhdGlvbk1ldGhvZCA9IGZ1bmN0aW9uIChLSU5EKSB7XG4gICAgaWYgKEtJTkQgPT09IERFRkFVTFQgJiYgZGVmYXVsdEl0ZXJhdG9yKSByZXR1cm4gZGVmYXVsdEl0ZXJhdG9yO1xuICAgIGlmICghQlVHR1lfU0FGQVJJX0lURVJBVE9SUyAmJiBLSU5EICYmIEtJTkQgaW4gSXRlcmFibGVQcm90b3R5cGUpIHJldHVybiBJdGVyYWJsZVByb3RvdHlwZVtLSU5EXTtcblxuICAgIHN3aXRjaCAoS0lORCkge1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMsIEtJTkQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzLCBLSU5EKTsgfTtcbiAgICAgIGNhc2UgRU5UUklFUzogcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzLCBLSU5EKTsgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcyk7IH07XG4gIH07XG5cbiAgdmFyIFRPX1NUUklOR19UQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgPSBmYWxzZTtcbiAgdmFyIEl0ZXJhYmxlUHJvdG90eXBlID0gSXRlcmFibGUucHJvdG90eXBlO1xuICB2YXIgbmF0aXZlSXRlcmF0b3IgPSBJdGVyYWJsZVByb3RvdHlwZVtJVEVSQVRPUl1cbiAgICB8fCBJdGVyYWJsZVByb3RvdHlwZVsnQEBpdGVyYXRvciddXG4gICAgfHwgREVGQVVMVCAmJiBJdGVyYWJsZVByb3RvdHlwZVtERUZBVUxUXTtcbiAgdmFyIGRlZmF1bHRJdGVyYXRvciA9ICFCVUdHWV9TQUZBUklfSVRFUkFUT1JTICYmIG5hdGl2ZUl0ZXJhdG9yIHx8IGdldEl0ZXJhdGlvbk1ldGhvZChERUZBVUxUKTtcbiAgdmFyIGFueU5hdGl2ZUl0ZXJhdG9yID0gTkFNRSA9PT0gJ0FycmF5JyA/IEl0ZXJhYmxlUHJvdG90eXBlLmVudHJpZXMgfHwgbmF0aXZlSXRlcmF0b3IgOiBuYXRpdmVJdGVyYXRvcjtcbiAgdmFyIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgbWV0aG9kcywgS0VZO1xuXG4gIC8vIGZpeCBuYXRpdmVcbiAgaWYgKGFueU5hdGl2ZUl0ZXJhdG9yKSB7XG4gICAgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoYW55TmF0aXZlSXRlcmF0b3IuY2FsbChuZXcgSXRlcmFibGUoKSkpO1xuICAgIGlmIChDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUgJiYgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLm5leHQpIHtcbiAgICAgIGlmICghSVNfUFVSRSAmJiBnZXRQcm90b3R5cGVPZihDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUpICE9PSBJdGVyYXRvclByb3RvdHlwZSkge1xuICAgICAgICBpZiAoc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgICAgICBzZXRQcm90b3R5cGVPZihDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgICAgICAgfSBlbHNlIGlmICghaXNDYWxsYWJsZShDdXJyZW50SXRlcmF0b3JQcm90b3R5cGVbSVRFUkFUT1JdKSkge1xuICAgICAgICAgIGRlZmluZUJ1aWx0SW4oQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgVE9fU1RSSU5HX1RBRywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICBpZiAoSVNfUFVSRSkgSXRlcmF0b3JzW1RPX1NUUklOR19UQUddID0gcmV0dXJuVGhpcztcbiAgICB9XG4gIH1cblxuICAvLyBmaXggQXJyYXkucHJvdG90eXBlLnsgdmFsdWVzLCBAQGl0ZXJhdG9yIH0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmIChQUk9QRVJfRlVOQ1RJT05fTkFNRSAmJiBERUZBVUxUID09PSBWQUxVRVMgJiYgbmF0aXZlSXRlcmF0b3IgJiYgbmF0aXZlSXRlcmF0b3IubmFtZSAhPT0gVkFMVUVTKSB7XG4gICAgaWYgKCFJU19QVVJFICYmIENPTkZJR1VSQUJMRV9GVU5DVElPTl9OQU1FKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoSXRlcmFibGVQcm90b3R5cGUsICduYW1lJywgVkFMVUVTKTtcbiAgICB9IGVsc2Uge1xuICAgICAgSU5DT1JSRUNUX1ZBTFVFU19OQU1FID0gdHJ1ZTtcbiAgICAgIGRlZmF1bHRJdGVyYXRvciA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIGNhbGwobmF0aXZlSXRlcmF0b3IsIHRoaXMpOyB9O1xuICAgIH1cbiAgfVxuXG4gIC8vIGV4cG9ydCBhZGRpdGlvbmFsIG1ldGhvZHNcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBnZXRJdGVyYXRpb25NZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/IGRlZmF1bHRJdGVyYXRvciA6IGdldEl0ZXJhdGlvbk1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6IGdldEl0ZXJhdGlvbk1ldGhvZChFTlRSSUVTKVxuICAgIH07XG4gICAgaWYgKEZPUkNFRCkgZm9yIChLRVkgaW4gbWV0aG9kcykge1xuICAgICAgaWYgKEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgfHwgSU5DT1JSRUNUX1ZBTFVFU19OQU1FIHx8ICEoS0VZIGluIEl0ZXJhYmxlUHJvdG90eXBlKSkge1xuICAgICAgICBkZWZpbmVCdWlsdEluKEl0ZXJhYmxlUHJvdG90eXBlLCBLRVksIG1ldGhvZHNbS0VZXSk7XG4gICAgICB9XG4gICAgfSBlbHNlICQoeyB0YXJnZXQ6IE5BTUUsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgfHwgSU5DT1JSRUNUX1ZBTFVFU19OQU1FIH0sIG1ldGhvZHMpO1xuICB9XG5cbiAgLy8gZGVmaW5lIGl0ZXJhdG9yXG4gIGlmICgoIUlTX1BVUkUgfHwgRk9SQ0VEKSAmJiBJdGVyYWJsZVByb3RvdHlwZVtJVEVSQVRPUl0gIT09IGRlZmF1bHRJdGVyYXRvcikge1xuICAgIGRlZmluZUJ1aWx0SW4oSXRlcmFibGVQcm90b3R5cGUsIElURVJBVE9SLCBkZWZhdWx0SXRlcmF0b3IsIHsgbmFtZTogREVGQVVMVCB9KTtcbiAgfVxuICBJdGVyYXRvcnNbTkFNRV0gPSBkZWZhdWx0SXRlcmF0b3I7XG5cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YnKTtcbnZhciBkZWZpbmVCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbicpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IGZhbHNlO1xuXG4vLyBgJUl0ZXJhdG9yUHJvdG90eXBlJWAgb2JqZWN0XG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLSVpdGVyYXRvcnByb3RvdHlwZSUtb2JqZWN0XG52YXIgSXRlcmF0b3JQcm90b3R5cGUsIFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSwgYXJyYXlJdGVyYXRvcjtcblxuLyogZXNsaW50LWRpc2FibGUgZXMvbm8tYXJyYXktcHJvdG90eXBlLWtleXMgLS0gc2FmZSAqL1xuaWYgKFtdLmtleXMpIHtcbiAgYXJyYXlJdGVyYXRvciA9IFtdLmtleXMoKTtcbiAgLy8gU2FmYXJpIDggaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gIGlmICghKCduZXh0JyBpbiBhcnJheUl0ZXJhdG9yKSkgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IHRydWU7XG4gIGVsc2Uge1xuICAgIFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKGdldFByb3RvdHlwZU9mKGFycmF5SXRlcmF0b3IpKTtcbiAgICBpZiAoUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKSBJdGVyYXRvclByb3RvdHlwZSA9IFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxufVxuXG52YXIgTkVXX0lURVJBVE9SX1BST1RPVFlQRSA9ICFpc09iamVjdChJdGVyYXRvclByb3RvdHlwZSkgfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgdGVzdCA9IHt9O1xuICAvLyBGRjQ0LSBsZWdhY3kgaXRlcmF0b3JzIGNhc2VcbiAgcmV0dXJuIEl0ZXJhdG9yUHJvdG90eXBlW0lURVJBVE9SXS5jYWxsKHRlc3QpICE9PSB0ZXN0O1xufSk7XG5cbmlmIChORVdfSVRFUkFUT1JfUFJPVE9UWVBFKSBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuZWxzZSBpZiAoSVNfUFVSRSkgSXRlcmF0b3JQcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuXG4vLyBgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtJWl0ZXJhdG9ycHJvdG90eXBlJS1AQGl0ZXJhdG9yXG5pZiAoIWlzQ2FsbGFibGUoSXRlcmF0b3JQcm90b3R5cGVbSVRFUkFUT1JdKSkge1xuICBkZWZpbmVCdWlsdEluKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEl0ZXJhdG9yUHJvdG90eXBlOiBJdGVyYXRvclByb3RvdHlwZSxcbiAgQlVHR1lfU0FGQVJJX0lURVJBVE9SUzogQlVHR1lfU0FGQVJJX0lURVJBVE9SU1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0ge307XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG5cbi8vIGBMZW5ndGhPZkFycmF5TGlrZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWxlbmd0aG9mYXJyYXlsaWtlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHRvTGVuZ3RoKG9iai5sZW5ndGgpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcblxuLy8gYE1hdGgudHJ1bmNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1tYXRoLnRydW5jXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tbWF0aC10cnVuYyAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IE1hdGgudHJ1bmMgfHwgZnVuY3Rpb24gdHJ1bmMoeCkge1xuICB2YXIgbiA9ICt4O1xuICByZXR1cm4gKG4gPiAwID8gZmxvb3IgOiBjZWlsKShuKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaXNSZWdFeHAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcmVnZXhwJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXNSZWdFeHAoaXQpKSB7XG4gICAgdGhyb3cgbmV3ICRUeXBlRXJyb3IoXCJUaGUgbWV0aG9kIGRvZXNuJ3QgYWNjZXB0IHJlZ3VsYXIgZXhwcmVzc2lvbnNcIik7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzJyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtYXNzaWduIC0tIHNhZmVcbnZhciAkYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBjb25jYXQgPSB1bmN1cnJ5VGhpcyhbXS5jb25jYXQpO1xuXG4vLyBgT2JqZWN0LmFzc2lnbmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5hc3NpZ25cbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBzaG91bGQgaGF2ZSBjb3JyZWN0IG9yZGVyIG9mIG9wZXJhdGlvbnMgKEVkZ2UgYnVnKVxuICBpZiAoREVTQ1JJUFRPUlMgJiYgJGFzc2lnbih7IGI6IDEgfSwgJGFzc2lnbihkZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGRlZmluZVByb3BlcnR5KHRoaXMsICdiJywge1xuICAgICAgICB2YWx1ZTogMyxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfSksIHsgYjogMiB9KSkuYiAhPT0gMSkgcmV0dXJuIHRydWU7XG4gIC8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxuICB2YXIgQSA9IHt9O1xuICB2YXIgQiA9IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tc3ltYm9sIC0tIHNhZmVcbiAgdmFyIHN5bWJvbCA9IFN5bWJvbCgnYXNzaWduIGRldGVjdGlvbicpO1xuICB2YXIgYWxwaGFiZXQgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW3N5bWJvbF0gPSA3O1xuICBhbHBoYWJldC5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAoY2hyKSB7IEJbY2hyXSA9IGNocjsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtzeW1ib2xdICE9PSA3IHx8IG9iamVjdEtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9PSBhbHBoYWJldDtcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnMgLS0gcmVxdWlyZWQgZm9yIGAubGVuZ3RoYFxuICB2YXIgVCA9IHRvT2JqZWN0KHRhcmdldCk7XG4gIHZhciBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmY7XG4gIHZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmY7XG4gIHdoaWxlIChhcmd1bWVudHNMZW5ndGggPiBpbmRleCkge1xuICAgIHZhciBTID0gSW5kZXhlZE9iamVjdChhcmd1bWVudHNbaW5kZXgrK10pO1xuICAgIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzID8gY29uY2F0KG9iamVjdEtleXMoUyksIGdldE93blByb3BlcnR5U3ltYm9scyhTKSkgOiBvYmplY3RLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikge1xuICAgICAga2V5ID0ga2V5c1tqKytdO1xuICAgICAgaWYgKCFERVNDUklQVE9SUyB8fCBjYWxsKHByb3BlcnR5SXNFbnVtZXJhYmxlLCBTLCBrZXkpKSBUW2tleV0gPSBTW2tleV07XG4gICAgfVxuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG4iLCIndXNlIHN0cmljdCc7XG4vKiBnbG9iYWwgQWN0aXZlWE9iamVjdCAtLSBvbGQgSUUsIFdTSCAqL1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGRlZmluZVByb3BlcnRpZXNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0aWVzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2h0bWwnKTtcbnZhciBkb2N1bWVudENyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xuXG52YXIgR1QgPSAnPic7XG52YXIgTFQgPSAnPCc7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgU0NSSVBUID0gJ3NjcmlwdCc7XG52YXIgSUVfUFJPVE8gPSBzaGFyZWRLZXkoJ0lFX1BST1RPJyk7XG5cbnZhciBFbXB0eUNvbnN0cnVjdG9yID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xuXG52YXIgc2NyaXB0VGFnID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgcmV0dXJuIExUICsgU0NSSVBUICsgR1QgKyBjb250ZW50ICsgTFQgKyAnLycgKyBTQ1JJUFQgKyBHVDtcbn07XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBBY3RpdmVYIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgTnVsbFByb3RvT2JqZWN0VmlhQWN0aXZlWCA9IGZ1bmN0aW9uIChhY3RpdmVYRG9jdW1lbnQpIHtcbiAgYWN0aXZlWERvY3VtZW50LndyaXRlKHNjcmlwdFRhZygnJykpO1xuICBhY3RpdmVYRG9jdW1lbnQuY2xvc2UoKTtcbiAgdmFyIHRlbXAgPSBhY3RpdmVYRG9jdW1lbnQucGFyZW50V2luZG93Lk9iamVjdDtcbiAgYWN0aXZlWERvY3VtZW50ID0gbnVsbDsgLy8gYXZvaWQgbWVtb3J5IGxlYWtcbiAgcmV0dXJuIHRlbXA7XG59O1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgTnVsbFByb3RvT2JqZWN0VmlhSUZyYW1lID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gZG9jdW1lbnRDcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgdmFyIEpTID0gJ2phdmEnICsgU0NSSVBUICsgJzonO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBodG1sLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy80NzVcbiAgaWZyYW1lLnNyYyA9IFN0cmluZyhKUyk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUoc2NyaXB0VGFnKCdkb2N1bWVudC5GPU9iamVjdCcpKTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgcmV0dXJuIGlmcmFtZURvY3VtZW50LkY7XG59O1xuXG4vLyBDaGVjayBmb3IgZG9jdW1lbnQuZG9tYWluIGFuZCBhY3RpdmUgeCBzdXBwb3J0XG4vLyBObyBuZWVkIHRvIHVzZSBhY3RpdmUgeCBhcHByb2FjaCB3aGVuIGRvY3VtZW50LmRvbWFpbiBpcyBub3Qgc2V0XG4vLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2VzLXNoaW1zL2VzNS1zaGltL2lzc3Vlcy8xNTBcbi8vIHZhcmlhdGlvbiBvZiBodHRwczovL2dpdGh1Yi5jb20va2l0Y2FtYnJpZGdlL2VzNS1zaGltL2NvbW1pdC80ZjczOGFjMDY2MzQ2XG4vLyBhdm9pZCBJRSBHQyBidWdcbnZhciBhY3RpdmVYRG9jdW1lbnQ7XG52YXIgTnVsbFByb3RvT2JqZWN0ID0gZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGFjdGl2ZVhEb2N1bWVudCA9IG5ldyBBY3RpdmVYT2JqZWN0KCdodG1sZmlsZScpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBpZ25vcmUgKi8gfVxuICBOdWxsUHJvdG9PYmplY3QgPSB0eXBlb2YgZG9jdW1lbnQgIT0gJ3VuZGVmaW5lZCdcbiAgICA/IGRvY3VtZW50LmRvbWFpbiAmJiBhY3RpdmVYRG9jdW1lbnRcbiAgICAgID8gTnVsbFByb3RvT2JqZWN0VmlhQWN0aXZlWChhY3RpdmVYRG9jdW1lbnQpIC8vIG9sZCBJRVxuICAgICAgOiBOdWxsUHJvdG9PYmplY3RWaWFJRnJhbWUoKVxuICAgIDogTnVsbFByb3RvT2JqZWN0VmlhQWN0aXZlWChhY3RpdmVYRG9jdW1lbnQpOyAvLyBXU0hcbiAgdmFyIGxlbmd0aCA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSBkZWxldGUgTnVsbFByb3RvT2JqZWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbbGVuZ3RoXV07XG4gIHJldHVybiBOdWxsUHJvdG9PYmplY3QoKTtcbn07XG5cbmhpZGRlbktleXNbSUVfUFJPVE9dID0gdHJ1ZTtcblxuLy8gYE9iamVjdC5jcmVhdGVgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuY3JlYXRlXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWNyZWF0ZSAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eUNvbnN0cnVjdG9yW1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHlDb25zdHJ1Y3RvcigpO1xuICAgIEVtcHR5Q29uc3RydWN0b3JbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gTnVsbFByb3RvT2JqZWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkZWZpbmVQcm9wZXJ0aWVzTW9kdWxlLmYocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBWOF9QUk9UT1RZUEVfREVGSU5FX0JVRyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy92OC1wcm90b3R5cGUtZGVmaW5lLWJ1ZycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzJyk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydGllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0aWVzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnRpZXMgLS0gc2FmZVxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgJiYgIVY4X1BST1RPVFlQRV9ERUZJTkVfQlVHID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBwcm9wcyA9IHRvSW5kZXhlZE9iamVjdChQcm9wZXJ0aWVzKTtcbiAgdmFyIGtleXMgPSBvYmplY3RLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChsZW5ndGggPiBpbmRleCkgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihPLCBrZXkgPSBrZXlzW2luZGV4KytdLCBwcm9wc1trZXldKTtcbiAgcmV0dXJuIE87XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcbnZhciBWOF9QUk9UT1RZUEVfREVGSU5FX0JVRyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy92OC1wcm90b3R5cGUtZGVmaW5lLWJ1ZycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvUHJvcGVydHlLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJvcGVydHkta2V5Jyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSBzYWZlXG52YXIgJGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIEVOVU1FUkFCTEUgPSAnZW51bWVyYWJsZSc7XG52YXIgQ09ORklHVVJBQkxFID0gJ2NvbmZpZ3VyYWJsZSc7XG52YXIgV1JJVEFCTEUgPSAnd3JpdGFibGUnO1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnR5XG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/IFY4X1BST1RPVFlQRV9ERUZJTkVfQlVHID8gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJvcGVydHlLZXkoUCk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAodHlwZW9mIE8gPT09ICdmdW5jdGlvbicgJiYgUCA9PT0gJ3Byb3RvdHlwZScgJiYgJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzICYmIFdSSVRBQkxFIGluIEF0dHJpYnV0ZXMgJiYgIUF0dHJpYnV0ZXNbV1JJVEFCTEVdKSB7XG4gICAgdmFyIGN1cnJlbnQgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApO1xuICAgIGlmIChjdXJyZW50ICYmIGN1cnJlbnRbV1JJVEFCTEVdKSB7XG4gICAgICBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgICAgIEF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogQ09ORklHVVJBQkxFIGluIEF0dHJpYnV0ZXMgPyBBdHRyaWJ1dGVzW0NPTkZJR1VSQUJMRV0gOiBjdXJyZW50W0NPTkZJR1VSQUJMRV0sXG4gICAgICAgIGVudW1lcmFibGU6IEVOVU1FUkFCTEUgaW4gQXR0cmlidXRlcyA/IEF0dHJpYnV0ZXNbRU5VTUVSQUJMRV0gOiBjdXJyZW50W0VOVU1FUkFCTEVdLFxuICAgICAgICB3cml0YWJsZTogZmFsc2VcbiAgICAgIH07XG4gICAgfVxuICB9IHJldHVybiAkZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG59IDogJGRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJvcGVydHlLZXkoUCk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuICRkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBuZXcgJFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9Qcm9wZXJ0eUtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcm9wZXJ0eS1rZXknKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yXG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JbmRleGVkT2JqZWN0KE8pO1xuICBQID0gdG9Qcm9wZXJ0eUtleShQKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXNPd24oTywgUCkpIHJldHVybiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoIWNhbGwocHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZiwgTywgUCksIE9bUF0pO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eW5hbWVzIC0tIHNhZmUgKi9cbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMnKS5mO1xudmFyIGFycmF5U2xpY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc2xpY2Utc2ltcGxlJyk7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gJGdldE93blByb3BlcnR5TmFtZXMoaXQpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBhcnJheVNsaWNlKHdpbmRvd05hbWVzKTtcbiAgfVxufTtcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpIHtcbiAgcmV0dXJuIHdpbmRvd05hbWVzICYmIGNsYXNzb2YoaXQpID09PSAnV2luZG93J1xuICAgID8gZ2V0V2luZG93TmFtZXMoaXQpXG4gICAgOiAkZ2V0T3duUHJvcGVydHlOYW1lcyh0b0luZGV4ZWRPYmplY3QoaXQpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaW50ZXJuYWxPYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xuXG52YXIgaGlkZGVuS2V5cyA9IGVudW1CdWdLZXlzLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHluYW1lc1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eW5hbWVzIC0tIHNhZmVcbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICByZXR1cm4gaW50ZXJuYWxPYmplY3RLZXlzKE8sIGhpZGRlbktleXMpO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlzeW1ib2xzIC0tIHNhZmVcbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcbnZhciBDT1JSRUNUX1BST1RPVFlQRV9HRVRURVIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29ycmVjdC1wcm90b3R5cGUtZ2V0dGVyJyk7XG5cbnZhciBJRV9QUk9UTyA9IHNoYXJlZEtleSgnSUVfUFJPVE8nKTtcbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xudmFyIE9iamVjdFByb3RvdHlwZSA9ICRPYmplY3QucHJvdG90eXBlO1xuXG4vLyBgT2JqZWN0LmdldFByb3RvdHlwZU9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldHByb3RvdHlwZW9mXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldHByb3RvdHlwZW9mIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSID8gJE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIChPKSB7XG4gIHZhciBvYmplY3QgPSB0b09iamVjdChPKTtcbiAgaWYgKGhhc093bihvYmplY3QsIElFX1BST1RPKSkgcmV0dXJuIG9iamVjdFtJRV9QUk9UT107XG4gIHZhciBjb25zdHJ1Y3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcjtcbiAgaWYgKGlzQ2FsbGFibGUoY29uc3RydWN0b3IpICYmIG9iamVjdCBpbnN0YW5jZW9mIGNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIGNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gb2JqZWN0IGluc3RhbmNlb2YgJE9iamVjdCA/IE9iamVjdFByb3RvdHlwZSA6IG51bGw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVuY3VycnlUaGlzKHt9LmlzUHJvdG90eXBlT2YpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgaW5kZXhPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pbmNsdWRlcycpLmluZGV4T2Y7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG52YXIgcHVzaCA9IHVuY3VycnlUaGlzKFtdLnB1c2gpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSAhaGFzT3duKGhpZGRlbktleXMsIGtleSkgJiYgaGFzT3duKE8sIGtleSkgJiYgcHVzaChyZXN1bHQsIGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXNPd24oTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+aW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcHVzaChyZXN1bHQsIGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaW50ZXJuYWxPYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xuXG4vLyBgT2JqZWN0LmtleXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3Qua2V5c1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1rZXlzIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiBpbnRlcm5hbE9iamVjdEtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBOYXNob3JuIH4gSkRLOCBidWdcbnZhciBOQVNIT1JOX0JVRyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiAhJHByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoeyAxOiAyIH0sIDEpO1xuXG4vLyBgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZWAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUucHJvcGVydHlpc2VudW1lcmFibGVcbmV4cG9ydHMuZiA9IE5BU0hPUk5fQlVHID8gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoVikge1xuICB2YXIgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzLCBWKTtcbiAgcmV0dXJuICEhZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLmVudW1lcmFibGU7XG59IDogJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gLS0gc2FmZSAqL1xudmFyIHVuY3VycnlUaGlzQWNjZXNzb3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzLWFjY2Vzc29yJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgYVBvc3NpYmxlUHJvdG90eXBlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtcG9zc2libGUtcHJvdG90eXBlJyk7XG5cbi8vIGBPYmplY3Quc2V0UHJvdG90eXBlT2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3Quc2V0cHJvdG90eXBlb2Zcbi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1zZXRwcm90b3R5cGVvZiAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyBmdW5jdGlvbiAoKSB7XG4gIHZhciBDT1JSRUNUX1NFVFRFUiA9IGZhbHNlO1xuICB2YXIgdGVzdCA9IHt9O1xuICB2YXIgc2V0dGVyO1xuICB0cnkge1xuICAgIHNldHRlciA9IHVuY3VycnlUaGlzQWNjZXNzb3IoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycsICdzZXQnKTtcbiAgICBzZXR0ZXIodGVzdCwgW10pO1xuICAgIENPUlJFQ1RfU0VUVEVSID0gdGVzdCBpbnN0YW5jZW9mIEFycmF5O1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90bykge1xuICAgIGFuT2JqZWN0KE8pO1xuICAgIGFQb3NzaWJsZVByb3RvdHlwZShwcm90byk7XG4gICAgaWYgKENPUlJFQ1RfU0VUVEVSKSBzZXR0ZXIoTywgcHJvdG8pO1xuICAgIGVsc2UgTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICByZXR1cm4gTztcbiAgfTtcbn0oKSA6IHVuZGVmaW5lZCk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgVE9fU1RSSU5HX1RBR19TVVBQT1JUID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xuXG4vLyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gVE9fU1RSSU5HX1RBR19TVVBQT1JUID8ge30udG9TdHJpbmcgOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdbb2JqZWN0ICcgKyBjbGFzc29mKHRoaXMpICsgJ10nO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgT3JkaW5hcnlUb1ByaW1pdGl2ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9yZGluYXJ5dG9wcmltaXRpdmVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBwcmVmKSB7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAocHJlZiA9PT0gJ3N0cmluZycgJiYgaXNDYWxsYWJsZShmbiA9IGlucHV0LnRvU3RyaW5nKSAmJiAhaXNPYmplY3QodmFsID0gY2FsbChmbiwgaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKGlzQ2FsbGFibGUoZm4gPSBpbnB1dC52YWx1ZU9mKSAmJiAhaXNPYmplY3QodmFsID0gY2FsbChmbiwgaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHByZWYgIT09ICdzdHJpbmcnICYmIGlzQ2FsbGFibGUoZm4gPSBpbnB1dC50b1N0cmluZykgJiYgIWlzT2JqZWN0KHZhbCA9IGNhbGwoZm4sIGlucHV0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IG5ldyAkVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG52YXIgY29uY2F0ID0gdW5jdXJyeVRoaXMoW10uY29uY2F0KTtcblxuLy8gYWxsIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBub24tZW51bWVyYWJsZSBhbmQgc3ltYm9sc1xubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdSZWZsZWN0JywgJ293bktleXMnKSB8fCBmdW5jdGlvbiBvd25LZXlzKGl0KSB7XG4gIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZS5mKGFuT2JqZWN0KGl0KSk7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZjtcbiAgcmV0dXJuIGdldE93blByb3BlcnR5U3ltYm9scyA/IGNvbmNhdChrZXlzLCBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpKSA6IGtleXM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpc051bGxPclVuZGVmaW5lZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZCcpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYFJlcXVpcmVPYmplY3RDb2VyY2libGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZXF1aXJlb2JqZWN0Y29lcmNpYmxlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXNOdWxsT3JVbmRlZmluZWQoaXQpKSB0aHJvdyBuZXcgJFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtdG8tc3RyaW5nJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgVEFHLCBTVEFUSUMsIFNFVF9NRVRIT0QpIHtcbiAgaWYgKGl0KSB7XG4gICAgdmFyIHRhcmdldCA9IFNUQVRJQyA/IGl0IDogaXQucHJvdG90eXBlO1xuICAgIGlmICghaGFzT3duKHRhcmdldCwgVE9fU1RSSU5HX1RBRykpIHtcbiAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwgVE9fU1RSSU5HX1RBRywgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBUQUcgfSk7XG4gICAgfVxuICAgIGlmIChTRVRfTUVUSE9EICYmICFUT19TVFJJTkdfVEFHX1NVUFBPUlQpIHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSh0YXJnZXQsICd0b1N0cmluZycsIHRvU3RyaW5nKTtcbiAgICB9XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcblxudmFyIGtleXMgPSBzaGFyZWQoJ2tleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBrZXlzW2tleV0gfHwgKGtleXNba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGRlZmluZUdsb2JhbFByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1nbG9iYWwtcHJvcGVydHknKTtcblxudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgZGVmaW5lR2xvYmFsUHJvcGVydHkoU0hBUkVELCB7fSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmU7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoge30pO1xufSkoJ3ZlcnNpb25zJywgW10pLnB1c2goe1xuICB2ZXJzaW9uOiAnMy4zMy4yJyxcbiAgbW9kZTogSVNfUFVSRSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICfCqSAyMDE0LTIwMjMgRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSknLFxuICBsaWNlbnNlOiAnaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvYmxvYi92My4zMy4yL0xJQ0VOU0UnLFxuICBzb3VyY2U6ICdodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcydcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIHRvSW50ZWdlck9ySW5maW5pdHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlci1vci1pbmZpbml0eScpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbnZhciBjaGFyQXQgPSB1bmN1cnJ5VGhpcygnJy5jaGFyQXQpO1xudmFyIGNoYXJDb2RlQXQgPSB1bmN1cnJ5VGhpcygnJy5jaGFyQ29kZUF0KTtcbnZhciBzdHJpbmdTbGljZSA9IHVuY3VycnlUaGlzKCcnLnNsaWNlKTtcblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChDT05WRVJUX1RPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBwb3MpIHtcbiAgICB2YXIgUyA9IHRvU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUoJHRoaXMpKTtcbiAgICB2YXIgcG9zaXRpb24gPSB0b0ludGVnZXJPckluZmluaXR5KHBvcyk7XG4gICAgdmFyIHNpemUgPSBTLmxlbmd0aDtcbiAgICB2YXIgZmlyc3QsIHNlY29uZDtcbiAgICBpZiAocG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID49IHNpemUpIHJldHVybiBDT05WRVJUX1RPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGZpcnN0ID0gY2hhckNvZGVBdChTLCBwb3NpdGlvbik7XG4gICAgcmV0dXJuIGZpcnN0IDwgMHhEODAwIHx8IGZpcnN0ID4gMHhEQkZGIHx8IHBvc2l0aW9uICsgMSA9PT0gc2l6ZVxuICAgICAgfHwgKHNlY29uZCA9IGNoYXJDb2RlQXQoUywgcG9zaXRpb24gKyAxKSkgPCAweERDMDAgfHwgc2Vjb25kID4gMHhERkZGXG4gICAgICAgID8gQ09OVkVSVF9UT19TVFJJTkdcbiAgICAgICAgICA/IGNoYXJBdChTLCBwb3NpdGlvbilcbiAgICAgICAgICA6IGZpcnN0XG4gICAgICAgIDogQ09OVkVSVF9UT19TVFJJTkdcbiAgICAgICAgICA/IHN0cmluZ1NsaWNlKFMsIHBvc2l0aW9uLCBwb3NpdGlvbiArIDIpXG4gICAgICAgICAgOiAoZmlyc3QgLSAweEQ4MDAgPDwgMTApICsgKHNlY29uZCAtIDB4REMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLmNvZGVwb2ludGF0XG4gIGNvZGVBdDogY3JlYXRlTWV0aG9kKGZhbHNlKSxcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUuYXRgIG1ldGhvZFxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWF0aGlhc2J5bmVucy9TdHJpbmcucHJvdG90eXBlLmF0XG4gIGNoYXJBdDogY3JlYXRlTWV0aG9kKHRydWUpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgZXMvbm8tc3ltYm9sIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nICovXG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG52YXIgJFN0cmluZyA9IGdsb2JhbC5TdHJpbmc7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlzeW1ib2xzIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG5tb2R1bGUuZXhwb3J0cyA9ICEhT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgc3ltYm9sID0gU3ltYm9sKCdzeW1ib2wgZGV0ZWN0aW9uJyk7XG4gIC8vIENocm9tZSAzOCBTeW1ib2wgaGFzIGluY29ycmVjdCB0b1N0cmluZyBjb252ZXJzaW9uXG4gIC8vIGBnZXQtb3duLXByb3BlcnR5LXN5bWJvbHNgIHBvbHlmaWxsIHN5bWJvbHMgY29udmVydGVkIHRvIG9iamVjdCBhcmUgbm90IFN5bWJvbCBpbnN0YW5jZXNcbiAgLy8gbmI6IERvIG5vdCBjYWxsIGBTdHJpbmdgIGRpcmVjdGx5IHRvIGF2b2lkIHRoaXMgYmVpbmcgb3B0aW1pemVkIG91dCB0byBgc3ltYm9sKycnYCB3aGljaCB3aWxsLFxuICAvLyBvZiBjb3Vyc2UsIGZhaWwuXG4gIHJldHVybiAhJFN0cmluZyhzeW1ib2wpIHx8ICEoT2JqZWN0KHN5bWJvbCkgaW5zdGFuY2VvZiBTeW1ib2wpIHx8XG4gICAgLy8gQ2hyb21lIDM4LTQwIHN5bWJvbHMgYXJlIG5vdCBpbmhlcml0ZWQgZnJvbSBET00gY29sbGVjdGlvbnMgcHJvdG90eXBlcyB0byBpbnN0YW5jZXNcbiAgICAhU3ltYm9sLnNoYW0gJiYgVjhfVkVSU0lPTiAmJiBWOF9WRVJTSU9OIDwgNDE7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIGRlZmluZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgU3ltYm9sID0gZ2V0QnVpbHRJbignU3ltYm9sJyk7XG4gIHZhciBTeW1ib2xQcm90b3R5cGUgPSBTeW1ib2wgJiYgU3ltYm9sLnByb3RvdHlwZTtcbiAgdmFyIHZhbHVlT2YgPSBTeW1ib2xQcm90b3R5cGUgJiYgU3ltYm9sUHJvdG90eXBlLnZhbHVlT2Y7XG4gIHZhciBUT19QUklNSVRJVkUgPSB3ZWxsS25vd25TeW1ib2woJ3RvUHJpbWl0aXZlJyk7XG5cbiAgaWYgKFN5bWJvbFByb3RvdHlwZSAmJiAhU3ltYm9sUHJvdG90eXBlW1RPX1BSSU1JVElWRV0pIHtcbiAgICAvLyBgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wucHJvdG90eXBlLUBAdG9wcmltaXRpdmVcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnMgLS0gcmVxdWlyZWQgZm9yIC5sZW5ndGhcbiAgICBkZWZpbmVCdWlsdEluKFN5bWJvbFByb3RvdHlwZSwgVE9fUFJJTUlUSVZFLCBmdW5jdGlvbiAoaGludCkge1xuICAgICAgcmV0dXJuIGNhbGwodmFsdWVPZiwgdGhpcyk7XG4gICAgfSwgeyBhcml0eTogMSB9KTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG52YXIgU3ltYm9sID0gZ2V0QnVpbHRJbignU3ltYm9sJyk7XG52YXIga2V5Rm9yID0gU3ltYm9sLmtleUZvcjtcbnZhciB0aGlzU3ltYm9sVmFsdWUgPSB1bmN1cnJ5VGhpcyhTeW1ib2wucHJvdG90eXBlLnZhbHVlT2YpO1xuXG4vLyBgU3ltYm9sLmlzUmVnaXN0ZXJlZFN5bWJvbGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvcHJvcG9zYWwtc3ltYm9sLXByZWRpY2F0ZXMvI3NlYy1zeW1ib2wtaXNyZWdpc3RlcmVkc3ltYm9sXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbC5pc1JlZ2lzdGVyZWRTeW1ib2wgfHwgZnVuY3Rpb24gaXNSZWdpc3RlcmVkU3ltYm9sKHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGtleUZvcih0aGlzU3ltYm9sVmFsdWUodmFsdWUpKSAhPT0gdW5kZWZpbmVkO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1zeW1ib2wnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFN5bWJvbCA9IGdldEJ1aWx0SW4oJ1N5bWJvbCcpO1xudmFyICRpc1dlbGxLbm93blN5bWJvbCA9IFN5bWJvbC5pc1dlbGxLbm93blN5bWJvbDtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZ2V0QnVpbHRJbignT2JqZWN0JywgJ2dldE93blByb3BlcnR5TmFtZXMnKTtcbnZhciB0aGlzU3ltYm9sVmFsdWUgPSB1bmN1cnJ5VGhpcyhTeW1ib2wucHJvdG90eXBlLnZhbHVlT2YpO1xudmFyIFdlbGxLbm93blN5bWJvbHNTdG9yZSA9IHNoYXJlZCgnd2tzJyk7XG5cbmZvciAodmFyIGkgPSAwLCBzeW1ib2xLZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhTeW1ib2wpLCBzeW1ib2xLZXlzTGVuZ3RoID0gc3ltYm9sS2V5cy5sZW5ndGg7IGkgPCBzeW1ib2xLZXlzTGVuZ3RoOyBpKyspIHtcbiAgLy8gc29tZSBvbGQgZW5naW5lcyB0aHJvd3Mgb24gYWNjZXNzIHRvIHNvbWUga2V5cyBsaWtlIGBhcmd1bWVudHNgIG9yIGBjYWxsZXJgXG4gIHRyeSB7XG4gICAgdmFyIHN5bWJvbEtleSA9IHN5bWJvbEtleXNbaV07XG4gICAgaWYgKGlzU3ltYm9sKFN5bWJvbFtzeW1ib2xLZXldKSkgd2VsbEtub3duU3ltYm9sKHN5bWJvbEtleSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbn1cblxuLy8gYFN5bWJvbC5pc1dlbGxLbm93blN5bWJvbGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvcHJvcG9zYWwtc3ltYm9sLXByZWRpY2F0ZXMvI3NlYy1zeW1ib2wtaXN3ZWxsa25vd25zeW1ib2xcbi8vIFdlIHNob3VsZCBwYXRjaCBpdCBmb3IgbmV3bHkgYWRkZWQgd2VsbC1rbm93biBzeW1ib2xzLiBJZiBpdCdzIG5vdCByZXF1aXJlZCwgdGhpcyBtb2R1bGUganVzdCB3aWxsIG5vdCBiZSBpbmplY3RlZFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc1dlbGxLbm93blN5bWJvbCh2YWx1ZSkge1xuICBpZiAoJGlzV2VsbEtub3duU3ltYm9sICYmICRpc1dlbGxLbm93blN5bWJvbCh2YWx1ZSkpIHJldHVybiB0cnVlO1xuICB0cnkge1xuICAgIHZhciBzeW1ib2wgPSB0aGlzU3ltYm9sVmFsdWUodmFsdWUpO1xuICAgIGZvciAodmFyIGogPSAwLCBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhXZWxsS25vd25TeW1ib2xzU3RvcmUpLCBrZXlzTGVuZ3RoID0ga2V5cy5sZW5ndGg7IGogPCBrZXlzTGVuZ3RoOyBqKyspIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXEgLS0gcG9seWZpbGxlZCBzeW1ib2xzIGNhc2VcbiAgICAgIGlmIChXZWxsS25vd25TeW1ib2xzU3RvcmVba2V5c1tqXV0gPT0gc3ltYm9sKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N5bWJvbC1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24nKTtcblxuLyogZXNsaW50LWRpc2FibGUgZXMvbm8tc3ltYm9sIC0tIHNhZmUgKi9cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX1NZTUJPTCAmJiAhIVN5bWJvbFsnZm9yJ10gJiYgISFTeW1ib2wua2V5Rm9yO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvSW50ZWdlck9ySW5maW5pdHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlci1vci1pbmZpbml0eScpO1xuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIEhlbHBlciBmb3IgYSBwb3B1bGFyIHJlcGVhdGluZyBjYXNlIG9mIHRoZSBzcGVjOlxuLy8gTGV0IGludGVnZXIgYmUgPyBUb0ludGVnZXIoaW5kZXgpLlxuLy8gSWYgaW50ZWdlciA8IDAsIGxldCByZXN1bHQgYmUgbWF4KChsZW5ndGggKyBpbnRlZ2VyKSwgMCk7IGVsc2UgbGV0IHJlc3VsdCBiZSBtaW4oaW50ZWdlciwgbGVuZ3RoKS5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgdmFyIGludGVnZXIgPSB0b0ludGVnZXJPckluZmluaXR5KGluZGV4KTtcbiAgcmV0dXJuIGludGVnZXIgPCAwID8gbWF4KGludGVnZXIgKyBsZW5ndGgsIDApIDogbWluKGludGVnZXIsIGxlbmd0aCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEluZGV4ZWRPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShpdCkpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0cnVuYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9tYXRoLXRydW5jJyk7XG5cbi8vIGBUb0ludGVnZXJPckluZmluaXR5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9pbnRlZ2Vyb3JpbmZpbml0eVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdmFyIG51bWJlciA9ICthcmd1bWVudDtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZSAtLSBOYU4gY2hlY2tcbiAgcmV0dXJuIG51bWJlciAhPT0gbnVtYmVyIHx8IG51bWJlciA9PT0gMCA/IDAgOiB0cnVuYyhudW1iZXIpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b0ludGVnZXJPckluZmluaXR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXItb3ItaW5maW5pdHknKTtcblxudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBgVG9MZW5ndGhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b2xlbmd0aFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGFyZ3VtZW50ID4gMCA/IG1pbih0b0ludGVnZXJPckluZmluaXR5KGFyZ3VtZW50KSwgMHgxRkZGRkZGRkZGRkZGRikgOiAwOyAvLyAyICoqIDUzIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xuXG4vLyBgVG9PYmplY3RgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b29iamVjdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuICRPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudCkpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1zeW1ib2wnKTtcbnZhciBnZXRNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LW1ldGhvZCcpO1xudmFyIG9yZGluYXJ5VG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb3JkaW5hcnktdG8tcHJpbWl0aXZlJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xudmFyIFRPX1BSSU1JVElWRSA9IHdlbGxLbm93blN5bWJvbCgndG9QcmltaXRpdmUnKTtcblxuLy8gYFRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9wcmltaXRpdmVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBwcmVmKSB7XG4gIGlmICghaXNPYmplY3QoaW5wdXQpIHx8IGlzU3ltYm9sKGlucHV0KSkgcmV0dXJuIGlucHV0O1xuICB2YXIgZXhvdGljVG9QcmltID0gZ2V0TWV0aG9kKGlucHV0LCBUT19QUklNSVRJVkUpO1xuICB2YXIgcmVzdWx0O1xuICBpZiAoZXhvdGljVG9QcmltKSB7XG4gICAgaWYgKHByZWYgPT09IHVuZGVmaW5lZCkgcHJlZiA9ICdkZWZhdWx0JztcbiAgICByZXN1bHQgPSBjYWxsKGV4b3RpY1RvUHJpbSwgaW5wdXQsIHByZWYpO1xuICAgIGlmICghaXNPYmplY3QocmVzdWx0KSB8fCBpc1N5bWJvbChyZXN1bHQpKSByZXR1cm4gcmVzdWx0O1xuICAgIHRocm93IG5ldyAkVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xuICB9XG4gIGlmIChwcmVmID09PSB1bmRlZmluZWQpIHByZWYgPSAnbnVtYmVyJztcbiAgcmV0dXJuIG9yZGluYXJ5VG9QcmltaXRpdmUoaW5wdXQsIHByZWYpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1zeW1ib2wnKTtcblxuLy8gYFRvUHJvcGVydHlLZXlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b3Byb3BlcnR5a2V5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICB2YXIga2V5ID0gdG9QcmltaXRpdmUoYXJndW1lbnQsICdzdHJpbmcnKTtcbiAgcmV0dXJuIGlzU3ltYm9sKGtleSkgPyBrZXkgOiBrZXkgKyAnJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xudmFyIHRlc3QgPSB7fTtcblxudGVzdFtUT19TVFJJTkdfVEFHXSA9ICd6JztcblxubW9kdWxlLmV4cG9ydHMgPSBTdHJpbmcodGVzdCkgPT09ICdbb2JqZWN0IHpdJztcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcblxudmFyICRTdHJpbmcgPSBTdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIGlmIChjbGFzc29mKGFyZ3VtZW50KSA9PT0gJ1N5bWJvbCcpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IGEgU3ltYm9sIHZhbHVlIHRvIGEgc3RyaW5nJyk7XG4gIHJldHVybiAkU3RyaW5nKGFyZ3VtZW50KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJFN0cmluZyA9IFN0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gJFN0cmluZyhhcmd1bWVudCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuICdPYmplY3QnO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG52YXIgaWQgPSAwO1xudmFyIHBvc3RmaXggPSBNYXRoLnJhbmRvbSgpO1xudmFyIHRvU3RyaW5nID0gdW5jdXJyeVRoaXMoMS4wLnRvU3RyaW5nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcgKyAoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSkgKyAnKV8nICsgdG9TdHJpbmcoKytpZCArIHBvc3RmaXgsIDM2KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBlcy9uby1zeW1ib2wgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmcgKi9cbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N5bWJvbC1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfU1lNQk9MXG4gICYmICFTeW1ib2wuc2hhbVxuICAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gVjggfiBDaHJvbWUgMzYtXG4vLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMzM0XG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSwgJ3Byb3RvdHlwZScsIHtcbiAgICB2YWx1ZTogNDIsXG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pLnByb3RvdHlwZSAhPT0gNDI7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQ2FsbGFibGUoV2Vha01hcCkgJiYgL25hdGl2ZSBjb2RlLy50ZXN0KFN0cmluZyhXZWFrTWFwKSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciB3cmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLXdyYXBwZWQnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTkFNRSkge1xuICB2YXIgU3ltYm9sID0gcGF0aC5TeW1ib2wgfHwgKHBhdGguU3ltYm9sID0ge30pO1xuICBpZiAoIWhhc093bihTeW1ib2wsIE5BTUUpKSBkZWZpbmVQcm9wZXJ0eShTeW1ib2wsIE5BTUUsIHtcbiAgICB2YWx1ZTogd3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZS5mKE5BTUUpXG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuZXhwb3J0cy5mID0gd2VsbEtub3duU3ltYm9sO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zeW1ib2wtY29uc3RydWN0b3ItZGV0ZWN0aW9uJyk7XG52YXIgVVNFX1NZTUJPTF9BU19VSUQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQnKTtcblxudmFyIFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgV2VsbEtub3duU3ltYm9sc1N0b3JlID0gc2hhcmVkKCd3a3MnKTtcbnZhciBjcmVhdGVXZWxsS25vd25TeW1ib2wgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IFN5bWJvbFsnZm9yJ10gfHwgU3ltYm9sIDogU3ltYm9sICYmIFN5bWJvbC53aXRob3V0U2V0dGVyIHx8IHVpZDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICBpZiAoIWhhc093bihXZWxsS25vd25TeW1ib2xzU3RvcmUsIG5hbWUpKSB7XG4gICAgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID0gTkFUSVZFX1NZTUJPTCAmJiBoYXNPd24oU3ltYm9sLCBuYW1lKVxuICAgICAgPyBTeW1ib2xbbmFtZV1cbiAgICAgIDogY3JlYXRlV2VsbEtub3duU3ltYm9sKCdTeW1ib2wuJyArIG5hbWUpO1xuICB9IHJldHVybiBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgbGVuZ3RoT2ZBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbGVuZ3RoLW9mLWFycmF5LWxpa2UnKTtcbnZhciBkb2VzTm90RXhjZWVkU2FmZUludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9lcy1ub3QtZXhjZWVkLXNhZmUtaW50ZWdlcicpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGFycmF5U3BlY2llc0NyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNyZWF0ZScpO1xudmFyIGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBWOF9WRVJTSU9OID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uJyk7XG5cbnZhciBJU19DT05DQVRfU1BSRUFEQUJMRSA9IHdlbGxLbm93blN5bWJvbCgnaXNDb25jYXRTcHJlYWRhYmxlJyk7XG5cbi8vIFdlIGNhbid0IHVzZSB0aGlzIGZlYXR1cmUgZGV0ZWN0aW9uIGluIFY4IHNpbmNlIGl0IGNhdXNlc1xuLy8gZGVvcHRpbWl6YXRpb24gYW5kIHNlcmlvdXMgcGVyZm9ybWFuY2UgZGVncmFkYXRpb25cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy82NzlcbnZhciBJU19DT05DQVRfU1BSRUFEQUJMRV9TVVBQT1JUID0gVjhfVkVSU0lPTiA+PSA1MSB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgYXJyYXkgPSBbXTtcbiAgYXJyYXlbSVNfQ09OQ0FUX1NQUkVBREFCTEVdID0gZmFsc2U7XG4gIHJldHVybiBhcnJheS5jb25jYXQoKVswXSAhPT0gYXJyYXk7XG59KTtcblxudmFyIGlzQ29uY2F0U3ByZWFkYWJsZSA9IGZ1bmN0aW9uIChPKSB7XG4gIGlmICghaXNPYmplY3QoTykpIHJldHVybiBmYWxzZTtcbiAgdmFyIHNwcmVhZGFibGUgPSBPW0lTX0NPTkNBVF9TUFJFQURBQkxFXTtcbiAgcmV0dXJuIHNwcmVhZGFibGUgIT09IHVuZGVmaW5lZCA/ICEhc3ByZWFkYWJsZSA6IGlzQXJyYXkoTyk7XG59O1xuXG52YXIgRk9SQ0VEID0gIUlTX0NPTkNBVF9TUFJFQURBQkxFX1NVUFBPUlQgfHwgIWFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQoJ2NvbmNhdCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmNvbmNhdGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5jb25jYXRcbi8vIHdpdGggYWRkaW5nIHN1cHBvcnQgb2YgQEBpc0NvbmNhdFNwcmVhZGFibGUgYW5kIEBAc3BlY2llc1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGFyaXR5OiAxLCBmb3JjZWQ6IEZPUkNFRCB9LCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFycyAtLSByZXF1aXJlZCBmb3IgYC5sZW5ndGhgXG4gIGNvbmNhdDogZnVuY3Rpb24gY29uY2F0KGFyZykge1xuICAgIHZhciBPID0gdG9PYmplY3QodGhpcyk7XG4gICAgdmFyIEEgPSBhcnJheVNwZWNpZXNDcmVhdGUoTywgMCk7XG4gICAgdmFyIG4gPSAwO1xuICAgIHZhciBpLCBrLCBsZW5ndGgsIGxlbiwgRTtcbiAgICBmb3IgKGkgPSAtMSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBFID0gaSA9PT0gLTEgPyBPIDogYXJndW1lbnRzW2ldO1xuICAgICAgaWYgKGlzQ29uY2F0U3ByZWFkYWJsZShFKSkge1xuICAgICAgICBsZW4gPSBsZW5ndGhPZkFycmF5TGlrZShFKTtcbiAgICAgICAgZG9lc05vdEV4Y2VlZFNhZmVJbnRlZ2VyKG4gKyBsZW4pO1xuICAgICAgICBmb3IgKGsgPSAwOyBrIDwgbGVuOyBrKyssIG4rKykgaWYgKGsgaW4gRSkgY3JlYXRlUHJvcGVydHkoQSwgbiwgRVtrXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2VzTm90RXhjZWVkU2FmZUludGVnZXIobiArIDEpO1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShBLCBuKyssIEUpO1xuICAgICAgfVxuICAgIH1cbiAgICBBLmxlbmd0aCA9IG47XG4gICAgcmV0dXJuIEE7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJGZpbHRlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5maWx0ZXI7XG52YXIgYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydCcpO1xuXG52YXIgSEFTX1NQRUNJRVNfU1VQUE9SVCA9IGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQoJ2ZpbHRlcicpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmZpbHRlcmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maWx0ZXJcbi8vIHdpdGggYWRkaW5nIHN1cHBvcnQgb2YgQEBzcGVjaWVzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAhSEFTX1NQRUNJRVNfU1VQUE9SVCB9LCB7XG4gIGZpbHRlcjogZnVuY3Rpb24gZmlsdGVyKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gICAgcmV0dXJuICRmaWx0ZXIodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktZm9yLWVhY2gnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1hcnJheS1wcm90b3R5cGUtZm9yZWFjaCAtLSBzYWZlXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBbXS5mb3JFYWNoICE9PSBmb3JFYWNoIH0sIHtcbiAgZm9yRWFjaDogZm9yRWFjaFxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkaW5jbHVkZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmNsdWRlcztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWRkLXRvLXVuc2NvcGFibGVzJyk7XG5cbi8vIEZGOTkrIGJ1Z1xudmFyIEJST0tFTl9PTl9TUEFSU0UgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1hcnJheS1wcm90b3R5cGUtaW5jbHVkZXMgLS0gZGV0ZWN0aW9uXG4gIHJldHVybiAhQXJyYXkoMSkuaW5jbHVkZXMoKTtcbn0pO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBCUk9LRU5fT05fU1BBUlNFIH0sIHtcbiAgaW5jbHVkZXM6IGZ1bmN0aW9uIGluY2x1ZGVzKGVsIC8qICwgZnJvbUluZGV4ID0gMCAqLykge1xuICAgIHJldHVybiAkaW5jbHVkZXModGhpcywgZWwsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG5cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAdW5zY29wYWJsZXNcbmFkZFRvVW5zY29wYWJsZXMoJ2luY2x1ZGVzJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xudmFyIGRlZmluZUl0ZXJhdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9yLWRlZmluZScpO1xudmFyIGNyZWF0ZUl0ZXJSZXN1bHRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLWl0ZXItcmVzdWx0LW9iamVjdCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG5cbnZhciBBUlJBWV9JVEVSQVRPUiA9ICdBcnJheSBJdGVyYXRvcic7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihBUlJBWV9JVEVSQVRPUik7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZW50cmllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5lbnRyaWVzXG4vLyBgQXJyYXkucHJvdG90eXBlLmtleXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUua2V5c1xuLy8gYEFycmF5LnByb3RvdHlwZS52YWx1ZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUudmFsdWVzXG4vLyBgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAaXRlcmF0b3Jcbi8vIGBDcmVhdGVBcnJheUl0ZXJhdG9yYCBpbnRlcm5hbCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtY3JlYXRlYXJyYXlpdGVyYXRvclxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVJdGVyYXRvcihBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgIHR5cGU6IEFSUkFZX0lURVJBVE9SLFxuICAgIHRhcmdldDogdG9JbmRleGVkT2JqZWN0KGl0ZXJhdGVkKSwgLy8gdGFyZ2V0XG4gICAgaW5kZXg6IDAsICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gICAga2luZDoga2luZCAgICAgICAgICAgICAgICAgICAgICAgICAvLyBraW5kXG4gIH0pO1xuLy8gYCVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtJWFycmF5aXRlcmF0b3Jwcm90b3R5cGUlLm5leHRcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgdmFyIHRhcmdldCA9IHN0YXRlLnRhcmdldDtcbiAgdmFyIGluZGV4ID0gc3RhdGUuaW5kZXgrKztcbiAgaWYgKCF0YXJnZXQgfHwgaW5kZXggPj0gdGFyZ2V0Lmxlbmd0aCkge1xuICAgIHN0YXRlLnRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gY3JlYXRlSXRlclJlc3VsdE9iamVjdCh1bmRlZmluZWQsIHRydWUpO1xuICB9XG4gIHN3aXRjaCAoc3RhdGUua2luZCkge1xuICAgIGNhc2UgJ2tleXMnOiByZXR1cm4gY3JlYXRlSXRlclJlc3VsdE9iamVjdChpbmRleCwgZmFsc2UpO1xuICAgIGNhc2UgJ3ZhbHVlcyc6IHJldHVybiBjcmVhdGVJdGVyUmVzdWx0T2JqZWN0KHRhcmdldFtpbmRleF0sIGZhbHNlKTtcbiAgfSByZXR1cm4gY3JlYXRlSXRlclJlc3VsdE9iamVjdChbaW5kZXgsIHRhcmdldFtpbmRleF1dLCBmYWxzZSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJVxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1jcmVhdGV1bm1hcHBlZGFyZ3VtZW50c29iamVjdFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1jcmVhdGVtYXBwZWRhcmd1bWVudHNvYmplY3RcbnZhciB2YWx1ZXMgPSBJdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQHVuc2NvcGFibGVzXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcblxuLy8gVjggfiBDaHJvbWUgNDUtIGJ1Z1xuaWYgKCFJU19QVVJFICYmIERFU0NSSVBUT1JTICYmIHZhbHVlcy5uYW1lICE9PSAndmFsdWVzJykgdHJ5IHtcbiAgZGVmaW5lUHJvcGVydHkodmFsdWVzLCAnbmFtZScsIHsgdmFsdWU6ICd2YWx1ZXMnIH0pO1xufSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJG1hcCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5tYXA7XG52YXIgYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydCcpO1xuXG52YXIgSEFTX1NQRUNJRVNfU1VQUE9SVCA9IGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQoJ21hcCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLm1hcGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5tYXBcbi8vIHdpdGggYWRkaW5nIHN1cHBvcnQgb2YgQEBzcGVjaWVzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAhSEFTX1NQRUNJRVNfU1VQUE9SVCB9LCB7XG4gIG1hcDogZnVuY3Rpb24gbWFwKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gICAgcmV0dXJuICRtYXAodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRzb21lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLnNvbWU7XG52YXIgYXJyYXlNZXRob2RJc1N0cmljdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0Jyk7XG5cbnZhciBTVFJJQ1RfTUVUSE9EID0gYXJyYXlNZXRob2RJc1N0cmljdCgnc29tZScpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnNvbWVgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuc29tZVxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogIVNUUklDVF9NRVRIT0QgfSwge1xuICBzb21lOiBmdW5jdGlvbiBzb21lKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gICAgcmV0dXJuICRzb21lKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG4iLCIvLyBlbXB0eVxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBhcHBseSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1hcHBseScpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGlzU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXN5bWJvbCcpO1xudmFyIGFycmF5U2xpY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc2xpY2UnKTtcbnZhciBnZXRSZXBsYWNlckZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1qc29uLXJlcGxhY2VyLWZ1bmN0aW9uJyk7XG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zeW1ib2wtY29uc3RydWN0b3ItZGV0ZWN0aW9uJyk7XG5cbnZhciAkU3RyaW5nID0gU3RyaW5nO1xudmFyICRzdHJpbmdpZnkgPSBnZXRCdWlsdEluKCdKU09OJywgJ3N0cmluZ2lmeScpO1xudmFyIGV4ZWMgPSB1bmN1cnJ5VGhpcygvLi8uZXhlYyk7XG52YXIgY2hhckF0ID0gdW5jdXJyeVRoaXMoJycuY2hhckF0KTtcbnZhciBjaGFyQ29kZUF0ID0gdW5jdXJyeVRoaXMoJycuY2hhckNvZGVBdCk7XG52YXIgcmVwbGFjZSA9IHVuY3VycnlUaGlzKCcnLnJlcGxhY2UpO1xudmFyIG51bWJlclRvU3RyaW5nID0gdW5jdXJyeVRoaXMoMS4wLnRvU3RyaW5nKTtcblxudmFyIHRlc3RlciA9IC9bXFx1RDgwMC1cXHVERkZGXS9nO1xudmFyIGxvdyA9IC9eW1xcdUQ4MDAtXFx1REJGRl0kLztcbnZhciBoaSA9IC9eW1xcdURDMDAtXFx1REZGRl0kLztcblxudmFyIFdST05HX1NZTUJPTFNfQ09OVkVSU0lPTiA9ICFOQVRJVkVfU1lNQk9MIHx8IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN5bWJvbCA9IGdldEJ1aWx0SW4oJ1N5bWJvbCcpKCdzdHJpbmdpZnkgZGV0ZWN0aW9uJyk7XG4gIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gIHJldHVybiAkc3RyaW5naWZ5KFtzeW1ib2xdKSAhPT0gJ1tudWxsXSdcbiAgICAvLyBXZWJLaXQgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIG51bGxcbiAgICB8fCAkc3RyaW5naWZ5KHsgYTogc3ltYm9sIH0pICE9PSAne30nXG4gICAgLy8gVjggdGhyb3dzIG9uIGJveGVkIHN5bWJvbHNcbiAgICB8fCAkc3RyaW5naWZ5KE9iamVjdChzeW1ib2wpKSAhPT0gJ3t9Jztcbn0pO1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC13ZWxsLWZvcm1lZC1zdHJpbmdpZnlcbnZhciBJTExfRk9STUVEX1VOSUNPREUgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAkc3RyaW5naWZ5KCdcXHVERjA2XFx1RDgzNCcpICE9PSAnXCJcXFxcdWRmMDZcXFxcdWQ4MzRcIidcbiAgICB8fCAkc3RyaW5naWZ5KCdcXHVERUFEJykgIT09ICdcIlxcXFx1ZGVhZFwiJztcbn0pO1xuXG52YXIgc3RyaW5naWZ5V2l0aFN5bWJvbHNGaXggPSBmdW5jdGlvbiAoaXQsIHJlcGxhY2VyKSB7XG4gIHZhciBhcmdzID0gYXJyYXlTbGljZShhcmd1bWVudHMpO1xuICB2YXIgJHJlcGxhY2VyID0gZ2V0UmVwbGFjZXJGdW5jdGlvbihyZXBsYWNlcik7XG4gIGlmICghaXNDYWxsYWJsZSgkcmVwbGFjZXIpICYmIChpdCA9PT0gdW5kZWZpbmVkIHx8IGlzU3ltYm9sKGl0KSkpIHJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICBhcmdzWzFdID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAvLyBzb21lIG9sZCBpbXBsZW1lbnRhdGlvbnMgKGxpa2UgV2ViS2l0KSBjb3VsZCBwYXNzIG51bWJlcnMgYXMga2V5c1xuICAgIGlmIChpc0NhbGxhYmxlKCRyZXBsYWNlcikpIHZhbHVlID0gY2FsbCgkcmVwbGFjZXIsIHRoaXMsICRTdHJpbmcoa2V5KSwgdmFsdWUpO1xuICAgIGlmICghaXNTeW1ib2wodmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gIH07XG4gIHJldHVybiBhcHBseSgkc3RyaW5naWZ5LCBudWxsLCBhcmdzKTtcbn07XG5cbnZhciBmaXhJbGxGb3JtZWQgPSBmdW5jdGlvbiAobWF0Y2gsIG9mZnNldCwgc3RyaW5nKSB7XG4gIHZhciBwcmV2ID0gY2hhckF0KHN0cmluZywgb2Zmc2V0IC0gMSk7XG4gIHZhciBuZXh0ID0gY2hhckF0KHN0cmluZywgb2Zmc2V0ICsgMSk7XG4gIGlmICgoZXhlYyhsb3csIG1hdGNoKSAmJiAhZXhlYyhoaSwgbmV4dCkpIHx8IChleGVjKGhpLCBtYXRjaCkgJiYgIWV4ZWMobG93LCBwcmV2KSkpIHtcbiAgICByZXR1cm4gJ1xcXFx1JyArIG51bWJlclRvU3RyaW5nKGNoYXJDb2RlQXQobWF0Y2gsIDApLCAxNik7XG4gIH0gcmV0dXJuIG1hdGNoO1xufTtcblxuaWYgKCRzdHJpbmdpZnkpIHtcbiAgLy8gYEpTT04uc3RyaW5naWZ5YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1qc29uLnN0cmluZ2lmeVxuICAkKHsgdGFyZ2V0OiAnSlNPTicsIHN0YXQ6IHRydWUsIGFyaXR5OiAzLCBmb3JjZWQ6IFdST05HX1NZTUJPTFNfQ09OVkVSU0lPTiB8fCBJTExfRk9STUVEX1VOSUNPREUgfSwge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFycyAtLSByZXF1aXJlZCBmb3IgYC5sZW5ndGhgXG4gICAgc3RyaW5naWZ5OiBmdW5jdGlvbiBzdHJpbmdpZnkoaXQsIHJlcGxhY2VyLCBzcGFjZSkge1xuICAgICAgdmFyIGFyZ3MgPSBhcnJheVNsaWNlKGFyZ3VtZW50cyk7XG4gICAgICB2YXIgcmVzdWx0ID0gYXBwbHkoV1JPTkdfU1lNQk9MU19DT05WRVJTSU9OID8gc3RyaW5naWZ5V2l0aFN5bWJvbHNGaXggOiAkc3RyaW5naWZ5LCBudWxsLCBhcmdzKTtcbiAgICAgIHJldHVybiBJTExfRk9STUVEX1VOSUNPREUgJiYgdHlwZW9mIHJlc3VsdCA9PSAnc3RyaW5nJyA/IHJlcGxhY2UocmVzdWx0LCB0ZXN0ZXIsIGZpeElsbEZvcm1lZCkgOiByZXN1bHQ7XG4gICAgfVxuICB9KTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcblxuLy8gSlNPTltAQHRvU3RyaW5nVGFnXSBwcm9wZXJ0eVxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1qc29uLUBAdG9zdHJpbmd0YWdcbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpO1xuIiwiLy8gZW1wdHlcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtYXNzaWduJyk7XG5cbi8vIGBPYmplY3QuYXNzaWduYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmFzc2lnblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1hc3NpZ24gLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBhcml0eTogMiwgZm9yY2VkOiBPYmplY3QuYXNzaWduICE9PSBhc3NpZ24gfSwge1xuICBhc3NpZ246IGFzc2lnblxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnRpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0aWVzJykuZjtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnRpZXNcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydGllcyAtLSBzYWZlXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBPYmplY3QuZGVmaW5lUHJvcGVydGllcyAhPT0gZGVmaW5lUHJvcGVydGllcywgc2hhbTogIURFU0NSSVBUT1JTIH0sIHtcbiAgZGVmaW5lUHJvcGVydGllczogZGVmaW5lUHJvcGVydGllc1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnR5XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHNhZmVcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSAhPT0gZGVmaW5lUHJvcGVydHksIHNoYW06ICFERVNDUklQVE9SUyB9LCB7XG4gIGRlZmluZVByb3BlcnR5OiBkZWZpbmVQcm9wZXJ0eVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJykuZjtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xuXG52YXIgRk9SQ0VEID0gIURFU0NSSVBUT1JTIHx8IGZhaWxzKGZ1bmN0aW9uICgpIHsgbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKDEpOyB9KTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBGT1JDRUQsIHNoYW06ICFERVNDUklQVE9SUyB9LCB7XG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpIHtcbiAgICByZXR1cm4gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRvSW5kZXhlZE9iamVjdChpdCksIGtleSk7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBvd25LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL293bi1rZXlzJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHknKTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5ZGVzY3JpcHRvcnNcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBzaGFtOiAhREVTQ1JJUFRPUlMgfSwge1xuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iamVjdCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KG9iamVjdCk7XG4gICAgdmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZS5mO1xuICAgIHZhciBrZXlzID0gb3duS2V5cyhPKTtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIga2V5LCBkZXNjcmlwdG9yO1xuICAgIHdoaWxlIChrZXlzLmxlbmd0aCA+IGluZGV4KSB7XG4gICAgICBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIGtleSA9IGtleXNbaW5kZXgrK10pO1xuICAgICAgaWYgKGRlc2NyaXB0b3IgIT09IHVuZGVmaW5lZCkgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3ltYm9sLWNvbnN0cnVjdG9yLWRldGVjdGlvbicpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcblxuLy8gVjggfiBDaHJvbWUgMzggYW5kIDM5IGBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzYCBmYWlscyBvbiBwcmltaXRpdmVzXG4vLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zNDQzXG52YXIgRk9SQ0VEID0gIU5BVElWRV9TWU1CT0wgfHwgZmFpbHMoZnVuY3Rpb24gKCkgeyBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZigxKTsgfSk7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5c3ltYm9sc1xuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogRk9SQ0VEIH0sIHtcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpIHtcbiAgICB2YXIgJGdldE93blByb3BlcnR5U3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mO1xuICAgIHJldHVybiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID8gJGdldE93blByb3BlcnR5U3ltYm9scyh0b09iamVjdChpdCkpIDogW107XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgbmF0aXZlS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbnZhciBGQUlMU19PTl9QUklNSVRJVkVTID0gZmFpbHMoZnVuY3Rpb24gKCkgeyBuYXRpdmVLZXlzKDEpOyB9KTtcblxuLy8gYE9iamVjdC5rZXlzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmtleXNcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IEZBSUxTX09OX1BSSU1JVElWRVMgfSwge1xuICBrZXlzOiBmdW5jdGlvbiBrZXlzKGl0KSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXModG9PYmplY3QoaXQpKTtcbiAgfVxufSk7XG4iLCIvLyBlbXB0eVxuIiwiLy8gZW1wdHlcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIG5vdEFSZWdFeHAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbm90LWEtcmVnZXhwJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciBjb3JyZWN0SXNSZWdFeHBMb2dpYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3JyZWN0LWlzLXJlZ2V4cC1sb2dpYycpO1xuXG52YXIgc3RyaW5nSW5kZXhPZiA9IHVuY3VycnlUaGlzKCcnLmluZGV4T2YpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUuaW5jbHVkZXNcbiQoeyB0YXJnZXQ6ICdTdHJpbmcnLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAhY29ycmVjdElzUmVnRXhwTG9naWMoJ2luY2x1ZGVzJykgfSwge1xuICBpbmNsdWRlczogZnVuY3Rpb24gaW5jbHVkZXMoc2VhcmNoU3RyaW5nIC8qICwgcG9zaXRpb24gPSAwICovKSB7XG4gICAgcmV0dXJuICEhfnN0cmluZ0luZGV4T2YoXG4gICAgICB0b1N0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKHRoaXMpKSxcbiAgICAgIHRvU3RyaW5nKG5vdEFSZWdFeHAoc2VhcmNoU3RyaW5nKSksXG4gICAgICBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZFxuICAgICk7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNoYXJBdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctbXVsdGlieXRlJykuY2hhckF0O1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcbnZhciBkZWZpbmVJdGVyYXRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvci1kZWZpbmUnKTtcbnZhciBjcmVhdGVJdGVyUmVzdWx0T2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1pdGVyLXJlc3VsdC1vYmplY3QnKTtcblxudmFyIFNUUklOR19JVEVSQVRPUiA9ICdTdHJpbmcgSXRlcmF0b3InO1xudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoU1RSSU5HX0lURVJBVE9SKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl1gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLUBAaXRlcmF0b3JcbmRlZmluZUl0ZXJhdG9yKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uIChpdGVyYXRlZCkge1xuICBzZXRJbnRlcm5hbFN0YXRlKHRoaXMsIHtcbiAgICB0eXBlOiBTVFJJTkdfSVRFUkFUT1IsXG4gICAgc3RyaW5nOiB0b1N0cmluZyhpdGVyYXRlZCksXG4gICAgaW5kZXg6IDBcbiAgfSk7XG4vLyBgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtJXN0cmluZ2l0ZXJhdG9ycHJvdG90eXBlJS5uZXh0XG59LCBmdW5jdGlvbiBuZXh0KCkge1xuICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpO1xuICB2YXIgc3RyaW5nID0gc3RhdGUuc3RyaW5nO1xuICB2YXIgaW5kZXggPSBzdGF0ZS5pbmRleDtcbiAgdmFyIHBvaW50O1xuICBpZiAoaW5kZXggPj0gc3RyaW5nLmxlbmd0aCkgcmV0dXJuIGNyZWF0ZUl0ZXJSZXN1bHRPYmplY3QodW5kZWZpbmVkLCB0cnVlKTtcbiAgcG9pbnQgPSBjaGFyQXQoc3RyaW5nLCBpbmRleCk7XG4gIHN0YXRlLmluZGV4ICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIGNyZWF0ZUl0ZXJSZXN1bHRPYmplY3QocG9pbnQsIGZhbHNlKTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC1kZWZpbmUnKTtcblxuLy8gYFN5bWJvbC5hc3luY0l0ZXJhdG9yYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wuYXN5bmNpdGVyYXRvclxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdhc3luY0l0ZXJhdG9yJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N5bWJvbC1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24nKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgaXNQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtaXMtcHJvdG90eXBlLW9mJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9Qcm9wZXJ0eUtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcm9wZXJ0eS1rZXknKTtcbnZhciAkdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgbmF0aXZlT2JqZWN0Q3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcycpO1xudmFyIGdldE93blByb3BlcnR5TmFtZXNFeHRlcm5hbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy1leHRlcm5hbCcpO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgZGVmaW5lUHJvcGVydGllc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpO1xudmFyIGRlZmluZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluJyk7XG52YXIgZGVmaW5lQnVpbHRJbkFjY2Vzc29yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbi1hY2Nlc3NvcicpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgd3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC13cmFwcGVkJyk7XG52YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLWRlZmluZScpO1xudmFyIGRlZmluZVN5bWJvbFRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N5bWJvbC1kZWZpbmUtdG8tcHJpbWl0aXZlJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgJGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykuZm9yRWFjaDtcblxudmFyIEhJRERFTiA9IHNoYXJlZEtleSgnaGlkZGVuJyk7XG52YXIgU1lNQk9MID0gJ1N5bWJvbCc7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKFNZTUJPTCk7XG5cbnZhciBPYmplY3RQcm90b3R5cGUgPSBPYmplY3RbUFJPVE9UWVBFXTtcbnZhciAkU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciBTeW1ib2xQcm90b3R5cGUgPSAkU3ltYm9sICYmICRTeW1ib2xbUFJPVE9UWVBFXTtcbnZhciBSYW5nZUVycm9yID0gZ2xvYmFsLlJhbmdlRXJyb3I7XG52YXIgVHlwZUVycm9yID0gZ2xvYmFsLlR5cGVFcnJvcjtcbnZhciBRT2JqZWN0ID0gZ2xvYmFsLlFPYmplY3Q7XG52YXIgbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG52YXIgbmF0aXZlRGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xudmFyIG5hdGl2ZUdldE93blByb3BlcnR5TmFtZXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzRXh0ZXJuYWwuZjtcbnZhciBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmY7XG52YXIgcHVzaCA9IHVuY3VycnlUaGlzKFtdLnB1c2gpO1xuXG52YXIgQWxsU3ltYm9scyA9IHNoYXJlZCgnc3ltYm9scycpO1xudmFyIE9iamVjdFByb3RvdHlwZVN5bWJvbHMgPSBzaGFyZWQoJ29wLXN5bWJvbHMnKTtcbnZhciBXZWxsS25vd25TeW1ib2xzU3RvcmUgPSBzaGFyZWQoJ3drcycpO1xuXG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBVU0VfU0VUVEVSID0gIVFPYmplY3QgfHwgIVFPYmplY3RbUFJPVE9UWVBFXSB8fCAhUU9iamVjdFtQUk9UT1RZUEVdLmZpbmRDaGlsZDtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgZmFsbGJhY2tEZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIChPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIHZhciBPYmplY3RQcm90b3R5cGVEZXNjcmlwdG9yID0gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE9iamVjdFByb3RvdHlwZSwgUCk7XG4gIGlmIChPYmplY3RQcm90b3R5cGVEZXNjcmlwdG9yKSBkZWxldGUgT2JqZWN0UHJvdG90eXBlW1BdO1xuICBuYXRpdmVEZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgaWYgKE9iamVjdFByb3RvdHlwZURlc2NyaXB0b3IgJiYgTyAhPT0gT2JqZWN0UHJvdG90eXBlKSB7XG4gICAgbmF0aXZlRGVmaW5lUHJvcGVydHkoT2JqZWN0UHJvdG90eXBlLCBQLCBPYmplY3RQcm90b3R5cGVEZXNjcmlwdG9yKTtcbiAgfVxufTtcblxudmFyIHNldFN5bWJvbERlc2NyaXB0b3IgPSBERVNDUklQVE9SUyAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RDcmVhdGUobmF0aXZlRGVmaW5lUHJvcGVydHkoe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbmF0aXZlRGVmaW5lUHJvcGVydHkodGhpcywgJ2EnLCB7IHZhbHVlOiA3IH0pLmE7IH1cbiAgfSkpLmEgIT09IDc7XG59KSA/IGZhbGxiYWNrRGVmaW5lUHJvcGVydHkgOiBuYXRpdmVEZWZpbmVQcm9wZXJ0eTtcblxudmFyIHdyYXAgPSBmdW5jdGlvbiAodGFnLCBkZXNjcmlwdGlvbikge1xuICB2YXIgc3ltYm9sID0gQWxsU3ltYm9sc1t0YWddID0gbmF0aXZlT2JqZWN0Q3JlYXRlKFN5bWJvbFByb3RvdHlwZSk7XG4gIHNldEludGVybmFsU3RhdGUoc3ltYm9sLCB7XG4gICAgdHlwZTogU1lNQk9MLFxuICAgIHRhZzogdGFnLFxuICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvblxuICB9KTtcbiAgaWYgKCFERVNDUklQVE9SUykgc3ltYm9sLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIHJldHVybiBzeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBpZiAoTyA9PT0gT2JqZWN0UHJvdG90eXBlKSAkZGVmaW5lUHJvcGVydHkoT2JqZWN0UHJvdG90eXBlU3ltYm9scywgUCwgQXR0cmlidXRlcyk7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5ID0gdG9Qcm9wZXJ0eUtleShQKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChoYXNPd24oQWxsU3ltYm9scywga2V5KSkge1xuICAgIGlmICghQXR0cmlidXRlcy5lbnVtZXJhYmxlKSB7XG4gICAgICBpZiAoIWhhc093bihPLCBISURERU4pKSBuYXRpdmVEZWZpbmVQcm9wZXJ0eShPLCBISURERU4sIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCB7fSkpO1xuICAgICAgT1tISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaGFzT3duKE8sIEhJRERFTikgJiYgT1tISURERU5dW2tleV0pIE9bSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBBdHRyaWJ1dGVzID0gbmF0aXZlT2JqZWN0Q3JlYXRlKEF0dHJpYnV0ZXMsIHsgZW51bWVyYWJsZTogY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDAsIGZhbHNlKSB9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjcmlwdG9yKE8sIGtleSwgQXR0cmlidXRlcyk7XG4gIH0gcmV0dXJuIG5hdGl2ZURlZmluZVByb3BlcnR5KE8sIGtleSwgQXR0cmlidXRlcyk7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBwcm9wZXJ0aWVzID0gdG9JbmRleGVkT2JqZWN0KFByb3BlcnRpZXMpO1xuICB2YXIga2V5cyA9IG9iamVjdEtleXMocHJvcGVydGllcykuY29uY2F0KCRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMocHJvcGVydGllcykpO1xuICAkZm9yRWFjaChrZXlzLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKCFERVNDUklQVE9SUyB8fCBjYWxsKCRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgcHJvcGVydGllcywga2V5KSkgJGRlZmluZVByb3BlcnR5KE8sIGtleSwgcHJvcGVydGllc1trZXldKTtcbiAgfSk7XG4gIHJldHVybiBPO1xufTtcblxudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gbmF0aXZlT2JqZWN0Q3JlYXRlKE8pIDogJGRlZmluZVByb3BlcnRpZXMobmF0aXZlT2JqZWN0Q3JlYXRlKE8pLCBQcm9wZXJ0aWVzKTtcbn07XG5cbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShWKSB7XG4gIHZhciBQID0gdG9Qcm9wZXJ0eUtleShWKTtcbiAgdmFyIGVudW1lcmFibGUgPSBjYWxsKG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlLCB0aGlzLCBQKTtcbiAgaWYgKHRoaXMgPT09IE9iamVjdFByb3RvdHlwZSAmJiBoYXNPd24oQWxsU3ltYm9scywgUCkgJiYgIWhhc093bihPYmplY3RQcm90b3R5cGVTeW1ib2xzLCBQKSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gZW51bWVyYWJsZSB8fCAhaGFzT3duKHRoaXMsIFApIHx8ICFoYXNPd24oQWxsU3ltYm9scywgUCkgfHwgaGFzT3duKHRoaXMsIEhJRERFTikgJiYgdGhpc1tISURERU5dW1BdXG4gICAgPyBlbnVtZXJhYmxlIDogdHJ1ZTtcbn07XG5cbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgdmFyIGl0ID0gdG9JbmRleGVkT2JqZWN0KE8pO1xuICB2YXIga2V5ID0gdG9Qcm9wZXJ0eUtleShQKTtcbiAgaWYgKGl0ID09PSBPYmplY3RQcm90b3R5cGUgJiYgaGFzT3duKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhc093bihPYmplY3RQcm90b3R5cGVTeW1ib2xzLCBrZXkpKSByZXR1cm47XG4gIHZhciBkZXNjcmlwdG9yID0gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpO1xuICBpZiAoZGVzY3JpcHRvciAmJiBoYXNPd24oQWxsU3ltYm9scywga2V5KSAmJiAhKGhhc093bihpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKSB7XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZGVzY3JpcHRvcjtcbn07XG5cbnZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICB2YXIgbmFtZXMgPSBuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzKHRvSW5kZXhlZE9iamVjdChPKSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgJGZvckVhY2gobmFtZXMsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoIWhhc093bihBbGxTeW1ib2xzLCBrZXkpICYmICFoYXNPd24oaGlkZGVuS2V5cywga2V5KSkgcHVzaChyZXN1bHQsIGtleSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiAoTykge1xuICB2YXIgSVNfT0JKRUNUX1BST1RPVFlQRSA9IE8gPT09IE9iamVjdFByb3RvdHlwZTtcbiAgdmFyIG5hbWVzID0gbmF0aXZlR2V0T3duUHJvcGVydHlOYW1lcyhJU19PQkpFQ1RfUFJPVE9UWVBFID8gT2JqZWN0UHJvdG90eXBlU3ltYm9scyA6IHRvSW5kZXhlZE9iamVjdChPKSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgJGZvckVhY2gobmFtZXMsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoaGFzT3duKEFsbFN5bWJvbHMsIGtleSkgJiYgKCFJU19PQkpFQ1RfUFJPVE9UWVBFIHx8IGhhc093bihPYmplY3RQcm90b3R5cGUsIGtleSkpKSB7XG4gICAgICBwdXNoKHJlc3VsdCwgQWxsU3ltYm9sc1trZXldKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLy8gYFN5bWJvbGAgY29uc3RydWN0b3Jcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLWNvbnN0cnVjdG9yXG5pZiAoIU5BVElWRV9TWU1CT0wpIHtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpIHtcbiAgICBpZiAoaXNQcm90b3R5cGVPZihTeW1ib2xQcm90b3R5cGUsIHRoaXMpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3InKTtcbiAgICB2YXIgZGVzY3JpcHRpb24gPSAhYXJndW1lbnRzLmxlbmd0aCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6ICR0b1N0cmluZyhhcmd1bWVudHNbMF0pO1xuICAgIHZhciB0YWcgPSB1aWQoZGVzY3JpcHRpb24pO1xuICAgIHZhciBzZXR0ZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHZhciAkdGhpcyA9IHRoaXMgPT09IHVuZGVmaW5lZCA/IGdsb2JhbCA6IHRoaXM7XG4gICAgICBpZiAoJHRoaXMgPT09IE9iamVjdFByb3RvdHlwZSkgY2FsbChzZXR0ZXIsIE9iamVjdFByb3RvdHlwZVN5bWJvbHMsIHZhbHVlKTtcbiAgICAgIGlmIChoYXNPd24oJHRoaXMsIEhJRERFTikgJiYgaGFzT3duKCR0aGlzW0hJRERFTl0sIHRhZykpICR0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwgdmFsdWUpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2V0U3ltYm9sRGVzY3JpcHRvcigkdGhpcywgdGFnLCBkZXNjcmlwdG9yKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmICghKGVycm9yIGluc3RhbmNlb2YgUmFuZ2VFcnJvcikpIHRocm93IGVycm9yO1xuICAgICAgICBmYWxsYmFja0RlZmluZVByb3BlcnR5KCR0aGlzLCB0YWcsIGRlc2NyaXB0b3IpO1xuICAgICAgfVxuICAgIH07XG4gICAgaWYgKERFU0NSSVBUT1JTICYmIFVTRV9TRVRURVIpIHNldFN5bWJvbERlc2NyaXB0b3IoT2JqZWN0UHJvdG90eXBlLCB0YWcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCBzZXQ6IHNldHRlciB9KTtcbiAgICByZXR1cm4gd3JhcCh0YWcsIGRlc2NyaXB0aW9uKTtcbiAgfTtcblxuICBTeW1ib2xQcm90b3R5cGUgPSAkU3ltYm9sW1BST1RPVFlQRV07XG5cbiAgZGVmaW5lQnVpbHRJbihTeW1ib2xQcm90b3R5cGUsICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpLnRhZztcbiAgfSk7XG5cbiAgZGVmaW5lQnVpbHRJbigkU3ltYm9sLCAnd2l0aG91dFNldHRlcicsIGZ1bmN0aW9uIChkZXNjcmlwdGlvbikge1xuICAgIHJldHVybiB3cmFwKHVpZChkZXNjcmlwdGlvbiksIGRlc2NyaXB0aW9uKTtcbiAgfSk7XG5cbiAgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZiA9ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiAgZGVmaW5lUHJvcGVydHlNb2R1bGUuZiA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgZGVmaW5lUHJvcGVydGllc01vZHVsZS5mID0gJGRlZmluZVByb3BlcnRpZXM7XG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZS5mID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZS5mID0gZ2V0T3duUHJvcGVydHlOYW1lc0V4dGVybmFsLmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmYgPSAkZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIHdyYXBwZWRXZWxsS25vd25TeW1ib2xNb2R1bGUuZiA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIHdyYXAod2VsbEtub3duU3ltYm9sKG5hbWUpLCBuYW1lKTtcbiAgfTtcblxuICBpZiAoREVTQ1JJUFRPUlMpIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1TeW1ib2wtZGVzY3JpcHRpb25cbiAgICBkZWZpbmVCdWlsdEluQWNjZXNzb3IoU3ltYm9sUHJvdG90eXBlLCAnZGVzY3JpcHRpb24nLCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uIGRlc2NyaXB0aW9uKCkge1xuICAgICAgICByZXR1cm4gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKS5kZXNjcmlwdGlvbjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIUlTX1BVUkUpIHtcbiAgICAgIGRlZmluZUJ1aWx0SW4oT2JqZWN0UHJvdG90eXBlLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAkcHJvcGVydHlJc0VudW1lcmFibGUsIHsgdW5zYWZlOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxufVxuXG4kKHsgZ2xvYmFsOiB0cnVlLCBjb25zdHJ1Y3RvcjogdHJ1ZSwgd3JhcDogdHJ1ZSwgZm9yY2VkOiAhTkFUSVZFX1NZTUJPTCwgc2hhbTogIU5BVElWRV9TWU1CT0wgfSwge1xuICBTeW1ib2w6ICRTeW1ib2xcbn0pO1xuXG4kZm9yRWFjaChvYmplY3RLZXlzKFdlbGxLbm93blN5bWJvbHNTdG9yZSksIGZ1bmN0aW9uIChuYW1lKSB7XG4gIGRlZmluZVdlbGxLbm93blN5bWJvbChuYW1lKTtcbn0pO1xuXG4kKHsgdGFyZ2V0OiBTWU1CT0wsIHN0YXQ6IHRydWUsIGZvcmNlZDogIU5BVElWRV9TWU1CT0wgfSwge1xuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uICgpIHsgVVNFX1NFVFRFUiA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24gKCkgeyBVU0VfU0VUVEVSID0gZmFsc2U7IH1cbn0pO1xuXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiAhTkFUSVZFX1NZTUJPTCwgc2hhbTogIURFU0NSSVBUT1JTIH0sIHtcbiAgLy8gYE9iamVjdC5jcmVhdGVgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5jcmVhdGVcbiAgY3JlYXRlOiAkY3JlYXRlLFxuICAvLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydHlcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydGllc1xuICBkZWZpbmVQcm9wZXJ0aWVzOiAkZGVmaW5lUHJvcGVydGllcyxcbiAgLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3JzXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvclxufSk7XG5cbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6ICFOQVRJVkVfU1lNQk9MIH0sIHtcbiAgLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHluYW1lc1xuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lc1xufSk7XG5cbi8vIGBTeW1ib2wucHJvdG90eXBlW0BAdG9QcmltaXRpdmVdYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLnByb3RvdHlwZS1AQHRvcHJpbWl0aXZlXG5kZWZpbmVTeW1ib2xUb1ByaW1pdGl2ZSgpO1xuXG4vLyBgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXWAgcHJvcGVydHlcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLnByb3RvdHlwZS1AQHRvc3RyaW5ndGFnXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCBTWU1CT0wpO1xuXG5oaWRkZW5LZXlzW0hJRERFTl0gPSB0cnVlO1xuIiwiLy8gZW1wdHlcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgTkFUSVZFX1NZTUJPTF9SRUdJU1RSWSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zeW1ib2wtcmVnaXN0cnktZGV0ZWN0aW9uJyk7XG5cbnZhciBTdHJpbmdUb1N5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzdHJpbmctdG8tc3ltYm9sLXJlZ2lzdHJ5Jyk7XG52YXIgU3ltYm9sVG9TdHJpbmdSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXRvLXN0cmluZy1yZWdpc3RyeScpO1xuXG4vLyBgU3ltYm9sLmZvcmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5mb3JcbiQoeyB0YXJnZXQ6ICdTeW1ib2wnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6ICFOQVRJVkVfU1lNQk9MX1JFR0lTVFJZIH0sIHtcbiAgJ2Zvcic6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgc3RyaW5nID0gdG9TdHJpbmcoa2V5KTtcbiAgICBpZiAoaGFzT3duKFN0cmluZ1RvU3ltYm9sUmVnaXN0cnksIHN0cmluZykpIHJldHVybiBTdHJpbmdUb1N5bWJvbFJlZ2lzdHJ5W3N0cmluZ107XG4gICAgdmFyIHN5bWJvbCA9IGdldEJ1aWx0SW4oJ1N5bWJvbCcpKHN0cmluZyk7XG4gICAgU3RyaW5nVG9TeW1ib2xSZWdpc3RyeVtzdHJpbmddID0gc3ltYm9sO1xuICAgIFN5bWJvbFRvU3RyaW5nUmVnaXN0cnlbc3ltYm9sXSA9IHN0cmluZztcbiAgICByZXR1cm4gc3ltYm9sO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wtZGVmaW5lJyk7XG5cbi8vIGBTeW1ib2wuaGFzSW5zdGFuY2VgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5oYXNpbnN0YW5jZVxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdoYXNJbnN0YW5jZScpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC1kZWZpbmUnKTtcblxuLy8gYFN5bWJvbC5pc0NvbmNhdFNwcmVhZGFibGVgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5pc2NvbmNhdHNwcmVhZGFibGVcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnaXNDb25jYXRTcHJlYWRhYmxlJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLWRlZmluZScpO1xuXG4vLyBgU3ltYm9sLml0ZXJhdG9yYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wuaXRlcmF0b3JcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIFRPRE86IFJlbW92ZSB0aGlzIG1vZHVsZSBmcm9tIGBjb3JlLWpzQDRgIHNpbmNlIGl0J3Mgc3BsaXQgdG8gbW9kdWxlcyBsaXN0ZWQgYmVsb3dcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXMuc3ltYm9sLmNvbnN0cnVjdG9yJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzLnN5bWJvbC5mb3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXMuc3ltYm9sLmtleS1mb3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXMuanNvbi5zdHJpbmdpZnknKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXMub2JqZWN0LmdldC1vd24tcHJvcGVydHktc3ltYm9scycpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1zeW1ib2wnKTtcbnZhciB0cnlUb1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90cnktdG8tc3RyaW5nJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIE5BVElWRV9TWU1CT0xfUkVHSVNUUlkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3ltYm9sLXJlZ2lzdHJ5LWRldGVjdGlvbicpO1xuXG52YXIgU3ltYm9sVG9TdHJpbmdSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXRvLXN0cmluZy1yZWdpc3RyeScpO1xuXG4vLyBgU3ltYm9sLmtleUZvcmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5rZXlmb3JcbiQoeyB0YXJnZXQ6ICdTeW1ib2wnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6ICFOQVRJVkVfU1lNQk9MX1JFR0lTVFJZIH0sIHtcbiAga2V5Rm9yOiBmdW5jdGlvbiBrZXlGb3Ioc3ltKSB7XG4gICAgaWYgKCFpc1N5bWJvbChzeW0pKSB0aHJvdyBuZXcgVHlwZUVycm9yKHRyeVRvU3RyaW5nKHN5bSkgKyAnIGlzIG5vdCBhIHN5bWJvbCcpO1xuICAgIGlmIChoYXNPd24oU3ltYm9sVG9TdHJpbmdSZWdpc3RyeSwgc3ltKSkgcmV0dXJuIFN5bWJvbFRvU3RyaW5nUmVnaXN0cnlbc3ltXTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLWRlZmluZScpO1xuXG4vLyBgU3ltYm9sLm1hdGNoQWxsYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wubWF0Y2hhbGxcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnbWF0Y2hBbGwnKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wtZGVmaW5lJyk7XG5cbi8vIGBTeW1ib2wubWF0Y2hgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5tYXRjaFxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdtYXRjaCcpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC1kZWZpbmUnKTtcblxuLy8gYFN5bWJvbC5yZXBsYWNlYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wucmVwbGFjZVxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdyZXBsYWNlJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLWRlZmluZScpO1xuXG4vLyBgU3ltYm9sLnNlYXJjaGAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLnNlYXJjaFxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdzZWFyY2gnKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wtZGVmaW5lJyk7XG5cbi8vIGBTeW1ib2wuc3BlY2llc2Agd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLnNwZWNpZXNcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC1kZWZpbmUnKTtcblxuLy8gYFN5bWJvbC5zcGxpdGAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLnNwbGl0XG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ3NwbGl0Jyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLWRlZmluZScpO1xudmFyIGRlZmluZVN5bWJvbFRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N5bWJvbC1kZWZpbmUtdG8tcHJpbWl0aXZlJyk7XG5cbi8vIGBTeW1ib2wudG9QcmltaXRpdmVgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC50b3ByaW1pdGl2ZVxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCd0b1ByaW1pdGl2ZScpO1xuXG4vLyBgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5wcm90b3R5cGUtQEB0b3ByaW1pdGl2ZVxuZGVmaW5lU3ltYm9sVG9QcmltaXRpdmUoKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC1kZWZpbmUnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xuXG4vLyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wudG9zdHJpbmd0YWdcbmRlZmluZVdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcblxuLy8gYFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11gIHByb3BlcnR5XG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5wcm90b3R5cGUtQEB0b3N0cmluZ3RhZ1xuc2V0VG9TdHJpbmdUYWcoZ2V0QnVpbHRJbignU3ltYm9sJyksICdTeW1ib2wnKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wtZGVmaW5lJyk7XG5cbi8vIGBTeW1ib2wudW5zY29wYWJsZXNgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC51bnNjb3BhYmxlc1xuZGVmaW5lV2VsbEtub3duU3ltYm9sKCd1bnNjb3BhYmxlcycpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xuXG52YXIgTUVUQURBVEEgPSB3ZWxsS25vd25TeW1ib2woJ21ldGFkYXRhJyk7XG52YXIgRnVuY3Rpb25Qcm90b3R5cGUgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbi8vIEZ1bmN0aW9uLnByb3RvdHlwZVtAQG1ldGFkYXRhXVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtZGVjb3JhdG9yLW1ldGFkYXRhXG5pZiAoRnVuY3Rpb25Qcm90b3R5cGVbTUVUQURBVEFdID09PSB1bmRlZmluZWQpIHtcbiAgZGVmaW5lUHJvcGVydHkoRnVuY3Rpb25Qcm90b3R5cGUsIE1FVEFEQVRBLCB7XG4gICAgdmFsdWU6IG51bGxcbiAgfSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLWRlZmluZScpO1xuXG4vLyBgU3ltYm9sLmFzeW5jRGlzcG9zZWAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLWFzeW5jLWV4cGxpY2l0LXJlc291cmNlLW1hbmFnZW1lbnRcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnYXN5bmNEaXNwb3NlJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLWRlZmluZScpO1xuXG4vLyBgU3ltYm9sLmRpc3Bvc2VgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1leHBsaWNpdC1yZXNvdXJjZS1tYW5hZ2VtZW50XG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ2Rpc3Bvc2UnKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGlzUmVnaXN0ZXJlZFN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zeW1ib2wtaXMtcmVnaXN0ZXJlZCcpO1xuXG4vLyBgU3ltYm9sLmlzUmVnaXN0ZXJlZFN5bWJvbGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvcHJvcG9zYWwtc3ltYm9sLXByZWRpY2F0ZXMvI3NlYy1zeW1ib2wtaXNyZWdpc3RlcmVkc3ltYm9sXG4kKHsgdGFyZ2V0OiAnU3ltYm9sJywgc3RhdDogdHJ1ZSB9LCB7XG4gIGlzUmVnaXN0ZXJlZFN5bWJvbDogaXNSZWdpc3RlcmVkU3ltYm9sXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGlzUmVnaXN0ZXJlZFN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zeW1ib2wtaXMtcmVnaXN0ZXJlZCcpO1xuXG4vLyBgU3ltYm9sLmlzUmVnaXN0ZXJlZGAgbWV0aG9kXG4vLyBvYnNvbGV0ZSB2ZXJzaW9uIG9mIGh0dHBzOi8vdGMzOS5lcy9wcm9wb3NhbC1zeW1ib2wtcHJlZGljYXRlcy8jc2VjLXN5bWJvbC1pc3JlZ2lzdGVyZWRzeW1ib2xcbiQoeyB0YXJnZXQ6ICdTeW1ib2wnLCBzdGF0OiB0cnVlLCBuYW1lOiAnaXNSZWdpc3RlcmVkU3ltYm9sJyB9LCB7XG4gIGlzUmVnaXN0ZXJlZDogaXNSZWdpc3RlcmVkU3ltYm9sXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGlzV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N5bWJvbC1pcy13ZWxsLWtub3duJyk7XG5cbi8vIGBTeW1ib2wuaXNXZWxsS25vd25TeW1ib2xgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL3Byb3Bvc2FsLXN5bWJvbC1wcmVkaWNhdGVzLyNzZWMtc3ltYm9sLWlzd2VsbGtub3duc3ltYm9sXG4vLyBXZSBzaG91bGQgcGF0Y2ggaXQgZm9yIG5ld2x5IGFkZGVkIHdlbGwta25vd24gc3ltYm9scy4gSWYgaXQncyBub3QgcmVxdWlyZWQsIHRoaXMgbW9kdWxlIGp1c3Qgd2lsbCBub3QgYmUgaW5qZWN0ZWRcbiQoeyB0YXJnZXQ6ICdTeW1ib2wnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IHRydWUgfSwge1xuICBpc1dlbGxLbm93blN5bWJvbDogaXNXZWxsS25vd25TeW1ib2xcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgaXNXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3ltYm9sLWlzLXdlbGwta25vd24nKTtcblxuLy8gYFN5bWJvbC5pc1dlbGxLbm93bmAgbWV0aG9kXG4vLyBvYnNvbGV0ZSB2ZXJzaW9uIG9mIGh0dHBzOi8vdGMzOS5lcy9wcm9wb3NhbC1zeW1ib2wtcHJlZGljYXRlcy8jc2VjLXN5bWJvbC1pc3dlbGxrbm93bnN5bWJvbFxuLy8gV2Ugc2hvdWxkIHBhdGNoIGl0IGZvciBuZXdseSBhZGRlZCB3ZWxsLWtub3duIHN5bWJvbHMuIElmIGl0J3Mgbm90IHJlcXVpcmVkLCB0aGlzIG1vZHVsZSBqdXN0IHdpbGwgbm90IGJlIGluamVjdGVkXG4kKHsgdGFyZ2V0OiAnU3ltYm9sJywgc3RhdDogdHJ1ZSwgbmFtZTogJ2lzV2VsbEtub3duU3ltYm9sJywgZm9yY2VkOiB0cnVlIH0sIHtcbiAgaXNXZWxsS25vd246IGlzV2VsbEtub3duU3ltYm9sXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wtZGVmaW5lJyk7XG5cbi8vIGBTeW1ib2wubWF0Y2hlcmAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXBhdHRlcm4tbWF0Y2hpbmdcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnbWF0Y2hlcicpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gVE9ETzogUmVtb3ZlIGZyb20gYGNvcmUtanNANGBcbnZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wtZGVmaW5lJyk7XG5cbi8vIGBTeW1ib2wubWV0YWRhdGFLZXlgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1kZWNvcmF0b3ItbWV0YWRhdGFcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnbWV0YWRhdGFLZXknKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wtZGVmaW5lJyk7XG5cbi8vIGBTeW1ib2wubWV0YWRhdGFgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1kZWNvcmF0b3JzXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ21ldGFkYXRhJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLWRlZmluZScpO1xuXG4vLyBgU3ltYm9sLm9ic2VydmFibGVgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYnNlcnZhYmxlXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ29ic2VydmFibGUnKTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIFRPRE86IHJlbW92ZSBmcm9tIGBjb3JlLWpzQDRgXG52YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLWRlZmluZScpO1xuXG4vLyBgU3ltYm9sLnBhdHRlcm5NYXRjaGAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXBhdHRlcm4tbWF0Y2hpbmdcbmRlZmluZVdlbGxLbm93blN5bWJvbCgncGF0dGVybk1hdGNoJyk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBUT0RPOiByZW1vdmUgZnJvbSBgY29yZS1qc0A0YFxudmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC1kZWZpbmUnKTtcblxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdyZXBsYWNlQWxsJyk7XG4iLCIvLyBlbXB0eVxuIiwiJ3VzZSBzdHJpY3QnO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lcy5hcnJheS5pdGVyYXRvcicpO1xudmFyIERPTUl0ZXJhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb20taXRlcmFibGVzJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xuXG5mb3IgKHZhciBDT0xMRUNUSU9OX05BTUUgaW4gRE9NSXRlcmFibGVzKSB7XG4gIHZhciBDb2xsZWN0aW9uID0gZ2xvYmFsW0NPTExFQ1RJT05fTkFNRV07XG4gIHZhciBDb2xsZWN0aW9uUHJvdG90eXBlID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYgKENvbGxlY3Rpb25Qcm90b3R5cGUgJiYgY2xhc3NvZihDb2xsZWN0aW9uUHJvdG90eXBlKSAhPT0gVE9fU1RSSU5HX1RBRykge1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShDb2xsZWN0aW9uUHJvdG90eXBlLCBUT19TVFJJTkdfVEFHLCBDT0xMRUNUSU9OX05BTUUpO1xuICB9XG4gIEl0ZXJhdG9yc1tDT0xMRUNUSU9OX05BTUVdID0gSXRlcmF0b3JzLkFycmF5O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uLy4uL2VzL2FycmF5L3ZpcnR1YWwvZm9yLWVhY2gnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvaW5zdGFuY2UvZmlsdGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uLy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgaXNQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uLy4uL2ludGVybmFscy9vYmplY3QtaXMtcHJvdG90eXBlLW9mJyk7XG52YXIgbWV0aG9kID0gcmVxdWlyZSgnLi4vYXJyYXkvdmlydHVhbC9mb3ItZWFjaCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy93ZWIuZG9tLWNvbGxlY3Rpb25zLmZvci1lYWNoJyk7XG5cbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxudmFyIERPTUl0ZXJhYmxlcyA9IHtcbiAgRE9NVG9rZW5MaXN0OiB0cnVlLFxuICBOb2RlTGlzdDogdHJ1ZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIG93biA9IGl0LmZvckVhY2g7XG4gIHJldHVybiBpdCA9PT0gQXJyYXlQcm90b3R5cGUgfHwgKGlzUHJvdG90eXBlT2YoQXJyYXlQcm90b3R5cGUsIGl0KSAmJiBvd24gPT09IEFycmF5UHJvdG90eXBlLmZvckVhY2gpXG4gICAgfHwgaGFzT3duKERPTUl0ZXJhYmxlcywgY2xhc3NvZihpdCkpID8gbWV0aG9kIDogb3duO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9pbnN0YW5jZS9pbmNsdWRlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9pbnN0YW5jZS9tYXAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvaW5zdGFuY2Uvc29tZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9vYmplY3QvYXNzaWduJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL29iamVjdC9kZWZpbmUtcHJvcGVydGllcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktc3ltYm9scycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9vYmplY3Qva2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9zeW1ib2wnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvd2ViLmRvbS1jb2xsZWN0aW9ucy5pdGVyYXRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9zeW1ib2wvaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvd2ViLmRvbS1jb2xsZWN0aW9ucy5pdGVyYXRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9zeW1ib2wvdG8tcHJpbWl0aXZlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBhcHAsIGlwY01haW4sIGlwY1JlbmRlcmVyIH0gZnJvbSAnZWxlY3Ryb24nXG5pbXBvcnQgc2VydmUgZnJvbSAnZWxlY3Ryb24tc2VydmUnXG5pbXBvcnQgeyBjcmVhdGVXaW5kb3cgfSBmcm9tICcuL2hlbHBlcnMnXG5cbi8vIE1hbmlwdWxhY2nDs24gZGUgcHVlcnRvIHNlcmlhbFxuaW1wb3J0IHtcbiAgICBCeXRlTGVuZ3RoUGFyc2VyLFxuICAgIFJlYWRsaW5lUGFyc2VyLFxuICAgIFNlcmlhbFBvcnRcbn0gZnJvbSAnc2VyaWFscG9ydCc7XG5cbi8vIFBhcmEgbGEgY29uZXhpb24gYWwgc2Vydmlkb3Igc29ja2V0LlxuaW1wb3J0IHsgaW8gfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcblxuLy8gQ29udHJvbGFkb3JlcyBkZSBJUEMuXG5pbXBvcnQge1xuICAgIGV4cGxvcmFyUHVlcnRvcyxcbiAgICBndWFyZGFyQ29uZmlndXJhY2lvbkRpc3Bvc2l0aXZvQ2hlY2Fkb3IsXG4gICAgZ3VhcmRhckNvbmZpZ3VyYWNpb25EaXNwb3NpdGl2b0NvbnRyb2xhZG9yLFxuICAgIGd1YXJkYXJDb25maWd1cmFjaW9uRGlzcG9zaXRpdm9Db250cm9sYWRvclB1ZXJ0YSxcbiAgICBndWFyZGFyQ29uZmlndXJhY2lvbkRpc3Bvc2l0aXZvTGVjdG9yLFxuICAgIGd1YXJkYXJEYXRvc1RhcmpldGFcbn0gZnJvbSAnLi9jb250cm9sYWRvcmVzL2NvbnRyb2xhZG9yU2VyaWFsJztcblxuY29uc3QgaXNQcm9kID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJ1xuXG5sZXQgY2xpZW50ZVNvY2tldCA9IHVuZGVmaW5lZDtcblxubGV0IHNvY2tldCA9IHVuZGVmaW5lZDtcblxubGV0IGxpc3RhQ2xpZW50ZXMgPSBbXTtcblxubGV0IGVzdGF0dXNEaXNwb3NpdGl2byA9IDA7XG5cbmlmIChpc1Byb2QpIHtcbiAgICBzZXJ2ZSh7IGRpcmVjdG9yeTogJ2FwcCcgfSk7XG59IGVsc2Uge1xuICAgIGFwcC5zZXRQYXRoKCd1c2VyRGF0YScsIGAke2FwcC5nZXRQYXRoKCd1c2VyRGF0YScpfSAoZGV2ZWxvcG1lbnQpYCk7XG59XG5cbjsoYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGFwcC53aGVuUmVhZHkoKTtcblxuICAgIGNvbnN0IG1haW5XaW5kb3cgPSBjcmVhdGVXaW5kb3coJ21haW4nLCB7XG4gICAgICAgIHdpZHRoOiAxMDAwLFxuICAgICAgICBoZWlnaHQ6IDYwMCxcbiAgICAgICAgd2ViUHJlZmVyZW5jZXM6IHtcbiAgICAgICAgcHJlbG9hZDogcGF0aC5qb2luKF9fZGlybmFtZSwgJ3ByZWxvYWQuanMnKSxcbiAgICAgICAgfSxcbiAgICB9KTtcblxuICAgIGlmIChpc1Byb2QpIHtcbiAgICAgICAgYXdhaXQgbWFpbldpbmRvdy5sb2FkVVJMKCdhcHA6Ly8uLycpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBvcnQgPSBwcm9jZXNzLmFyZ3ZbMl07XG4gICAgICAgIGF3YWl0IG1haW5XaW5kb3cubG9hZFVSTChgaHR0cDovL2xvY2FsaG9zdDoke3BvcnR9L2ApO1xuICAgIH1cbn0pKClcblxuYXBwLm9uKCd3aW5kb3ctYWxsLWNsb3NlZCcsICgpID0+IHtcbiAgICBhcHAucXVpdCgpO1xufSk7XG5cbi8vIEV4cGxvcmFtb3MgbG9zIHB1ZXJ0b3Mgc2VyaWFsZXMgZGlzcG9uaWJsZXMuXG5pcGNNYWluLm9uKFxuICAgICdleHBsb3Jhcl9wdWVydG9zX3NlcmlhbCcsXG4gICAgZXhwbG9yYXJQdWVydG9zXG4pO1xuXG5pcGNNYWluLm9uKFxuICAgICdndWFyZGFyX2RhdG9zX3RhcmpldGEnLFxuICAgIGd1YXJkYXJEYXRvc1RhcmpldGFcbik7XG5cbmlwY01haW4ub24oXG4gICAgJ2d1YXJkYXJfY29uZmlndXJhY2lvbl9sZWN0b3InLFxuICAgIGd1YXJkYXJDb25maWd1cmFjaW9uRGlzcG9zaXRpdm9MZWN0b3Jcbik7XG5cbmlwY01haW4ub24oXG4gICAgJ2d1YXJkYXJfY29uZmlndXJhY2lvbl9jaGVjYWRvcicsXG4gICAgZ3VhcmRhckNvbmZpZ3VyYWNpb25EaXNwb3NpdGl2b0NoZWNhZG9yXG4pO1xuXG5pcGNNYWluLm9uKFxuICAgICdndWFyZGFyX2NvbmZpZ3VyYWNpb25fY29udHJvbGFkb3InLFxuICAgIGd1YXJkYXJDb25maWd1cmFjaW9uRGlzcG9zaXRpdm9Db250cm9sYWRvclxuKTtcblxuaXBjTWFpbi5vbihcbiAgICAnZ3VhcmRhcl9jb25maWd1cmFjaW9uX2NvbnRyb2xhZG9yX3B1ZXJ0YScsXG4gICAgZ3VhcmRhckNvbmZpZ3VyYWNpb25EaXNwb3NpdGl2b0NvbnRyb2xhZG9yUHVlcnRhXG4pO1xuXG5pcGNNYWluLm9uKCdzZXNpb25faW5pY2lhZGEnLCBhc3luYyAoXG4gICAgZXZlbnRvLFxuICAgIHBhcmFtc1xuKSA9PiB7XG4gICAgY29uc3QgaXBTZXJ2ZXIgPSBwYXJhbXMuaXBTZXJ2ZXI7XG4gICAgY29uc3QgdG9rZW4gPSBwYXJhbXMudG9rZW47XG5cbiAgICAvLyBJbmljaWFtb3MgY29uZXhpb24gY29uIGVsIHRva2VuIHNlcnZlci5cbiAgICBjbGllbnRlU29ja2V0ID0gaW8oaXBTZXJ2ZXIsIHtcbiAgICAgICAgZXh0cmFIZWFkZXJzOiB7XG4gICAgICAgICAgICBhdXRob3JpemF0aW9uOiB0b2tlblxuICAgICAgICB9XG4gICAgfSk7XG4gICAgc29ja2V0ID0gY2xpZW50ZVNvY2tldC5jb25uZWN0KCk7XG5cbiAgICAvKiBQcm9jZXNhbWllbnRvIGRlIGV2ZW50b3MgcmVjaXZkb3MgcG9yIHNvY2tldHMgKi9cbiAgICBzb2NrZXQub24oJ2NhbWJpb19lc3RhdHVzJywgKCkgPT4ge1xuICAgICAgICAvLyBHdWFyZGFtb3MgbGEgbGlzdGEgZGUgbG9zIGNsaWVudGVzIGNvbmVjdGFkb3MuXG4gICAgICAgIHNvY2tldC5lbWl0KCdsaXN0YXJfY2xpZW50ZXMnKTtcbiAgICB9KTtcblxuICAgIHNvY2tldC5vbignbGlzdGFfY2xpZW50ZXMnLCAobGlzdGEpID0+IHtcbiAgICAgICAgLy8gR3VhcmRhbW9zIGxhIGxpc3RhIGRlIGxvcyBjbGllbnRlcyBjb25lY3RhZG9zLlxuICAgICAgICBsaXN0YUNsaWVudGVzID0gbGlzdGE7XG4gICAgfSk7XG5cbiAgICBzb2NrZXQub24oJ2VzdGF0dXNfZGlzcG9zaXRpdm8nLCAoZXN0YXR1cykgPT4ge1xuICAgICAgICAvLyBHdWFyZGFtb3MgZWwgZXN0YXR1cyBkZWwgZGlzcG9zaXRpdm8uXG4gICAgICAgIGVzdGF0dXNEaXNwb3NpdGl2byA9IGVzdGF0dXM7XG4gICAgfSk7XG5cbiAgICBzb2NrZXQub24oJ2NsaWVudGVfdGVybWluYWRvJywgKCkgPT4ge1xuICAgICAgICAvLyBBY3R1YWxpemFtb3MgbGEgbGlzdGEgZGUgbG9zIGNsZWludGVzIGNvbmVjdGFkb3MuXG4gICAgICAgIHNvY2tldC5lbWl0KCdsaXN0YXJfY2xpZW50ZXMnKTtcbiAgICB9KTtcblxuICAgIHNvY2tldC5vbignY2xpZW50ZV9jb25lY3RhZG8nLCAoKSA9PiB7XG4gICAgICAgIC8vIEFjdHVhbGl6YW1vcyBsYSBsaXN0YSBkZSBsb3MgY2xlaW50ZXMgY29uZWN0YWRvcy5cbiAgICAgICAgc29ja2V0LmVtaXQoJ2xpc3Rhcl9jbGllbnRlcycpO1xuICAgIH0pO1xufSk7XG5cbmlwY01haW4ub24oJ3Nlc2lvbl90ZXJtaW5hZGEnLCBhc3luYyAoXG4gICAgZXZlbnRvLFxuICAgIGFyZ3NcbikgPT4ge1xuICAgIC8vIFRlcm1pbmFtb3MgbGEgY29uZXhpb24gY29uIGVsIHNvY2tldFNlcnZlci5cbiAgICBzb2NrZXQuZGlzY29ubmVjdCgpO1xufSk7XG5cbmlwY01haW4ub24oJ2VtaXRpcl9ldmVudG9fc29ja2V0JywgYXN5bmMgKGV2ZW50bywgYXJncykgPT4ge1xuICAgIC8vIEVtaXRpbW9zIHVuIGV2ZW50byBwb3IgbWVkaW8gZGUgc29ja2V0cy5cbiAgICBzb2NrZXQuZW1pdChhcmdzLmV2ZW50bywgYXJncy5wYXJhbWV0cm9zKTtcbn0pO1xuXG5pcGNNYWluLm9uKCdsaXN0YXJfY2xpZW50ZXMnLCAoXG4gICAgZXZlbnRvLFxuICAgIGFyZ3NcbikgPT4ge1xuICAgIGV2ZW50by5yZXR1cm5WYWx1ZSA9IGxpc3RhQ2xpZW50ZXM7XG59KTtcblxuaXBjTWFpbi5vbignZXN0YXR1c19kaXNwb3NpdGl2bycsIChcbiAgICBldmVudG8sXG4gICAgYXJnc1xuKSA9PiB7XG4gICAgZXZlbnRvLnJldHVyblZhbHVlID0gZXN0YXR1c0Rpc3Bvc2l0aXZvO1xuICAgIGVzdGF0dXNEaXNwb3NpdGl2byA9IDA7XG59KTtcbiJdLCJuYW1lcyI6WyJGTEFHU19ESVNQT1NJVElWTyIsImNvbmV4aW9uQWJpZXJ0YSIsImNvbnNvbGUiLCJsb2ciLCJleGNlcGNpb24iLCJhbFJlY2l2aXJEYXRvcyIsInJlc3B1ZXN0YSIsInBhcnNlciIsImNvbGFPcGVyYWNpb25lcyIsInB1ZXJ0b1NlcmlhbCIsIklOSUNJQUxJWkFDSU9OX1RFUk1JTkFEQSIsImVtaXQiLCJFU0NSSVRVUkFfVEVSTUlOQURBIiwib3BlcmFjaW9uIiwic2hpZnQiLCJPUEVSQUNJT05fVEVSTUlOQURBIiwiY2xvc2UiLCJpbmljaWFyRW52aW9EYXRvcyIsImV2ZW50byIsIndyaXRlIiwiZHJhaW4iLCJlcnJvciIsInB1c2giLCJlbnZpYXJEYXRvIiwiZGF0b0FHdWFyZGFyIiwic2lndWllbnRlRXZlbnRvIiwiZGF0byIsInRvU3RyaW5nIiwidGVybWluYXJHdWFyZGFkbyIsImVuZCIsImNvbmV4aW9uQ2VycmFkYSIsIlJlYWRsaW5lUGFyc2VyIiwiU2VyaWFsUG9ydCIsIkVWRU5UT1NfR1VBUkRBRE9fQ09ORklHVVJBQ0lPTl9DSEVDQURPUiIsIkVWRU5UT1NfR1VBUkRBRE9fQ09ORklHVVJBQ0lPTl9DT05UUk9MQURPUiIsIkVWRU5UT1NfR1VBUkRBRE9fQ09ORklHVVJBQ0lPTl9DT05UUk9MQURPUl9QVUVSVEEiLCJFVkVOVE9TX0dVQVJEQURPX0NPTkZJR1VSQUNJT05fTEVDVE9SIiwiRVZFTlRPU19HVUFSREFET19EQVRPU19UQVJKRVRBIiwiY29sYURhdG9zIiwiZXhwbG9yYXJQdWVydG9zIiwibW9zdHJhclRvZG9zTG9zUHVlcnRvcyIsInB1ZXJ0b3MiLCJsaXN0IiwicHVlcnRvc0ZpbHRyYWRvcyIsIl9tYXBJbnN0YW5jZVByb3BlcnR5IiwiY2FsbCIsInB1ZXJ0byIsIl9jb250ZXh0IiwiX2luY2x1ZGVzSW5zdGFuY2VQcm9wZXJ0eSIsInBhdGgiLCJyZXBseSIsImd1YXJkYXJEYXRvc1RhcmpldGEiLCJhcmdzIiwiSURfRU5WSUFETyIsInJlZ2lzdHJvIiwiaWQiLCJBVVRPUklaQUNJT05fRU5WSUFETyIsInJlZ2lzdHJvc1ZpbmN1bGFkb3MiLCJwZXJtaXNvIiwiYXV0b3JpemFjaW9uIiwiUk9MX0VOVklBRE8iLCJyb2wiLCJiaXRSb2wiLCJkYXRvc0Rpc3Bvc2l0aXZvIiwiY2FsbGJhY2siLCJzZXQiLCJydHMiLCJkdHIiLCJwaXBlIiwiZGVsaW1pdGVyIiwib24iLCJvbmNlIiwiSU5JQ0lBUl9HVUFSREFET19EQVRPUyIsImxlbmd0aCIsIlRFUk1JTkFSX0dVQVJEQURPX0RBVE9TIiwiZ3VhcmRhckNvbmZpZ3VyYWNpb25EaXNwb3NpdGl2b0xlY3RvciIsImlzT3BlbiIsImNsZWFyIiwiQ0FNQklBUl9QRVJNSVNPX1BFRElETyIsImNvbmZpZ3VyYWNpb24iLCJiaXRQZXJtaXNvIiwiQ0FNQklBUl9TU0lEIiwic3NpZCIsIkNBTUJJQVJfUEFTU1dPUkQiLCJwYXNzd29yZCIsIkNBTUJJQVJfUFVFUlRPX0FQSSIsInB1ZXJ0b0FwaSIsIkNBTUJJQVJfSVBfQVBJIiwiaXBBcGkiLCJDQU1CSUFSX1ZFUlNJT05fQVBJIiwidmVyc2lvbkFwaSIsIkNBTUJJQVJfQUNDRVNTX1RPS0VOIiwiYXBpS2V5IiwiQ0FNQklBUl9BQ0NJT05fT1BDSU9OQUwiLCJhY2Npb25PcGNpb25hbCIsIklOSUNJQVJfQ09ORklHVVJBQ0lPTiIsIkZJTkFMSVpBUl9DT05GSUdVUkFDSU8iLCJndWFyZGFyQ29uZmlndXJhY2lvbkRpc3Bvc2l0aXZvQ2hlY2Fkb3IiLCJndWFyZGFyQ29uZmlndXJhY2lvbkRpc3Bvc2l0aXZvQ29udHJvbGFkb3IiLCJDQU1CSUFSX1JPTF9QRURJRE8iLCJndWFyZGFyQ29uZmlndXJhY2lvbkRpc3Bvc2l0aXZvQ29udHJvbGFkb3JQdWVydGEiLCJzY3JlZW4iLCJCcm93c2VyV2luZG93IiwiU3RvcmUiLCJjcmVhdGVXaW5kb3ciLCJ3aW5kb3dOYW1lIiwib3B0aW9ucyIsImtleSIsIm5hbWUiLCJzdG9yZSIsImRlZmF1bHRTaXplIiwid2lkdGgiLCJoZWlnaHQiLCJzdGF0ZSIsInJlc3RvcmUiLCJnZXQiLCJnZXRDdXJyZW50UG9zaXRpb24iLCJwb3NpdGlvbiIsIndpbiIsImdldFBvc2l0aW9uIiwic2l6ZSIsImdldFNpemUiLCJ4IiwieSIsIndpbmRvd1dpdGhpbkJvdW5kcyIsIndpbmRvd1N0YXRlIiwiYm91bmRzIiwicmVzZXRUb0RlZmF1bHRzIiwiZ2V0UHJpbWFyeURpc3BsYXkiLCJfT2JqZWN0JGFzc2lnbiIsImVuc3VyZVZpc2libGVPblNvbWVEaXNwbGF5IiwidmlzaWJsZSIsIl9zb21lSW5zdGFuY2VQcm9wZXJ0eSIsImdldEFsbERpc3BsYXlzIiwiZGlzcGxheSIsInNhdmVTdGF0ZSIsImlzTWluaW1pemVkIiwiaXNNYXhpbWl6ZWQiLCJfb2JqZWN0U3ByZWFkIiwid2ViUHJlZmVyZW5jZXMiLCJub2RlSW50ZWdyYXRpb24iLCJjb250ZXh0SXNvbGF0aW9uIiwiYXBwIiwiaXBjTWFpbiIsInNlcnZlIiwiaW8iLCJpc1Byb2QiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJjbGllbnRlU29ja2V0IiwidW5kZWZpbmVkIiwic29ja2V0IiwibGlzdGFDbGllbnRlcyIsImVzdGF0dXNEaXNwb3NpdGl2byIsImRpcmVjdG9yeSIsInNldFBhdGgiLCJnZXRQYXRoIiwid2hlblJlYWR5IiwibWFpbldpbmRvdyIsInByZWxvYWQiLCJqb2luIiwiX19kaXJuYW1lIiwibG9hZFVSTCIsInBvcnQiLCJhcmd2IiwicXVpdCIsInBhcmFtcyIsImlwU2VydmVyIiwidG9rZW4iLCJleHRyYUhlYWRlcnMiLCJhdXRob3JpemF0aW9uIiwiY29ubmVjdCIsImxpc3RhIiwiZXN0YXR1cyIsImRpc2Nvbm5lY3QiLCJwYXJhbWV0cm9zIiwicmV0dXJuVmFsdWUiXSwic291cmNlUm9vdCI6IiJ9